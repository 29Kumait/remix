import {Await , Params , useLoaderData} from "@remix-run/react";
import {Suspense} from "react";
import fetch from "node-fetch";
import {defer ,} from "@remix-run/node";

interface LoaderData {
    exercise: {
        id: string;
        title: string;
        url: string;
    };
    metadata: Promise<{ duration: number; views: number }>;
}

export default function VideoExercise() {
    const { exercise, metadata } = useLoaderData<LoaderData>();
    return (
        <div className="max-w-5xl mx-auto p-8 rounded-xl shadow-lg bg-gray-900/60"><h2>{ exercise.title }</h2>
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

            <Suspense fallback={ <p>Loading video metadata...</p> }>
                <Await resolve={ metadata } errorElement={ <p>Error loading metadata.</p> }>
                    { (data) => (
                        <div>
                            <p>Duration: { (data as { duration: number; views: number }).duration } minutes</p>
                            <p>Views: { (data as { duration: number; views: number }).views }</p>
                        </div>
                    ) }
                </Await>
            </Suspense>
        </div>
    );
}

async function loadMetadata(videoId: string) {
    const vimeoApiUrl = `https://api.vimeo.com/videos/${ videoId }`;
    const accessToken = process.env.VIMEO_ACCESS_TOKEN;

    try {
        const response = await fetch (vimeoApiUrl , {
            headers: {
                Authorization: `Bearer ${ accessToken }` ,
            } ,
        });

        if (!response.ok) {
            return new Error(`Failed to fetch video metadata, status: ${response.status}`);
        }

        const videoData = await response.json() as { duration: number; stats: { plays: number } };

        return {
            duration: videoData.duration ,
            views: videoData.stats.plays ,
        };

    } catch (error) {
        throw new Response("Error fetching metadata", { status: 500 });
    }
}

export const loader = async ({ params }: { params: Params }) => {
    const { exerciseId } = params;

    if (!exerciseId) {
        throw new Response("Exercise ID is required", { status: 400 });
    }

    const metadataPromise = loadMetadata(exerciseId);

    return defer({
        exerciseId,
        metadata: metadataPromise,
    });
};



// const metadata = {
//     duration: videoData.duration,
//     views: videoData.stats.plays,
// };
//
// return metadata;