import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { connectToDatabase } from "~/db/mongoDB.server";
import ExerciseNavigation from "~/routes/lesson.$lessonId.exercise.arrows";
import { Lesson } from "~/types";

interface LoaderParams {
  params: { lessonId: string; exerciseId: string };
}

export const loader = async ({ params }: LoaderParams) => {
  const { lessonId } = params;

  const { db } = await connectToDatabase();
  const lesson = await db.collection("lesson").findOne({
    "lessons.id": lessonId,
  });

  if (!lesson || !lesson.lessons) {
    throw new Response("Lesson not found", { status: 404 });
  }

  const lessonData = lesson.lessons.find(
    (lesson: Lesson) => lesson.id === lessonId
  );

  return json({ lesson: lessonData });
};

interface LoaderData {
  lesson: Lesson;
}

export default function LessonLessonIdExercise() {
  const { lesson } = useLoaderData<LoaderData>();

  return (
    <div className="lesson-layout">
      <h1>{lesson.title}</h1>

      <Outlet />

      <ExerciseNavigation />
    </div>
  );
}
