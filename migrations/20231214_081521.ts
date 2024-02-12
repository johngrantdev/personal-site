import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_hero_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_hero_links_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_cta_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_content_columns_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_media_block_position" AS ENUM('default', 'fullscreen');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_archive_relation_to" AS ENUM('posts');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_code_language" AS ENUM('go', 'javascript', 'typescript');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_hero_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_cta_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_content_columns_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_media_block_position" AS ENUM('default', 'fullscreen');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_code_language" AS ENUM('go', 'javascript', 'typescript');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_hero_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_hero_links_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_cta_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_content_columns_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_content_columns_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_media_block_position" AS ENUM('default', 'fullscreen');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_archive_populate_by" AS ENUM('collection', 'selection');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_archive_relation_to" AS ENUM('posts');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_blocks_code_language" AS ENUM('go', 'javascript', 'typescript');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_posts_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_version_hero_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_version_hero_links_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_cta_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_content_columns_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_content_columns_link_appearance" AS ENUM('default', 'primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_media_block_position" AS ENUM('default', 'fullscreen');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_archive_relation_to" AS ENUM('posts');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_blocks_code_language" AS ENUM('go', 'javascript', 'typescript');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__posts_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_users_roles" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_redirects_to_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_site_nav_items_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "pages_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_pages_hero_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_pages_hero_links_link_appearance"
);

CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_pages_blocks_cta_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_pages_blocks_cta_links_link_appearance"
);

CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"rich_text" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"size" "enum_pages_blocks_content_columns_size",
	"rich_text" jsonb,
	"enable_link" boolean,
	"link_type" "enum_pages_blocks_content_columns_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_pages_blocks_content_columns_link_appearance"
);

CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"position" "enum_pages_blocks_media_block_position",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_archive" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"intro_content" jsonb,
	"populateBy" "enum_pages_blocks_archive_populate_by",
	"relationTo" "enum_pages_blocks_archive_relation_to",
	"limit" numeric,
	"show_page_range" boolean,
	"populated_docs_total" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_code" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"language" "enum_pages_blocks_code_language",
	"code" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"published_at" timestamp(3) with time zone,
	"hero_type" "enum_pages_hero_type",
	"hero_rich_text" jsonb,
	"slug" varchar,
	"meta_title" varchar,
	"meta_description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_pages_status"
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"media_id" integer,
	"categories_id" integer,
	"posts_id" integer
);

CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__pages_v_version_hero_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__pages_v_version_hero_links_link_appearance",
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__pages_v_blocks_cta_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance",
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"rich_text" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"size" "enum__pages_v_blocks_content_columns_size",
	"rich_text" jsonb,
	"enable_link" boolean,
	"link_type" "enum__pages_v_blocks_content_columns_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance",
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"position" "enum__pages_v_blocks_media_block_position",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"intro_content" jsonb,
	"populateBy" "enum__pages_v_blocks_archive_populate_by",
	"relationTo" "enum__pages_v_blocks_archive_relation_to",
	"limit" numeric,
	"show_page_range" boolean,
	"populated_docs_total" numeric,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_code" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"language" "enum__pages_v_blocks_code_language",
	"code" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_hero_type" "enum__pages_v_version_hero_type",
	"version_hero_rich_text" jsonb,
	"version_slug" varchar,
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__pages_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"media_id" integer,
	"categories_id" integer,
	"posts_id" integer
);

CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);

CREATE TABLE IF NOT EXISTS "posts_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_posts_hero_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_posts_hero_links_link_appearance"
);

CREATE TABLE IF NOT EXISTS "posts_blocks_cta_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_posts_blocks_cta_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_posts_blocks_cta_links_link_appearance"
);

CREATE TABLE IF NOT EXISTS "posts_blocks_cta" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"rich_text" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "posts_blocks_content_columns" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"size" "enum_posts_blocks_content_columns_size",
	"rich_text" jsonb,
	"enable_link" boolean,
	"link_type" "enum_posts_blocks_content_columns_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_posts_blocks_content_columns_link_appearance"
);

