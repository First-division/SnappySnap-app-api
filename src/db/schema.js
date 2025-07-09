import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

export const entriesTable = pgTable("entries", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),              // Link to Clerk user ID
  photoUrl: text("photo_url").notNull(),          // Where the photo is stored (S3, etc)
  caption: text("caption"),                       // User's story or notes
  locationName: varchar("location_name", { length: 255 }),  // e.g. "Yosemite"
  latitude: text("latitude"),                     // Optional: store coords
  longitude: text("longitude"),
  tags: text("tags"),                             // Optional: comma-separated or array later
  createdAt: timestamp("created_at").defaultNow(),// Timestamp for timeline view
});

export const todosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  text: text("text").notNull(),
  isCompleted: integer("is_completed").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

