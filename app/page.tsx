"use client"
import { Blockquote, Button, Center, Container, Mark, Text, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";
import { FcAbout } from "react-icons/fc";
import Link from "next/link";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setText(loremIpsum.generateParagraphs(2));
    }, 3000);
    return () => clearInterval(interval);
  });

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
