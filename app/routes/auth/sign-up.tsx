import { useState } from "react";
import {
  Button,
  Center,
  Field,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { z } from "zod";

import { Logo } from "~/components/logo";
import { toaster } from "~/components/ui/toaster";
import { signUp } from "~/lib/auth-client";
import { isInvalid, IsInvalidT } from "~/utils/forms";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1),
});

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    validators: {
      onChange: SignUpSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const res = await signUp.email({
        email: value.email,
        password: value.password,
        name: value.name,
        fetchOptions: {
          onSuccess: () => {
            router.invalidate();
          },
        },
      });
      if (!res.data) {
        toaster.error({
          title: res.error.message,
        });
      }
      setIsLoading(false);
    },
  });

  return (
    <Center h="100vh" w="100vw" bg="gray.100">
      <VStack bg="white" p={6} rounded="md" shadow="xl" minW="300px" gap={8}>
        <VStack gap={2}>
          <Logo />
          <Heading>Welcome on board</Heading>
          <Text>Create an account to continue</Text>
        </VStack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          style={{
            width: "100%",
          }}
        >
          <VStack gap={2}>
            <form.Field name="name">
              {(field) => (
                <Field.Root
                  invalid={isInvalid({
                    field: field.state.meta as IsInvalidT["field"],
                    form: {
                      submissionAttempts: form.state.submissionAttempts,
                    },
                  })}
                >
                  <Field.Label>
                    <Field.RequiredIndicator />
                    Name
                  </Field.Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <Field.ErrorText>
                    {field.state.meta.errors
                      .map((err) => err?.message)
                      .join(",")}
                  </Field.ErrorText>
                </Field.Root>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <Field.Root
                  invalid={isInvalid({
                    field: field.state.meta as IsInvalidT["field"],
                    form: {
                      submissionAttempts: form.state.submissionAttempts,
                    },
                  })}
                >
                  <Field.Label>
                    <Field.RequiredIndicator />
                    Email
                  </Field.Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <Field.ErrorText>
                    {field.state.meta.errors
                      .map((err) => err?.message)
                      .join(",")}
                  </Field.ErrorText>
                </Field.Root>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <Field.Root
                  invalid={isInvalid({
                    field: field.state.meta as IsInvalidT["field"],
                    form: {
                      submissionAttempts: form.state.submissionAttempts,
                    },
                  })}
                >
                  <Field.Label>
                    <Field.RequiredIndicator />
                    Password
                  </Field.Label>
                  <InputGroup
                    endElement={
                      <IconButton
                        aria-label={
                          hidePassword ? "Show password" : "Hide password"
                        }
                        onClick={() => setHidePassword(!hidePassword)}
                        size="xs"
                        variant="ghost"
                      >
                        {hidePassword ? <LuEyeClosed /> : <LuEye />}
                      </IconButton>
                    }
                  >
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                      type={hidePassword ? "password" : "text"}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {field.state.meta.errors
                      .map((err) => err?.message)
                      .join(",")}
                  </Field.ErrorText>
                </Field.Root>
              )}
            </form.Field>

            <Button w="100%" type="submit" loading={isLoading} mt={4}>
              Sign up
            </Button>
          </VStack>
        </form>
        <HStack>
          <Text>Already have an account?</Text>
          <Link to="/auth/sign-in" style={{ textDecoration: "underline" }}>
            <Text>Sign in</Text>
          </Link>
        </HStack>
      </VStack>
    </Center>
  );
}
