import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { connectToDatabase } from "~/db/mongoDB.server";
import { prefs } from "~/prefs-cookie";
import ExerciseNavigation from "~/routes/lesson.$lessonId.exercise.arrows";
import { Lesson } from "~/types";
import { Outlet, useLoaderData } from "@remix-run/react";

// Loader to fetch the current lesson and exercise ID from cookies
export async function loader({ request, params }: LoaderFunctionArgs) {
  const { lessonId } = params;

  // Fetch lesson data from MongoDB
  const { db } = await connectToDatabase();
  const lesson = await db
    .collection("lesson")
    .findOne({ "lessons.id": lessonId });

  if (!lesson || !lesson.lessons) {
    throw new Response("Lesson not found", { status: 404 });
  }

  const lessonData = lesson.lessons.find(
    (lesson: Lesson) => lesson.id === lessonId
  );

  // Read the current exercise ID from the cookie
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const currentExerciseId =
    cookie.currentExerciseId || lessonData.exercises[0]?.id;

  return json({
    lesson: lessonData,
    currentExerciseId,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const currentExerciseId = formData.get("currentExerciseId");
  cookie.currentExerciseId = currentExerciseId;

  return json(currentExerciseId, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

interface LoaderData {
  lesson: Lesson;
}

// The main component that renders the lesson page
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
