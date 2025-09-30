import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello-world" },
  async ({ event, step }) => {
    const summarize = createAgent({
      name: "summarize",
      system: "You are an expert at summarizer. You summarize in 2 words.",
      model: gemini({
        model: "gemini-2.5-pro",
        apiKey : process.env.GEMINI_API_KEY
      }),
    });

    const {output} = await summarize.run(
      `Summarize the following text ; ${event.data.value}`
    )
    console.log(output)
    return { success : "ok", output: output };
  }
);

