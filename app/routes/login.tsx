import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { findOrCreateUser } from "~/models/user";
import { getAuthSession } from "~/lib/session/auth.server";
import LoginForm, { loginFormValidator } from "~/components/forms/LoginForm";

export async function action({ request }: ActionArgs) {
  const { setName, commit } = await getAuthSession(request);
  const fieldValues = await loginFormValidator.validate(
    await request.formData()
  );
  if (fieldValues.error) {
    return validationError(fieldValues.error);
  }
  const { name } = fieldValues.data;
  await findOrCreateUser(name);
  setName(name);
  return redirect("/", {
    headers: { "Set-Cookie": await commit() },
  });
}

export default function LoginPage() {
  return (
    <div className="grid h-screen place-items-center">
      <LoginForm />
    </div>
  );
}
