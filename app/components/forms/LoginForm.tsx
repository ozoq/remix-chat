import { useIsSubmitting, ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { useState } from "react";
import Submit from "../Submit";
import Input from "../Input";

export const loginFormValidator = withZod(
  z.object({
    name: z.string().min(3, "Name is too short"),
  })
);

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const isSubmitting = useIsSubmitting("index-form");

  return (
    <ValidatedForm method="post" action="/login" validator={loginFormValidator}>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Enter your name to begin
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-center">
            <Input
              name="name"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
              setError={setError}
            />
            <Submit className="btn">
              {isSubmitting ? "Starting..." : "Start"}
            </Submit>
          </div>
          {error && (
            <p className="font-bold text-center text-red-300">{error}</p>
          )}
        </div>
      </div>
    </ValidatedForm>
  );
}
