"use client"

import { Button, Center, CopyButton, Flex, Grid, GridCol, Group, Stack, Text, Textarea, Title, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFormState, useFormStatus } from "react-dom";
import { CiTrash } from "react-icons/ci";
import { FcCheckmark } from "react-icons/fc";
import { MdContentCopy, MdError } from "react-icons/md";
import handleSummarize from "../../actions/summarize-handler";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { exampleText } from "../../assets/data/exampleData";

const initialState = {
    message: "",
    inputText: "",
    data: null,
    isError: false,
}

function SummarizeButton() {
    let { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            variant="outline"
            size="md"
            disabled={pending}
            loading={pending}
        >
            Summarize
        </Button>
    )
}

export default function SummarizePage() {
    const formController = useForm({
        mode: "uncontrolled",
        initialValues: {
            inputText: "",
        },
        validate: {
            inputText: (value) => {
                if (!value) return "Input text is required";
                if (value.trim().length < 50) return "Input text must be at least 50 characters long";
                if (value.trim().length > 3000) return "Input text must be less than 3000 characters long";
                return null;
            },
        },
    })
    const [formState, formAction] = useFormState(handleSummarize, initialState);
    const [inputCharacterCounts, setInputCharacterCounts] = useState(0);
    let summary = formState.data?.processed_data.join("\n") ?? "";

    formController.watch('inputText', ({value}) => {
        setInputCharacterCounts(value.trim().length)
    })

    useEffect(() => {
        if (formState.isError) notifications.show({
            title: "Error",
            message: formState.message,
            radius: "md",
            styles: {
                icon: {
                    backgroundColor: "var(--mantine-color-red-5)",
                    color: "white",
                },
                root: {
                    backgroundColor: "var(--mantine-color-red-5)",
                },
                closeButton: {
                    color: "white",
                },
                title: {
                    fontWeight: "bold",
                    color: "white",
                },
                description: {
                    color: "white",
                },
            },
            icon: <MdError size={64} />,
            autoClose: 5000,
            withCloseButton: true
        })
    }, [formState])
    return (
        <Grid gutter={{ base: "md", sm: "lg", md: "xl" }}>
            <GridCol span="auto" mb="xl">
                <form action={(formData) => {
                    const validation = formController.validate()
                    if (validation.hasErrors) return
                    return formAction(formData)
                }}>
                    <Stack >
                        <Center>
                            <Title order={3} mb="md">Input Text</Title>
                        </Center>
                        <Group ml="auto">
                            <Button variant="outline" size="md" aria-label="Example text button" onClick={() => formController.setFieldValue('inputText', exampleText[Math.floor(Math.random() * exampleText.length)].text)}>
                                Example Text
                            </Button>
                            <Button size="md" variant="outline" aria-label="Clear input button" onClick={() => {
                                formController.reset();
                                setInputCharacterCounts(0);
                            }}>
                                <CiTrash size={24} />
                            </Button>
                        </Group>
                        <Center aria-label="Input text">
                            <Textarea name="payload" key={formController.key('inputText')} radius="md" rows={10} w="100%" placeholder="Enter your text here"
                                {...formController.getInputProps('inputText')}
                                styles={{
                                    input: {
                                        borderColor: "var(--mantine-color-gray-6)",
                                    }
                                }} />
                        </Center>
                        <Flex justify="end">
                            <Text span ms="md" me="auto">
                                <Text span fw="bold">{inputCharacterCounts}</Text>&nbsp;&nbsp;Characters
                            </Text>
                            <SummarizeButton />
                        </Flex>
                    </Stack>
                </form>
            </GridCol>
            <GridCol span="auto">
                <Stack>
                    <Center>
                        <Title order={3} mb="md">Results</Title>
                    </Center>
                    <Group ml="auto">
                        <CopyButton value={summary} timeout={500}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                    <Button variant="outline" size="md" onClick={copy}>
                                        {copied ? (
                                            <FcCheckmark size={24} />
                                        ) : (
                                            <MdContentCopy size={24} />
                                        )}
                                    </Button>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>
                    <Center>
                        <Textarea radius="md" value={summary} variant="filled" rows={10} w="100%" placeholder="Summary will appear here" readOnly styles={{
                            input: {
                                borderColor: "var(--mantine-color-gray-6)",
                            }
                        }} />
                    </Center>
                    <Text span ms="md">
                        <Text span fw="bold">{summary.length ?? 0}</Text>&nbsp;&nbsp;Characters
                    </Text>
                </Stack>
            </GridCol>
        </Grid>
    );
}