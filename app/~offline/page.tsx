import { Text, Title } from "@mantine/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
};

export default function Page() {
  return (
    <>
      <Title>Offline</Title>
      <Text>Play with us for now</Text>
    </>
  );
}
