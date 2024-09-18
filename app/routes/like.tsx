// app/routes/like.tsx

import { ActionFunction, json } from "@remix-run/node";
import { getSession } from "~/sessions.server";

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== "PUT") {
        return json({ error: "Method Not Allowed" }, { status: 405 });
    }

    const session = await getSession(request.headers.get("Cookie"));
    const accessToken = session.get("vimeoAccessToken");

    if (!accessToken) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await request.json();
    const videoId = formData.videoId;

    if (!videoId) {
        return json({ error: "Missing video ID" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.vimeo.com/videos/${videoId}/likes`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `videoId=${videoId}`,
        });

        if (response.ok) {
            return json({ success: true });
        } else {
            const errorText = await response.text();
            return json({ error: "Failed to like video", details: errorText }, { status: response.status });
        }
    } catch (error) {
        return json({ error: "Internal server error" }, { status: 500 });
    }
};

export const loader = () => {
    return json({ message: "This route only accepts PUT requests" }, { status: 405 });
};
