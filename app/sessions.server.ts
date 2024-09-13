import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET || 'default_secret';

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
    },
});

export const { getSession, commitSession } = sessionStorage;



//
// import {
//     createCookie,
//     createFileSessionStorage,
// } from "@remix-run/node";
//
// const sessionSecret = process.env.SESSION_SECRET || 'default_secret';
//
// const sessionCookie = createCookie("__session", {
//     secrets: [sessionSecret],
//     sameSite: true,
// });
//
// const { getSession, commitSession, destroySession } =
//     createFileSessionStorage({
//         dir: "./sessions",
//         cookie: sessionCookie,
//     });
//
// export { getSession, commitSession, destroySession };
