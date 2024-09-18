// import { LoaderFunction, redirect } from "@remix-run/node";
// import { getSession, commitSession } from "~/sessions.server";
//
// export const loader: LoaderFunction = async ({ request }) => {
//     const url = new URL(request.url);
//     const code = url.searchParams.get("code");
//     const receivedState = url.searchParams.get("state");
//
//     if (!code || !receivedState) {
//         throw new Error("Missing code or state");
//     }
//
//     const session = await getSession(request.headers.get("Cookie"));
//     const storedState = session.get("oauthState");
//
//     if (!storedState || receivedState !== storedState) {
//         throw new Error("Invalid or missing state parameter");
//     }
//
//     const redirectUri = `${url.origin}/auth/callback`;
//
//     try {
//         const accessToken = await new Promise((resolve, reject) => {
//             vimeoClient.accessToken(code, redirectUri, (err, token) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(token.access_token);
//                 }
//             });
//         });
//
//         session.set("vimeoAccessToken", accessToken);
//         session.unset("oauthState");
//
//         return redirect("/", {
//             headers: {
//                 "Set-Cookie": await commitSession(session),
//             },
//         });
//     } catch (err) {
//         throw new Error(`Failed to obtain access token: ${err}`);
//     }
// };
//
//
// import { Vimeo } from 'vimeo';
//
// const vimeoClient = new Vimeo(
//     process.env.CLIENT_ID!,
//     process.env.CLIENT_SECRET!
// );
//
// export { vimeoClient };