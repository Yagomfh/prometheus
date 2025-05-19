import { Center, Heading, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { useTRPC } from "~/trpc/react";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    return await context.queryClient.prefetchQuery(
      context.trpc.user.me.queryOptions(),
    );
  },
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.user.me.queryOptions());

  return (
    <Center h="100%" flexDir="column" gap={4}>
      <Heading>🔥 Welcome to Prometheus {data?.name} 🔥</Heading>
      <Text>Start coding your app here. At app/routes/_app/index.tsx</Text>
    </Center>
  );
}
