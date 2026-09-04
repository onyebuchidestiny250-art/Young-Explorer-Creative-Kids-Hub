const OPENAI_URL = "https://api.openai.com/v1/responses";
const MODEL = "gpt-5.6-luna";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_ITEMS = 12;

const SYSTEM_INSTRUCTIONS = `You are Explorer Buddy, the friendly AI learning assistant inside the Young Explorer & Creative Kids Hub website.

Your job is to help children and young students learn. Users may ask about science, mathematics, coding, technology, history, geography, language, school subjects, everyday questions, creativity, and general knowledge.

Answer directly and accurately. Explain difficult ideas in simple, age-appropriate language without talking down to the learner. Use short sections or bullet points when useful. Give examples when helpful. If a question is ambiguous, ask a short clarifying question instead of guessing.

Remember the recent conversation provided to you and understand follow-up questions such as "why?", "explain that more simply", or "give me an example".

Do not claim to have searched the internet or checked a source unless a tool actually provided that information. If you are uncertain about a fact, say so rather than inventing one.

Keep responses suitable for a school learning environment. Do not provide instructions that help a young person obtain or use dangerous, illegal, age-restricted, or harmful things. For sensitive topics, give safe, educational information and encourage asking a trusted adult or qualified professional when appropriate.

You are an AI assistant, so be honest that you are AI if the user asks. You are not a human teacher.`;

function sendJson(res, status, body) {
  res.status(status);
  res.setHeader("Content-Type", "application/json");
  return res.json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  console.log("Explorer Buddy /api/chat request received");
  console.log("OPENAI_API_KEY present:", Boolean(process.env.OPENAI_API_KEY));

  if (!process.env.OPENAI_API_KEY) {
    return sendJson(res, 500, {
      error: "Explorer Buddy AI is not connected yet. Add OPENAI_API_KEY to the Vercel project environment variables."
    });
  }

  const body = req.body || {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const history = Array.isArray(body.history) ? body.history : [];

  if (!message) {
    return sendJson(res, 400, { error: "Please enter a question." });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return sendJson(res, 400, {
      error: "That message is a little too long. Try shortening it."
    });
  }

  const safeHistory = history
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim()
    )
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => ({
      role: item.role,
      content: item.content.slice(0, MAX_MESSAGE_LENGTH)
    }));

  const input = [...safeHistory, { role: "user", content: message }];

  try {
    const openAIResponse = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        instructions: SYSTEM_INSTRUCTIONS,
        input,
        max_output_tokens: 700
      })
    });

    const data = await openAIResponse.json();

    if (!openAIResponse.ok) {
      console.error("OpenAI API error:", data);
      return sendJson(res, 502, {
        error: "Explorer Buddy could not reach its AI service right now. Please try again in a moment."
      });
    }

    const reply = typeof data.output_text === "string" ? data.output_text.trim() : "";

    if (!reply) {
      return sendJson(res, 502, {
        error: "Explorer Buddy received an empty answer. Please try again."
      });
    }

    return sendJson(res, 200, { reply });
  } catch (error) {
    console.error("Explorer Buddy request failed:", error);
    return sendJson(res, 500, {
      error: "Explorer Buddy could not connect right now. Please try again."
    });
  }
}
