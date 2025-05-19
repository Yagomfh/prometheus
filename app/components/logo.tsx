import { Circle } from "@chakra-ui/react";
import { FaFire } from "react-icons/fa";

export function Logo() {
  return (
    <Circle
      size="40px"
      bg={{
        base: "black",
        _dark: "white",
      }}
      color={{
        base: "white",
        _dark: "black",
      }}
    >
      <FaFire />
    </Circle>
  );
}
