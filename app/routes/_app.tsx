// This _app component functions as a layout component that wraps all authenticated routes in the app. It is a good place to put things like a header, footer, or sidebar that you want to appear on every page of your app.
import { Box, HStack, VStack } from "@chakra-ui/react";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import AccountMenu from "~/components/account-menu";
import { Logo } from "~/components/logo";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context: { session } }) => {
    if (!session?.user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
  component: LayoutComponent,
});

function Header() {
  return (
    <header>
      <HStack justify="space-between" p={4} shadow="md">
        <Link to="/">
          <Logo />
        </Link>
        <nav>
          <AccountMenu />
        </nav>
      </HStack>
    </header>
  );
}

// This layout component is a simple layout that includes a header and a main content area. The main content area is where the child routes will be rendered.
function LayoutComponent() {
  return (
    <VStack h={"100vh"} alignItems={"stretch"}>
      <Header />
      <Box gap={2} flex={1} p={4}>
        <Outlet />
      </Box>
    </VStack>
  );
}
