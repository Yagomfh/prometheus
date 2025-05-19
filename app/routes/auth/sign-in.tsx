import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import { Logo } from "~/components/logo";
import { signIn } from "~/lib/auth-client";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <Center h="100vh" w="100vw" bg="gray.100">
      <VStack bg="white" p={4} rounded="lg" shadow="xl" minW="300px">
        <Logo />
        <Heading>Welcome back</Heading>
        <Text>Sign in to your account to continue</Text>
        <Button
          onClick={async () =>
            await signIn.anonymous({
              fetchOptions: {
                onSuccess: () => {
                  router.invalidate();
                },
              },
            })
          }
        >
          Sign in
        </Button>
      </VStack>
    </Center>
  );
}
