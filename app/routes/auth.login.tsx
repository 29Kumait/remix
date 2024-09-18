import { LoaderFunction, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const state = "currant session eg. abcdefg";
  const scopes = ['public', 'private', 'edit', 'interact', 'purchased', 'create', 'edit', 'delete', 'upload', 'promo_codes', 'stats', 'video_files'];
  const redirectUri = `${new URL(request.url).origin}/auth/callback`;

  session.set("oauthState", state);

  const vimeoAuthUrl = vimeoClient.buildAuthorizationEndpoint(redirectUri, scopes, state)

  return redirect(vimeoAuthUrl, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};


import { Vimeo } from 'vimeo';

const vimeoClient = new Vimeo(
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!
);

export { vimeoClient };
