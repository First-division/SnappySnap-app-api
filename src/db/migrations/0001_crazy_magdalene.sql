CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"text" text NOT NULL,
	"is_completed" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
