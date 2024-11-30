CREATE TABLE IF NOT EXISTS "product_images" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "images" json DEFAULT 'null'::json;