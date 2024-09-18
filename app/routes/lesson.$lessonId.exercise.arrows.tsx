import { Exercise, Lesson } from "~/types";
import { Link, useLoaderData, useMatches } from "@remix-run/react";
import { ArrowsBackground } from "~/components/Style";

interface LoaderData {
  lesson: Lesson;
  exercise: Exercise;
  exerciseId: string;
}

export default function ExerciseNavigation() {
  const { lesson } = useLoaderData<LoaderData>();

  const matches = useMatches();
  const currentParams = matches[matches.length - 1]?.params;
  const currentExerciseId = currentParams?.exerciseId;

  const currentExerciseIndex = lesson.exercises.findIndex(
    (ex) => ex.id === currentExerciseId
  );

  const previousExercise =
    currentExerciseIndex > 0
      ? lesson.exercises[currentExerciseIndex - 1]
      : null;
  const nextExercise =
    currentExerciseIndex < lesson.exercises.length - 1
      ? lesson.exercises[currentExerciseIndex + 1]
      : null;

  return (
    <ArrowsBackground>
      {nextExercise && (
        <Link
          to={`/lesson/${lesson.id}/exercise/${nextExercise.id}`}
          prefetch="intent"
          preventScrollReset={true}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current text-white"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </Link>
      )}
      {previousExercise && (
        <Link
          to={`/lesson/${lesson.id}/exercise/${previousExercise.id}`}
          prefetch="intent"
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
    </ArrowsBackground>
  );
}
