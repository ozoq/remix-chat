import { json, redirect } from "@remix-run/node";
import invariant from "invariant";
import { getAuthSession } from "~/lib/session/auth.server";
import { getUserWithMessages } from "~/models/user";

export default async function loadUserOrLogout(request: Request) {
  const { getName, setName, commit } = await getAuthSession(request);
  try {
    const name = getName();
    invariant(name, "No such name");
    const user = await getUserWithMessages(name);
    invariant(user, "No such user");
    return json({ user });
  } catch {
    setName(null);
    return redirect("/login", {
      headers: { "Set-Cookie": await commit() },
    });
  }
}