CREATE TABLE IF NOT EXISTS "posts_blocks_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "posts_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"position" "enum_posts_blocks_media_block_position",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "posts_blocks_archive" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"intro_content" jsonb,
	"populateBy" "enum_posts_blocks_archive_populate_by",
	"relationTo" "enum_posts_blocks_archive_relation_to",
	"limit" numeric,
	"show_page_range" boolean,
	"populated_docs_total" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "posts_blocks_code" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"language" "enum_posts_blocks_code_language",
	"code" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"published_at" timestamp(3) with time zone,
	"hero_type" "enum_posts_hero_type",
	"hero_rich_text" jsonb,
	"enable_restricted_content" boolean,
	"slug" varchar,
	"meta_title" varchar,
	"meta_description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_posts_status"
);

CREATE TABLE IF NOT EXISTS "posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"categories_id" integer,
	"keywords_id" integer,
	"users_id" integer,
	"pages_id" integer,
	"media_id" integer,
	"posts_id" integer
);

CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"name" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_version_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__posts_v_version_hero_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__posts_v_version_hero_links_link_appearance",
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__posts_v_blocks_cta_links_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__posts_v_blocks_cta_links_link_appearance",
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"rich_text" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_blocks_content_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"size" "enum__posts_v_blocks_content_columns_size",
	"rich_text" jsonb,
	"enable_link" boolean,
	"link_type" "enum__posts_v_blocks_content_columns_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__posts_v_blocks_content_columns_link_appearance",
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_blocks_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"invert_background" boolean,
	"position" "enum__posts_v_blocks_media_block_position",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_blocks_archive" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"intro_content" jsonb,
	"populateBy" "enum__posts_v_blocks_archive_populate_by",
	"relationTo" "enum__posts_v_blocks_archive_relation_to",
	"limit" numeric,
	"show_page_range" boolean,
	"populated_docs_total" numeric,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_blocks_code" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"language" "enum__posts_v_blocks_code_language",
	"code" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_hero_type" "enum__posts_v_version_hero_type",
	"version_hero_rich_text" jsonb,
	"version_enable_restricted_content" boolean,
	"version_slug" varchar,
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__posts_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"posts_id" integer,
	"categories_id" integer,
	"keywords_id" integer,
	"users_id" integer,
	"pages_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"caption" jsonb,
	"blurhash" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric
);

CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "keywords_breadcrumbs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"url" varchar,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "keywords_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"keywords_id" integer
);

CREATE TABLE IF NOT EXISTS "users_roles" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_users_roles",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "redirects" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" varchar NOT NULL,
	"to_type" "enum_redirects_to_type",
	"to_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "redirects_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"posts_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_nav_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_site_nav_items_type",
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "site" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_title" varchar,
	"site_description" varchar,
	"site_source_link" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "site_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"pages_id" integer
);

