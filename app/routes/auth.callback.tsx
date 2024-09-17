import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    console.log("Full URL:", url.toString());

    const code = url.searchParams.get("code");
    const lessonId = url.searchParams.get("lessonId");
    const exerciseId = url.searchParams.get("exerciseId");


    if (!code || !lessonId || !exerciseId) {
        throw new Error("Missing code, lessonId, or exerciseId");
    }

    const isLocal = url.hostname === "localhost" && (url.port === "3000" || url.port === "5173");
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = isLocal
        ? `http://${url.hostname}:${url.port}/auth/callback`
        : 'https://remix-kumaits.vercel.app/auth/callback';

    const response = await fetch('https://api.vimeo.com/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
        }),
    });

    const data = await response.json();
    const accessToken = data.access_token;

    if (!accessToken) {
        throw new Error("Failed to get access token from Vimeo");
    }




    const session = await getSession(request.headers.get("Cookie"));
    session.set("vimeoAccessToken", accessToken);

    return redirect(`/lesson/${lessonId}/exercise/${exerciseId}`, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};






// console.log("Search Params:", {
//     code,
//     lessonId,
//     exerciseId
// });

// console.log("Callback lessonId:", lessonId, "exerciseId:", exerciseId, "code:", code);