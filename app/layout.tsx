import { ColorSchemeScript, MantineColorsTuple, MantineProvider, createTheme } from "@mantine/core";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import BaseShell from "./shell";
import "@mantine/core/styles.css"
import '@mantine/notifications/styles.css';
import "../styles/global.css"

const APP_NAME = "Cakra AI Summarizer";
const APP_DESCRIPTION = "AI Text Summarizer by Cakra";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - Cakra AI Summarizer",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const myColor: MantineColorsTuple = [
  '#edfcf2',
  '#dbf8e4',
  '#b0f0c4',
  '#83e9a3',
  '#5fe386',
  '#4bdf75',
  '#3fde6a',
  '#32c559',
  '#28af4f',
  '#169740'
];

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: "myColor",
  primaryShade: {
    light: 9,
    dark: 6,
  }
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <Notifications position="bottom-center" limit={5} zIndex={1000} />
          <BaseShell>
            {children}
          </BaseShell>
        </MantineProvider>
      </body>
    </html>
  );
}
