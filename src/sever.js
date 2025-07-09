import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { entriesTable, todosTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";

const app = express();
const PORT = ENV.PORT || 5001;

if (ENV.NODE_ENV === "production") job.start();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

//
// 📸 Entries Routes
//

// Create new entry
app.post("/api/entries", async (req, res) => {
  try {
    const {
      userId,
      photoUrl,
      caption,
      locationName,
      latitude,
      longitude,
      tags,
    } = req.body;

    if (!userId || !photoUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newEntry = await db.insert(entriesTable).values({
      userId,
      photoUrl,
      caption,
      locationName,
      latitude,
      longitude,
      tags,
    }).returning();

    res.status(201).json(newEntry[0]);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get entries by userId
app.get("/api/entries/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const entries = await db
      .select()
      .from(entriesTable)
      .where(eq(entriesTable.userId, userId));

    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//
// ✅ Todos Routes
//

// Create new todo
app.post("/api/todos", async (req, res) => {
  try {
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTodo = await db.insert(todosTable).values({ userId, text }).returning();
    res.status(201).json(newTodo[0]);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get todos for a user
app.get("/api/todos/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const todos = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.userId, userId));

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Toggle todo completion
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    await db
      .update(todosTable)
      .set({ isCompleted })
      .where(eq(todosTable.id, parseInt(id)));

    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db
      .delete(todosTable)
      .where(eq(todosTable.id, parseInt(id)));

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//
// 🟢 Start server
//

app.listen(PORT, () => {
  console.log("🚀 Server running on PORT:", PORT);
});
