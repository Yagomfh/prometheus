export type IsInvalidT = {
  field: {
    errors: { message: string }[];
    isTouched: boolean;
    isBlurred: boolean;
  };
  form: {
    submissionAttempts: number;
  };
};

export function isInvalid(meta: IsInvalidT) {
  return (
    (meta.field.errors.length > 0 &&
      meta.field.isTouched &&
      meta.field.isBlurred) ||
    (meta.form.submissionAttempts > 0 && meta.field.errors.length > 0)
  );
}
