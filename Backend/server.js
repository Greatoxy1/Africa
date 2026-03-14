import express from "express";
import fs from "fs";
import cors from "cors";
import nodemailer from "nodemailer";
import cron from "node-cron";
import webpush from "web-push";
import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE_PATH = "./subscribers.json";

if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}


let cachedNews = [];
let lastFetch = 0;

// List of free News APIs
const newsAPIs = [
  {
    name: "NewsAPI",
    url: `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${process.env.VITE_NEWSAPI_KEY}`,
  },
  {
    name: "GNews",
    url: `https://gnews.io/api/v4/top-headlines?lang=en&max=10&token=${process.env.GNEWS_KEY}`,
  },
  {
    name: "Newsdata.io",
    url: `https://newsdata.io/api/1/news?language=en&category=top&apikey=${process.env.VITE_NEWSDATA_KEY}`,
  },
];
fetch("http://localhost:5000/news")
  .then(res => res.json())
  .then(data => {
   
    const titles = data.map(a => a.title).join(" 🔴 ");
  });
async function fetchNews() {
  const now = Date.now();

  // 10 minute cache
  if (cachedNews.length && now - lastFetch < 600000) {
    console.log("⚡ Serving cached news");
    return cachedNews;
  }

  for (const api of newsAPIs) {
    try {
      console.log(`Trying ${api.name}...`);

      const res = await fetch(api.url);

      if (!res.ok) {
        console.log(`${api.name} failed with ${res.status}`);
        continue;
      }

      const data = await res.json();

      let articles = [];

      if (data.articles) articles = data.articles;
      if (data.results) articles = data.results;

      if (articles.length) {
        cachedNews = articles;
        lastFetch = now;

        console.log(`📰 News loaded from ${api.name}`);
        return cachedNews;
      }

    } catch (err) {
      console.log(`⚠️ ${api.name} error:`, err.message);
    }
  }

  console.log("⚠️ All APIs failed, returning cached news");
  return cachedNews;
}
fetchNews().then(data => {
  const titles = data.map(n => n.title).join(" 🔴 ");
  console.log("Headlines:", titles);
});
/* ---------------- EMAIL SYSTEM ---------------- */
app.get("/news", async (req, res) => {
  const news = await fetchNews();
  res.json(news);
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------------- PUSH NOTIFICATIONS ---------------- */

webpush.setVapidDetails(
  "mailto:greatoxy1@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let pushSubscribers = [];

app.post("/subscribe-push", (req, res) => {
  const subscription = req.body;

  pushSubscribers.push(subscription);

  res.status(201).json({ message: "Push subscribed" });
});

/* ---------------- EMAIL SUBSCRIBE ---------------- */

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email required");
  }

  const subscribers = JSON.parse(fs.readFileSync(FILE_PATH));

  if (subscribers.includes(email)) {
    return res.status(400).send("Already subscribed");
  }

  subscribers.push(email);

  fs.writeFileSync(FILE_PATH, JSON.stringify(subscribers, null, 2));

  try {
    await transporter.sendMail({
      from: `"Newsletter" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Subscriber",
      text: `New subscriber: ${email}`,
    });
  } catch (err) {
    console.log("Admin email failed");
  }

  res.send("Subscribed successfully");
});

/* ---------------- DAILY NEWSLETTER ---------------- */

async function sendDailyNews() {
  const subscribers = JSON.parse(fs.readFileSync(FILE_PATH));

  if (subscribers.length === 0) return;

  const news = await fetchNews();

  const newsText = news
    .slice(0, 5)
    .map((a, i) => `${i + 1}. ${a.title}`)
    .join("\n");

  const emailText = `📰 Daily News\n\n${newsText}`;

  for (const email of subscribers) {
    try {
      await transporter.sendMail({
        from: `"Daily News" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "📰 Daily News Update",
        text: emailText,
      });

      console.log("Email sent:", email);
    } catch (err) {
      console.log("Email error:", email);
    }
  }

  /* PUSH NOTIFICATION */

  const payload = JSON.stringify({
    title: "📰 Breaking News",
    body: news[0]?.title || "Latest news available",
  });

  pushSubscribers.forEach((sub) => {
    webpush.sendNotification(sub, payload).catch(console.error);
  });
}

/* ---------------- CRON JOB ---------------- */

cron.schedule("0 6 * * *", () => {
  console.log("📩 Sending daily news...");
  sendDailyNews();
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  console.log("NewsAPI:", process.env.NEWS_API_KEY ? "✅" : "❌");
  console.log("Email:", process.env.EMAIL_USER ? "✅" : "❌");
  console.log("VAPID:", process.env.VAPID_PUBLIC_KEY ? "✅" : "❌");
});