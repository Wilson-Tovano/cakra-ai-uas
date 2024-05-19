"use client"

import { ActionIcon, AppShell, Center, Group, Switch, Title, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import logo from "../assets/image/logo-full-white.png"

export default function BaseShell({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme();
  const lightIcon = <CiLight color='black' size={18} />;
  const darkIcon = <CiDark color='yellow' size={18} />;
  const imgSrc = logo;
  useEffect(() => {
    setDarkMode(computedColorScheme === 'dark')
  }, [computedColorScheme])
  return (
    <AppShell
      header={{ height: 60 }}
      padding="xl"
    >
      <AppShell.Header>
        <Group h='100%'>
          <Group ms="xl" visibleFrom="xs">
            <Image src={imgSrc} alt="Cakra Logo" sizes="100vw"
              style={{
                height: "32px",
                width: 'auto',
              }}
            />
            <Title order={2} size={24}>
              CAKRA
            </Title>
          </Group>
          <Title ms="auto"  visibleFrom="sm" size={24}>AI Summarizer</Title>
          <Center me="xl" ms="auto">
            <Switch size="lg" color="dark.4"
              checked={darkMode}
              onLabel={darkIcon}
              offLabel={lightIcon}
              onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')}
              aria-label="Toggle dark mode"
            />
          </Center>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}