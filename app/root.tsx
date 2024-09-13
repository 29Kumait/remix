import React from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Title</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className=" min-h-screen bg-gray-900 bg-opacity-50 backdrop-blur-lg border border-opacity-20 border-gray-300 text-white">
      {children}
      <ScrollRestoration/>
      <Scripts/>
      </body>
    </html>
  );
}

export default function App() {
    return (
        <Outlet/>
    );
}
