import { inngest } from "./client";
import { createAgent, grok } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello-world" },
  async ({ event, step }) => {
    const summarize = createAgent({
      name: "summarize",
      system: "You are an expert at summarizer. You summarize in 2 lines.",
      model: grok({
        model: "grok-4-latest",
        apiKey : process.env.XAI_API_KEY
      }),
    });

    const output = await summarize.run(
      `Summarize the following text ; ${event.data.value}`
    )
    console.log(output)
    return { success : "ok" };
  }
);

