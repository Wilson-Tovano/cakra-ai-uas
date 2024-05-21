import { Metadata } from "next";
import SummarizePage from "./client-page";

export const metadata: Metadata = {
    title: "Summarize",
    description: "Summarize paragraphs with Cakra's AI",
}

export const maxDuration  = 30
export default function Page() {
    return <SummarizePage />
}