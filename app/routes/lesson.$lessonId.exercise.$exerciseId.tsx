import {json, redirect} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {getSession, commitSession} from "~/sessions.server";
import {connectToDatabase} from "~/db/mongoDB.server";
import MultipleChoiceExercise from "../routes/lesson.$lessonId.exercise.$exerciseId.multiple-choice"
import VideoExercise from "~/routes/lesson.$lessonId.exercise.$exerciseId.video";

export const loader = async ({params, request}: {
    params: { lessonId: string, exerciseId: string },
    request: Request
}) => {
    const {lessonId, exerciseId} = params;
    const session = await getSession(request.headers.get("Cookie"));
    const selectedOption = await session.get(`exercise_${exerciseId}_selectedAnswer`) || null;

    const {db} = await connectToDatabase();
    const lesson = await db.collection("lesson").findOne({"lessons.id": lessonId});
    if (!lesson || !lesson.lessons) {
        throw new Response("Lesson not found", {status: 404});
    }
    const lessonData = lesson.lessons.find((lesson: { id: string }) => lesson.id === lessonId);
    if (!lessonData) {
        throw new Response("Lesson not found", {status: 404});
    }
    const exercise = lessonData.exercises.find((ex: { id: string }) => ex.id === exerciseId);
    if (!exercise) {
        throw new Response("Exercise not found", {status: 404});
    }
    return json({exercise, selectedOption});
};

export const action = async ({request, params}: {
    request: Request,
    params: { lessonId: string, exerciseId: string }
}) => {
    const {exerciseId} = params;
    const formData = await request.formData();
    const selectedAnswer = formData.get("radioOption");

    if (!selectedAnswer) {
        throw new Response("No answer selected", {status: 400});
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set(`exercise_${exerciseId}_selectedAnswer`, selectedAnswer);

    return redirect(`/lesson/${params.lessonId}/exercise/${exerciseId}`, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};


export default function ExercisePage() {
    const {exercise} = useLoaderData<LoaderData>();
    const Exercise = {
        VideoExercise,
        MultipleChoiceExercise,
    }[exercise.resourcetype];

    return <Exercise exercise={exercise}/>;
}
