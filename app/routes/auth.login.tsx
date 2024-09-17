import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const lessonId = url.searchParams.get("lessonId");
    const exerciseId = url.searchParams.get("exerciseId");

    console.log("Received lessonId:", lessonId, "exerciseId:", exerciseId);

    if (!lessonId || !exerciseId) {
        throw new Error("Missing lessonId or exerciseId");
    }

    const isLocal = url.hostname === "localhost" && (url.port === "3000" || url.port === "5173");
    const clientId = process.env.CLIENT_ID;

    const redirectUri = isLocal
        ? `http://${url.hostname}:${url.port}/auth/callback?lessonId=${lessonId}&exerciseId=${exerciseId}`
        : `https://remix-kumaits.vercel.app/auth/callback?lessonId=${lessonId}&exerciseId=${exerciseId}`;

    const scope = 'public+interact+private';
    const vimeoAuthUrl = `https://api.vimeo.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    return redirect(vimeoAuthUrl);
};






// const lessonId = url.searchParams.get("lessonId") || "465ad295-51be-4743-b879-96fc3ab3d388";
// const exerciseId = url.searchParams.get("exerciseId") || "af63d9eb-1cbf-44fa-ab37-942fae2d8eaf";