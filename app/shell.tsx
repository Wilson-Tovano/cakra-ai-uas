"use client"

import { ActionIcon, AppShell, Center, Group, Switch, Title, useMantineColorScheme } from '@mantine/core';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { MdInstallDesktop, MdInstallMobile } from "react-icons/md";
import logo from "../assets/image/logo-full-white.png"

export default function BaseShell({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const lightIcon = <CiLight color='black' size={18} />;
  const darkIcon = <CiDark color='yellow' size={18} />;
  const imgSrc = logo;
  const installPrompt = useRef<any>(null);
  useEffect(() => {
    setDarkMode(colorScheme === 'dark');
  }, [colorScheme])
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      installPrompt.current = e;
    })
  })
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
          {
          /* <ActionIcon ms="auto" visibleFrom="sm" size="xl" variant="outline" radius="md" >
            <MdInstallDesktop size={24} />
          </ActionIcon>
          */
          }
          <ActionIcon ms="md" hiddenFrom="sm" size="xl" variant="outline" radius="md" onClick={async () => {
            if(!installPrompt.current) return;
            const result = await installPrompt.current.prompt();
            console.log(result);
          }} >
            <MdInstallMobile size={24} />
          </ActionIcon>
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