CREATE INDEX IF NOT EXISTS "_order_idx" ON "pages_hero_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "pages_hero_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "pages_blocks_cta_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "pages_blocks_cta_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "pages_blocks_cta" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "pages_blocks_cta" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "pages_blocks_cta" ("_path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "pages_blocks_content_columns" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "pages_blocks_content_columns" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "pages_blocks_content" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "pages_blocks_content" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "pages_blocks_content" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "pages_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "pages_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "pages_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "pages_blocks_archive" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "pages_blocks_archive" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "pages_blocks_archive" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "pages_blocks_code" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "pages_blocks_code" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "pages_blocks_code" ("_path");
CREATE INDEX IF NOT EXISTS "slug_idx" ON "pages" ("slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "pages_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "pages_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "pages_rels" ("path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_pages_v_version_hero_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_pages_v_version_hero_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_pages_v_blocks_cta_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_pages_v_blocks_cta_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_pages_v_blocks_cta" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_pages_v_blocks_cta" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_pages_v_blocks_cta" ("_path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_pages_v_blocks_content_columns" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_pages_v_blocks_content_columns" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_pages_v_blocks_content" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_pages_v_blocks_content" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_pages_v_blocks_content" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_pages_v_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_pages_v_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_pages_v_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_pages_v_blocks_archive" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_pages_v_blocks_archive" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_pages_v_blocks_archive" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_pages_v_blocks_code" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_pages_v_blocks_code" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_pages_v_blocks_code" ("_path");
CREATE INDEX IF NOT EXISTS "version_slug_idx" ON "_pages_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "_pages_v" ("created_at");
CREATE INDEX IF NOT EXISTS "updated_at_idx" ON "_pages_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "latest_idx" ON "_pages_v" ("latest");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_pages_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "_pages_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_pages_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "posts_populated_authors" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "posts_populated_authors" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "posts_hero_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "posts_hero_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "posts_blocks_cta_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "posts_blocks_cta_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "posts_blocks_cta" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "posts_blocks_cta" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "posts_blocks_cta" ("_path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "posts_blocks_content_columns" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "posts_blocks_content_columns" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "posts_blocks_content" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "posts_blocks_content" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "posts_blocks_content" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "posts_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "posts_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "posts_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "posts_blocks_archive" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "posts_blocks_archive" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "posts_blocks_archive" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "posts_blocks_code" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "posts_blocks_code" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "posts_blocks_code" ("_path");
CREATE INDEX IF NOT EXISTS "slug_idx" ON "posts" ("slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "posts" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "posts_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "posts_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "posts_rels" ("path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_posts_v_version_populated_authors" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_posts_v_version_populated_authors" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_posts_v_version_hero_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_posts_v_version_hero_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_posts_v_blocks_cta_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_posts_v_blocks_cta_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_posts_v_blocks_cta" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_posts_v_blocks_cta" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_posts_v_blocks_cta" ("_path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_posts_v_blocks_content_columns" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_posts_v_blocks_content_columns" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_posts_v_blocks_content" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_posts_v_blocks_content" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_posts_v_blocks_content" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_posts_v_blocks_media_block" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_posts_v_blocks_media_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_posts_v_blocks_media_block" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_posts_v_blocks_archive" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_posts_v_blocks_archive" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_posts_v_blocks_archive" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_posts_v_blocks_code" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "_posts_v_blocks_code" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_posts_v_blocks_code" ("_path");
CREATE INDEX IF NOT EXISTS "version_slug_idx" ON "_posts_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "_posts_v" ("created_at");
CREATE INDEX IF NOT EXISTS "updated_at_idx" ON "_posts_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "latest_idx" ON "_posts_v" ("latest");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_posts_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "_posts_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_posts_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "categories" ("created_at");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "keywords_breadcrumbs" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "keywords_breadcrumbs" ("_parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "keywords" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "keywords_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "keywords_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "keywords_rels" ("path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "users_roles" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_roles" ("parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "from_idx" ON "redirects" ("from");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "redirects" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "redirects_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "redirects_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "redirects_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "site_nav_items" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "site_nav_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "site_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "site_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "site_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links__parent_id_pages_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links__parent_id_pages_blocks_cta_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta__parent_id_pages_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns__parent_id_pages_blocks_content_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content__parent_id_pages_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block__parent_id_pages_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive__parent_id_pages_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_code" ADD CONSTRAINT "pages_blocks_code__parent_id_pages_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_id_posts_id_fk" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links__parent_id__pages_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links__parent_id__pages_v_blocks_cta_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta__parent_id__pages_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns__parent_id__pages_v_blocks_content_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content__parent_id__pages_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block__parent_id__pages_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive__parent_id__pages_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_code" ADD CONSTRAINT "_pages_v_blocks_code__parent_id__pages_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_id__pages_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_id_posts_id_fk" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors__parent_id_posts_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_hero_links" ADD CONSTRAINT "posts_hero_links__parent_id_posts_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_blocks_cta_links" ADD CONSTRAINT "posts_blocks_cta_links__parent_id_posts_blocks_cta_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta__parent_id_posts_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_blocks_content_columns" ADD CONSTRAINT "posts_blocks_content_columns__parent_id_posts_blocks_content_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_blocks_content" ADD CONSTRAINT "posts_blocks_content__parent_id_posts_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block__parent_id_posts_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_blocks_archive" ADD CONSTRAINT "posts_blocks_archive__parent_id_posts_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_blocks_code" ADD CONSTRAINT "posts_blocks_code__parent_id_posts_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_keywords_id_keywords_id_fk" FOREIGN KEY ("keywords_id") REFERENCES "keywords"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_id_posts_id_fk" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors__parent_id__posts_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_version_hero_links" ADD CONSTRAINT "_posts_v_version_hero_links__parent_id__posts_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_blocks_cta_links" ADD CONSTRAINT "_posts_v_blocks_cta_links__parent_id__posts_v_blocks_cta_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta__parent_id__posts_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_blocks_content_columns" ADD CONSTRAINT "_posts_v_blocks_content_columns__parent_id__posts_v_blocks_content_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_blocks_content" ADD CONSTRAINT "_posts_v_blocks_content__parent_id__posts_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block__parent_id__posts_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_blocks_archive" ADD CONSTRAINT "_posts_v_blocks_archive__parent_id__posts_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_blocks_code" ADD CONSTRAINT "_posts_v_blocks_code__parent_id__posts_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_id__posts_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_id_posts_id_fk" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_keywords_id_keywords_id_fk" FOREIGN KEY ("keywords_id") REFERENCES "keywords"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "keywords_breadcrumbs" ADD CONSTRAINT "keywords_breadcrumbs__parent_id_keywords_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "keywords"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "keywords_rels" ADD CONSTRAINT "keywords_rels_parent_id_keywords_id_fk" FOREIGN KEY ("parent_id") REFERENCES "keywords"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "keywords_rels" ADD CONSTRAINT "keywords_rels_keywords_id_keywords_id_fk" FOREIGN KEY ("keywords_id") REFERENCES "keywords"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_id_redirects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "redirects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_id_posts_id_fk" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_nav_items" ADD CONSTRAINT "site_nav_items__parent_id_site_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_parent_id_site_id_fk" FOREIGN KEY ("parent_id") REFERENCES "site"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "pages_hero_links";
DROP TABLE "pages_blocks_cta_links";
DROP TABLE "pages_blocks_cta";
DROP TABLE "pages_blocks_content_columns";
DROP TABLE "pages_blocks_content";
DROP TABLE "pages_blocks_media_block";
DROP TABLE "pages_blocks_archive";
DROP TABLE "pages_blocks_code";
DROP TABLE "pages";
DROP TABLE "pages_rels";
DROP TABLE "_pages_v_version_hero_links";
DROP TABLE "_pages_v_blocks_cta_links";
DROP TABLE "_pages_v_blocks_cta";
DROP TABLE "_pages_v_blocks_content_columns";
DROP TABLE "_pages_v_blocks_content";
DROP TABLE "_pages_v_blocks_media_block";
DROP TABLE "_pages_v_blocks_archive";
DROP TABLE "_pages_v_blocks_code";
DROP TABLE "_pages_v";
DROP TABLE "_pages_v_rels";
DROP TABLE "posts_populated_authors";
DROP TABLE "posts_hero_links";
DROP TABLE "posts_blocks_cta_links";
DROP TABLE "posts_blocks_cta";
DROP TABLE "posts_blocks_content_columns";
DROP TABLE "posts_blocks_content";
DROP TABLE "posts_blocks_media_block";
DROP TABLE "posts_blocks_archive";
DROP TABLE "posts_blocks_code";
DROP TABLE "posts";
DROP TABLE "posts_rels";
DROP TABLE "_posts_v_version_populated_authors";
DROP TABLE "_posts_v_version_hero_links";
DROP TABLE "_posts_v_blocks_cta_links";
DROP TABLE "_posts_v_blocks_cta";
DROP TABLE "_posts_v_blocks_content_columns";
DROP TABLE "_posts_v_blocks_content";
DROP TABLE "_posts_v_blocks_media_block";
DROP TABLE "_posts_v_blocks_archive";
DROP TABLE "_posts_v_blocks_code";
DROP TABLE "_posts_v";
DROP TABLE "_posts_v_rels";
DROP TABLE "media";
DROP TABLE "categories";
DROP TABLE "keywords_breadcrumbs";
DROP TABLE "keywords";
DROP TABLE "keywords_rels";
DROP TABLE "users_roles";
DROP TABLE "users";
DROP TABLE "redirects";
DROP TABLE "redirects_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "site_nav_items";
DROP TABLE "site";
DROP TABLE "site_rels";`);

};
