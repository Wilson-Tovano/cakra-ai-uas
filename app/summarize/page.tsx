import { Metadata } from "next";
import SummarizePage from "./client-page";

export const metadata: Metadata = {
    title: "Summarize",
    description: "Summarize paragraphs with Cakra's AI",
}

export default function Page() {
    return <SummarizePage />
}