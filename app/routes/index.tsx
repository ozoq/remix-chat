import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { newMessageFormValidator } from "~/components/forms/NewMessageForm";
import Inbox from "~/components/Inbox";
import { getAuthSession } from "~/lib/session/auth.server";
import loadUserOrLogout from "~/loaders/loadUserOrLogout";
import { createMessage } from "~/models/message";

export async function loader({ request }: LoaderArgs) {
  return await loadUserOrLogout(request);
}

export async function action({ request }: ActionArgs) {
  const fieldValues = await newMessageFormValidator.validate(
    await request.formData()
  );
  if (fieldValues.error) {
    return validationError(fieldValues.error);
  }
  const { recipient, topic, body } = fieldValues.data;
  const { getName } = await getAuthSession(request);
  const sender = getName();
  await createMessage({
    senderName: sender,
    recipientName: recipient,
    topic,
    body,
  });
  return null;
}

export default function IndexPage() {
  const { user } = useLoaderData<typeof loader>();

  return <Inbox sent={user.sentMessages} recieved={user.receivedMessages} />;
}
