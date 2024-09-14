import { json, redirect, defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions.server";
import { connectToDatabase } from "~/db/mongoDB.server";
import MultipleChoiceExercise from "../routes/lesson.$lessonId.exercise.$exerciseId.multiple-choice";
import VideoExercise from "~/routes/lesson.$lessonId.exercise.$exerciseId.video";
import React from "react";
import fetch from "node-fetch";
import {Exercise, Lesson} from "~/types";

interface LoaderParams {
  params: { lessonId: string; exerciseId: string };
  request: Request;
}

export const loader = async ({ params, request }: LoaderParams) => {
  const { lessonId, exerciseId } = params;


  const session = await getSession(request.headers.get("Cookie"));
  const selectedOption = session.get(`exercise_${exerciseId}_selectedAnswer`) || null;

  const { db } = await connectToDatabase();
  const lesson = await db.collection("lesson").findOne({
    "lessons.id": lessonId,
  });

  if (!lesson || !lesson.lessons) {
    throw new Response("Lesson not found", { status: 404 });
  }

  const lessonData = lesson.lessons.find((lesson: Lesson) => lesson.id === lessonId);
  const exercise = lessonData.exercises.find((ex: Exercise) => ex.id === exerciseId);

  if (!exercise) {
    throw new Response("Exercise not found", { status: 404 });
  }

  if (exercise.resourcetype === "VideoExercise") {
    const vimeoMetadata = await fetchVimeoMetadata(exercise.url);
    return defer({
      exercise,
      selectedOption,
      vimeoMetadata,
    });
  }

  return json({ exercise, selectedOption });
};


async function fetchVimeoMetadata(videoUrl: string) {
  const videoId = videoUrl.split('/').pop()?.split('?')[0];
  const vimeoApiUrl = `https://api.vimeo.com/videos/${videoId}`;
  const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

  try {
    const [response] = await Promise.all ([fetch (vimeoApiUrl , {
      headers: {
        Authorization: `Bearer ${ VIMEO_ACCESS_TOKEN }` ,
      } ,
    })]);

    if (!response.ok) {
      return   Error(`Failed to fetch video metadata, status: ${response.status}`);
    }

    const videoData: any = await response.json();
    return {
      duration: Math.round(videoData.duration / 15 - 1), //( 27 )
      views: videoData.stats.plays || 0,
      likes: videoData.metadata.connections.likes.total,
      description: videoData.description ||  "unavailable ",
    };
  } catch (error) {
    throw new Error("Error fetching metadata");
  }
}

interface ActionParams {
  request: Request;
  params: { lessonId: string; exerciseId: string };
}

export const action = async ({ request, params }: ActionParams) => {
  const { exerciseId } = params;
  const formData = await request.formData();
  const selectedAnswer = formData.get("radioOption");

  if (!selectedAnswer) {
    throw new Response("No answer selected", { status: 400 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set(`exercise_${exerciseId}_selectedAnswer`, selectedAnswer);

  return redirect(`/lesson/${params.lessonId}/exercise/${exerciseId}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};


interface LoaderData {
    exercise: Exercise;
    selectedOption: string | null;
    metadata?: number;
}

export default function ExercisePage() {
  const { exercise, metadata } = useLoaderData<LoaderData>();

  const ExerciseComponentAsKey = {
    VideoExercise,
    MultipleChoiceExercise,
  }[exercise.resourcetype] as React.ElementType;

  if (!ExerciseComponentAsKey) {
    return null;
  }

  if (exercise.resourcetype === "VideoExercise") {
    return <ExerciseComponentAsKey exercise={exercise} metadata={metadata} />;
  }

  return <ExerciseComponentAsKey exercise={exercise} />;
}