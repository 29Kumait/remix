import { useLoaderData, Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import ErrorBoundary from "~/routes/ErrorBoundary";
import { FrameBackground } from "~/components/Style";

interface LoaderData {
  lessonId: string;
  exerciseId: string;
  exercise: {
    title: string;
    url: string;
  };
  liked: boolean;
  vimeoMetadata: {
    duration: number;
    views: number;
    likes: number;
    description: string | null;
  };
}

export const loader: LoaderFunction = async ({ params }) => {
  const exerciseId = params.exerciseId;

  const exercise = {
    title: "Sample Video",
    url: "https://www.example.com/video",
  };

  const liked = false;

  return json<LoaderData>({
    lessonId: "lesson1",
    exerciseId: exerciseId ?? "",
    exercise,
    liked,
    vimeoMetadata: {
      duration: 0,
      views: 0,
      likes: 0,
      description: "This is a sample video",
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const videoId = formData.get("videoId");

  const success = true;

  if (success) {
    return redirect(`/exercise/${videoId}`);
  }

  return json({ error: "Something went wrong" }, { status: 400 });
};

export default function VideoExercise() {
  const { exerciseId, exercise, liked, vimeoMetadata } =
    useLoaderData<LoaderData>();

  return (
    <FrameBackground>
      <h2 className="text-2xl font-extralight">{exercise.title}</h2>
      <div className="max-w-5xl mx-auto p-8 rounded-xl shadow-lg justify-evenly bg-gray-900/60 m-3">
        <Form method="post">
          <input type="hidden" name="videoId" value={exerciseId} />
          <button
            className="bg-color4 font-mono rounded-tl-md right-0"
            type="submit"
          >
            {liked ? "Unlike" : "Like"}
          </button>
          <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg bg-gray-800">
            <iframe
              src={exercise.url}
              title={exercise.title}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p>Likes: {vimeoMetadata.likes}</p>
          <p>
            Views:{" "}
            {vimeoMetadata.views !== null && vimeoMetadata.views !== 0
              ? vimeoMetadata.views
              : "Not available"}
          </p>
          <p>Description: {vimeoMetadata.description}</p>
          <p>
            Duration (with hotspots): {Math.floor(vimeoMetadata.duration / 60)}{" "}
            minutes {vimeoMetadata.duration % 60} seconds
          </p>
        </Form>
      </div>
    </FrameBackground>
  );
}

export { ErrorBoundary };
