import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."t" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."app_all" AS ENUM('default', 'primary', 'secondary');
  CREATE TYPE "public"."enum_pages_lyout_side_pos" AS ENUM('scrollSideContent', 'fixedSideContentWhenVisible', 'fixedSideContentAlways');
  CREATE TYPE "public"."enum_pages_lyout_side_col_style" AS ENUM('none', 'hero', 'postHero', 'projectHero', 'singleLayout', 'twoRows');
  CREATE TYPE "public"."enum_pages_lyout_main_col_style" AS ENUM('postArchive', 'singleLayout', 'twoColumns');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_lyout_side_pos" AS ENUM('scrollSideContent', 'fixedSideContentWhenVisible', 'fixedSideContentAlways');
  CREATE TYPE "public"."enum__pages_v_version_lyout_side_col_style" AS ENUM('none', 'hero', 'postHero', 'projectHero', 'singleLayout', 'twoRows');
  CREATE TYPE "public"."enum__pages_v_version_lyout_main_col_style" AS ENUM('postArchive', 'singleLayout', 'twoColumns');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_lyout_side_pos" AS ENUM('scrollSideContent', 'fixedSideContentWhenVisible', 'fixedSideContentAlways');
  CREATE TYPE "public"."enum_posts_lyout_side_col_style" AS ENUM('none', 'hero', 'postHero', 'projectHero', 'singleLayout', 'twoRows');
  CREATE TYPE "public"."enum_posts_lyout_main_col_style" AS ENUM('postArchive', 'singleLayout', 'twoColumns');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_lyout_side_pos" AS ENUM('scrollSideContent', 'fixedSideContentWhenVisible', 'fixedSideContentAlways');
  CREATE TYPE "public"."enum__posts_v_version_lyout_side_col_style" AS ENUM('none', 'hero', 'postHero', 'projectHero', 'singleLayout', 'twoRows');
  CREATE TYPE "public"."enum__posts_v_version_lyout_main_col_style" AS ENUM('postArchive', 'singleLayout', 'twoColumns');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_lyout_side_col_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_lyout_side_col_prj_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_lyout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"side_pos" "enum_pages_lyout_side_pos" DEFAULT 'scrollSideContent',
  	"scr_snap" boolean DEFAULT false,
  	"full_h" boolean DEFAULT false,
  	"side_col_style" "enum_pages_lyout_side_col_style" DEFAULT 'none',
  	"side_col_hero_media_id" integer,
  	"side_col_hero_desc" jsonb,
  	"side_col_prj_hero_yr" numeric,
  	"side_col_prj_hero_client_id" integer,
  	"side_col_prj_hero_use_desc" boolean DEFAULT true,
  	"side_col_prj_hero_c_desc" jsonb,
  	"side_col_side_content1" jsonb,
  	"side_col_side_content2" jsonb,
  	"main_col_style" "enum_pages_lyout_main_col_style" DEFAULT 'singleLayout',
  	"main_col_post_archive_limit" numeric DEFAULT 10,
  	"main_col_column1" jsonb,
  	"main_col_column2" jsonb
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"category_id" integer
  );
  
  CREATE TABLE "_pages_v_version_lyout_side_col_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_lyout_side_col_prj_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_lyout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"side_pos" "enum__pages_v_version_lyout_side_pos" DEFAULT 'scrollSideContent',
  	"scr_snap" boolean DEFAULT false,
  	"full_h" boolean DEFAULT false,
  	"side_col_style" "enum__pages_v_version_lyout_side_col_style" DEFAULT 'none',
  	"side_col_hero_media_id" integer,
  	"side_col_hero_desc" jsonb,
  	"side_col_prj_hero_yr" numeric,
  	"side_col_prj_hero_client_id" integer,
  	"side_col_prj_hero_use_desc" boolean DEFAULT true,
  	"side_col_prj_hero_c_desc" jsonb,
  	"side_col_side_content1" jsonb,
  	"side_col_side_content2" jsonb,
  	"main_col_style" "enum__pages_v_version_lyout_main_col_style" DEFAULT 'singleLayout',
  	"main_col_post_archive_limit" numeric DEFAULT 10,
  	"main_col_column1" jsonb,
  	"main_col_column2" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"category_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts_lyout_side_col_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_lyout_side_col_prj_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_lyout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"side_pos" "enum_posts_lyout_side_pos" DEFAULT 'scrollSideContent',
  	"scr_snap" boolean DEFAULT false,
  	"full_h" boolean DEFAULT false,
  	"side_col_style" "enum_posts_lyout_side_col_style" DEFAULT 'none',
  	"side_col_hero_media_id" integer,
  	"side_col_hero_desc" jsonb,
  	"side_col_prj_hero_yr" numeric,
  	"side_col_prj_hero_client_id" integer,
  	"side_col_prj_hero_use_desc" boolean DEFAULT true,
  	"side_col_prj_hero_c_desc" jsonb,
  	"side_col_side_content1" jsonb,
  	"side_col_side_content2" jsonb,
  	"main_col_style" "enum_posts_lyout_main_col_style" DEFAULT 'singleLayout',
  	"main_col_post_archive_limit" numeric DEFAULT 10,
  	"main_col_column1" jsonb,
  	"main_col_column2" jsonb
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"category_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"card_media_id" integer,
  	"card_background_colour" varchar DEFAULT '#000000',
  	"card_overlay_image" boolean DEFAULT false,
  	"card_show_date" boolean DEFAULT false,
  	"card_hide_title" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"keywords_id" integer,
  	"users_id" integer,
  	"pages_id" integer,
  	"category_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v_version_lyout_side_col_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_lyout_side_col_prj_hero_lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_apprnce" "app_all" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_lyout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"side_pos" "enum__posts_v_version_lyout_side_pos" DEFAULT 'scrollSideContent',
  	"scr_snap" boolean DEFAULT false,
  	"full_h" boolean DEFAULT false,
  	"side_col_style" "enum__posts_v_version_lyout_side_col_style" DEFAULT 'none',
  	"side_col_hero_media_id" integer,
  	"side_col_hero_desc" jsonb,
  	"side_col_prj_hero_yr" numeric,
  	"side_col_prj_hero_client_id" integer,
  	"side_col_prj_hero_use_desc" boolean DEFAULT true,
  	"side_col_prj_hero_c_desc" jsonb,
  	"side_col_side_content1" jsonb,
  	"side_col_side_content2" jsonb,
  	"main_col_style" "enum__posts_v_version_lyout_main_col_style" DEFAULT 'singleLayout',
  	"main_col_post_archive_limit" numeric DEFAULT 10,
  	"main_col_column1" jsonb,
  	"main_col_column2" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_category_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_card_media_id" integer,
  	"version_card_background_colour" varchar DEFAULT '#000000',
  	"version_card_overlay_image" boolean DEFAULT false,
  	"version_card_show_date" boolean DEFAULT false,
  	"version_card_hide_title" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"keywords_id" integer,
  	"users_id" integer,
  	"pages_id" integer,
  	"category_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"media_id" integer NOT NULL,
  	"media_dark_id" integer,
  	"media_mobile_id" integer,
  	"media_mobile_dark_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "keywords" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "uploads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_desktop_url" varchar,
  	"sizes_desktop_width" numeric,
  	"sizes_desktop_height" numeric,
  	"sizes_desktop_mime_type" varchar,
  	"sizes_desktop_filesize" numeric,
  	"sizes_desktop_filename" varchar,
  	"sizes_desktop_half_url" varchar,
  	"sizes_desktop_half_width" numeric,
  	"sizes_desktop_half_height" numeric,
  	"sizes_desktop_half_mime_type" varchar,
  	"sizes_desktop_half_filesize" numeric,
  	"sizes_desktop_half_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar,
  	"sizes_tablet_half_url" varchar,
  	"sizes_tablet_half_width" numeric,
  	"sizes_tablet_half_height" numeric,
  	"sizes_tablet_half_mime_type" varchar,
  	"sizes_tablet_half_filesize" numeric,
  	"sizes_tablet_half_filename" varchar,
  	"sizes_mobile_url" varchar,
  	"sizes_mobile_width" numeric,
  	"sizes_mobile_height" numeric,
  	"sizes_mobile_mime_type" varchar,
  	"sizes_mobile_filesize" numeric,
  	"sizes_mobile_filename" varchar
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"category_id" integer,
  	"keywords_id" integer,
  	"clients_id" integer,
  	"users_id" integer,
  	"uploads_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "t" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_title" varchar DEFAULT 'Site Title',
  	"site_description" varchar DEFAULT 'Site description placeholder',
  	"site_source_link" varchar DEFAULT 'https://github.com/johngrantdev/personal-site',
  	"favicon_s_v_g_id" integer,
  	"favicon_i_c_o_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "pages_lyout_side_col_hero_lnks" ADD CONSTRAINT "pages_lyout_side_col_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_lyout_side_col_prj_hero_lnks" ADD CONSTRAINT "pages_lyout_side_col_prj_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_lyout" ADD CONSTRAINT "pages_lyout_side_col_hero_media_id_media_id_fk" FOREIGN KEY ("side_col_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_lyout" ADD CONSTRAINT "pages_lyout_side_col_prj_hero_client_id_clients_id_fk" FOREIGN KEY ("side_col_prj_hero_client_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_lyout" ADD CONSTRAINT "pages_lyout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_uploads_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_lyout_side_col_hero_lnks" ADD CONSTRAINT "_pages_v_version_lyout_side_col_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_lyout_side_col_prj_hero_lnks" ADD CONSTRAINT "_pages_v_version_lyout_side_col_prj_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_lyout" ADD CONSTRAINT "_pages_v_version_lyout_side_col_hero_media_id_media_id_fk" FOREIGN KEY ("side_col_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_lyout" ADD CONSTRAINT "_pages_v_version_lyout_side_col_prj_hero_client_id_clients_id_fk" FOREIGN KEY ("side_col_prj_hero_client_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_lyout" ADD CONSTRAINT "_pages_v_version_lyout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_uploads_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_lyout_side_col_hero_lnks" ADD CONSTRAINT "posts_lyout_side_col_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_lyout_side_col_prj_hero_lnks" ADD CONSTRAINT "posts_lyout_side_col_prj_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_lyout" ADD CONSTRAINT "posts_lyout_side_col_hero_media_id_media_id_fk" FOREIGN KEY ("side_col_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_lyout" ADD CONSTRAINT "posts_lyout_side_col_prj_hero_client_id_clients_id_fk" FOREIGN KEY ("side_col_prj_hero_client_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_lyout" ADD CONSTRAINT "posts_lyout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_card_media_id_media_id_fk" FOREIGN KEY ("card_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_uploads_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_lyout_side_col_hero_lnks" ADD CONSTRAINT "_posts_v_version_lyout_side_col_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_version_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_lyout_side_col_prj_hero_lnks" ADD CONSTRAINT "_posts_v_version_lyout_side_col_prj_hero_lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_version_lyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_lyout" ADD CONSTRAINT "_posts_v_version_lyout_side_col_hero_media_id_media_id_fk" FOREIGN KEY ("side_col_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_lyout" ADD CONSTRAINT "_posts_v_version_lyout_side_col_prj_hero_client_id_clients_id_fk" FOREIGN KEY ("side_col_prj_hero_client_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_lyout" ADD CONSTRAINT "_posts_v_version_lyout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_category_id_category_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_card_media_id_media_id_fk" FOREIGN KEY ("version_card_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_uploads_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_media_id_uploads_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_media_dark_id_uploads_id_fk" FOREIGN KEY ("media_dark_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_media_mobile_id_uploads_id_fk" FOREIGN KEY ("media_mobile_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_media_mobile_dark_id_uploads_id_fk" FOREIGN KEY ("media_mobile_dark_id") REFERENCES "public"."uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_uploads_fk" FOREIGN KEY ("uploads_id") REFERENCES "public"."uploads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_nav_items" ADD CONSTRAINT "site_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_favicon_s_v_g_id_media_id_fk" FOREIGN KEY ("favicon_s_v_g_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_favicon_i_c_o_id_media_id_fk" FOREIGN KEY ("favicon_i_c_o_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_lyout_side_col_hero_lnks_order_idx" ON "pages_lyout_side_col_hero_lnks" USING btree ("_order");
  CREATE INDEX "pages_lyout_side_col_hero_lnks_parent_id_idx" ON "pages_lyout_side_col_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "pages_lyout_side_col_prj_hero_lnks_order_idx" ON "pages_lyout_side_col_prj_hero_lnks" USING btree ("_order");
  CREATE INDEX "pages_lyout_side_col_prj_hero_lnks_parent_id_idx" ON "pages_lyout_side_col_prj_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "pages_lyout_order_idx" ON "pages_lyout" USING btree ("_order");
  CREATE INDEX "pages_lyout_parent_id_idx" ON "pages_lyout" USING btree ("_parent_id");
  CREATE INDEX "pages_lyout_side_col_hero_side_col_hero_media_idx" ON "pages_lyout" USING btree ("side_col_hero_media_id");
  CREATE INDEX "pages_lyout_side_col_prj_hero_side_col_prj_hero_client_idx" ON "pages_lyout" USING btree ("side_col_prj_hero_client_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_category_id_idx" ON "pages_rels" USING btree ("category_id");
  CREATE INDEX "_pages_v_version_lyout_side_col_hero_lnks_order_idx" ON "_pages_v_version_lyout_side_col_hero_lnks" USING btree ("_order");
  CREATE INDEX "_pages_v_version_lyout_side_col_hero_lnks_parent_id_idx" ON "_pages_v_version_lyout_side_col_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_lyout_side_col_prj_hero_lnks_order_idx" ON "_pages_v_version_lyout_side_col_prj_hero_lnks" USING btree ("_order");
  CREATE INDEX "_pages_v_version_lyout_side_col_prj_hero_lnks_parent_id_idx" ON "_pages_v_version_lyout_side_col_prj_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_lyout_order_idx" ON "_pages_v_version_lyout" USING btree ("_order");
  CREATE INDEX "_pages_v_version_lyout_parent_id_idx" ON "_pages_v_version_lyout" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_lyout_side_col_hero_side_col_hero_media_idx" ON "_pages_v_version_lyout" USING btree ("side_col_hero_media_id");
  CREATE INDEX "_pages_v_version_lyout_side_col_prj_hero_side_col_prj_he_idx" ON "_pages_v_version_lyout" USING btree ("side_col_prj_hero_client_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_category_id_idx" ON "_pages_v_rels" USING btree ("category_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_lyout_side_col_hero_lnks_order_idx" ON "posts_lyout_side_col_hero_lnks" USING btree ("_order");
  CREATE INDEX "posts_lyout_side_col_hero_lnks_parent_id_idx" ON "posts_lyout_side_col_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "posts_lyout_side_col_prj_hero_lnks_order_idx" ON "posts_lyout_side_col_prj_hero_lnks" USING btree ("_order");
  CREATE INDEX "posts_lyout_side_col_prj_hero_lnks_parent_id_idx" ON "posts_lyout_side_col_prj_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "posts_lyout_order_idx" ON "posts_lyout" USING btree ("_order");
  CREATE INDEX "posts_lyout_parent_id_idx" ON "posts_lyout" USING btree ("_parent_id");
  CREATE INDEX "posts_lyout_side_col_hero_side_col_hero_media_idx" ON "posts_lyout" USING btree ("side_col_hero_media_id");
  CREATE INDEX "posts_lyout_side_col_prj_hero_side_col_prj_hero_client_idx" ON "posts_lyout" USING btree ("side_col_prj_hero_client_id");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_card_card_media_idx" ON "posts" USING btree ("card_media_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_keywords_id_idx" ON "posts_rels" USING btree ("keywords_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX "posts_rels_category_id_idx" ON "posts_rels" USING btree ("category_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_lyout_side_col_hero_lnks_order_idx" ON "_posts_v_version_lyout_side_col_hero_lnks" USING btree ("_order");
  CREATE INDEX "_posts_v_version_lyout_side_col_hero_lnks_parent_id_idx" ON "_posts_v_version_lyout_side_col_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_lyout_side_col_prj_hero_lnks_order_idx" ON "_posts_v_version_lyout_side_col_prj_hero_lnks" USING btree ("_order");
  CREATE INDEX "_posts_v_version_lyout_side_col_prj_hero_lnks_parent_id_idx" ON "_posts_v_version_lyout_side_col_prj_hero_lnks" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_lyout_order_idx" ON "_posts_v_version_lyout" USING btree ("_order");
  CREATE INDEX "_posts_v_version_lyout_parent_id_idx" ON "_posts_v_version_lyout" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_lyout_side_col_hero_side_col_hero_media_idx" ON "_posts_v_version_lyout" USING btree ("side_col_hero_media_id");
  CREATE INDEX "_posts_v_version_lyout_side_col_prj_hero_side_col_prj_he_idx" ON "_posts_v_version_lyout" USING btree ("side_col_prj_hero_client_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_card_version_card_media_idx" ON "_posts_v" USING btree ("version_card_media_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_keywords_id_idx" ON "_posts_v_rels" USING btree ("keywords_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");
  CREATE INDEX "_posts_v_rels_category_id_idx" ON "_posts_v_rels" USING btree ("category_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "media_media_idx" ON "media" USING btree ("media_id");
  CREATE INDEX "media_media_dark_idx" ON "media" USING btree ("media_dark_id");
  CREATE INDEX "media_media_mobile_idx" ON "media" USING btree ("media_mobile_id");
  CREATE INDEX "media_media_mobile_dark_idx" ON "media" USING btree ("media_mobile_dark_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "category_updated_at_idx" ON "category" USING btree ("updated_at");
  CREATE INDEX "category_created_at_idx" ON "category" USING btree ("created_at");
  CREATE INDEX "keywords_updated_at_idx" ON "keywords" USING btree ("updated_at");
  CREATE INDEX "keywords_created_at_idx" ON "keywords" USING btree ("created_at");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "uploads_updated_at_idx" ON "uploads" USING btree ("updated_at");
  CREATE INDEX "uploads_created_at_idx" ON "uploads" USING btree ("created_at");
  CREATE UNIQUE INDEX "uploads_filename_idx" ON "uploads" USING btree ("filename");
  CREATE INDEX "uploads_sizes_card_sizes_card_filename_idx" ON "uploads" USING btree ("sizes_card_filename");
  CREATE INDEX "uploads_sizes_desktop_sizes_desktop_filename_idx" ON "uploads" USING btree ("sizes_desktop_filename");
  CREATE INDEX "uploads_sizes_desktop_half_sizes_desktop_half_filename_idx" ON "uploads" USING btree ("sizes_desktop_half_filename");
  CREATE INDEX "uploads_sizes_tablet_sizes_tablet_filename_idx" ON "uploads" USING btree ("sizes_tablet_filename");
  CREATE INDEX "uploads_sizes_tablet_half_sizes_tablet_half_filename_idx" ON "uploads" USING btree ("sizes_tablet_half_filename");
  CREATE INDEX "uploads_sizes_mobile_sizes_mobile_filename_idx" ON "uploads" USING btree ("sizes_mobile_filename");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_category_id_idx" ON "payload_locked_documents_rels" USING btree ("category_id");
  CREATE INDEX "payload_locked_documents_rels_keywords_id_idx" ON "payload_locked_documents_rels" USING btree ("keywords_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("uploads_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_nav_items_order_idx" ON "site_nav_items" USING btree ("_order");
  CREATE INDEX "site_nav_items_parent_id_idx" ON "site_nav_items" USING btree ("_parent_id");
  CREATE INDEX "site_favicon_s_v_g_idx" ON "site" USING btree ("favicon_s_v_g_id");
  CREATE INDEX "site_favicon_i_c_o_idx" ON "site" USING btree ("favicon_i_c_o_id");
  CREATE INDEX "site_rels_order_idx" ON "site_rels" USING btree ("order");
  CREATE INDEX "site_rels_parent_idx" ON "site_rels" USING btree ("parent_id");
  CREATE INDEX "site_rels_path_idx" ON "site_rels" USING btree ("path");
  CREATE INDEX "site_rels_pages_id_idx" ON "site_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_lyout_side_col_hero_lnks" CASCADE;
  DROP TABLE "pages_lyout_side_col_prj_hero_lnks" CASCADE;
  DROP TABLE "pages_lyout" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_lyout_side_col_hero_lnks" CASCADE;
  DROP TABLE "_pages_v_version_lyout_side_col_prj_hero_lnks" CASCADE;
  DROP TABLE "_pages_v_version_lyout" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts_lyout_side_col_hero_lnks" CASCADE;
  DROP TABLE "posts_lyout_side_col_prj_hero_lnks" CASCADE;
  DROP TABLE "posts_lyout" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v_version_lyout_side_col_hero_lnks" CASCADE;
  DROP TABLE "_posts_v_version_lyout_side_col_prj_hero_lnks" CASCADE;
  DROP TABLE "_posts_v_version_lyout" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "category" CASCADE;
  DROP TABLE "keywords" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "uploads" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_nav_items" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_rels" CASCADE;
  DROP TYPE "public"."t";
  DROP TYPE "public"."app_all";
  DROP TYPE "public"."enum_pages_lyout_side_pos";
  DROP TYPE "public"."enum_pages_lyout_side_col_style";
  DROP TYPE "public"."enum_pages_lyout_main_col_style";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_lyout_side_pos";
  DROP TYPE "public"."enum__pages_v_version_lyout_side_col_style";
  DROP TYPE "public"."enum__pages_v_version_lyout_main_col_style";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_lyout_side_pos";
  DROP TYPE "public"."enum_posts_lyout_side_col_style";
  DROP TYPE "public"."enum_posts_lyout_main_col_style";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_lyout_side_pos";
  DROP TYPE "public"."enum__posts_v_version_lyout_side_col_style";
  DROP TYPE "public"."enum__posts_v_version_lyout_main_col_style";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_redirects_to_type";`)
}
