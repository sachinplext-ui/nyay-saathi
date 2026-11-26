import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "https://sachinplext-ui.github.io";

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === allowedOrigin) return callback(null, true);
    return callback(new Error("Origin not allowed"));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json({ limit: "5kb" }));

const askLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." }
});

app.get("/health", (_req, res) => res.json({ ok: true, service: "NYAY SAATHI API" }));

app.post("/api/ask", askLimiter, async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  const language = req.body?.language === "en" ? "en" : "hi";

  if (!question) return res.status(400).json({ error: "Please enter a question." });
  if (question.length > 2000) return res.status(400).json({ error: "Question is too long." });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "AI service is not configured." });

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      store: false,
      instructions: [
        "You are NYAY SAATHI, an educational legal-information assistant for India.",
        "Provide general, cautious, plain-language legal information only; never claim to be a lawyer or give a definitive case-specific legal opinion.",
        "Do not predict outcomes, tell users how to evade law enforcement, fabricate evidence, intimidate anyone, or obstruct legal processes.",
        "Do not request or repeat sensitive personal data. Tell users not to share names, addresses, phone numbers, FIR numbers, identity numbers, passwords, or private documents.",
        "If the question concerns an urgent threat or immediate danger, advise contacting local emergency services and a trusted adult.",
        "Distinguish general information from uncertainty; laws and procedures can change. Encourage checking India Code and official government sources, and consulting a qualified advocate or legal-aid service.",
        "Do not invent statute numbers, deadlines, court decisions, citations, or official procedures. If unsure, say so.",
        "Answer in Hindi when language is hi, otherwise English. Keep the answer concise and structured."
      ].join(" "),
      input: question,
      max_output_tokens: 700
    });

    const answer = response.output_text?.trim();
    if (!answer) return res.status(502).json({ error: "No answer was returned. Please try again." });
    return res.json({ answer });
  } catch {
    return res.status(502).json({ error: "The AI service is temporarily unavailable." });
  }
});

app.use((err, _req, res, _next) => {
  if (err?.message === "Origin not allowed") return res.status(403).json({ error: "Origin not allowed." });
  return res.status(400).json({ error: "Invalid request." });
});

app.listen(port, () => {
  console.log(`NYAY SAATHI API listening on port ${port}`);
});