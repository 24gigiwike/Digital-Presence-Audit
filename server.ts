import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// In-memory store for simulated leads and analytics
const leadsStore: any[] = [];
const analyticsEvents: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Freelancer/Agency Digital Presence Audit API" });
  });

  // Analytics event tracking endpoint
  app.post("/api/analytics", (req, res) => {
    const { event, properties, timestamp } = req.body;
    analyticsEvents.push({ event, properties, timestamp: timestamp || new Date().toISOString() });
    res.json({ success: true, count: analyticsEvents.length });
  });

  // Lead capture endpoint (simulating Resend & CRM sync)
  app.post("/api/leads", (req, res) => {
    const { name, email, profession, experienceLevel, mainPlatform, score, breakdown } = req.body;
    const newLead = {
      id: "LEAD_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      name,
      email,
      profession,
      experienceLevel,
      mainPlatform,
      score,
      breakdown,
      createdAt: new Date().toISOString()
    };
    leadsStore.push(newLead);
    console.log(`[Resend Email Simulation] Sent Executive Audit Report to ${email} (${name})`);
    res.json({ success: true, leadId: newLead.id });
  });

  // Gemini AI Executive Strategy Audit Analysis
  app.post("/api/analyze-audit", async (req, res) => {
    const { userInfo, score, categories, answers } = req.body;

    // Default fallback insights if Gemini API is missing or fails
    const fallbackInsight = {
      executiveSummary: `Based on your score of ${score}/100, your brand demonstrates solid foundational technical competence as a ${userInfo?.profession || "digital professional"}, but suffers from critical client conversion bottlenecks. High-ticket clients are evaluating your digital footprint for instant authority triggers, which are currently fragmented across your ${userInfo?.mainPlatform || "primary channel"}.`,
      topBottleneck: score < 60 ? "Unclear Value Proposition & Lack of Direct Booking Funnel" : "Passive Case Study Presentation & Low High-Ticket Social Proof",
      quickWins: [
        "Rewrite your hero section headline to state the concrete business outcome you deliver within 5 seconds.",
        "Embed 2 verified client video testimonials or ROI case breakdowns directly above your contact form.",
        "Implement a frictionless 1-click discovery call booking link with automated qualifying questions."
      ],
      strategyRoadmap: `To transition from competing on price to commanding premium authority retainers, Web Design King recommends rebuilding your conversion architecture into a dedicated client acquisition engine.`
    };

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({ insight: fallbackInsight, source: "rule-engine" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Web Design King, an elite digital strategy consultant and luxury agency founder.
Analyze this user's Digital Presence Audit results and deliver an executive assessment.

User Profile:
- Name: ${userInfo?.name || "Professional"}
- Profession: ${userInfo?.profession || "Digital Creator"}
- Experience Level: ${userInfo?.experienceLevel || "Intermediate"}
- Primary Channel: ${userInfo?.mainPlatform || "Website"}

Audit Scores:
- Overall Score: ${score}/100
- Brand Clarity: ${categories?.brandClarity || 0}/20
- Trust & Credibility: ${categories?.trustCredibility || 0}/20
- Visual Experience: ${categories?.visualExperience || 0}/20
- Conversion System: ${categories?.conversionSystem || 0}/20
- Growth Foundation: ${categories?.growthFoundation || 0}/20

Return ONLY a valid JSON object with exactly this structure (no markdown fences, no commentary):
{
  "executiveSummary": "2-3 sophisticated sentences giving direct, expert diagnosis of their digital presence.",
  "topBottleneck": "The #1 thing holding them back from premium client deals.",
  "quickWins": ["Actionable step 1", "Actionable step 2", "Actionable step 3"],
  "strategyRoadmap": "1-2 strategic sentences on how partnering with Web Design King will elevate their business."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      });

      const text = response.text || "";
      const parsed = JSON.parse(text);
      return res.json({ insight: parsed, source: "gemini-ai" });
    } catch (error) {
      console.error("[Gemini Audit Analysis Error]:", error);
      return res.json({ insight: fallbackInsight, source: "fallback" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Freelancer/Agency Digital Presence Audit running on http://localhost:${PORT}`);
  });
}

startServer();
