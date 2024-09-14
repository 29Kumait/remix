import {useLoaderData} from "@remix-run/react";
import {Exercise} from "~/types"

interface LoaderData {
    exercise: Exercise;
}

export default function VideoExercise() {
    const {exercise} = useLoaderData<LoaderData>();

    return (
        <div>
            <h2>{exercise.title}</h2>
            <iframe
                src={exercise.url}
                title={exercise.title}
                allow="autoplay; fullscreen"
                allowFullScreen
            />
        </div>
    );
}


