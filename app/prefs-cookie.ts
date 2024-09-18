import { createCookie } from "@remix-run/node";

export const prefs = createCookie("prefs", {
  maxAge: 60 * 60 * 24 * 30,
});
