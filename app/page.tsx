"use client"
import { Blockquote, Button, Center, Container, Mark, Text, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";
import { FcAbout } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonClass from "../styles/Button.module.css";

const AUTO_CLICK_DELAY = 5000;
export default function Page() {
  const loremIpsum = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 8
    },
    wordsPerSentence: {
      max: 16,
      min: 16
    }
  });
  const [text, setText] = useState('Lorem');

  return (
    <>
      <Container size="responsive">
        <Center my="xxl">
          <Title>
            Cakra AI Summarizer
          </Title>
        </Center>
        <Center my="xl">
          <Title order={3}>Your <Mark>&nbsp;AI Text Summarizer&nbsp;</Mark> by Cakra</Title>
        </Center>
        <Center>
          <Blockquote color="blue" radius="lg" iconSize={32} cite="Cakra" icon={<FcAbout size={30} />} my="xl">
            <Text lineClamp={5}>
              {text}
            </Text>
          </Blockquote>
        </Center>
        <Center>
          <Button component={Link} href="/summarize" size="xl" variant="outline">
            Start Summarizing
          </Button>
        </Center>
      </Container>
    </>
  );
}
