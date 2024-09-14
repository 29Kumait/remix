import {Await , useLoaderData} from "@remix-run/react";
import {Suspense} from "react";

interface LoaderData {
    exercise: {
        title: string;
        url: string;
    };
    vimeoMetadata: {
        duration: number;
        views: number;
        likes: number;
        description: string  | null
    }
}


export default function VideoExercise() {
    const {exercise , vimeoMetadata} = useLoaderData<LoaderData> ();

    return (
        <div className="max-w-5xl mx-auto p-8 rounded-xl shadow-lg bg-gray-900/60">
            <h2>{ exercise.title }</h2>
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg bg-gray-800">
                <iframe
                    src={ exercise.url }
                    title={ exercise.title }
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading="lazy"
                />
            </div>

            {/* Suspense and Await to render deferred Vimeo metadata */ }
            <Suspense fallback={ <p>Loading video metadata...</p> }>
                <Await resolve={ vimeoMetadata } errorElement={ <p>Error loading metadata.</p> }>
                    { (data) => (
                        <div>
                            <p>Duration: { data.duration } minutes</p>
                            <p>Views: { data.views }</p>
                            <p>Likes: { data.likes }</p>
                            <p>Description: { data.description }</p>
                        </div>
                    ) }
                </Await>
            </Suspense>
        </div>
    );
}
