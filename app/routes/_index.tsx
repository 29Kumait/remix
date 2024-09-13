import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { connectToDatabase } from "~/db/mongoDB.server";
import type { Lesson } from "~/types";
import ErrorBoundary from "~/routes/ErrorBoundary";

export const loader: LoaderFunction = async () => {
    const { db } = await connectToDatabase();
    const lessonData = await db.collection("lesson").findOne({});
    const lessons = lessonData?.lessons || [];
    return json(lessons);
};

export default function Index() {
    const lessons = useLoaderData<Lesson[]>();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12">
            <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <ul className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-6 border-b border-gray-300 bg-gray-800 bg-opacity-60 shadow-2xl backdrop-blur-lg p-6 lg:rounded-2xl lg:border lg:shadow-3xl lg:dark:bg-gray-900/30 transition-transform duration-300 ease-in-out">
                    {lessons.map((lesson) => (
                        <li key={lesson.id} className="lg:scale-105 lg:hover:scale-110 transition-transform duration-300 ease-in-out">
                            <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                                <ul className="mt-2 space-y-2">
                                    {lesson.exercises.map((exercise) => (
                                        <li key={exercise.id}>
                                            <Link to={`/lesson/${lesson.id}/exercise/${exercise.id}`} className="text-blue-400 hover:underline">
                                                {exercise.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export { ErrorBoundary };
