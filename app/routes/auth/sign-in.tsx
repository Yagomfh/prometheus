import { useState } from "react";
import {
  Button,
  Center,
  Checkbox,
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
import { signIn } from "~/lib/auth-client";
import { isInvalid, IsInvalidT } from "~/utils/forms";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

export const Route = createFileRoute("/auth/sign-in")({
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
      rememberMe: false,
    },
    validators: {
      onChange: SignInSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const res = await signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: value.rememberMe,
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
          <Heading>Welcome back</Heading>
          <Text>Sign in to your account to continue</Text>
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
          <VStack gap={3} width="100%" align="flex-start">
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

            <form.Field name="rememberMe">
              {(field) => (
                <Checkbox.Root>
                  <Checkbox.HiddenInput
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
              )}
            </form.Field>

            <Button w="100%" type="submit" loading={isLoading} mt={4}>
              Sign in
            </Button>
          </VStack>
        </form>
        <HStack>
          <Text>Don&apos;t have an account?</Text>
          <Link to="/auth/sign-up" style={{ textDecoration: "underline" }}>
            <Text>Sign up</Text>
          </Link>
        </HStack>
      </VStack>
    </Center>
  );
}
