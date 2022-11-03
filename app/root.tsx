import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import tailwindStyles from "./lib/tailwind/build.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { GlobalContext } from "./hooks/useGlobalContext";
import { useEffect, useState } from "react";
import { getAuthSession } from "./lib/session/auth.server";
import LogoutForm from "./components/forms/LogoutForm";
import Main from "./components/layout/Main";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Chat",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: tailwindStyles }];
}

export async function loader({ request }: LoaderArgs) {
  const { getName } = await getAuthSession(request);
  return {
    name: getName(),
  };
}

export default function App() {
  const { name } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalContext.Provider value={{ name }}>
          <Main>
            {name && <LogoutForm />}
            <Outlet />
          </Main>
        </GlobalContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
