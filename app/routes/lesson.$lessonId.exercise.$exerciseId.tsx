import { json, redirect, defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions.server";
import { connectToDatabase } from "~/db/mongoDB.server";
import MultipleChoiceExercise from "../routes/lesson.$lessonId.exercise.$exerciseId.multiple-choice";
import VideoExercise from "~/routes/lesson.$lessonId.exercise.$exerciseId.video";
import { Exercise, Lesson } from "~/types";
import ErrorBoundary from "~/routes/ErrorBoundary";

interface LoaderParams {
  params: { lessonId: string; exerciseId: string };
  request: Request;
}

export const loader = async ({ params, request }: LoaderParams) => {
  const { lessonId, exerciseId } = params;

  const { db } = await connectToDatabase();
  const session = await getSession(request.headers.get("Cookie"));
  const selectedOption = session.get(`exercise_${exerciseId}_selectedAnswer`);
  const accessToken = session.get("vimeoAccessToken") || null;


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
      accessToken,
      exerciseId,
      lessonId

    });
  }


  return json({ exercise, selectedOption });
};

async function fetchVimeoMetadata(videoUrl: string) {
  const videoId = videoUrl.split('/').pop()?.split('?')[0];
  const vimeoApiUrl = `https://api.vimeo.com/videos/${videoId}`;
  const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

  try {
    const response = await fetch(vimeoApiUrl, {
      headers: {
        Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video metadata, status: ${response.status}`);
    }

    const data = await response.json();
    return {
      duration: data.duration,
      views: data.stats.plays || 0,
      likes: data.metadata.connections.likes.total || 0,
      description: data.description || "Unavailable",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw new Error("Error fetching Vimeo metadata.");
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
  vimeoMetadata?: {
    duration: number;
    views: number;
    likes: number;
    description: string | null;
  };
}

export default function ExercisePage() {
  const { exercise, vimeoMetadata } = useLoaderData<LoaderData>();

  const ExerciseComponentAsKey = {
    VideoExercise,
    MultipleChoiceExercise,
  }[exercise.resourcetype] as React.ElementType;

  if (!ExerciseComponentAsKey) {
    return null;
  }

  if (exercise.resourcetype === "VideoExercise") {
    return <ExerciseComponentAsKey exercise={exercise} metadata={vimeoMetadata} />;
  }

  return <ExerciseComponentAsKey exercise={exercise} />;
}

export { ErrorBoundary };
