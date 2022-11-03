import { createCookieSessionStorage } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required");
}

const authStorage = createCookieSessionStorage({
  cookie: {
    name: "auth",
    secure: true,
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getAuthSession(request: Request) {
  const session = await authStorage.getSession(request.headers.get("Cookie"));
  return {
    getName: () => {
      const name = session.get("name");
      return name ?? null;
    },
    setName: (name: string | null) => session.set("name", name),
    commit: () => authStorage.commitSession(session),
  };
}

export { getAuthSession };
