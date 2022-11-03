import { useIsSubmitting, ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import Submit from "../Submit";
import StyledInput from "../StyledInput";
import UsersAutocomplete from "../Inbox/Autocomplete";
import type { User } from "@prisma/client";

export const newMessageFormValidator = withZod(
  z.object({
    recipient: z.string().min(1, "Recipient name is too short"),
    topic: z.string().min(1, "Topic is too short"),
    body: z.string().min(1, "Body is too short"),
  })
);

export interface NewMessageFormProps {
  users: User[];
}

export default function NewMessageForm({ users }: NewMessageFormProps) {
  const isSubmitting = useIsSubmitting("new-message-form");

  return (
    <ValidatedForm
      id="new-message-form"
      className="flex-1"
      method="post"
      action="/?index"
      validator={newMessageFormValidator}
    >
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-5">
          <div className="card-title">
            <h1 className=" text-2xl font-bold">New message</h1>
          </div>
          <UsersAutocomplete
            label="Recipient"
            inputName="recipient"
            users={users}
          />
          <StyledInput name="topic" label="Topic" />
          <StyledInput name="body" label="Body" />
          <div className="card-actions">
            <Submit className="btn w-full">
              {isSubmitting ? "Sending..." : "Send"}
            </Submit>
          </div>
        </div>
      </div>
    </ValidatedForm>
  );
}
