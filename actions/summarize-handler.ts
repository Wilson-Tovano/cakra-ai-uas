"use server"

export default async function handleSummarize(prevState: any, formData: FormData) {
    const payload = formData.get("payload")
    const lines = [];
    if(typeof payload !== "string") {
        return {message: "Input text is required", inputText: "", data: null, isError: true}
    }
    if(prevState.inputText.toLowerCase() === payload.toLowerCase()) {
        return {message: "Input text has not changed", inputText: payload, data: prevState.data, isError: false}
    }
    for(const line of payload.split("\n")) {
        if(!line.trim()) continue
        lines.push({
            text: line.trim()
        })
    }
    try {
        console.log(JSON.stringify({payload: lines}))
        const response = await fetch("https://b668-2001-448a-1071-9868-1de3-791c-1bc4-565d.ngrok-free.app/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payload: lines,
            }),
        })

        if(response.ok) {
            const data = await response.json()
            return {message: "Success", inputText: payload, data: data, isError: false}
        } else return {message: `Error status code ${response.status}`, inputText: payload, data: null, isError: true}
    } catch (e) {
        console.error(`${e}`);
        return {message: "Failed to summarize. Try again later", inputText: payload, data: null, isError: true}
    }
}