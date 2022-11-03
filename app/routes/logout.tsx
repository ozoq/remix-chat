import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getAuthSession } from "~/lib/session/auth.server";

export async function action({ request }: ActionArgs) {
  const { setName, commit } = await getAuthSession(request);
  setName(null);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commit(),
    },
  });
}

export function loader() {
  return redirect("/");
}
