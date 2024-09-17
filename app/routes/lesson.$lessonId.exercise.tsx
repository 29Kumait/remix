import { Outlet, useLoaderData, Link, useMatches } from "@remix-run/react";
import { json } from "@remix-run/node";
import { connectToDatabase } from "~/db/mongoDB.server";
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

    const lessonData = lesson.lessons.find((lesson: Lesson) => lesson.id === lessonId);

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





// Component for navigating between exercises
function ExerciseNavigation() {
    const { lesson } = useLoaderData<typeof loader>();

    //  useMatches to get the current exercise id from the route params
    const matches = useMatches();
    const currentParams = matches[matches.length - 1]?.params;
    const currentExerciseId = currentParams?.exerciseId;

    const currentExerciseIndex = lesson.exercises.findIndex(
        (ex) => ex.id === currentExerciseId
    );

    const previousExercise =
        currentExerciseIndex > 0 ? lesson.exercises[currentExerciseIndex - 1] : null;
    const nextExercise =
        currentExerciseIndex < lesson.exercises.length - 1
            ? lesson.exercises[currentExerciseIndex + 1]
            : null;

    return (
        <div className="flex justify-between items-center my-4">
            {previousExercise && (
                <Link
                    preventScrollReset
                    unstable_viewTransition

                    to={`/lesson/${lesson.id}/exercise/${previousExercise.id}`} prefetch="intent"
                    className="text-white text-xl no-underline px-4 py-2 rounded-lg border border-transparent hover:bg-transparent hover:border-blue-300 focus:bg-transparent focus:border-blue-300 focus:ring-4 focus:ring-blue-300"


                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 fill-current text-white"
                    >
                        <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                    </svg>
                </Link>
            )}
            {nextExercise && (
                <Link
                    to={`/lesson/${lesson.id}/exercise/${nextExercise.id}`}
                    prefetch="intent" preventScrollReset
                    unstable_viewTransition

                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Next: {nextExercise.title}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 fill-current text-white"
                    >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                </Link>
            )}
        </div>
    );
}