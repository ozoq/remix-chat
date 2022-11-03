import { useFormContext, useIsSubmitting } from "remix-validated-form";

export interface SubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Submit({ children, ...otherProps }: SubmitProps) {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <button type="submit" disabled={disabled} {...otherProps}>
      {children}
    </button>
  );
}
