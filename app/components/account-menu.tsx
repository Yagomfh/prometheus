import {
  Avatar,
  Box,
  HStack,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useRouter } from "@tanstack/react-router";
import { LuSettings } from "react-icons/lu";
import { PiSignOut } from "react-icons/pi";

import { signOut, useSession } from "~/lib/auth-client";

export default function AccountMenu() {
  const { data } = useSession();
  const router = useRouter();

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <HStack gap="4" cursor="pointer">
          <Avatar.Root>
            <Avatar.Fallback name={data?.user?.name} />
            <Avatar.Image src={data?.user?.image ?? undefined} />
          </Avatar.Root>
        </HStack>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>
                <Stack gap="0">
                  <Text fontWeight="medium">{data?.user?.name}</Text>
                  <Text color="fg.muted" textStyle="sm" fontWeight={"light"}>
                    {data?.user?.email}
                  </Text>
                </Stack>
              </Menu.ItemGroupLabel>
              <Menu.Item value="settings" asChild>
                <Link to="/settings">
                  <LuSettings />
                  <Box flex="1">Settings</Box>
                </Link>
              </Menu.Item>
              <Menu.Item
                value="sign-out"
                onClick={() =>
                  signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.invalidate();
                      },
                    },
                  })
                }
              >
                <PiSignOut />
                <Box flex="1">Sign Out</Box>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
