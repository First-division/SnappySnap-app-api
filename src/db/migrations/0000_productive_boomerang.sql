CREATE TABLE "entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"photo_url" text NOT NULL,
	"caption" text,
	"location_name" varchar(255),
	"latitude" text,
	"longitude" text,
	"tags" text,
	"created_at" timestamp DEFAULT now()
);
