import {json, redirect, defer} from "@remix-run/node";
import {useLoaderData } from "@remix-run/react";
import {getSession, commitSession} from "~/sessions.server";
import {connectToDatabase} from "~/db/mongoDB.server";
import MultipleChoiceExercise from "../routes/lesson.$lessonId.exercise.$exerciseId.multiple-choice"
import VideoExercise from "~/routes/lesson.$lessonId.exercise.$exerciseId.video";
import React from "react";


async function loadMetadata(videoId: string) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ duration: 120, views: 1000 });  // Example metadata
        }, 2000);
    });
}

export const loader = async ({ params, request }: { params: { lessonId: string, exerciseId: string }, request: Request }) => {
    const { lessonId, exerciseId } = params;

    const session = await getSession(request.headers.get("Cookie"));
    const selectedOption = session.get(`exercise_${exerciseId}_selectedAnswer`) || null;

    const { db } = await connectToDatabase();
    const lesson = await db.collection("lesson").findOne({
        "lessons.id": lessonId
    });
    if (!lesson || !lesson.lessons) {
        throw new Response("Lesson not found", { status: 404 });
    }
    const lessonData = lesson.lessons.find((lesson: { id: string }) => lesson.id === lessonId);
    if (!lessonData) {
        throw new Response("Lesson not found", { status: 404 });
    }
    const exercise = lessonData.exercises.find((ex: { id: string }) => ex.id === exerciseId);
    if (!exercise) {
        throw new Response("Exercise not found", { status: 404 });
    }

    if (exercise.resourcetype === "VideoExercise") {
        const metadataPromise = loadMetadata(exercise.id);  // Load metadata for the video
        return defer({
            exercise,
            selectedOption,
            metadata: metadataPromise,
        });
    }
    return json({ exercise, selectedOption });
};

export const action = async ({ request, params }: { request: Request, params: { lessonId: string, exerciseId: string } }) => {
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
    exercise: {
        id: string;
        title: string;
        url: string;
        description?: string;
        hint?: string;
        answers: Array<{ id: string; answer: string }>;
        resourcetype: string;

    };
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


// export default function ExercisePage() {
//
//     const { exercise } = useLoaderData<LoaderData>();
//
//     if (exercise.url) {
//         return <VideoExercise  />;
//     }
//
//     if (exercise.answers) {
//         return (
//             <MultipleChoiceExercise/>
//         );
//     }
//     return  null
// }


