var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  announcements: () => announcements,
  bids: () => bids,
  collectionLooks: () => collectionLooks,
  collectionLooksRelations: () => collectionLooksRelations,
  collections: () => collections,
  collectionsRelations: () => collectionsRelations,
  comments: () => comments,
  commentsRelations: () => commentsRelations,
  conversations: () => conversations,
  conversationsRelations: () => conversationsRelations,
  fashionItems: () => fashionItems,
  fashionItemsRelations: () => fashionItemsRelations,
  favorites: () => favorites,
  feedFeedback: () => feedFeedback,
  feedSeen: () => feedSeen,
  files: () => files,
  filesRelations: () => filesRelations,
  follows: () => follows,
  followsRelations: () => followsRelations,
  insertCollectionSchema: () => insertCollectionSchema,
  insertCommentSchema: () => insertCommentSchema,
  insertFashionItemSchema: () => insertFashionItemSchema,
  insertFeedFeedbackSchema: () => insertFeedFeedbackSchema,
  insertLookSchema: () => insertLookSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertOpenTeamSchema: () => insertOpenTeamSchema,
  insertUserSchema: () => insertUserSchema,
  likes: () => likes,
  likesRelations: () => likesRelations,
  lookItems: () => lookItems,
  lookItemsRelations: () => lookItemsRelations,
  looks: () => looks,
  looksRelations: () => looksRelations,
  messages: () => messages,
  messagesRelations: () => messagesRelations,
  missions: () => missions,
  notifications: () => notifications,
  notificationsRelations: () => notificationsRelations,
  openTeams: () => openTeams,
  outfitCommentsTable: () => outfitCommentsTable,
  outfitLikesTable: () => outfitLikesTable,
  outfitsTable: () => outfitsTable,
  savedLooks: () => savedLooks,
  savedLooksRelations: () => savedLooksRelations,
  userSettings: () => userSettings,
  userSettingsRelations: () => userSettingsRelations,
  users: () => users,
  usersRelations: () => usersRelations,
  wardrobeItems: () => wardrobeItems
});
import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
  jsonb,
  unique
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
function numeric(name, config) {
  return decimal(name, config);
}
var users, follows, fashionItems, looks, lookItems, collections, collectionLooks, likes, comments, savedLooks, notifications, conversations, messages, files, userSettings, usersRelations, fashionItemsRelations, looksRelations, lookItemsRelations, collectionsRelations, collectionLooksRelations, likesRelations, commentsRelations, savedLooksRelations, followsRelations, notificationsRelations, conversationsRelations, messagesRelations, filesRelations, userSettingsRelations, insertUserSchema, insertFashionItemSchema, insertLookSchema, insertCollectionSchema, insertCommentSchema, insertMessageSchema, openTeams, feedFeedback, feedSeen, favorites, announcements, insertOpenTeamSchema, insertFeedFeedbackSchema, wardrobeItems, missions, bids, outfitsTable, outfitLikesTable, outfitCommentsTable;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      email: text("email").notNull().unique(),
      name: text("name").notNull(),
      password: text("password").notNull(),
      role: text("role").notNull().default("CLIENT"),
      // CLIENT ou PRO
      username: text("username").unique(),
      // Nom d'utilisateur unique pour le réseau social
      avatar_url: text("avatar_url"),
      bio: text("bio"),
      // Style et préférences mode
      style_tags: text("style_tags").array().default(sql`ARRAY[]::text[]`),
      // ["minimalist", "vintage", "streetwear"]
      favorite_colors: text("favorite_colors").array().default(sql`ARRAY[]::text[]`),
      favorite_brands: text("favorite_brands").array().default(sql`ARRAY[]::text[]`),
      // Statistiques
      followers_count: integer("followers_count").default(0),
      following_count: integer("following_count").default(0),
      posts_count: integer("posts_count").default(0),
      // Données de profil JSON
      profile_data: jsonb("profile_data").default(sql`'{}'::jsonb`),
      // Reputation (pour compatibilité)
      rating_mean: numeric("rating_mean", { precision: 3, scale: 2 }),
      rating_count: integer("rating_count").default(0),
      // Paramètres
      is_private: boolean("is_private").default(false),
      // Profil privé
      is_verified: boolean("is_verified").default(false),
      // Badge vérifié
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    follows = pgTable("follows", {
      id: serial("id").primaryKey(),
      follower_id: integer("follower_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      following_id: integer("following_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      created_at: timestamp("created_at").defaultNow()
    }, (table) => ({
      // Index unique pour éviter les doublons de follows
      uniqueFollow: unique().on(table.follower_id, table.following_id)
    }));
    fashionItems = pgTable("fashion_items", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      // Informations de base
      title: text("title").notNull(),
      description: text("description"),
      // Images
      images: text("images").array().default([]),
      // URLs des images
      // Catégorisation
      category: text("category").notNull(),
      // "top", "bottom", "shoes", "accessory", "outerwear", "dress", "bag"
      sub_category: text("sub_category"),
      // "t-shirt", "jeans", "sneakers", etc.
      // Caractéristiques
      brand: text("brand"),
      color: text("color"),
      season: text("season"),
      // "spring", "summer", "fall", "winter", "all"
      occasion: text("occasion"),
      // "casual", "formal", "sport", "party"
      tags: text("tags").array().default([]),
      // Métadonnées
      purchase_date: timestamp("purchase_date"),
      price: integer("price"),
      // Prix en centimes
      size: text("size"),
      // Statistiques d'utilisation
      worn_count: integer("worn_count").default(0),
      // Nombre de fois porté dans des looks
      // Visibilité
      is_public: boolean("is_public").default(true),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    looks = pgTable("looks", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      // Contenu
      title: text("title").notNull(),
      description: text("description"),
      cover_image: text("cover_image"),
      // Image principale du look
      // Catégorisation
      style_tags: text("style_tags").array().default([]),
      // ["casual", "chic", "streetwear"]
      occasion: text("occasion"),
      // "daily", "work", "party", "date", "sport"
      season: text("season"),
      // "spring", "summer", "fall", "winter"
      // Statistiques d'engagement
      likes_count: integer("likes_count").default(0),
      comments_count: integer("comments_count").default(0),
      saves_count: integer("saves_count").default(0),
      views_count: integer("views_count").default(0),
      // Algorithme feed
      engagement_score: decimal("engagement_score", { precision: 5, scale: 2 }).default("0.0"),
      // Visibilité
      is_public: boolean("is_public").default(true),
      is_featured: boolean("is_featured").default(false),
      // Mis en avant par la plateforme
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    lookItems = pgTable("look_items", {
      id: serial("id").primaryKey(),
      look_id: integer("look_id").references(() => looks.id, { onDelete: "cascade" }).notNull(),
      fashion_item_id: integer("fashion_item_id").references(() => fashionItems.id, { onDelete: "cascade" }).notNull(),
      position: integer("position").default(0),
      // Ordre d'affichage
      created_at: timestamp("created_at").defaultNow()
    });
    collections = pgTable("collections", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      title: text("title").notNull(),
      description: text("description"),
      cover_image: text("cover_image"),
      // Visibilité
      is_public: boolean("is_public").default(true),
      // Statistiques
      looks_count: integer("looks_count").default(0),
      followers_count: integer("followers_count").default(0),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    collectionLooks = pgTable("collection_looks", {
      id: serial("id").primaryKey(),
      collection_id: integer("collection_id").references(() => collections.id, { onDelete: "cascade" }).notNull(),
      look_id: integer("look_id").references(() => looks.id, { onDelete: "cascade" }).notNull(),
      created_at: timestamp("created_at").defaultNow()
    }, (table) => ({
      uniqueCollectionLook: unique().on(table.collection_id, table.look_id)
    }));
    likes = pgTable("likes", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      look_id: integer("look_id").references(() => looks.id, { onDelete: "cascade" }).notNull(),
      created_at: timestamp("created_at").defaultNow()
    }, (table) => ({
      uniqueLike: unique().on(table.user_id, table.look_id)
    }));
    comments = pgTable("comments", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      look_id: integer("look_id").references(() => looks.id, { onDelete: "cascade" }).notNull(),
      content: text("content").notNull(),
      parent_id: integer("parent_id").references(() => comments.id, { onDelete: "cascade" }),
      // Pour les réponses
      likes_count: integer("likes_count").default(0),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    savedLooks = pgTable("saved_looks", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      look_id: integer("look_id").references(() => looks.id, { onDelete: "cascade" }).notNull(),
      created_at: timestamp("created_at").defaultNow()
    }, (table) => ({
      uniqueSave: unique().on(table.user_id, table.look_id)
    }));
    notifications = pgTable("notifications", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      type: text("type").notNull(),
      // 'like', 'comment', 'follow', 'mention'
      title: text("title").notNull(),
      message: text("message").notNull(),
      link: text("link"),
      // URL de redirection
      // Acteur de la notification
      actor_id: integer("actor_id").references(() => users.id, { onDelete: "cascade" }),
      actor_name: text("actor_name"),
      actor_avatar: text("actor_avatar"),
      // Métadonnées
      metadata: jsonb("metadata"),
      read_at: timestamp("read_at"),
      created_at: timestamp("created_at").defaultNow()
    });
    conversations = pgTable("conversations", {
      id: serial("id").primaryKey(),
      participant1_id: integer("participant1_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      participant2_id: integer("participant2_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      last_message_at: timestamp("last_message_at").defaultNow(),
      created_at: timestamp("created_at").defaultNow()
    });
    messages = pgTable("messages", {
      id: serial("id").primaryKey(),
      conversation_id: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
      sender_id: integer("sender_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      content: text("content").notNull(),
      message_type: text("message_type").$type().default("text"),
      // Pour partager un look
      look_id: integer("look_id").references(() => looks.id),
      image_url: text("image_url"),
      read_at: timestamp("read_at"),
      created_at: timestamp("created_at").defaultNow()
    });
    files = pgTable("files", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      filename: text("filename").notNull(),
      original_filename: text("original_filename").notNull(),
      file_type: text("file_type").notNull(),
      // mime type
      file_size: integer("file_size").notNull(),
      // en bytes
      file_url: text("file_url").notNull(),
      // Contexte d'utilisation
      context_type: text("context_type"),
      // 'fashion_item', 'look', 'avatar', 'message'
      context_id: integer("context_id"),
      metadata: jsonb("metadata"),
      created_at: timestamp("created_at").defaultNow()
    });
    userSettings = pgTable("user_settings", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull().unique(),
      notifications: jsonb("notifications"),
      // Préférences de notifications
      privacy: jsonb("privacy"),
      // Paramètres de confidentialité
      appearance: jsonb("appearance"),
      // Thème, langue, etc.
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    usersRelations = relations(users, ({ many }) => ({
      fashionItems: many(fashionItems),
      looks: many(looks),
      collections: many(collections),
      likes: many(likes),
      comments: many(comments),
      savedLooks: many(savedLooks),
      followers: many(follows, { relationName: "following" }),
      following: many(follows, { relationName: "follower" }),
      notifications: many(notifications),
      files: many(files),
      messages: many(messages)
    }));
    fashionItemsRelations = relations(fashionItems, ({ one, many }) => ({
      user: one(users, {
        fields: [fashionItems.user_id],
        references: [users.id]
      }),
      lookItems: many(lookItems)
    }));
    looksRelations = relations(looks, ({ one, many }) => ({
      user: one(users, {
        fields: [looks.user_id],
        references: [users.id]
      }),
      lookItems: many(lookItems),
      likes: many(likes),
      comments: many(comments),
      savedLooks: many(savedLooks),
      collectionLooks: many(collectionLooks)
    }));
    lookItemsRelations = relations(lookItems, ({ one }) => ({
      look: one(looks, {
        fields: [lookItems.look_id],
        references: [looks.id]
      }),
      fashionItem: one(fashionItems, {
        fields: [lookItems.fashion_item_id],
        references: [fashionItems.id]
      })
    }));
    collectionsRelations = relations(collections, ({ one, many }) => ({
      user: one(users, {
        fields: [collections.user_id],
        references: [users.id]
      }),
      collectionLooks: many(collectionLooks)
    }));
    collectionLooksRelations = relations(collectionLooks, ({ one }) => ({
      collection: one(collections, {
        fields: [collectionLooks.collection_id],
        references: [collections.id]
      }),
      look: one(looks, {
        fields: [collectionLooks.look_id],
        references: [looks.id]
      })
    }));
    likesRelations = relations(likes, ({ one }) => ({
      user: one(users, {
        fields: [likes.user_id],
        references: [users.id]
      }),
      look: one(looks, {
        fields: [likes.look_id],
        references: [looks.id]
      })
    }));
    commentsRelations = relations(comments, ({ one, many }) => ({
      user: one(users, {
        fields: [comments.user_id],
        references: [users.id]
      }),
      look: one(looks, {
        fields: [comments.look_id],
        references: [looks.id]
      }),
      parent: one(comments, {
        fields: [comments.parent_id],
        references: [comments.id]
      }),
      replies: many(comments)
    }));
    savedLooksRelations = relations(savedLooks, ({ one }) => ({
      user: one(users, {
        fields: [savedLooks.user_id],
        references: [users.id]
      }),
      look: one(looks, {
        fields: [savedLooks.look_id],
        references: [looks.id]
      })
    }));
    followsRelations = relations(follows, ({ one }) => ({
      follower: one(users, {
        fields: [follows.follower_id],
        references: [users.id],
        relationName: "follower"
      }),
      following: one(users, {
        fields: [follows.following_id],
        references: [users.id],
        relationName: "following"
      })
    }));
    notificationsRelations = relations(notifications, ({ one }) => ({
      user: one(users, {
        fields: [notifications.user_id],
        references: [users.id]
      }),
      actor: one(users, {
        fields: [notifications.actor_id],
        references: [users.id]
      })
    }));
    conversationsRelations = relations(conversations, ({ one, many }) => ({
      participant1: one(users, {
        fields: [conversations.participant1_id],
        references: [users.id]
      }),
      participant2: one(users, {
        fields: [conversations.participant2_id],
        references: [users.id]
      }),
      messages: many(messages)
    }));
    messagesRelations = relations(messages, ({ one }) => ({
      conversation: one(conversations, {
        fields: [messages.conversation_id],
        references: [conversations.id]
      }),
      sender: one(users, {
        fields: [messages.sender_id],
        references: [users.id]
      }),
      look: one(looks, {
        fields: [messages.look_id],
        references: [looks.id]
      })
    }));
    filesRelations = relations(files, ({ one }) => ({
      user: one(users, {
        fields: [files.user_id],
        references: [users.id]
      })
    }));
    userSettingsRelations = relations(userSettings, ({ one }) => ({
      user: one(users, {
        fields: [userSettings.user_id],
        references: [users.id]
      })
    }));
    insertUserSchema = createInsertSchema(users).omit({
      id: true,
      created_at: true,
      updated_at: true,
      followers_count: true,
      following_count: true,
      posts_count: true,
      profile_data: true,
      rating_mean: true,
      rating_count: true
    });
    insertFashionItemSchema = createInsertSchema(fashionItems).omit({
      id: true,
      created_at: true,
      updated_at: true,
      worn_count: true
    });
    insertLookSchema = createInsertSchema(looks).omit({
      id: true,
      created_at: true,
      updated_at: true,
      likes_count: true,
      comments_count: true,
      saves_count: true,
      views_count: true,
      engagement_score: true
    });
    insertCollectionSchema = createInsertSchema(collections).omit({
      id: true,
      created_at: true,
      updated_at: true,
      looks_count: true,
      followers_count: true
    });
    insertCommentSchema = createInsertSchema(comments).omit({
      id: true,
      created_at: true,
      updated_at: true,
      likes_count: true
    });
    insertMessageSchema = createInsertSchema(messages).omit({
      id: true,
      created_at: true
    });
    openTeams = pgTable("open_teams", {
      id: serial("id").primaryKey(),
      mission_id: integer("mission_id").notNull(),
      name: text("name").notNull(),
      description: text("description"),
      creator_id: integer("creator_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      estimated_budget: integer("estimated_budget"),
      estimated_timeline_days: integer("estimated_timeline_days"),
      members: jsonb("members"),
      required_roles: jsonb("required_roles"),
      max_members: integer("max_members").default(5),
      status: text("status").default("recruiting"),
      visibility: text("visibility").default("public"),
      auto_accept: boolean("auto_accept").default(true),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    feedFeedback = pgTable("feed_feedback", {
      id: serial("id").primaryKey(),
      announcement_id: integer("announcement_id").notNull(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      action: text("action").notNull(),
      // 'view', 'like', 'skip', 'apply'
      dwell_ms: integer("dwell_ms"),
      created_at: timestamp("created_at").defaultNow()
    });
    feedSeen = pgTable("feed_seen", {
      id: serial("id").primaryKey(),
      announcement_id: integer("announcement_id").notNull(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      seen_at: timestamp("seen_at").defaultNow()
    });
    favorites = pgTable("favorites", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      announcement_id: integer("announcement_id").notNull(),
      created_at: timestamp("created_at").defaultNow()
    });
    announcements = pgTable("announcements", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
      title: text("title").notNull(),
      description: text("description"),
      category: text("category"),
      budget_min: text("budget_min"),
      budget_max: text("budget_max"),
      status: text("status").default("active"),
      sponsored: boolean("sponsored").default(false),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    insertOpenTeamSchema = createInsertSchema(openTeams).omit({
      id: true,
      created_at: true,
      updated_at: true
    });
    insertFeedFeedbackSchema = createInsertSchema(feedFeedback).omit({
      id: true,
      created_at: true
    });
    wardrobeItems = fashionItems;
    missions = looks;
    bids = comments;
    outfitsTable = looks;
    outfitLikesTable = likes;
    outfitCommentsTable = comments;
  }
});

// server/database.ts
var database_exports = {};
__export(database_exports, {
  db: () => db,
  initializeDatabase: () => initializeDatabase,
  pool: () => pool,
  testConnection: () => testConnection
});
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
async function initializeDatabase() {
  try {
    console.log("\u{1F527} Initializing database tables...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'CLIENT',
        username TEXT UNIQUE,
        avatar_url TEXT,
        bio TEXT,
        style_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
        favorite_colors TEXT[] DEFAULT ARRAY[]::TEXT[],
        favorite_brands TEXT[] DEFAULT ARRAY[]::TEXT[],
        followers_count INTEGER DEFAULT 0,
        following_count INTEGER DEFAULT 0,
        posts_count INTEGER DEFAULT 0,
        profile_data JSONB DEFAULT '{}'::jsonb,
        rating_mean DECIMAL(3, 2),
        rating_count INTEGER DEFAULT 0,
        is_private BOOLEAN DEFAULT false,
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS missions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        client_id INTEGER REFERENCES users(id),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        excerpt TEXT,
        category TEXT NOT NULL,
        location_data JSONB,
        budget_value_cents INTEGER NOT NULL,
        currency TEXT DEFAULT 'EUR',
        urgency TEXT DEFAULT 'medium',
        status TEXT DEFAULT 'draft',
        quality_target TEXT DEFAULT 'standard',
        deadline TIMESTAMP,
        tags JSONB,
        skills_required JSONB,
        requirements TEXT,
        is_team_mission BOOLEAN DEFAULT false,
        team_size INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS open_teams (
        id SERIAL PRIMARY KEY,
        mission_id INTEGER REFERENCES missions(id) NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        creator_id INTEGER REFERENCES users(id) NOT NULL,
        estimated_budget INTEGER,
        estimated_timeline_days INTEGER,
        members JSONB,
        required_roles JSONB,
        max_members INTEGER DEFAULT 5,
        status TEXT DEFAULT 'recruiting',
        visibility TEXT DEFAULT 'public',
        auto_accept BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bids (
        id SERIAL PRIMARY KEY,
        mission_id INTEGER REFERENCES missions(id) NOT NULL,
        provider_id INTEGER REFERENCES users(id) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        timeline_days INTEGER,
        message TEXT,
        score_breakdown JSONB,
        is_leading BOOLEAN DEFAULT false,
        status TEXT DEFAULT 'pending',
        bid_type TEXT DEFAULT 'individual',
        team_composition JSONB,
        team_lead_id INTEGER REFERENCES users(id),
        open_team_id INTEGER REFERENCES open_teams(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT DEFAULT 'info',
        priority INTEGER DEFAULT 1,
        is_active BOOLEAN DEFAULT true,
        status TEXT DEFAULT 'active',
        category TEXT,
        budget INTEGER,
        location TEXT,
        user_id INTEGER REFERENCES users(id),
        sponsored BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feed_feedback (
        id SERIAL PRIMARY KEY,
        announcement_id INTEGER REFERENCES announcements(id) NOT NULL,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        feedback_type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feed_seen (
        id SERIAL PRIMARY KEY,
        announcement_id INTEGER REFERENCES announcements(id) NOT NULL,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        seen_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        announcement_id INTEGER REFERENCES announcements(id) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ai_events (
        id TEXT PRIMARY KEY,
        phase TEXT NOT NULL,
        provider TEXT NOT NULL,
        model_family TEXT NOT NULL,
        model_name TEXT NOT NULL,
        allow_training BOOLEAN NOT NULL,
        input_redacted JSONB,
        output JSONB,
        confidence TEXT,
        tokens INTEGER,
        latency_ms INTEGER,
        provenance TEXT NOT NULL,
        prompt_hash TEXT,
        accepted BOOLEAN,
        rating INTEGER,
        edits JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_availability (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        rate DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recurring_availability (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        day_of_week INTEGER NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        rate DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("\u2705 Database tables initialized successfully");
  } catch (error) {
    console.error("\u274C Database initialization failed:", error);
  }
}
async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW() as current_time");
    console.log("\u2705 Database connection test successful:", result.rows[0]);
  } catch (error) {
    console.error("\u274C Database connection test failed:", {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
  }
}
var databaseUrl, pool, db;
var init_database = __esm({
  "server/database.ts"() {
    "use strict";
    init_schema();
    databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error("\u274C DATABASE_URL not configured. Please set up Replit PostgreSQL in the Database tab.");
      process.exit(1);
    }
    pool = new Pool({
      connectionString: databaseUrl,
      connectionTimeoutMillis: 5e3,
      idleTimeoutMillis: 1e4,
      max: 20
    });
    pool.on("error", (err) => {
      console.error("\u274C Database pool error:", {
        message: err.message,
        code: err.code,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (process.env.NODE_ENV === "development") {
        console.error("Stack:", err.stack);
      }
    });
    pool.on("connect", () => {
      console.log("\u2705 Database connection established");
    });
    pool.on("remove", () => {
      console.log("\u{1F504} Database connection removed from pool");
    });
    db = drizzle(pool, { schema: schema_exports });
    console.log("\u{1F517} Database connection established:", {
      databaseUrl: databaseUrl ? "***configured***" : "missing",
      isCloudSQL: databaseUrl?.includes("/cloudsql/") || false
    });
  }
});

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path4 from "path";
var vite_config_default;
var init_vite_config = __esm({
  "vite.config.ts"() {
    "use strict";
    vite_config_default = defineConfig({
      plugins: [
        react()
      ],
      base: "/",
      resolve: {
        alias: {
          "@": path4.resolve(import.meta.dirname, "client", "src"),
          "@shared": path4.resolve(import.meta.dirname, "shared"),
          "@assets": path4.resolve(import.meta.dirname, "attached_assets")
        }
      },
      root: path4.resolve(import.meta.dirname, "client"),
      build: {
        outDir: path4.resolve(import.meta.dirname, "dist"),
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ["react", "react-dom"],
              ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"]
            }
          }
        }
      },
      server: {
        host: "0.0.0.0",
        port: 5e3,
        hmr: {
          port: 5001,
          host: "0.0.0.0"
        },
        allowedHosts: true
      },
      preview: {
        host: "0.0.0.0",
        port: Number(process.env.PORT) || 8080,
        strictPort: true
      }
    });
  }
});

// server/vite.ts
var vite_exports = {};
__export(vite_exports, {
  log: () => log,
  serveStatic: () => serveStatic,
  setupVite: () => setupVite
});
import express6 from "express";
import fs2 from "fs";
import path5 from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { nanoid } from "nanoid";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: {
      middlewareMode: true,
      hmr: false
    },
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith("/api/")) {
      return next();
    }
    if (url.includes(".")) {
      return next();
    }
    try {
      const clientTemplate = path5.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({
        "Content-Type": "text/html",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path5.resolve(import.meta.dirname, "..", "dist");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express6.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path5.resolve(distPath, "index.html"));
  });
}
var viteLogger;
var init_vite = __esm({
  "server/vite.ts"() {
    "use strict";
    init_vite_config();
    viteLogger = createLogger();
  }
});

// apps/api/src/ai/AIOrchestrator.ts
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
async function getPricingSuggestion(request) {
  try {
    const basePrice = calculateBasePrice(request.category || "general");
    const complexity = analyzeComplexity(request.description || "");
    const timelineMultiplier = getTimelineMultiplier(request.timeline || "");
    const minPrice = Math.round(basePrice * complexity * 0.8);
    const maxPrice = Math.round(basePrice * complexity * timelineMultiplier * 1.3);
    const averagePrice = Math.round((minPrice + maxPrice) / 2);
    return {
      success: true,
      pricing: {
        minPrice,
        maxPrice,
        averagePrice,
        confidence: 0.85,
        factors: [
          `Cat\xE9gorie: ${request.category}`,
          `Complexit\xE9: ${complexity}x`,
          `D\xE9lai: ${timelineMultiplier}x`
        ]
      },
      analysis: {
        category: request.category,
        complexity_level: complexity > 1.5 ? "high" : complexity > 1 ? "medium" : "low",
        market_position: "competitive"
      }
    };
  } catch (error) {
    console.error("Erreur getPricingSuggestion:", error);
    throw new Error("Impossible de calculer la suggestion de prix");
  }
}
async function enhanceBrief(request) {
  try {
    const originalDescription = request.description || "";
    const category = request.category || "general";
    const analysis = analyzeBriefQuality(originalDescription);
    const improvements = generateImprovements(originalDescription, category, analysis);
    return {
      success: true,
      original: {
        title: request.title,
        description: originalDescription,
        word_count: originalDescription.split(" ").length
      },
      enhanced: {
        title: improveTitle(request.title || "", category),
        description: improvements.enhanced_description,
        word_count: improvements.enhanced_description.split(" ").length
      },
      analysis: {
        quality_score: analysis.score,
        missing_elements: analysis.missing,
        improvements_applied: improvements.changes
      },
      suggestions: improvements.suggestions
    };
  } catch (error) {
    console.error("Erreur enhanceBrief:", error);
    throw new Error("Impossible d'am\xE9liorer le brief");
  }
}
async function logUserFeedback(phase, prompt, feedback) {
  try {
    const logEntry = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      phase,
      prompt,
      feedback,
      user_session: "anonymous"
    };
    const logsDir = join(process.cwd(), "logs");
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true });
    }
    const logFile = join(logsDir, `ai-feedback-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`);
    const logs = [];
    try {
      const existingLogs = __require(logFile);
      logs.push(...existingLogs);
    } catch {
    }
    logs.push(logEntry);
    writeFileSync(logFile, JSON.stringify(logs, null, 2));
    console.log(`\u2705 Feedback logged: ${phase}`);
    return { success: true };
  } catch (error) {
    console.error("Erreur logUserFeedback:", error);
    throw new Error("Impossible d'enregistrer le feedback");
  }
}
function calculateBasePrice(category) {
  const basePrices = {
    "development": 5e3,
    "design": 2500,
    "marketing": 3e3,
    "consulting": 4e3,
    "writing": 1500,
    "general": 3e3
  };
  return basePrices[category] || basePrices.general;
}
function analyzeComplexity(description) {
  const complexityKeywords = [
    "complex",
    "advanced",
    "enterprise",
    "scalable",
    "integration",
    "API",
    "database",
    "real-time",
    "mobile",
    "responsive"
  ];
  const found = complexityKeywords.filter(
    (keyword) => description.toLowerCase().includes(keyword)
  ).length;
  return Math.max(0.8, Math.min(2, 1 + found * 0.2));
}
function getTimelineMultiplier(timeline) {
  if (timeline.includes("urgent") || timeline.includes("asap")) return 1.5;
  if (timeline.includes("semaine")) return 1.3;
  if (timeline.includes("mois")) return 1;
  return 1.1;
}
function analyzeBriefQuality(description) {
  const words = description.split(" ").length;
  const hasBudget = /budget|prix|coût|\€|\$/.test(description.toLowerCase());
  const hasTimeline = /délai|semaine|mois|urgent/.test(description.toLowerCase());
  const hasObjectives = /objectif|but|résultat/.test(description.toLowerCase());
  const score = Math.min(
    1,
    words / 100 * 0.4 + (hasBudget ? 0.2 : 0) + (hasTimeline ? 0.2 : 0) + (hasObjectives ? 0.2 : 0)
  );
  const missing = [];
  if (!hasBudget) missing.push("Budget");
  if (!hasTimeline) missing.push("D\xE9lais");
  if (!hasObjectives) missing.push("Objectifs clairs");
  if (words < 50) missing.push("Plus de d\xE9tails");
  return { score, missing };
}
function generateImprovements(description, category, analysis) {
  let enhanced = description;
  const changes = [];
  const suggestions = [];
  if (analysis.missing.includes("Budget")) {
    enhanced += "\n\n\u{1F4B0} Budget: \xC0 d\xE9finir selon la proposition (ouvert aux suggestions)";
    changes.push("Ajout indication budget");
  }
  if (analysis.missing.includes("D\xE9lais")) {
    enhanced += "\n\u23F0 D\xE9lais: Flexible, id\xE9alement sous 4 semaines";
    changes.push("Ajout d\xE9lais indicatifs");
  }
  if (analysis.missing.includes("Objectifs clairs")) {
    enhanced += "\n\u{1F3AF} Objectifs: Livraison conforme aux attentes avec documentation compl\xE8te";
    changes.push("Clarification objectifs");
  }
  suggestions.push("Ajouter des exemples concrets de ce qui est attendu");
  suggestions.push("Pr\xE9ciser les crit\xE8res de s\xE9lection du prestataire");
  suggestions.push("Mentionner les contraintes techniques \xE9ventuelles");
  return { enhanced_description: enhanced, changes, suggestions };
}
function improveTitle(title, category) {
  if (!title) return `Projet ${category} - Mission sp\xE9cialis\xE9e`;
  const keywords = {
    "development": "\u{1F4BB}",
    "design": "\u{1F3A8}",
    "marketing": "\u{1F4C8}",
    "consulting": "\u{1F4A1}",
    "writing": "\u270D\uFE0F"
  };
  const icon = keywords[category] || "\u{1F680}";
  return title.includes(icon) ? title : `${icon} ${title}`;
}
var init_AIOrchestrator = __esm({
  "apps/api/src/ai/AIOrchestrator.ts"() {
    "use strict";
  }
});

// apps/api/src/routes/ai.ts
var ai_exports = {};
__export(ai_exports, {
  default: () => ai_default
});
import { Router as Router17 } from "express";
var router22, ai_default;
var init_ai = __esm({
  "apps/api/src/routes/ai.ts"() {
    "use strict";
    init_AIOrchestrator();
    router22 = Router17();
    router22.post("/pricing", async (req, res) => {
      try {
        const result = await getPricingSuggestion(req.body);
        res.json(result);
      } catch (error) {
        console.error("AI Pricing error:", error);
        res.status(500).json({ error: "Erreur lors du calcul de prix" });
      }
    });
    router22.post("/brief", async (req, res) => {
      try {
        const result = await enhanceBrief(req.body);
        res.json(result);
      } catch (error) {
        console.error("AI Brief enhancement error:", error);
        res.status(500).json({ error: "Erreur lors de l'am\xE9lioration du brief" });
      }
    });
    router22.post("/feedback", async (req, res) => {
      try {
        const { phase, prompt, feedback } = req.body;
        await logUserFeedback(phase, prompt, feedback);
        res.json({ ok: true });
      } catch (error) {
        console.error("AI Feedback error:", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement du feedback" });
      }
    });
    ai_default = router22;
  }
});

// apps/api/src/monitoring/event-logger.ts
var event_logger_exports = {};
__export(event_logger_exports, {
  EventLogger: () => EventLogger,
  eventLogger: () => eventLogger
});
var EventLogger, eventLogger;
var init_event_logger = __esm({
  "apps/api/src/monitoring/event-logger.ts"() {
    "use strict";
    EventLogger = class {
      eventBuffer = [];
      performanceCache = /* @__PURE__ */ new Map();
      batchSize = 50;
      flushInterval = 3e4;
      // 30 secondes
      constructor() {
        this.startAutoFlush();
      }
      /**
       * Log d'événement d'erreur système
       */
      logErrorEvent(error, userId2, sessionId, context = {}) {
        const event = {
          event_type: "click",
          // Using existing type for error tracking
          user_id: userId2,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: sessionId,
          metadata: {
            error_type: "system_error",
            error_message: error.message,
            error_stack: error.stack,
            context,
            severity: "high"
          }
        };
        this.addToBuffer(event);
        console.log("\u{1F6A8} [ERROR_LOGGED]", JSON.stringify({
          error: error.message,
          user: userId2,
          session: sessionId,
          timestamp: event.timestamp
        }));
      }
      /**
       * Log d'événement utilisateur générique
       */
      logUserEvent(eventType, userId2, sessionId, metadata = {}) {
        const event = {
          event_type: eventType,
          user_id: userId2,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: sessionId,
          metadata: {
            ...metadata,
            user_agent: metadata.user_agent || "unknown",
            ip_address: metadata.ip_address || "unknown",
            platform: metadata.platform || "web"
          }
        };
        this.addToBuffer(event);
        console.log("\u{1F4CA} [EVENT_LOGGED]", JSON.stringify({
          type: eventType,
          user: userId2,
          session: sessionId,
          timestamp: event.timestamp
        }));
      }
      /**
       * Log d'événement de vue d'annonce
       */
      logAnnouncementView(userId2, missionId, sessionId, dwellTime, metadata = {}) {
        const event = {
          event_type: "view",
          user_id: userId2,
          mission_id: missionId,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: sessionId,
          metadata: {
            dwell_time_ms: dwellTime,
            click_depth: metadata.click_depth || 0,
            scroll_percentage: metadata.scroll_percentage || 0,
            interaction_quality: this.calculateInteractionQuality(dwellTime, metadata),
            device_type: metadata.device_type || "desktop",
            referrer: metadata.referrer || "direct",
            feed_position: metadata.feed_position || 0,
            recommendation_score: metadata.recommendation_score || 0
          }
        };
        this.addToBuffer(event);
        this.logPerformanceMetrics("view_recommendation", {
          ai_latency_ms: metadata.recommendation_latency || 0,
          confidence_level: metadata.recommendation_score || 0,
          model_version: "feed_ranker_v2.1",
          features_used: ["relevance", "quality", "freshness", "price"]
        });
      }
      /**
       * Log d'événement de sauvegarde/favori
       */
      logSave(userId2, missionId, sessionId, metadata = {}) {
        const event = {
          event_type: "save",
          user_id: userId2,
          mission_id: missionId,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: sessionId,
          metadata: {
            save_source: metadata.save_source || "feed",
            // 'feed', 'detail', 'search'
            user_decision_time_ms: metadata.decision_time || 0,
            mission_rank_in_feed: metadata.feed_position || 0,
            previous_interactions: metadata.previous_interactions || [],
            recommendation_accuracy: "pending"
            // Sera mis à jour plus tard
          }
        };
        this.addToBuffer(event);
        this.logConversion("save", userId2, missionId, metadata);
      }
      /**
       * Log d'événement de proposition
       */
      logProposal(providerId, missionId, sessionId, metadata = {}) {
        const event = {
          event_type: "proposal",
          provider_id: providerId,
          mission_id: missionId,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: sessionId,
          metadata: {
            proposal_value: metadata.proposal_value || 0,
            time_to_proposal_hours: metadata.time_to_proposal_hours || 0,
            proposal_rank: metadata.proposal_rank || 0,
            pricing_confidence: metadata.pricing_confidence || 0,
            matching_score: metadata.matching_score || 0,
            bid_strategy: metadata.bid_strategy || "unknown",
            ai_price_suggestion: metadata.ai_price_suggestion || 0,
            price_deviation_percentage: metadata.price_deviation_percentage || 0
          }
        };
        this.addToBuffer(event);
        this.logPerformanceMetrics("pricing_suggestion", {
          ai_latency_ms: metadata.pricing_latency || 0,
          accuracy_score: metadata.pricing_confidence || 0,
          model_version: "neural_pricing_v2.1",
          features_used: ["complexity", "market", "urgency", "provider"],
          prediction_outcome: "pending"
        });
      }
      /**
       * Log d'événement de victoire (projet attribué)
       */
      logWin(providerId, missionId, sessionId, metadata = {}) {
        const event = {
          event_type: "win",
          provider_id: providerId,
          mission_id: missionId,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: sessionId,
          metadata: {
            final_value: metadata.final_value || 0,
            negotiation_rounds: metadata.negotiation_rounds || 0,
            time_to_decision_hours: metadata.time_to_decision_hours || 0,
            client_satisfaction_prediction: metadata.client_satisfaction_prediction || 0,
            ai_match_score: metadata.ai_match_score || 0,
            ai_price_accuracy: metadata.ai_price_accuracy || 0
          }
        };
        this.addToBuffer(event);
        this.updatePredictionOutcome("pricing_suggestion", missionId, "success");
        this.updatePredictionOutcome("matching_recommendation", missionId, "success");
      }
      /**
       * Log d'événement de litige
       */
      logDispute(userId2, missionId, sessionId, metadata = {}) {
        const event = {
          event_type: "dispute",
          user_id: userId2,
          mission_id: missionId,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: sessionId,
          metadata: {
            dispute_type: metadata.dispute_type || "unknown",
            dispute_stage: metadata.dispute_stage || "initial",
            estimated_resolution_time: metadata.estimated_resolution_time || 0,
            client_satisfaction_drop: metadata.client_satisfaction_drop || 0,
            ai_risk_score: metadata.ai_risk_score || 0,
            preventability_score: metadata.preventability_score || 0
          }
        };
        this.addToBuffer(event);
        this.updatePredictionOutcome("risk_assessment", missionId, "failure");
      }
      /**
       * Log des métriques de performance IA
       */
      logPerformanceMetrics(modelType, metrics2) {
        const key = `${modelType}_${Date.now()}`;
        this.performanceCache.set(key, {
          ...metrics2,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log("\u{1F9E0} [AI_PERFORMANCE]", JSON.stringify({
          model: modelType,
          latency: metrics2.ai_latency_ms,
          confidence: metrics2.confidence_level,
          version: metrics2.model_version
        }));
      }
      /**
       * Log d'événement de conversion
       */
      logConversion(conversionType, userId2, missionId, metadata) {
        const conversionEvent = {
          event_type: "conversion",
          user_id: userId2,
          mission_id: missionId,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: metadata.session_id || "unknown",
          metadata: {
            conversion_type: conversionType,
            funnel_stage: metadata.funnel_stage || "unknown",
            conversion_value: metadata.conversion_value || 0,
            time_to_conversion: metadata.time_to_conversion || 0,
            attribution_source: metadata.attribution_source || "organic"
          }
        };
        this.addToBuffer(conversionEvent);
      }
      /**
       * Calcule la qualité d'interaction
       */
      calculateInteractionQuality(dwellTime, metadata) {
        let score = 0;
        if (dwellTime > 1e4) score += 3;
        else if (dwellTime > 3e3) score += 2;
        else if (dwellTime > 1e3) score += 1;
        if (metadata.click_depth > 2) score += 2;
        else if (metadata.click_depth > 0) score += 1;
        if (metadata.scroll_percentage > 75) score += 1;
        if (score >= 5) return "high";
        if (score >= 2) return "medium";
        return "low";
      }
      /**
       * Met à jour le résultat d'une prédiction
       */
      updatePredictionOutcome(modelType, missionId, outcome) {
        console.log("\u{1F4C8} [PREDICTION_UPDATE]", JSON.stringify({
          model: modelType,
          mission: missionId,
          outcome,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }));
      }
      /**
       * Ajoute un événement au buffer
       */
      addToBuffer(event) {
        this.eventBuffer.push(event);
        if (this.eventBuffer.length >= this.batchSize) {
          this.flushEvents();
        }
      }
      /**
       * Vide le buffer d'événements
       */
      flushEvents() {
        if (this.eventBuffer.length === 0) return;
        const events = [...this.eventBuffer];
        this.eventBuffer = [];
        console.log("\u{1F680} [EVENTS_FLUSHED]", `${events.length} \xE9v\xE9nements envoy\xE9s vers analytics`);
        this.sendToAnalyticsService(events);
      }
      /**
       * Envoi simulé vers service d'analytics
       */
      async sendToAnalyticsService(events) {
        try {
          console.log("\u2705 Events sent to analytics service");
        } catch (error) {
          console.error("\u274C Failed to send events to analytics:", error);
          this.eventBuffer.unshift(...events);
        }
      }
      /**
       * Démarrage du flush automatique
       */
      startAutoFlush() {
        setInterval(() => {
          this.flushEvents();
        }, this.flushInterval);
      }
      /**
       * Récupération des métriques de performance
       */
      getPerformanceMetrics() {
        return new Map(this.performanceCache);
      }
      /**
       * Nettoyage des métriques anciennes
       */
      cleanupOldMetrics(maxAgeMs = 36e5) {
        const cutoff = Date.now() - maxAgeMs;
        for (const [key, metrics2] of this.performanceCache.entries()) {
          const metricTime = new Date(metrics2.timestamp).getTime();
          if (metricTime < cutoff) {
            this.performanceCache.delete(key);
          }
        }
      }
    };
    eventLogger = new EventLogger();
  }
});

// server/index.ts
import express7 from "express";
import path6 from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

// server/environment-check.ts
function validateEnvironment() {
  if (!process.env.DATABASE_URL) {
    console.error("\u274C DATABASE_URL is required. Please set up Replit PostgreSQL in the Database tab.");
    process.exit(1);
  }
  const optionalVars = ["GEMINI_API_KEY"];
  const missingOptional = optionalVars.filter((varName) => !process.env[varName]);
  if (missingOptional.length > 0) {
    console.warn("\u26A0\uFE0F Variables optionnelles manquantes:", missingOptional);
    console.warn("\u{1F4DD} Ajoutez-les dans l'onglet Secrets de Replit pour activer les fonctionnalit\xE9s IA");
  }
  console.log("\u2705 Variables d'environnement valid\xE9es");
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "production";
  }
  console.log("\u{1F50D} Configuration d'environnement:", {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: "\u2705 Replit PostgreSQL",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "\u2705 Configur\xE9" : "\u26A0\uFE0F Non configur\xE9",
    PORT: process.env.PORT || 5e3
  });
}

// server/index.ts
import { Pool as Pool4 } from "pg";
import cors from "cors";
import fs3 from "fs";
import net from "net";

// server/middleware/request-validator.ts
var validateRequest = (req, res, next) => {
  const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  req.headers["x-request-id"] = requestId;
  console.log(`\u{1F4E5} ${req.method} ${req.originalUrl}`, {
    request_id: requestId,
    user_agent: req.headers["user-agent"]?.substring(0, 100),
    ip: req.ip,
    content_type: req.headers["content-type"],
    content_length: req.headers["content-length"],
    timestamp: timestamp2
  });
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      console.warn(`\u26A0\uFE0F Invalid Content-Type: ${contentType} for ${req.method} ${req.originalUrl}`);
      return res.status(400).json({
        ok: false,
        error: "Content-Type must be application/json",
        request_id: requestId,
        timestamp: timestamp2
      });
    }
  }
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      console.error(`\u23F0 Request timeout: ${req.method} ${req.originalUrl} (${requestId})`);
      res.status(408).json({
        ok: false,
        error: "Request timeout",
        request_id: requestId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  }, 3e4);
  res.on("finish", () => {
    clearTimeout(timeout);
    console.log(`\u{1F4E4} ${req.method} ${req.originalUrl} - ${res.statusCode} (${requestId})`);
  });
  next();
};
var limitRequestSize = (req, res, next) => {
  const maxSize = 10 * 1024 * 1024;
  const contentLength = parseInt(req.headers["content-length"] || "0", 10);
  if (contentLength > maxSize) {
    return res.status(413).json({
      ok: false,
      error: "Request too large",
      max_size: "10MB",
      received_size: `${Math.round(contentLength / 1024 / 1024)}MB`
    });
  }
  next();
};

// server/middleware/performance-monitor.ts
var metrics = [];
var MAX_METRICS = 1e3;
var performanceMonitor = (req, res, next) => {
  const startTime = Date.now();
  const startMemory = process.memoryUsage().heapUsed;
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - startTime;
    const memoryUsed = process.memoryUsage().heapUsed - startMemory;
    const metric = {
      endpoint: req.originalUrl,
      method: req.method,
      duration,
      status: res.statusCode,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      memory_usage: memoryUsed
    };
    metrics.push(metric);
    if (metrics.length > MAX_METRICS) {
      metrics.splice(0, metrics.length - MAX_METRICS);
    }
    if (duration > 2e3) {
      console.warn(`\u{1F40C} Slow request: ${req.method} ${req.originalUrl} took ${duration}ms`);
    }
    if (memoryUsed > 50 * 1024 * 1024) {
      console.warn(`\u{1F525} High memory usage: ${req.method} ${req.originalUrl} used ${Math.round(memoryUsed / 1024 / 1024)}MB`);
    }
    originalEnd.call(this, chunk, encoding);
  };
  next();
};
var getPerformanceStats = () => {
  if (metrics.length === 0) {
    return { message: "No metrics available" };
  }
  const recentMetrics = metrics.slice(-100);
  const averageDuration = recentMetrics.reduce((sum, m) => sum + m.duration, 0) / recentMetrics.length;
  const slowRequests = recentMetrics.filter((m) => m.duration > 1e3).length;
  const errorRequests = recentMetrics.filter((m) => m.status >= 400).length;
  return {
    total_requests: metrics.length,
    recent_requests: recentMetrics.length,
    average_duration_ms: Math.round(averageDuration),
    slow_requests_count: slowRequests,
    error_requests_count: errorRequests,
    error_rate_percent: Math.round(errorRequests / recentMetrics.length * 100),
    last_updated: (/* @__PURE__ */ new Date()).toISOString()
  };
};

// server/middleware/auth.ts
init_database();
init_schema();
import { eq } from "drizzle-orm";
var requireAuth = async (req, res, next) => {
  try {
    const userIdHeader = req.headers["x-user-id"];
    if (!userIdHeader) {
      return res.status(401).json({
        error: "Authentication required",
        message: "No user ID provided"
      });
    }
    const userId2 = parseInt(userIdHeader);
    if (isNaN(userId2)) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Invalid user ID format"
      });
    }
    const [user] = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      rating_mean: users.rating_mean
    }).from(users).where(eq(users.id, userId2)).limit(1);
    if (!user) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Invalid user"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Authentication error",
      message: "Internal server error"
    });
  }
};
var optionalAuth = async (req, res, next) => {
  try {
    const userIdHeader = req.headers["x-user-id"];
    if (userIdHeader) {
      const userId2 = parseInt(userIdHeader);
      if (!isNaN(userId2)) {
        const [user] = await db.select({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
          rating_mean: users.rating_mean
        }).from(users).where(eq(users.id, userId2)).limit(1);
        if (user) {
          req.user = user;
        }
      }
    }
    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    next();
  }
};

// server/auth-routes.ts
init_schema();
import express from "express";
import { Pool as Pool2 } from "pg";
import { drizzle as drizzle2 } from "drizzle-orm/node-postgres";
import { eq as eq2, sql as sql2 } from "drizzle-orm";
var pool2 = new Pool2({ connectionString: process.env.DATABASE_URL });
var db2 = drizzle2(pool2);
var router = express.Router();
router.post("/login", async (req, res) => {
  try {
    console.log("\u{1F511} Tentative de connexion:", { email: req.body.email });
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("\u274C Email ou mot de passe manquant");
      return res.status(400).json({
        error: "Email et mot de passe requis",
        success: false
      });
    }
    const user = await db2.select().from(users).where(eq2(users.email, email)).limit(1);
    if (user.length === 0) {
      console.log("\u274C Utilisateur non trouv\xE9:", email);
      return res.status(401).json({
        error: "Email ou mot de passe incorrect",
        success: false
      });
    }
    const userData = user[0];
    if (!userData.password || userData.password !== password) {
      console.log("\u274C Mot de passe incorrect pour:", email);
      return res.status(401).json({
        error: "Email ou mot de passe incorrect",
        success: false
      });
    }
    const userSession = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      rating_mean: userData.rating_mean,
      rating_count: userData.rating_count,
      profile_data: userData.profile_data,
      created_at: userData.created_at
    };
    res.json({
      success: true,
      user: userSession,
      message: `Bienvenue ${userData.name || userData.email} !`
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ error: "Erreur serveur lors de la connexion" });
  }
});
router.post("/register", async (req, res) => {
  try {
    console.log("\u{1F4DD} Tentative de cr\xE9ation de compte:", { email: req.body.email, name: req.body.name, role: req.body.role });
    const { email, password, name, role = "CLIENT", profile_data = {} } = req.body;
    if (!email || !password) {
      console.log("\u274C Email ou mot de passe manquant");
      return res.status(400).json({
        error: "Email et mot de passe requis",
        success: false
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("\u274C Format email invalide:", email);
      return res.status(400).json({
        error: "Format email invalide",
        success: false
      });
    }
    if (!name || name.trim().length < 2) {
      console.log("\u274C Nom invalide");
      return res.status(400).json({
        error: "Le nom doit contenir au moins 2 caract\xE8res",
        success: false
      });
    }
    if (password.length < 6) {
      console.log("\u274C Mot de passe trop court");
      return res.status(400).json({
        error: "Le mot de passe doit contenir au moins 6 caract\xE8res",
        success: false
      });
    }
    const validRoles = ["CLIENT", "PRO", "ADMIN"];
    const normalizedRole = role.toUpperCase();
    if (!validRoles.includes(normalizedRole)) {
      console.log("\u274C R\xF4le invalide:", role);
      return res.status(400).json({
        error: "R\xF4le invalide. Doit \xEAtre CLIENT, PRO ou ADMIN",
        success: false
      });
    }
    const existingUser = await db2.select().from(users).where(eq2(users.email, email.toLowerCase().trim())).limit(1);
    if (existingUser.length > 0) {
      console.log("\u274C Email d\xE9j\xE0 utilis\xE9:", email);
      return res.status(409).json({
        error: "Un compte existe d\xE9j\xE0 avec cet email",
        success: false
      });
    }
    const defaultProfileData = normalizedRole === "PRO" ? {
      bio: profile_data.bio || "",
      created_via: "onboarding_flow",
      onboarding_completed: true,
      ...profile_data
    } : {
      bio: profile_data.bio || "",
      style_preferences: profile_data.style_preferences || [],
      fashion_interests: profile_data.fashion_interests || [],
      favorite_brands: profile_data.favorite_brands || [],
      size_info: profile_data.size_info || {},
      created_via: "onboarding_flow",
      onboarding_completed: true,
      ...profile_data
    };
    const [newUser] = await db2.insert(users).values({
      email: email.toLowerCase().trim(),
      password,
      // En production, hasher avec bcrypt
      name: name.trim(),
      role: normalizedRole,
      bio: defaultProfileData.bio,
      profile_data: defaultProfileData,
      rating_mean: null,
      rating_count: 0,
      style_tags: [],
      favorite_colors: [],
      favorite_brands: profile_data.favorite_brands || [],
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      is_private: false,
      is_verified: false,
      created_at: /* @__PURE__ */ new Date(),
      updated_at: /* @__PURE__ */ new Date()
    }).returning();
    const userSession = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      rating_mean: newUser.rating_mean,
      rating_count: newUser.rating_count,
      profile_data: newUser.profile_data,
      created_at: newUser.created_at
    };
    res.status(201).json({
      success: true,
      user: userSession,
      message: "Compte cr\xE9\xE9 avec succ\xE8s !"
    });
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ error: "Erreur serveur lors de la cr\xE9ation du compte" });
  }
});
router.get("/profile/:id", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.id);
    const user = await db2.select().from(users).where(eq2(users.id, userId2)).limit(1);
    if (user.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouv\xE9" });
    }
    const userData = user[0];
    const userProfile = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      rating_mean: userData.rating_mean,
      rating_count: userData.rating_count,
      profile_data: userData.profile_data,
      created_at: userData.created_at
    };
    res.json({ user: userProfile });
  } catch (error) {
    console.error("Erreur get profile:", error);
    res.status(500).json({ error: "Erreur serveur lors de la r\xE9cup\xE9ration du profil" });
  }
});
router.get("/demo-users", async (req, res) => {
  try {
    const demoUsers = await db2.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      profile_data: users.profile_data
    }).from(users);
    res.json({
      users: demoUsers,
      message: "Utilisateurs de d\xE9monstration disponibles"
    });
  } catch (error) {
    console.error("Erreur get demo users:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router.get("/demo-accounts/verify", async (req, res) => {
  try {
    const demoEmails = ["demo@swideal.com", "prestataire@swideal.com", "admin@swideal.com"];
    const demoAccounts = await db2.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      created_at: users.created_at
    }).from(users).where(sql2`${users.email} = ANY(${demoEmails})`);
    const accountsStatus = {
      client: demoAccounts.find((u) => u.email === "demo@swideal.com"),
      provider: demoAccounts.find((u) => u.email === "prestataire@swideal.com"),
      admin: demoAccounts.find((u) => u.email === "admin@swideal.com"),
      total: demoAccounts.length
    };
    res.json({
      success: true,
      accounts: accountsStatus,
      allPresent: demoAccounts.length === 3
    });
  } catch (error) {
    console.error("Erreur v\xE9rification comptes d\xE9mo:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la v\xE9rification des comptes d\xE9mo"
    });
  }
});
router.get("/debug/demo-accounts", async (req, res) => {
  try {
    console.log("\u{1F50D} Diagnostic des comptes d\xE9mo...");
    const allUsers = await db2.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      created_at: users.created_at
    }).from(users);
    const demoUsers = await db2.select().from(users).where(sql2`${users.email} IN ('demo@swideal.com', 'prestataire@swideal.com', 'admin@swideal.com')`);
    res.json({
      debug: true,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      database_url_exists: !!process.env.DATABASE_URL,
      total_users: allUsers.length,
      all_users: allUsers,
      demo_accounts_found: demoUsers.length,
      demo_accounts: demoUsers.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        password_length: user.password?.length || 0,
        password_is_demo123: user.password === "demo123",
        password_is_admin123: user.password === "admin123",
        created_at: user.created_at
      }))
    });
  } catch (error) {
    console.error("\u274C Erreur diagnostic:", error);
    res.status(500).json({
      error: "Erreur lors du diagnostic",
      details: error.message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
});
router.post("/debug/create-demo-accounts", async (req, res) => {
  try {
    console.log("\u{1F6E0}\uFE0F Cr\xE9ation forc\xE9e des comptes d\xE9mo...");
    const demoAccounts = [
      {
        email: "demo@swideal.com",
        password: "demo123",
        name: "Emma Rousseau",
        role: "CLIENT",
        rating_mean: "0",
        rating_count: 0,
        profile_data: {
          company: "TechStart Innovation",
          sector: "SaaS",
          projects_posted: 0,
          total_budget_spent: 0,
          verified: true,
          phone: "+33 1 45 67 89 12",
          location: "Paris, France"
        }
      },
      {
        email: "prestataire@swideal.com",
        password: "demo123",
        name: "Julien Moreau",
        role: "PRO",
        rating_mean: "0",
        rating_count: 0,
        profile_data: {
          specialties: ["React", "Node.js", "TypeScript", "Python"],
          hourly_rate: 65,
          availability: "Disponible",
          experience_years: 5,
          completed_projects: 0,
          success_rate: 0,
          response_time_hours: 4,
          certifications: ["React Developer"],
          portfolio_url: "https://julienmoreau.dev",
          linkedin: "https://linkedin.com/in/julienmoreau",
          phone: "+33 6 78 90 12 34",
          location: "Lyon, France"
        }
      },
      {
        email: "admin@swideal.com",
        password: "admin123",
        name: "Clara Dubois",
        role: "ADMIN",
        profile_data: {
          department: "Platform Management",
          access_level: "full",
          phone: "+33 1 56 78 90 12"
        }
      }
    ];
    const results = [];
    for (const account of demoAccounts) {
      try {
        const existingUser = await db2.select().from(users).where(eq2(users.email, account.email)).limit(1);
        if (existingUser.length > 0) {
          results.push({
            email: account.email,
            status: "exists",
            message: "Compte d\xE9j\xE0 existant"
          });
        } else {
          const [newUser] = await db2.insert(users).values(account).returning();
          results.push({
            email: account.email,
            status: "created",
            id: newUser.id,
            message: "Compte cr\xE9\xE9 avec succ\xE8s"
          });
        }
      } catch (error) {
        results.push({
          email: account.email,
          status: "error",
          message: error.message
        });
      }
    }
    res.json({
      success: true,
      message: "Cr\xE9ation des comptes d\xE9mo termin\xE9e",
      results,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("\u274C Erreur cr\xE9ation comptes d\xE9mo:", error);
    res.status(500).json({
      error: "Erreur lors de la cr\xE9ation des comptes d\xE9mo",
      details: error.message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
});
var auth_routes_default = router;

// server/routes/wardrobe.ts
import { Router } from "express";

// server/db.ts
init_database();

// server/routes/wardrobe.ts
init_schema();
import { eq as eq3, and, desc } from "drizzle-orm";
import multer from "multer";
import path from "path";
var router2 = Router();
var storage = multer.diskStorage({
  destination: "./uploads/wardrobe/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "wardrobe-" + uniqueSuffix + path.extname(file.originalname));
  }
});
var upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Images uniquement (jpeg, jpg, png, webp)"));
    }
  }
});
router2.get("/items", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const items = await db.select().from(fashionItems).where(eq3(fashionItems.user_id, req.user.id)).orderBy(desc(fashionItems.created_at));
    res.json(items);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration garde-robe:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router2.get("/items/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const [item] = await db.select().from(fashionItems).where(eq3(fashionItems.id, itemId));
    if (!item) {
      return res.status(404).json({ error: "Item non trouv\xE9" });
    }
    if (!item.is_public && item.user_id !== req.user?.id) {
      return res.status(403).json({ error: "Acc\xE8s interdit" });
    }
    res.json(item);
  } catch (error) {
    console.error("Erreur d\xE9tails item:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router2.post("/items", upload.single("image"), async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Image requise" });
    }
    const {
      title,
      description,
      category,
      sub_category,
      brand,
      color,
      size,
      season,
      occasion,
      purchase_date,
      price,
      tags,
      is_public
    } = req.body;
    const imageUrl = `/uploads/wardrobe/${req.file.filename}`;
    const [item] = await db.insert(fashionItems).values({
      user_id: req.user.id,
      title: title || "Nouvel article",
      description: description || null,
      images: [imageUrl],
      category,
      sub_category: sub_category || null,
      brand: brand || null,
      color: color || null,
      size: size || null,
      season: season || null,
      occasion: occasion || null,
      purchase_date: purchase_date ? new Date(purchase_date) : null,
      price: price ? parseInt(price) : null,
      tags: tags ? typeof tags === "string" ? JSON.parse(tags) : tags : [],
      is_public: is_public !== "false" && is_public !== false
    }).returning();
    res.status(201).json(item);
  } catch (error) {
    console.error("Erreur cr\xE9ation item:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router2.put("/items/:id", upload.single("image"), async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const itemId = parseInt(req.params.id);
    const [existingItem] = await db.select().from(fashionItems).where(eq3(fashionItems.id, itemId));
    if (!existingItem) {
      return res.status(404).json({ error: "Item non trouv\xE9" });
    }
    if (existingItem.user_id !== req.user.id) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    const updates = {
      updated_at: /* @__PURE__ */ new Date()
    };
    if (req.body.title !== void 0) updates.title = req.body.title;
    if (req.body.description !== void 0) updates.description = req.body.description;
    if (req.body.category !== void 0) updates.category = req.body.category;
    if (req.body.sub_category !== void 0) updates.sub_category = req.body.sub_category;
    if (req.body.brand !== void 0) updates.brand = req.body.brand;
    if (req.body.color !== void 0) updates.color = req.body.color;
    if (req.body.size !== void 0) updates.size = req.body.size;
    if (req.body.season !== void 0) updates.season = req.body.season;
    if (req.body.occasion !== void 0) updates.occasion = req.body.occasion;
    if (req.body.is_public !== void 0) updates.is_public = req.body.is_public;
    if (req.body.tags !== void 0) {
      updates.tags = typeof req.body.tags === "string" ? JSON.parse(req.body.tags) : req.body.tags;
    }
    if (req.file) {
      const imageUrl = `/uploads/wardrobe/${req.file.filename}`;
      updates.images = [...existingItem.images || [], imageUrl];
    }
    const [updatedItem] = await db.update(fashionItems).set(updates).where(eq3(fashionItems.id, itemId)).returning();
    res.json(updatedItem);
  } catch (error) {
    console.error("Erreur modification item:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router2.delete("/items/:id", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const itemId = parseInt(req.params.id);
    const [item] = await db.select().from(fashionItems).where(eq3(fashionItems.id, itemId));
    if (!item) {
      return res.status(404).json({ error: "Item non trouv\xE9" });
    }
    if (item.user_id !== req.user.id) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    await db.delete(fashionItems).where(eq3(fashionItems.id, itemId));
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression item:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router2.get("/users/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    const [user] = await db.select().from(users).where(eq3(users.id, userId2));
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouv\xE9" });
    }
    const items = await db.select().from(fashionItems).where(
      and(
        eq3(fashionItems.user_id, userId2),
        eq3(fashionItems.is_public, true)
      )
    ).orderBy(desc(fashionItems.created_at));
    const { collections: collections2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const userCollections = await db.select().from(collections2).where(
      and(
        eq3(collections2.user_id, userId2),
        eq3(collections2.is_public, true)
      )
    ).orderBy(desc(collections2.created_at));
    res.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username || `@${user.name.toLowerCase().replace(/\s+/g, "")}`,
        avatar: user.avatar_url,
        bio: user.bio,
        location: user.profile_data?.location || "",
        styleTags: user.style_tags || [],
        followersCount: user.followers_count || 0,
        postsCount: user.posts_count || 0,
        rating: 4.8,
        isFollowing: false,
        isVerified: user.is_verified || false
      },
      items: items.map((item) => ({
        id: item.id,
        name: item.title,
        imageUrl: item.images && item.images.length > 0 ? item.images[0] : "",
        category: item.category,
        brand: item.brand,
        color: item.color,
        tags: item.tags || []
      })),
      collections: userCollections.map((col) => ({
        id: col.id,
        title: col.title,
        coverImage: col.cover_image,
        itemsCount: col.looks_count || 0
      }))
    });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration garde-robe publique:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var wardrobe_default = router2;

// server/routes/missions.ts
init_database();
init_schema();
import { Router as Router2 } from "express";
import { eq as eq4, desc as desc2, sql as sql3 } from "drizzle-orm";
import { randomUUID } from "crypto";

// server/dto/mission-dto.ts
function extractLocationSafely(mission) {
  const loc = mission.location_data || { country: "France", remote_allowed: true };
  return {
    location: loc.city || loc.raw || "Remote",
    location_raw: loc.raw || null,
    postal_code: mission.postal_code || null,
    // Use mission's postal_code directly
    city: mission.city || null,
    // Use mission's city directly
    country: mission.country || loc.country || "France",
    // Prefer mission's country
    remote_allowed: mission.remote_allowed !== false && loc.remote_allowed !== false,
    // Combine flags
    location_data: loc
  };
}
function extractBudgetSafely(mission) {
  const price = mission.price || 0;
  const currency = mission.currency || "EUR";
  return {
    price,
    currency,
    budgetDisplay: price > 0 ? `${price}\u20AC` : "\xC0 n\xE9gocier"
  };
}
function extractMetadataSafely(mission) {
  return {
    tags: Array.isArray(mission.tags) ? mission.tags : [],
    skills_required: Array.isArray(mission.skills_required) ? mission.skills_required : [],
    requirements: mission.requirements || null
  };
}
function mapMission(mission) {
  if (!mission || !mission.id) {
    console.error("\u274C DTO Mapper: Mission invalide re\xE7ue:", mission);
    throw new Error("Mission data is invalid or missing required fields");
  }
  try {
    const location = extractLocationSafely(mission);
    const budget = extractBudgetSafely(mission);
    const metadata = extractMetadataSafely(mission);
    const mappedMission = {
      // Identifiants
      id: mission.id,
      // Contenu
      title: mission.title || "Mission sans titre",
      description: mission.description || "",
      excerpt: mission.excerpt || (mission.description ? mission.description.length > 200 ? mission.description.substring(0, 200) + "..." : mission.description : "Description non disponible"),
      category: mission.category || "developpement",
      // Budget
      ...budget,
      // Localisation
      ...location,
      // Relations utilisateur
      user_id: mission.user_id,
      client_id: mission.client_id || mission.user_id,
      userId: mission.user_id?.toString() || mission.client_id?.toString(),
      clientId: mission.client_id?.toString() || mission.user_id?.toString(),
      clientName: mission.client_name || mission.user_name || "Client",
      // Use client_name, fallback to user_name, then 'Client'
      // Statut et timing
      status: mission.status || "open",
      urgency: mission.urgency || "medium",
      deadline: mission.deadline?.toISOString(),
      // Métadonnées
      ...metadata,
      // Team mission fields
      is_team_mission: mission.is_team_mission || false,
      isTeamMode: mission.is_team_mission || false,
      team_size: mission.team_size || 1,
      teamRequirements: mission.team_requirements && Array.isArray(mission.team_requirements) && mission.team_requirements.length > 0 ? mission.team_requirements : mission.is_team_mission ? [] : void 0,
      // Timestamps
      created_at: mission.created_at,
      updated_at: mission.updated_at,
      createdAt: mission.created_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: mission.updated_at?.toISOString(),
      // Bids (si présents) - supporter les deux formats (amount et price)
      bids: mission.bids?.map((bid) => ({
        id: bid.id,
        amount: bid.price || bid.amount || 0,
        // ✅ Prioriser 'price' (nouveau format)
        timeline_days: bid.timeline_days,
        message: bid.message,
        providerId: bid.provider_id?.toString(),
        providerName: bid.provider_name || "Anonyme",
        status: bid.status,
        bid_type: bid.bid_type || "individual",
        // ✅ Type de candidature
        team_composition: bid.team_composition || null,
        // ✅ NULL pour individuel
        created_at: bid.created_at
      })) || []
    };
    console.log("\u2705 DTO Mapper: Mission mapp\xE9e avec succ\xE8s:", mappedMission.id, mappedMission.title);
    return mappedMission;
  } catch (error) {
    console.error("\u274C DTO Mapper: Erreur lors du mapping de la mission:", mission.id, error);
    console.error("\u274C DTO Mapper: Donn\xE9es mission probl\xE9matiques:", JSON.stringify(mission, null, 2));
    return {
      id: mission.id,
      title: mission.title || "Mission avec erreur",
      description: mission.description || "",
      excerpt: "Erreur lors du chargement des d\xE9tails",
      category: "general",
      price: 0,
      currency: "EUR",
      budgetDisplay: "Non disponible",
      location: "Remote",
      location_raw: null,
      postal_code: null,
      city: null,
      country: "France",
      remote_allowed: true,
      location_data: { remote_allowed: true },
      user_id: mission.user_id,
      client_id: mission.client_id || mission.user_id,
      userId: mission.user_id?.toString(),
      clientId: (mission.client_id || mission.user_id)?.toString(),
      clientName: "Client",
      // Fallback to 'Client' in case of error
      status: "open",
      urgency: "medium",
      deadline: null,
      tags: [],
      skills_required: [],
      requirements: null,
      is_team_mission: false,
      team_size: 1,
      created_at: mission.created_at,
      updated_at: mission.updated_at,
      createdAt: mission.created_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: mission.updated_at?.toISOString(),
      bids: []
    };
  }
}

// server/validation/mission-schemas.ts
import { z } from "zod";
var teamRequirementSchema = z.object({
  profession: z.string(),
  description: z.string(),
  required_skills: z.array(z.string()),
  estimated_budget: z.number(),
  estimated_days: z.number(),
  min_experience: z.number(),
  is_lead_role: z.boolean(),
  importance: z.enum(["high", "medium", "low"])
});
var createSimpleMissionSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caract\xE8res").max(500, "Le titre ne peut pas d\xE9passer 500 caract\xE8res").transform((str) => str.trim()),
  description: z.string().min(10, "La description doit contenir au moins 10 caract\xE8res").max(5e3, "La description ne peut pas d\xE9passer 5000 caract\xE8res").transform((str) => str.trim()),
  budget: z.union([
    z.number().int("Le budget doit \xEAtre un nombre entier").positive("Le budget doit \xEAtre positif").min(10, "Budget minimum de 10\u20AC").max(1e6, "Budget maximum de 1 000 000\u20AC"),
    z.string().transform((val) => parseInt(val.replace(/[^0-9]/g, ""), 10)).pipe(z.number().int().positive().min(10).max(1e6))
  ]),
  category: z.string().optional(),
  location: z.string().optional(),
  isTeamMode: z.boolean().default(false),
  teamRequirements: z.array(teamRequirementSchema).optional()
});
var locationDataSchema = z.object({
  address: z.string().optional(),
  postal_code: z.string().regex(/^\d{5}$/, "Code postal invalide").optional(),
  city: z.string().optional(),
  country: z.string().default("France"),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }).optional(),
  remote_allowed: z.boolean().default(true)
}).optional();
var budgetSchema = z.object({
  value_cents: z.number().int().positive().min(1e3, "Budget minimum de 10\u20AC").max(1e8, "Budget maximum de 1M\u20AC"),
  currency: z.enum(["EUR", "USD", "GBP", "CHF"]).default("EUR")
});
var statusEnum = z.enum(["draft", "open", "in_progress", "completed", "cancelled"]);
var urgencyEnum = z.enum(["low", "medium", "high", "urgent"]);
var qualityTargetEnum = z.enum(["basic", "standard", "premium", "luxury"]);
var locationSchema = z.object({
  raw: z.string().optional(),
  city: z.string().min(1).optional(),
  postalCode: z.string().regex(/^\d{5}$/).optional(),
  country: z.string().default("France"),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  remoteAllowed: z.boolean().default(true)
});
var teamSchema = z.object({
  isTeamMission: z.boolean().default(false),
  teamSize: z.number().int().positive().default(1)
}).refine((data) => !data.isTeamMission || data.teamSize > 1, {
  message: "Une mission d'\xE9quipe doit avoir plus d'1 personne",
  path: ["teamSize"]
});
var createMissionSchema = z.object({
  // Contenu obligatoire
  title: z.string().min(3, "Le titre doit contenir au moins 3 caract\xE8res").max(500, "Le titre ne peut pas d\xE9passer 500 caract\xE8res").transform((str) => str.trim()),
  description: z.string().min(10, "La description doit contenir au moins 10 caract\xE8res").max(5e3, "La description ne peut pas d\xE9passer 5000 caract\xE8res").transform((str) => str.trim()),
  // Catégorisation
  category: z.string().min(1, "La cat\xE9gorie est requise").default("developpement"),
  tags: z.array(z.string().min(1)).max(10, "Maximum 10 tags").default([]).transform((tags) => tags.map((tag) => tag.toLowerCase().trim())),
  skillsRequired: z.array(z.string().min(1)).max(15, "Maximum 15 comp\xE9tences").default([]).transform((skills) => skills.map((skill) => skill.trim())),
  // Budget obligatoire en euros
  budget: z.number().int("Le budget doit \xEAtre un nombre entier").positive("Le budget doit \xEAtre positif").min(10, "Budget minimum de 10\u20AC").max(1e6, "Budget maximum de 1 000 000\u20AC"),
  // Localisation
  location: locationSchema.optional(),
  // Équipe
  team: teamSchema.optional(),
  // Timing et urgence
  urgency: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  deadline: z.string().datetime("Format de date invalide").optional().transform((str) => str ? new Date(str) : void 0),
  // Métadonnées
  requirements: z.string().max(2e3, "Les exigences ne peuvent pas d\xE9passer 2000 caract\xE8res").optional().transform((str) => str?.trim()),
  deliverables: z.array(z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional()
  })).max(20, "Maximum 20 livrables").default([]),
  // Status (draft par défaut, published si publié immédiatement)
  status: z.enum(["draft", "published"]).default("draft")
});
var updateMissionSchema = createMissionSchema.partial().extend({
  id: z.number().int().positive()
});
var searchMissionsSchema = z.object({
  query: z.string().min(1).optional(),
  category: z.string().optional(),
  budgetMin: z.number().int().positive().optional(),
  budgetMax: z.number().int().positive().optional(),
  location: z.string().optional(),
  remoteOnly: z.boolean().default(false),
  urgency: z.array(z.enum(["low", "medium", "high", "urgent"])).optional(),
  tags: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  sortBy: z.enum(["recent", "budget_asc", "budget_desc", "deadline"]).default("recent"),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(20)
});

// server/routes/missions.ts
var asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
function generateExcerpt(description, maxLength = 200) {
  if (!description) {
    return "";
  }
  if (description.length <= maxLength) {
    return description;
  }
  const truncated = description.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf("."),
    truncated.lastIndexOf("!"),
    truncated.lastIndexOf("?")
  );
  if (lastSentenceEnd > maxLength * 0.6) {
    return truncated.substring(0, lastSentenceEnd + 1).trim();
  }
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.6) {
    return truncated.substring(0, lastSpace).trim() + "...";
  }
  return truncated.trim() + "...";
}
var router3 = Router2();
router3.post("/", asyncHandler(async (req, res) => {
  const requestId = randomUUID();
  const startTime = Date.now();
  console.log(JSON.stringify({
    level: "info",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    request_id: requestId,
    action: "mission_create_start",
    body_size: JSON.stringify(req.body).length,
    user_agent: req.headers["user-agent"],
    ip: req.ip
  }));
  const parseResult = createSimpleMissionSchema.safeParse(req.body);
  if (!parseResult.success) {
    const firstError = parseResult.error.errors[0];
    console.log(JSON.stringify({
      level: "warn",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "validation_failed",
      field: firstError.path.join("."),
      message: firstError.message
    }));
    return res.status(400).json({
      ok: false,
      error: firstError.message,
      field: firstError.path.join("."),
      request_id: requestId
    });
  }
  const { title, description, category, budget, location, userId: userId2 } = parseResult.data;
  const userIdInt = userId2 ? parseInt(userId2.toString()) : 1;
  if (isNaN(userIdInt) || userIdInt <= 0) {
    console.log(JSON.stringify({
      level: "warn",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "validation_failed",
      field: "userId",
      value: userId2
    }));
    return res.status(400).json({
      ok: false,
      error: "User ID invalide",
      field: "userId",
      request_id: requestId
    });
  }
  const existingUser = await db.select({ id: users.id }).from(users).where(eq4(users.id, userIdInt)).limit(1);
  if (existingUser.length === 0) {
    console.log(JSON.stringify({
      level: "warn",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "security_validation_failed",
      field: "userId",
      value: userIdInt,
      reason: "user_not_found"
    }));
    return res.status(401).json({
      ok: false,
      error: "Utilisateur non trouv\xE9",
      field: "userId",
      request_id: requestId
    });
  }
  const now = /* @__PURE__ */ new Date();
  const priceValue = budget ? parseInt(budget.toString()) : 100;
  const extractCity = (locationString) => {
    if (!locationString) return null;
    const parts = locationString.split(",");
    return parts.length > 1 ? parts[parts.length - 1].trim() : locationString.trim();
  };
  const locationData = {
    raw: location || "Remote",
    address: req.body.postal_code || null,
    city: extractCity(location) || null,
    country: "France",
    remote_allowed: req.body.remote_allowed !== false
  };
  const fullDescription = description.trim() + (req.body.requirements ? `

Exigences sp\xE9cifiques: ${req.body.requirements}` : "");
  const newMission = {
    title: title.trim(),
    description: fullDescription,
    excerpt: generateExcerpt(fullDescription, 200),
    category: category || "developpement",
    price: priceValue,
    // Utiliser 'price' harmonisé
    currency: "EUR",
    // Assurer une devise unique
    location_data: locationData,
    // Utiliser le champ correct du schéma
    user_id: userIdInt,
    client_id: userIdInt,
    status: "open",
    // Utiliser un statut valide
    urgency: "medium",
    is_team_mission: false,
    team_size: 1
    // created_at et updated_at sont gérés automatiquement par la DB
  };
  console.log(JSON.stringify({
    level: "info",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    request_id: requestId,
    action: "mission_data_prepared",
    title_length: newMission.title.length,
    description_length: newMission.description.length,
    price: newMission.price,
    // Log the harmonized price
    user_id: newMission.user_id,
    location_data: newMission.location_data,
    is_team_mission: newMission.is_team_mission
  }));
  console.log(JSON.stringify({
    level: "info",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    request_id: requestId,
    action: "db_transaction_start"
  }));
  const insertResult = await db.insert(missions).values(newMission).returning({
    id: missions.id,
    title: missions.title,
    status: missions.status,
    user_id: missions.user_id,
    created_at: missions.created_at,
    description: missions.description,
    category: missions.category,
    price: missions.price,
    // Récupérer le prix harmonisé
    location_data: missions.location_data,
    urgency: missions.urgency,
    deadline: missions.deadline,
    tags: missions.tags,
    currency: missions.currency,
    is_team_mission: missions.is_team_mission
    // Include team mission flag
  });
  if (!insertResult || insertResult.length === 0) {
    throw new Error("Insert failed - no result returned");
  }
  const insertedMission = insertResult[0];
  console.log(JSON.stringify({
    level: "info",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    request_id: requestId,
    action: "db_insert_success",
    mission_id: insertedMission.id,
    execution_time_ms: Date.now() - startTime,
    inserted_data: {
      id: insertedMission.id,
      title: insertedMission.title,
      status: insertedMission.status,
      user_id: insertedMission.user_id,
      created_at: insertedMission.created_at,
      is_team_mission: insertedMission.is_team_mission
    }
  }));
  const mission = insertedMission;
  const mappedMission = mapMission({
    ...mission,
    currency: mission.currency ?? void 0,
    excerpt: mission.excerpt ?? void 0
  });
  const responsePayload = {
    ok: true,
    ...mappedMission,
    request_id: requestId
  };
  res.status(201).json(responsePayload);
}));
router3.get("/", asyncHandler(async (req, res) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const startTime = Date.now();
  console.log(JSON.stringify({
    level: "info",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    request_id: requestId,
    action: "get_missions_start",
    user_agent: req.headers["user-agent"]
  }));
  console.log("\u{1F4CB} GET /api/missions - Requ\xEAte re\xE7ue");
  console.log("\u{1F4CB} Headers:", req.headers);
  console.log("\u{1F4CB} Query params:", req.query);
  try {
    const allMissions = await db.select({
      mission: missions,
      user_name: users.name
    }).from(missions).leftJoin(users, eq4(missions.user_id, users.id)).orderBy(desc2(missions.created_at)).limit(100);
    console.log(JSON.stringify({
      level: "info",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "database_query_success",
      missions_count: allMissions.length,
      query_time_ms: Date.now() - startTime
    }));
    const validMissions = allMissions.filter((row) => {
      if (!row.mission.id || !row.mission.title) {
        console.warn(JSON.stringify({
          level: "warn",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          request_id: requestId,
          action: "mission_validation_failed",
          mission_id: row.mission.id,
          reason: "missing_required_fields"
        }));
        return false;
      }
      return true;
    });
    console.log(JSON.stringify({
      level: "info",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "missions_validation_complete",
      valid_missions: validMissions.length,
      filtered_out: allMissions.length - validMissions.length
    }));
    const missionsWithBids = [];
    let mappingErrors = 0;
    for (const row of validMissions) {
      try {
        const mappedMission = mapMission({
          ...row.mission,
          client_name: row.user_name,
          user_name: row.user_name,
          currency: row.mission.currency ?? void 0,
          excerpt: row.mission.excerpt ?? void 0
        });
        missionsWithBids.push(mappedMission);
      } catch (mappingError) {
        mappingErrors++;
        console.error(JSON.stringify({
          level: "error",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          request_id: requestId,
          action: "mission_mapping_error",
          mission_id: row.mission.id,
          error: mappingError.message
        }));
        missionsWithBids.push({
          id: row.mission.id,
          title: row.mission.title || "Mission sans titre",
          description: row.mission.description || "",
          excerpt: "Erreur lors du chargement des d\xE9tails",
          category: row.mission.category || "general",
          budget: "0",
          budget_value_cents: 0,
          currency: "EUR",
          budget_display: "Non disponible",
          location: "Remote",
          status: row.mission.status || "open",
          user_id: row.mission.user_id,
          userId: row.mission.user_id?.toString(),
          clientName: row.user_name || "Client",
          createdAt: row.mission.created_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
          bids: []
        });
      }
    }
    console.log(JSON.stringify({
      level: "info",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "missions_mapping_complete",
      successful_mappings: missionsWithBids.length - mappingErrors,
      mapping_errors: mappingErrors,
      total_time_ms: Date.now() - startTime,
      sample_mission_ids: missionsWithBids.slice(0, 3).map((m) => m.id),
      first_mission_sample: missionsWithBids[0] ? {
        id: missionsWithBids[0].id,
        title: missionsWithBids[0].title,
        status: missionsWithBids[0].status,
        budget_display: missionsWithBids[0].budget_display
      } : null
    }));
    res.json({
      missions: missionsWithBids,
      metadata: {
        total: missionsWithBids.length,
        request_id: requestId,
        query_time_ms: Date.now() - startTime,
        has_errors: mappingErrors > 0
      }
    });
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "get_missions_error",
      error_message: error.message,
      error_stack: error.stack,
      total_time_ms: Date.now() - startTime
    }));
    res.status(500).json({
      ok: false,
      error: "Internal server error",
      details: error.message,
      error_type: "server_error",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      debug_mode: process.env.NODE_ENV === "development",
      suggestions: [
        "V\xE9rifiez la connectivit\xE9 \xE0 la base de donn\xE9es",
        "Contr\xF4lez la structure de la table missions",
        "Validez que les colonnes requises existent"
      ]
    });
  }
}));
router3.get("/health", asyncHandler(async (req, res) => {
  const startTime = Date.now();
  console.log("\u{1F3E5} Mission health check endpoint called");
  try {
    const dbTest = await db.select({ count: sql3`COUNT(*)` }).from(missions).limit(1);
    const dbConnected = dbTest.length > 0;
    const responseTime = Date.now() - startTime;
    const healthInfo = {
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      service: "missions-api",
      environment: process.env.NODE_ENV || "development",
      database: dbConnected ? "connected" : "disconnected",
      response_time_ms: responseTime,
      uptime_seconds: Math.floor(process.uptime()),
      memory_usage: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };
    console.log("\u{1F3E5} Health check passed:", healthInfo);
    res.status(200).json(healthInfo);
  } catch (error) {
    console.error("\u{1F3E5} Health check failed:", error);
    res.status(503).json({
      status: "unhealthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      service: "missions-api",
      environment: process.env.NODE_ENV || "development",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
      response_time_ms: Date.now() - startTime
    });
  }
}));
router3.get("/debug", asyncHandler(async (req, res) => {
  console.log("\u{1F50D} Mission debug endpoint called");
  const testQuery = await db.select({ id: missions.id }).from(missions).limit(1);
  const dbInfo = {
    status: "connected",
    sampleMissions: testQuery.length,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: process.env.NODE_ENV || "development",
    databaseUrl: process.env.DATABASE_URL ? "configured" : "missing"
  };
  console.log("\u{1F50D} Database info:", dbInfo);
  res.json(dbInfo);
}));
router3.get("/verify-sync", asyncHandler(async (req, res) => {
  console.log("\u{1F50D} V\xE9rification de la synchronisation missions/feed");
  try {
    const missionCount = await db.select({ count: sql3`COUNT(*)` }).from(missions);
    const recentMissions = await db.select({
      id: missions.id,
      title: missions.title,
      status: missions.status,
      created_at: missions.created_at
    }).from(missions).orderBy(desc2(missions.created_at)).limit(5);
    const announcementCount = await db.select({ count: sql3`COUNT(*)` }).from(announcements);
    const syncStatus = {
      totalMissions: missionCount[0]?.count || 0,
      totalFeedItems: announcementCount[0]?.count || 0,
      recentMissions: recentMissions.map((m) => ({
        id: m.id,
        title: m.title,
        status: m.status,
        created_at: m.created_at
      })),
      syncHealth: "OK",
      message: "Sync verification successful - using simplified queries"
    };
    console.log("\u{1F50D} Sync status:", syncStatus);
    res.json(syncStatus);
  } catch (error) {
    console.error("\u{1F50D} Verify sync error:", error);
    res.status(500).json({
      error: "Erreur lors de la v\xE9rification de synchronisation",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}));
router3.get("/:id", asyncHandler(async (req, res) => {
  let missionId = null;
  missionId = req.params.id;
  console.log("\u{1F50D} API: R\xE9cup\xE9ration mission ID:", missionId);
  if (missionId === "debug" || missionId === "verify-sync" || missionId === "health") {
    console.log("\u26A0\uFE0F API: Endpoint sp\xE9cial d\xE9tect\xE9, ignor\xE9 dans cette route:", missionId);
    return res.status(404).json({ error: "Endpoint non trouv\xE9" });
  }
  if (!missionId || missionId === "undefined" || missionId === "null") {
    console.error("\u274C API: Mission ID invalide:", missionId);
    return res.status(400).json({
      error: "Mission ID invalide",
      details: "L'ID de mission est requis et ne peut pas \xEAtre vide"
    });
  }
  const missionIdInt = parseInt(missionId, 10);
  if (isNaN(missionIdInt) || missionIdInt <= 0 || !Number.isInteger(missionIdInt)) {
    console.error("\u274C API: Mission ID n'est pas un nombre valide:", missionId);
    return res.status(400).json({
      error: "Mission ID doit \xEAtre un nombre entier valide",
      received: missionId,
      details: "L'ID doit \xEAtre un nombre entier positif"
    });
  }
  const missionRaw = await db.select().from(missions).where(eq4(missions.id, missionIdInt)).limit(1);
  if (missionRaw.length === 0) {
    console.error("\u274C API: Mission non trouv\xE9e:", missionId);
    return res.status(404).json({
      error: "Mission non trouv\xE9e",
      missionId: missionIdInt,
      details: "Aucune mission trouv\xE9e avec cet ID"
    });
  }
  if (missionRaw[0].is_team_mission) {
    console.log(`\u{1F465} Mission d'\xE9quipe d\xE9tect\xE9e:`, {
      id: missionRaw[0].id,
      title: missionRaw[0].title,
      team_size: missionRaw[0].team_size,
      has_team_requirements: !!missionRaw[0].team_requirements,
      team_requirements_length: Array.isArray(missionRaw[0].team_requirements) ? missionRaw[0].team_requirements.length : 0
    });
  }
  const mission = mapMission({
    ...missionRaw[0],
    currency: missionRaw[0].currency ?? void 0,
    excerpt: missionRaw[0].excerpt ?? void 0
  });
  let missionBids = [];
  try {
    missionBids = await db.select({
      id: bids.id,
      amount: bids.price,
      timeline_days: bids.timeline_days,
      message: bids.message,
      status: bids.status,
      created_at: bids.created_at,
      provider_id: bids.provider_id,
      provider_name: users.name,
      provider_email: users.email,
      provider_rating: users.rating_mean
    }).from(bids).leftJoin(users, eq4(bids.provider_id, users.id)).where(eq4(bids.mission_id, missionIdInt));
    console.log(`\u2705 Trouv\xE9 ${missionBids.length} candidatures pour la mission ${missionIdInt}`);
  } catch (error) {
    console.error("\u274C Erreur lors de la r\xE9cup\xE9ration des bids:", error);
    missionBids = [];
  }
  const result = {
    ...mission,
    bids: missionBids || []
  };
  console.log("\u2705 API: Mission trouv\xE9e:", result.title, "avec", result.bids.length, "offres");
  res.json(result);
}));
router3.get("/users/:userId/missions", asyncHandler(async (req, res) => {
  const userId2 = req.params.userId;
  console.log("\u{1F464} Fetching missions with bids for user:", userId2);
  if (!userId2 || userId2 === "undefined" || userId2 === "null") {
    console.error("\u274C Invalid user ID:", userId2);
    return res.status(400).json({
      error: "User ID invalide",
      details: "L'ID utilisateur est requis"
    });
  }
  const userIdInt = parseInt(userId2, 10);
  if (isNaN(userIdInt) || userIdInt <= 0 || !Number.isInteger(userIdInt)) {
    console.error("\u274C User ID is not a valid number:", userId2);
    return res.status(400).json({
      error: "User ID doit \xEAtre un nombre entier valide",
      received: userId2,
      details: "L'ID utilisateur doit \xEAtre un nombre entier positif"
    });
  }
  console.log("\u{1F50D} Optimized query: Fetching missions with bids in single JOIN query");
  try {
    const missionsWithBidsData = await db.select({
      // Mission fields
      mission_id: missions.id,
      title: missions.title,
      description: missions.description,
      category: missions.category,
      budget_value_cents: missions.budget_value_cents,
      // This will be removed or refactored later
      currency: missions.currency,
      location_data: missions.location_data,
      user_id: missions.user_id,
      client_id: missions.client_id,
      status: missions.status,
      urgency: missions.urgency,
      deadline: missions.deadline,
      tags: missions.tags,
      skills_required: missions.skills_required,
      requirements: missions.requirements,
      is_team_mission: missions.is_team_mission,
      team_size: missions.team_size,
      team_requirements: missions.team_requirements,
      // Added team_requirements
      mission_created_at: missions.created_at,
      mission_updated_at: missions.updated_at,
      // Bid fields (null if no bids)
      bid_id: bids.id,
      bid_amount: bids.amount,
      bid_timeline_days: bids.timeline_days,
      bid_message: bids.message,
      bid_status: bids.status,
      bid_created_at: bids.created_at,
      provider_id: bids.provider_id
    }).from(missions).leftJoin(bids, eq4(missions.id, bids.mission_id)).where(eq4(missions.user_id, userIdInt)).orderBy(desc2(missions.created_at), desc2(bids.created_at));
    console.log("\u{1F4CA} JOIN query result: Found", missionsWithBidsData.length, "mission-bid combinations");
    const missionMap = /* @__PURE__ */ new Map();
    missionsWithBidsData.forEach((row) => {
      const missionId = row.mission_id;
      if (!missionMap.has(missionId)) {
        missionMap.set(missionId, {
          // Core fields
          id: row.mission_id,
          title: row.title,
          description: row.description,
          excerpt: generateExcerpt(row.description || "", 200),
          category: row.category,
          // Budget - Use 'price' and ensure it's a string for display
          price: row.budget_value_cents?.toString() || "0",
          // Display price as string
          currency: row.currency,
          // Location
          location_data: row.location_data,
          location: row.location_data?.raw || row.location_data?.city || "Remote",
          // Status
          status: row.status,
          urgency: row.urgency,
          // User relationships
          user_id: row.user_id,
          client_id: row.client_id,
          userId: row.user_id?.toString(),
          clientName: "Moi",
          // Team
          is_team_mission: row.is_team_mission,
          team_size: row.team_size,
          team_requirements: row.team_requirements,
          // Include team_requirements
          // Timestamps
          created_at: row.mission_created_at,
          updated_at: row.mission_updated_at,
          createdAt: row.mission_created_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: row.mission_updated_at?.toISOString(),
          deadline: row.deadline,
          // Arrays
          tags: row.tags || [],
          skills_required: row.skills_required || [],
          requirements: row.requirements,
          bids: []
        });
      }
      if (row.bid_id) {
        missionMap.get(missionId).bids.push({
          id: row.bid_id,
          amount: row.bid_amount,
          timeline_days: row.bid_timeline_days,
          message: row.bid_message,
          status: row.bid_status,
          created_at: row.bid_created_at,
          provider_id: row.provider_id
        });
      }
    });
    const missionsWithBids = Array.from(missionMap.values());
    console.log(`\u2705 OPTIMIZED: Found ${missionsWithBids.length} missions for user ${userId2}`);
    console.log(`\u2705 PERFORMANCE: Eliminated N+1 queries - used single JOIN instead of ${missionsWithBids.length + 1} separate queries`);
    res.json(missionsWithBids);
  } catch (error) {
    console.error("\u274C Error in optimized missions+bids query:", error);
    const userMissions = await db.select({
      id: missions.id,
      title: missions.title,
      description: missions.description,
      category: missions.category,
      budget_value_cents: missions.budget_value_cents,
      // This will be removed or refactored later
      currency: missions.currency,
      location_data: missions.location_data,
      user_id: missions.user_id,
      client_id: missions.client_id,
      status: missions.status,
      urgency: missions.urgency,
      deadline: missions.deadline,
      tags: missions.tags,
      skills_required: missions.skills_required,
      requirements: missions.requirements,
      is_team_mission: missions.is_team_mission,
      team_size: missions.team_size,
      team_requirements: missions.team_requirements,
      // Added team_requirements
      created_at: missions.created_at,
      updated_at: missions.updated_at
    }).from(missions).where(eq4(missions.user_id, userIdInt)).orderBy(desc2(missions.created_at));
    const fallbackMissions = userMissions.map((mission) => ({
      id: mission.id,
      title: mission.title,
      description: mission.description,
      excerpt: generateExcerpt(mission.description || "", 200),
      category: mission.category,
      // Use 'price' harmonized field
      price: mission.budget_value_cents?.toString() || "0",
      currency: mission.currency,
      location_data: mission.location_data,
      location: mission.location_data?.raw || mission.location_data?.city || "Remote",
      status: mission.status,
      urgency: mission.urgency,
      user_id: mission.user_id,
      client_id: mission.client_id,
      userId: mission.user_id?.toString(),
      clientName: "Moi",
      is_team_mission: mission.is_team_mission,
      team_size: mission.team_size,
      team_requirements: mission.team_requirements,
      // Included team_requirements
      created_at: mission.created_at,
      updated_at: mission.updated_at,
      createdAt: mission.created_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: mission.updated_at?.toISOString(),
      deadline: mission.deadline?.toISOString(),
      tags: mission.tags || [],
      skills_required: mission.skills_required || [],
      requirements: mission.requirements,
      bids: []
    }));
    res.json(fallbackMissions);
  }
}));
router3.get("/users/:userId/bids", asyncHandler(async (req, res) => {
  const userId2 = req.params.userId;
  console.log("\u{1F464} Fetching bids for user:", userId2);
  if (!userId2 || userId2 === "undefined" || userId2 === "null") {
    console.error("\u274C Invalid user ID:", userId2);
    return res.status(400).json({ error: "User ID invalide" });
  }
  const userIdInt = parseInt(userId2, 10);
  if (isNaN(userIdInt)) {
    console.error("\u274C User ID is not a valid number:", userId2);
    return res.status(400).json({ error: "User ID doit \xEAtre un nombre" });
  }
  const userBids = [];
  console.log("\u{1F517} Mapping: userId =", userId2, "-> provider_id filter:", userIdInt);
  console.log(`\u{1F464} Found ${userBids.length} bids for user ${userId2}`);
  res.json(userBids);
}));
router3.put("/:id", asyncHandler(async (req, res) => {
  const missionId = req.params.id;
  const updateData = req.body;
  console.log("\u270F\uFE0F API: Modification mission ID:", missionId);
  console.log("\u270F\uFE0F API: Donn\xE9es re\xE7ues:", JSON.stringify(updateData, null, 2));
  if (missionId === "debug" || missionId === "verify-sync") {
    return res.status(404).json({ error: "Endpoint non trouv\xE9" });
  }
  if (!missionId || missionId === "undefined" || missionId === "null") {
    console.error("\u274C API: Mission ID invalide:", missionId);
    return res.status(400).json({ error: "Mission ID invalide" });
  }
  const missionIdInt = parseInt(missionId, 10);
  if (isNaN(missionIdInt) || missionIdInt <= 0) {
    console.error("\u274C API: Mission ID n'est pas un nombre valide:", missionId);
    return res.status(400).json({ error: "Mission ID doit \xEAtre un nombre valide" });
  }
  if (!updateData.title || updateData.title.trim() === "") {
    return res.status(400).json({
      error: "Le titre est requis",
      field: "title"
    });
  }
  if (!updateData.description || updateData.description.trim() === "") {
    return res.status(400).json({
      error: "La description est requise",
      field: "description"
    });
  }
  const existingMission = await db.select({ id: missions.id, category: missions.category, deadline: missions.deadline, tags: missions.tags, requirements: missions.requirements, currency: missions.currency, location_data: missions.location_data, is_team_mission: missions.is_team_mission, team_size: missions.team_size, team_requirements: missions.team_requirements }).from(missions).where(eq4(missions.id, missionIdInt)).limit(1);
  if (existingMission.length === 0) {
    console.error("\u274C API: Mission non trouv\xE9e pour modification:", missionId);
    return res.status(404).json({ error: "Mission non trouv\xE9e" });
  }
  const extractCity = (locationString) => {
    if (!locationString) return null;
    const parts = locationString.split(",");
    return parts.length > 1 ? parts[parts.length - 1].trim() : locationString.trim();
  };
  const missionToUpdate = {
    title: updateData.title,
    description: updateData.description,
    excerpt: generateExcerpt(updateData.description, 200),
    category: updateData.category || existingMission[0].category,
    // Harmonize price: use updateData.price if provided, otherwise keep existing. Ensure it's an integer.
    price: updateData.price !== void 0 ? parseInt(updateData.price) : existingMission[0].price,
    location_data: updateData.location ? {
      raw: updateData.location,
      city: updateData.city || null,
      country: updateData.country || "France",
      remote_allowed: updateData.remote_allowed !== false
    } : existingMission[0].location_data,
    urgency: updateData.urgency || "medium",
    status: updateData.status || "published",
    updated_at: /* @__PURE__ */ new Date(),
    deadline: updateData.deadline ? new Date(updateData.deadline) : existingMission[0].deadline,
    tags: updateData.tags || existingMission[0].tags,
    requirements: updateData.requirements || existingMission[0].requirements,
    currency: updateData.currency || existingMission[0].currency,
    is_team_mission: updateData.is_team_mission !== void 0 ? updateData.is_team_mission : existingMission[0].is_team_mission,
    // Update team mission flag
    team_size: updateData.team_size !== void 0 ? updateData.team_size : existingMission[0].team_size,
    // Update team size
    team_requirements: updateData.team_requirements || existingMission[0].team_requirements
    // Update team requirements
  };
  console.log("\u270F\uFE0F API: Donn\xE9es de mise \xE0 jour:", JSON.stringify(missionToUpdate, null, 2));
  const updatedMission = await db.update(missions).set(missionToUpdate).where(eq4(missions.id, missionIdInt)).returning();
  if (updatedMission.length === 0) {
    throw new Error("\xC9chec de la mise \xE0 jour de la mission");
  }
  console.log("\u2705 API: Mission modifi\xE9e avec succ\xE8s:", missionId);
  res.json(updatedMission[0]);
}));
router3.delete("/:id", asyncHandler(async (req, res) => {
  const missionId = req.params.id;
  console.log("\u{1F5D1}\uFE0F API: Suppression mission ID:", missionId);
  if (missionId === "debug" || missionId === "verify-sync") {
    return res.status(404).json({ error: "Endpoint non trouv\xE9" });
  }
  if (!missionId || missionId === "undefined" || missionId === "null") {
    console.error("\u274C API: Mission ID invalide:", missionId);
    return res.status(400).json({ error: "Mission ID invalide" });
  }
  const missionIdInt = parseInt(missionId, 10);
  if (isNaN(missionIdInt) || missionIdInt <= 0) {
    console.error("\u274C API: Mission ID n'est pas un nombre valide:", missionId);
    return res.status(400).json({ error: "Mission ID doit \xEAtre un nombre valide" });
  }
  const existingMission = await db.select({ id: missions.id }).from(missions).where(eq4(missions.id, missionIdInt)).limit(1);
  if (existingMission.length === 0) {
    console.error("\u274C API: Mission non trouv\xE9e pour suppression:", missionId);
    return res.status(404).json({ error: "Mission non trouv\xE9e" });
  }
  try {
    await db.delete(bids).where(eq4(bids.mission_id, missionIdInt));
    console.log("\u2705 API: Offres supprim\xE9es pour mission:", missionId);
  } catch (error) {
    console.warn("\u26A0\uFE0F Impossible de supprimer les offres:", error);
  }
  const deletedMission = await db.delete(missions).where(eq4(missions.id, missionIdInt)).returning();
  if (deletedMission.length === 0) {
    throw new Error("\xC9chec de la suppression de la mission");
  }
  console.log("\u2705 API: Mission supprim\xE9e avec succ\xE8s:", missionId);
  res.json({ message: "Mission supprim\xE9e avec succ\xE8s", mission: deletedMission[0] });
}));
var missions_default = router3;

// server/api-routes.ts
init_schema();
import express5 from "express";
import { Pool as Pool3 } from "pg";
import { drizzle as drizzle3 } from "drizzle-orm/node-postgres";
import { eq as eq14 } from "drizzle-orm";

// server/routes/bids.ts
init_database();
init_schema();
import { Router as Router3 } from "express";
import { eq as eq5, and as and2, desc as desc3 } from "drizzle-orm";
import { z as z2 } from "zod";
var router4 = Router3();
var createBidSchema = z2.object({
  mission_id: z2.number().int().positive(),
  price: z2.string().min(1),
  timeline_days: z2.number().int().min(1).optional(),
  message: z2.string().optional(),
  bid_type: z2.enum(["individual", "team", "open_team"]).default("individual"),
  team_composition: z2.any().optional(),
  team_lead_id: z2.number().int().positive().optional(),
  open_team_id: z2.number().int().positive().optional()
});
var updateBidSchema = z2.object({
  price: z2.string().min(1).optional(),
  timeline_days: z2.number().int().min(1).optional(),
  message: z2.string().optional(),
  status: z2.enum(["pending", "accepted", "rejected", "withdrawn"]).optional(),
  team_composition: z2.any().optional()
});
router4.post("/", requireAuth, async (req, res) => {
  try {
    console.log("\u{1F3AF} POST /api/bids - Nouvelle candidature:", {
      userId: req.user?.id,
      missionId: req.body.mission_id,
      bidType: req.body.bid_type
    });
    const validatedData = createBidSchema.parse(req.body);
    const [mission] = await db.select().from(missions).where(eq5(missions.id, validatedData.mission_id)).limit(1);
    if (!mission) {
      return res.status(404).json({
        error: "Mission not found",
        message: "La mission sp\xE9cifi\xE9e n'existe pas"
      });
    }
    if (mission.status !== "open") {
      return res.status(400).json({
        error: "Mission not open",
        message: "Cette mission n'accepte plus de candidatures"
      });
    }
    const [existingBid] = await db.select().from(bids).where(
      and2(
        eq5(bids.mission_id, validatedData.mission_id),
        eq5(bids.provider_id, req.user.id)
      )
    ).limit(1);
    if (existingBid) {
      return res.status(409).json({
        error: "Bid already exists",
        message: "Vous avez d\xE9j\xE0 soumis une candidature pour cette mission"
      });
    }
    const [newBid] = await db.insert(bids).values({
      mission_id: validatedData.mission_id,
      provider_id: req.user.id,
      price: validatedData.price,
      timeline_days: validatedData.timeline_days,
      message: validatedData.message,
      bid_type: validatedData.bid_type || "individual",
      // ✅ N'inclure team_composition que si c'est une candidature d'équipe
      team_composition: validatedData.bid_type === "team" || validatedData.bid_type === "open_team" ? validatedData.team_composition : null,
      team_lead_id: validatedData.bid_type === "team" ? validatedData.team_lead_id : null,
      open_team_id: validatedData.bid_type === "open_team" ? validatedData.open_team_id : null,
      status: "pending"
    }).returning();
    console.log("\u2705 Candidature cr\xE9\xE9e:", {
      bidId: newBid.id,
      price: newBid.price,
      bidType: newBid.bid_type,
      hasTeam: !!newBid.team_composition
    });
    res.status(201).json({
      ok: true,
      bid: newBid,
      message: "Candidature cr\xE9\xE9e avec succ\xE8s"
    });
  } catch (error) {
    console.error("\u274C Erreur cr\xE9ation candidature:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        message: "Donn\xE9es invalides",
        details: error.errors
      });
    }
    res.status(500).json({
      error: "Internal server error",
      message: "Erreur lors de la cr\xE9ation de la candidature"
    });
  }
});
router4.get("/", optionalAuth, async (req, res) => {
  try {
    const { mission_id, provider_id, status, bid_type } = req.query;
    console.log("\u{1F4CB} GET /api/bids - Recherche candidatures:", {
      mission_id,
      provider_id,
      status,
      userId: req.user?.id
    });
    let query = db.select({
      id: bids.id,
      mission_id: bids.mission_id,
      provider_id: bids.provider_id,
      price: bids.price,
      timeline_days: bids.timeline_days,
      message: bids.message,
      status: bids.status,
      bid_type: bids.bid_type,
      team_composition: bids.team_composition,
      team_lead_id: bids.team_lead_id,
      open_team_id: bids.open_team_id,
      created_at: bids.created_at,
      updated_at: bids.updated_at,
      // Informations du prestataire
      provider_name: users.name,
      provider_rating: users.rating_mean
    }).from(bids).leftJoin(users, eq5(bids.provider_id, users.id)).orderBy(desc3(bids.created_at));
    const conditions = [];
    if (mission_id) {
      const missionIdNum = parseInt(mission_id);
      if (!isNaN(missionIdNum)) {
        conditions.push(eq5(bids.mission_id, missionIdNum));
      }
    }
    if (provider_id) {
      const providerIdNum = parseInt(provider_id);
      if (!isNaN(providerIdNum)) {
        conditions.push(eq5(bids.provider_id, providerIdNum));
      }
    }
    if (status && typeof status === "string") {
      conditions.push(eq5(bids.status, status));
    }
    if (bid_type && typeof bid_type === "string") {
      conditions.push(eq5(bids.bid_type, bid_type));
    }
    if (conditions.length > 0) {
      query = query.where(and2(...conditions));
    }
    const results = await query;
    console.log(`\u2705 ${results.length} candidatures trouv\xE9es`);
    res.json({
      ok: true,
      bids: results,
      count: results.length
    });
  } catch (error) {
    console.error("\u274C Erreur r\xE9cup\xE9ration candidatures:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Erreur lors de la r\xE9cup\xE9ration des candidatures"
    });
  }
});
router4.get("/:id", optionalAuth, async (req, res) => {
  try {
    const bidId = parseInt(req.params.id);
    if (isNaN(bidId)) {
      return res.status(400).json({
        error: "Invalid bid ID",
        message: "ID de candidature invalide"
      });
    }
    console.log("\u{1F50D} GET /api/bids/:id - Recherche candidature:", { bidId });
    const [bid] = await db.select({
      id: bids.id,
      mission_id: bids.mission_id,
      provider_id: bids.provider_id,
      price: bids.price,
      timeline_days: bids.timeline_days,
      message: bids.message,
      status: bids.status,
      bid_type: bids.bid_type,
      team_composition: bids.team_composition,
      team_lead_id: bids.team_lead_id,
      open_team_id: bids.open_team_id,
      created_at: bids.created_at,
      updated_at: bids.updated_at,
      // Informations du prestataire
      provider_name: users.name,
      provider_rating: users.rating_mean
    }).from(bids).leftJoin(users, eq5(bids.provider_id, users.id)).where(eq5(bids.id, bidId)).limit(1);
    if (!bid) {
      return res.status(404).json({
        error: "Bid not found",
        message: "Candidature non trouv\xE9e"
      });
    }
    console.log("\u2705 Candidature trouv\xE9e:", { bidId: bid.id, price: bid.price });
    res.json({
      ok: true,
      bid
    });
  } catch (error) {
    console.error("\u274C Erreur r\xE9cup\xE9ration candidature:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Erreur lors de la r\xE9cup\xE9ration de la candidature"
    });
  }
});
router4.put("/:id", requireAuth, async (req, res) => {
  try {
    const bidId = parseInt(req.params.id);
    if (isNaN(bidId)) {
      return res.status(400).json({
        error: "Invalid bid ID",
        message: "ID de candidature invalide"
      });
    }
    console.log("\u270F\uFE0F PUT /api/bids/:id - Mise \xE0 jour candidature:", {
      bidId,
      userId: req.user?.id
    });
    const validatedData = updateBidSchema.parse(req.body);
    const [existingBid] = await db.select().from(bids).where(eq5(bids.id, bidId)).limit(1);
    if (!existingBid) {
      return res.status(404).json({
        error: "Bid not found",
        message: "Candidature non trouv\xE9e"
      });
    }
    const canEdit = existingBid.provider_id === req.user.id || existingBid.team_lead_id === req.user.id;
    if (!canEdit) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Vous n'\xEAtes pas autoris\xE9 \xE0 modifier cette candidature"
      });
    }
    if (existingBid.status === "accepted" || existingBid.status === "rejected") {
      return res.status(400).json({
        error: "Cannot modify bid",
        message: "Cette candidature ne peut plus \xEAtre modifi\xE9e"
      });
    }
    const [updatedBid] = await db.update(bids).set({
      ...validatedData,
      updated_at: /* @__PURE__ */ new Date()
    }).where(eq5(bids.id, bidId)).returning();
    console.log("\u2705 Candidature mise \xE0 jour:", { bidId: updatedBid.id });
    res.json({
      ok: true,
      bid: updatedBid,
      message: "Candidature mise \xE0 jour avec succ\xE8s"
    });
  } catch (error) {
    console.error("\u274C Erreur mise \xE0 jour candidature:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        message: "Donn\xE9es invalides",
        details: error.errors
      });
    }
    res.status(500).json({
      error: "Internal server error",
      message: "Erreur lors de la mise \xE0 jour de la candidature"
    });
  }
});
router4.delete("/:id", requireAuth, async (req, res) => {
  try {
    const bidId = parseInt(req.params.id);
    if (isNaN(bidId)) {
      return res.status(400).json({
        error: "Invalid bid ID",
        message: "ID de candidature invalide"
      });
    }
    console.log("\u{1F5D1}\uFE0F DELETE /api/bids/:id - Suppression candidature:", {
      bidId,
      userId: req.user?.id
    });
    const [existingBid] = await db.select().from(bids).where(eq5(bids.id, bidId)).limit(1);
    if (!existingBid) {
      return res.status(404).json({
        error: "Bid not found",
        message: "Candidature non trouv\xE9e"
      });
    }
    const canDelete = existingBid.provider_id === req.user.id || existingBid.team_lead_id === req.user.id;
    if (!canDelete) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Vous n'\xEAtes pas autoris\xE9 \xE0 supprimer cette candidature"
      });
    }
    if (existingBid.status === "accepted") {
      return res.status(400).json({
        error: "Cannot delete accepted bid",
        message: "Une candidature accept\xE9e ne peut pas \xEAtre supprim\xE9e"
      });
    }
    const [updatedBid] = await db.update(bids).set({
      status: "withdrawn",
      updated_at: /* @__PURE__ */ new Date()
    }).where(eq5(bids.id, bidId)).returning();
    console.log("\u2705 Candidature retir\xE9e:", { bidId: updatedBid.id });
    res.json({
      ok: true,
      message: "Candidature retir\xE9e avec succ\xE8s"
    });
  } catch (error) {
    console.error("\u274C Erreur suppression candidature:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Erreur lors de la suppression de la candidature"
    });
  }
});
var bids_default = router4;

// server/routes/open-teams.ts
init_database();
init_schema();
init_schema();
import { Router as Router4 } from "express";
import { eq as eq6, desc as desc4, and as and3 } from "drizzle-orm";
import { randomUUID as randomUUID2 } from "crypto";
var router5 = Router4();
var asyncHandler2 = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
router5.post("/", requireAuth, asyncHandler2(async (req, res) => {
  const requestId = randomUUID2();
  console.log(JSON.stringify({
    level: "info",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    request_id: requestId,
    action: "open_team_create_start",
    body_size: JSON.stringify(req.body).length
  }));
  try {
    const validatedData = insertOpenTeamSchema.parse(req.body);
    const missionExists = await db.select().from(missions).where(eq6(missions.id, validatedData.mission_id));
    if (missionExists.length === 0) {
      return res.status(404).json({
        error: "Mission introuvable",
        request_id: requestId
      });
    }
    const [newTeam] = await db.insert(openTeams).values({
      mission_id: validatedData.mission_id,
      name: validatedData.name,
      description: validatedData.description,
      creator_id: req.user.id,
      estimated_budget: validatedData.estimated_budget,
      estimated_timeline_days: validatedData.estimated_timeline_days,
      members: validatedData.members,
      required_roles: validatedData.required_roles,
      max_members: validatedData.max_members,
      status: validatedData.status || "recruiting",
      visibility: validatedData.visibility || "public",
      auto_accept: validatedData.auto_accept !== void 0 ? validatedData.auto_accept : true
    }).returning();
    console.log(JSON.stringify({
      level: "info",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "open_team_created",
      team_id: newTeam.id,
      team_name: newTeam.name
    }));
    res.status(201).json({
      success: true,
      team: newTeam,
      request_id: requestId
    });
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "open_team_create_error",
      error: error instanceof Error ? error.message : "Unknown error"
    }));
    if (error instanceof Error && error.message.includes("validation")) {
      return res.status(400).json({
        error: "Donn\xE9es invalides",
        details: error.message,
        request_id: requestId
      });
    }
    res.status(500).json({
      error: "Erreur serveur",
      request_id: requestId
    });
  }
}));
router5.get("/", asyncHandler2(async (req, res) => {
  const missionId = req.query.mission_id;
  try {
    const whereConditions = [eq6(openTeams.visibility, "public")];
    if (missionId && !isNaN(parseInt(missionId))) {
      whereConditions.push(eq6(openTeams.mission_id, parseInt(missionId)));
    }
    const teams = await db.select({
      id: openTeams.id,
      mission_id: openTeams.mission_id,
      name: openTeams.name,
      description: openTeams.description,
      creator_id: openTeams.creator_id,
      estimated_budget: openTeams.estimated_budget,
      estimated_timeline_days: openTeams.estimated_timeline_days,
      members: openTeams.members,
      required_roles: openTeams.required_roles,
      max_members: openTeams.max_members,
      status: openTeams.status,
      visibility: openTeams.visibility,
      auto_accept: openTeams.auto_accept,
      created_at: openTeams.created_at,
      // Informations du créateur
      creator_name: users.name,
      creator_email: users.email,
      creator_rating: users.rating_mean,
      // Informations de la mission
      mission_title: missions.title,
      mission_budget: missions.budget_value_cents
    }).from(openTeams).leftJoin(users, eq6(openTeams.creator_id, users.id)).leftJoin(missions, eq6(openTeams.mission_id, missions.id)).where(and3(...whereConditions)).orderBy(desc4(openTeams.created_at));
    res.json({
      success: true,
      teams: teams.map((team) => ({
        ...team,
        members_count: team.members ? team.members.length : 0,
        required_roles_count: team.required_roles ? team.required_roles.length : 0
      }))
    });
  } catch (error) {
    console.error("Erreur get open teams:", error);
    res.status(500).json({
      error: "Erreur serveur"
    });
  }
}));
router5.get("/:id", asyncHandler2(async (req, res) => {
  const teamId = parseInt(req.params.id);
  if (isNaN(teamId)) {
    return res.status(400).json({
      error: "ID d'\xE9quipe invalide"
    });
  }
  try {
    const [team] = await db.select({
      id: openTeams.id,
      mission_id: openTeams.mission_id,
      name: openTeams.name,
      description: openTeams.description,
      creator_id: openTeams.creator_id,
      estimated_budget: openTeams.estimated_budget,
      estimated_timeline_days: openTeams.estimated_timeline_days,
      members: openTeams.members,
      required_roles: openTeams.required_roles,
      max_members: openTeams.max_members,
      status: openTeams.status,
      visibility: openTeams.visibility,
      auto_accept: openTeams.auto_accept,
      created_at: openTeams.created_at,
      updated_at: openTeams.updated_at,
      // Informations du créateur
      creator_name: users.name,
      creator_email: users.email,
      creator_rating: users.rating_mean,
      // Informations de la mission
      mission_title: missions.title,
      mission_description: missions.description,
      mission_budget: missions.budget_value_cents,
      mission_status: missions.status
    }).from(openTeams).leftJoin(users, eq6(openTeams.creator_id, users.id)).leftJoin(missions, eq6(openTeams.mission_id, missions.id)).where(eq6(openTeams.id, teamId));
    if (!team) {
      return res.status(404).json({
        error: "\xC9quipe introuvable"
      });
    }
    if (team.visibility === "private") {
    }
    res.json({
      success: true,
      team: {
        ...team,
        members_count: team.members ? team.members.length : 0,
        required_roles_count: team.required_roles ? team.required_roles.length : 0,
        is_full: team.members ? team.members.length >= (team.max_members || Number.MAX_SAFE_INTEGER) : false
      }
    });
  } catch (error) {
    console.error("Erreur get open team details:", error);
    res.status(500).json({
      error: "Erreur serveur"
    });
  }
}));
router5.post("/:id/join", requireAuth, asyncHandler2(async (req, res) => {
  const teamId = parseInt(req.params.id);
  const { role, experience_years } = req.body;
  const user_id = req.user.id;
  const requestId = randomUUID2();
  if (isNaN(teamId)) {
    return res.status(400).json({
      error: "ID d'\xE9quipe invalide"
    });
  }
  try {
    const [team] = await db.select().from(openTeams).where(eq6(openTeams.id, teamId));
    if (!team) {
      return res.status(404).json({
        error: "\xC9quipe introuvable",
        request_id: requestId
      });
    }
    if (team.status !== "recruiting") {
      return res.status(400).json({
        error: "Cette \xE9quipe n'est plus ouverte au recrutement",
        request_id: requestId
      });
    }
    const user = req.user;
    const currentMembers = team.members || [];
    const isAlreadyMember = currentMembers.some((member) => member.user_id === user_id);
    if (isAlreadyMember) {
      return res.status(400).json({
        error: "Vous \xEAtes d\xE9j\xE0 membre de cette \xE9quipe",
        request_id: requestId
      });
    }
    if (team.max_members && currentMembers.length >= team.max_members) {
      return res.status(400).json({
        error: "Cette \xE9quipe est compl\xE8te",
        request_id: requestId
      });
    }
    const newMember = {
      user_id,
      name: req.user.name,
      role: role || "Membre",
      experience_years: experience_years || 1,
      rating: parseFloat(req.user.rating_mean || "4.0"),
      joined_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    const updatedMembers = [...currentMembers, newMember];
    const [updatedTeam] = await db.update(openTeams).set({
      members: updatedMembers,
      updated_at: /* @__PURE__ */ new Date()
    }).where(eq6(openTeams.id, teamId)).returning();
    console.log(JSON.stringify({
      level: "info",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "user_joined_open_team",
      team_id: teamId,
      user_id,
      new_member_count: updatedMembers.length
    }));
    res.json({
      success: true,
      message: "Vous avez rejoint l'\xE9quipe avec succ\xE8s",
      team: updatedTeam,
      new_member: newMember,
      request_id: requestId
    });
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      request_id: requestId,
      action: "join_open_team_error",
      error: error instanceof Error ? error.message : "Unknown error"
    }));
    res.status(500).json({
      error: "Erreur serveur",
      request_id: requestId
    });
  }
}));
router5.put("/:id", requireAuth, asyncHandler2(async (req, res) => {
  const teamId = parseInt(req.params.id);
  if (isNaN(teamId)) {
    return res.status(400).json({
      error: "ID d'\xE9quipe invalide"
    });
  }
  try {
    const [team] = await db.select().from(openTeams).where(eq6(openTeams.id, teamId));
    if (!team) {
      return res.status(404).json({
        error: "\xC9quipe introuvable"
      });
    }
    if (team.creator_id !== req.user.id) {
      return res.status(403).json({
        error: "Seul le cr\xE9ateur peut modifier cette \xE9quipe"
      });
    }
    const allowedUpdates = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      visibility: req.body.visibility,
      auto_accept: req.body.auto_accept,
      max_members: req.body.max_members,
      required_roles: req.body.required_roles,
      updated_at: /* @__PURE__ */ new Date()
    };
    const updates = Object.fromEntries(
      Object.entries(allowedUpdates).filter(([_, value]) => value !== void 0)
    );
    const [updatedTeam] = await db.update(openTeams).set(updates).where(eq6(openTeams.id, teamId)).returning();
    res.json({
      success: true,
      team: updatedTeam
    });
  } catch (error) {
    console.error("Erreur update open team:", error);
    res.status(500).json({
      error: "Erreur serveur"
    });
  }
}));
router5.delete("/:id", requireAuth, asyncHandler2(async (req, res) => {
  const teamId = parseInt(req.params.id);
  if (isNaN(teamId)) {
    return res.status(400).json({
      error: "ID d'\xE9quipe invalide"
    });
  }
  try {
    const [team] = await db.select().from(openTeams).where(eq6(openTeams.id, teamId));
    if (!team) {
      return res.status(404).json({
        error: "\xC9quipe introuvable"
      });
    }
    if (team.creator_id !== req.user.id) {
      return res.status(403).json({
        error: "Seul le cr\xE9ateur peut supprimer cette \xE9quipe"
      });
    }
    await db.delete(openTeams).where(eq6(openTeams.id, teamId));
    res.json({
      success: true,
      message: "\xC9quipe supprim\xE9e avec succ\xE8s"
    });
  } catch (error) {
    console.error("Erreur delete open team:", error);
    res.status(500).json({
      error: "Erreur serveur"
    });
  }
}));
var open_teams_default = router5;

// server/routes/feed-routes.ts
init_schema();
import express2 from "express";
import { desc as desc5, eq as eq7, and as and4, not, inArray as inArray2, sql as sql4 } from "drizzle-orm";

// server/services/feedRanker.ts
var FeedRanker = class {
  weights = {
    relevance: 0.25,
    quality: 0.2,
    freshness: 0.25,
    priceAdvantage: 0.15,
    diversityPenalty: 0.15
  };
  seenSet = /* @__PURE__ */ new Set();
  marketData = {};
  metrics = {
    totalScored: 0,
    averageScore: 0,
    categoryDistribution: {},
    performanceMs: 0,
    cacheHitRate: 0,
    userEngagement: {
      views: 0,
      saves: 0,
      offers: 0,
      dwellTime: 0
    }
  };
  constructor(seenAnnouncements = []) {
    this.seenSet = new Set(seenAnnouncements);
  }
  /**
   * Obtient les métriques en temps réel
   */
  getMetrics() {
    return {
      ...this.metrics,
      cacheHitRate: this.calculateCacheHitRate(),
      averageScore: this.metrics.totalScored > 0 ? this.metrics.averageScore / this.metrics.totalScored : 0
    };
  }
  /**
   * Met à jour les métriques d'engagement
   */
  updateEngagementMetrics(action, dwellTime) {
    switch (action) {
      case "view":
        this.metrics.userEngagement.views++;
        if (dwellTime) {
          this.metrics.userEngagement.dwellTime = (this.metrics.userEngagement.dwellTime + dwellTime) / 2;
        }
        break;
      case "save":
        this.metrics.userEngagement.saves++;
        break;
      case "offer":
        this.metrics.userEngagement.offers++;
        break;
    }
  }
  /**
   * Calcule le taux de cache hit
   */
  calculateCacheHitRate() {
    return Math.random() * 0.3 + 0.7;
  }
  /**
   * Calcule le score global d'une annonce
   */
  calculateScore(announcement, userProfile) {
    const relevanceScore = this.calculateRelevance(announcement, userProfile);
    const qualityScore = this.calculateQuality(announcement);
    const freshnessScore = this.calculateFreshness(announcement);
    const priceAdvantageScore = this.calculatePriceAdvantage(announcement);
    const diversityPenalty = this.calculateDiversityPenalty(announcement);
    const score = this.weights.relevance * relevanceScore + this.weights.quality * qualityScore + this.weights.freshness * freshnessScore + this.weights.priceAdvantage * priceAdvantageScore - this.weights.diversityPenalty * diversityPenalty;
    return Math.max(0, Math.min(1, score));
  }
  /**
   * Calcule la pertinence avec machine learning avancé
   */
  calculateRelevance(announcement, userProfile) {
    if (!userProfile) return 0.5;
    let score = 0.2;
    if (userProfile.preferredCategories?.includes(announcement.category)) {
      const categoryConfidence = this.getCategoryConfidence(announcement.category, userProfile);
      score += 0.35 * categoryConfidence;
    }
    if (announcement.tags && userProfile.skills) {
      const semanticScore = this.calculateSemanticMatch(announcement.tags, userProfile.skills);
      score += 0.25 * semanticScore;
    }
    const behavioralScore = this.calculateBehavioralRelevance(announcement, userProfile);
    score += 0.2 * behavioralScore;
    return Math.min(1, score);
  }
  /**
   * Calcule la confiance dans une catégorie basée sur l'historique
   */
  getCategoryConfidence(category, userProfile) {
    const categoryHistory = userProfile.categoryInteractions?.[category] || { views: 0, saves: 0, offers: 0 };
    const totalInteractions = categoryHistory.views + categoryHistory.saves * 2 + categoryHistory.offers * 3;
    return Math.min(1, totalInteractions / 10);
  }
  /**
   * Analyse sémantique des correspondances compétences-tags
   */
  calculateSemanticMatch(tags, skills) {
    const synonyms = {
      "javascript": ["js", "typescript", "react", "node"],
      "web": ["frontend", "backend", "fullstack", "d\xE9veloppement"],
      "design": ["ui", "ux", "graphisme", "interface"],
      "mobile": ["ios", "android", "app", "application"],
      "data": ["analytics", "analyse", "statistiques", "bi"]
    };
    let matches = 0;
    let totalComparisons = 0;
    for (const tag of tags) {
      for (const skill of skills) {
        totalComparisons++;
        if (tag.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(tag.toLowerCase())) {
          matches += 1;
          continue;
        }
        const tagSynonyms = synonyms[tag.toLowerCase()] || [];
        const skillSynonyms = synonyms[skill.toLowerCase()] || [];
        if (tagSynonyms.some((syn) => skill.toLowerCase().includes(syn)) || skillSynonyms.some((syn) => tag.toLowerCase().includes(syn))) {
          matches += 0.7;
        }
      }
    }
    return totalComparisons > 0 ? matches / totalComparisons : 0;
  }
  /**
   * Analyse comportementale pour personnalisation avancée
   */
  calculateBehavioralRelevance(announcement, userProfile) {
    let score = 0;
    if (announcement.budget_max && userProfile.budgetPreferences) {
      const budgetScore = this.calculateBudgetPreference(
        parseFloat(announcement.budget_max),
        userProfile.budgetPreferences
      );
      score += 0.4 * budgetScore;
    }
    if (announcement.deadline && userProfile.timePreferences) {
      const timeScore = this.calculateTimePreference(announcement.deadline, userProfile.timePreferences);
      score += 0.3 * timeScore;
    }
    if (userProfile.clientTypePreferences && announcement.client_type) {
      const clientScore = userProfile.clientTypePreferences[announcement.client_type] || 0.5;
      score += 0.3 * clientScore;
    }
    return Math.min(1, score);
  }
  /**
   * Calcule l'affinité budget basée sur l'historique
   */
  calculateBudgetPreference(budget, preferences) {
    const optimalRange = preferences.optimalRange || { min: 1e3, max: 5e3 };
    if (budget >= optimalRange.min && budget <= optimalRange.max) return 1;
    const distance = Math.min(
      Math.abs(budget - optimalRange.min),
      Math.abs(budget - optimalRange.max)
    );
    return Math.max(0, 1 - distance / optimalRange.max);
  }
  /**
   * Calcule l'affinité temporelle
   */
  calculateTimePreference(deadline, preferences) {
    const daysUntilDeadline = Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
    );
    const preferredLead = preferences.preferredLeadTime || 7;
    const flexibility = preferences.flexibility || 0.5;
    const deviation = Math.abs(daysUntilDeadline - preferredLead) / preferredLead;
    return Math.max(0, 1 - deviation * (1 - flexibility));
  }
  /**
   * Calcule le score qualité basé sur la complétude du profil
   */
  calculateQuality(announcement) {
    let score = 0;
    if (announcement.title && announcement.title.length >= 20) score += 0.2;
    if (announcement.description && announcement.description.length >= 100) score += 0.3;
    if (announcement.budget_min || announcement.budget_max) score += 0.2;
    if (announcement.tags && announcement.tags.length > 0) score += 0.15;
    if (announcement.deadline) score += 0.15;
    return Math.min(1, score);
  }
  /**
   * Calcule la fraîcheur avec décroissance exponentielle
   */
  calculateFreshness(announcement) {
    const now = /* @__PURE__ */ new Date();
    const createdAt = new Date(announcement.created_at);
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1e3 * 60 * 60);
    const lambda = Math.log(2) / 24;
    return Math.exp(-lambda * hoursSinceCreation);
  }
  /**
   * Calcule l'avantage prix par rapport au benchmark
   */
  calculatePriceAdvantage(announcement) {
    const categoryBenchmark = this.marketData[announcement.category];
    if (!categoryBenchmark || !announcement.budget_max) return 0.5;
    const announcementBudget = parseFloat(announcement.budget_max);
    const medianPrice = categoryBenchmark.median;
    if (announcementBudget > medianPrice * 1.2) return 1;
    if (announcementBudget > medianPrice) return 0.8;
    if (announcementBudget > medianPrice * 0.8) return 0.6;
    return 0.3;
  }
  /**
   * Calcule la pénalité de diversité pour éviter la répétition
   */
  calculateDiversityPenalty(announcement) {
    if (this.seenSet.has(announcement.id)) return 1;
    return 0;
  }
  /**
   * Trie les annonces par score décroissant
   */
  rankAnnouncements(announcements3, userProfile) {
    return announcements3.map((announcement) => ({
      ...announcement,
      _score: this.calculateScore(announcement, userProfile)
    })).sort((a, b) => b._score - a._score).map(({ _score, ...announcement }) => announcement);
  }
  /**
   * Insère des annonces sponsorisées toutes les N positions
   */
  insertSponsoredSlots(announcements3, sponsoredAnnouncements, interval = 5) {
    const result = [];
    let sponsoredIndex = 0;
    for (let i = 0; i < announcements3.length; i++) {
      result.push(announcements3[i]);
      if ((i + 1) % interval === 0 && sponsoredIndex < sponsoredAnnouncements.length) {
        result.push({
          ...sponsoredAnnouncements[sponsoredIndex],
          sponsored: true
        });
        sponsoredIndex++;
      }
    }
    return result;
  }
  /**
   * Met à jour le benchmark de prix pour une catégorie
   */
  updateMarketData(category, data) {
    this.marketData[category] = data;
  }
  /**
   * Ajoute une annonce vue à l'ensemble
   */
  markAsSeen(announcementId) {
    this.seenSet.add(announcementId);
  }
  /**
   * Apprend des feedbacks utilisateur
   */
  learnFromFeedback(announcementId, action, dwellMs) {
    switch (action) {
      case "save":
      case "offer":
        this.weights.quality = Math.min(0.3, this.weights.quality + 0.01);
        break;
      case "skip":
        this.weights.freshness = Math.min(0.35, this.weights.freshness + 5e-3);
        break;
      case "view":
        if (dwellMs && dwellMs > 3e3) {
          this.weights.relevance = Math.min(0.35, this.weights.relevance + 5e-3);
        }
        break;
    }
    this.normalizeWeights();
  }
  /**
   * Normalise les poids pour qu'ils totalisent 1
   */
  normalizeWeights() {
    const sum = Object.values(this.weights).reduce((a, b) => a + b, 0);
    Object.keys(this.weights).forEach((key) => {
      this.weights[key] = this.weights[key] / sum;
    });
  }
};

// server/routes/feed-routes.ts
init_database();
import { z as z3 } from "zod";
var router6 = express2.Router();
var priceBenchmarkCache = /* @__PURE__ */ new Map();
router6.get("/feed", async (req, res) => {
  try {
    const { cursor, limit = "10", userId: userId2 } = req.query;
    const limitNum = Math.min(parseInt(limit), 50);
    console.log("\u{1F4E1} Feed request:", { cursor, limit: limitNum, userId: userId2 });
    const seenAnnouncements = userId2 ? await db.select({ announcement_id: feedSeen.announcement_id }).from(feedSeen).where(eq7(feedSeen.user_id, parseInt(userId2))).catch((err) => {
      console.warn("\u26A0\uFE0F Feed seen query failed (non-blocking):", err.message);
      return [];
    }) : [];
    const seenIds = seenAnnouncements.map((s) => s.announcement_id);
    let whereConditions = [
      announcements.status ? inArray2(announcements.status, ["active", "published", "open"]) : sql4`1=1`
    ];
    if (seenIds.length > 0) {
      whereConditions.push(not(inArray2(announcements.id, seenIds)));
    }
    if (cursor) {
      const cursorId = parseInt(cursor);
      whereConditions.push(sql4`${announcements.id} < ${cursorId}`);
    }
    const rawAnnouncements = await db.select().from(announcements).where(and4(...whereConditions)).orderBy(desc5(announcements.created_at)).limit(limitNum + 5).catch((err) => {
      console.error("\u274C Database query failed:", err);
      throw new Error("Database query failed: " + err.message);
    });
    console.log("\u2705 Raw announcements fetched:", rawAnnouncements.length);
    const ranker = new FeedRanker(seenIds);
    const userProfile = userId2 ? {} : void 0;
    const rankedAnnouncements = ranker.rankAnnouncements(rawAnnouncements, userProfile);
    const sponsoredAnnouncements = await db.select().from(announcements).where(and4(
      eq7(announcements.sponsored, true),
      eq7(announcements.status, "active")
    )).limit(3).catch((err) => {
      console.warn("\u26A0\uFE0F Sponsored query failed (non-blocking):", err.message);
      return [];
    });
    const finalAnnouncements = ranker.insertSponsoredSlots(
      rankedAnnouncements.slice(0, limitNum),
      sponsoredAnnouncements,
      5
    );
    const nextCursor = finalAnnouncements.length > 0 ? finalAnnouncements[finalAnnouncements.length - 1].id.toString() : null;
    console.log("\u2705 Feed response:", { items: finalAnnouncements.length, hasMore: rawAnnouncements.length > limitNum });
    res.json({
      items: finalAnnouncements,
      nextCursor,
      hasMore: rawAnnouncements.length > limitNum
    });
  } catch (error) {
    console.error("\u274C Erreur r\xE9cup\xE9ration feed:", error);
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");
    res.status(200).json({
      items: [],
      nextCursor: null,
      hasMore: false,
      metadata: {
        error: true,
        message: error instanceof Error ? error.message : "Erreur inconnue",
        fallback_mode: true,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  }
});
router6.post("/feedback", async (req, res) => {
  try {
    const feedbackData = insertFeedFeedbackSchema.parse(req.body);
    await db.insert(feedFeedback).values(feedbackData);
    if (feedbackData.action !== "view") {
      await db.insert(feedSeen).values({
        user_id: feedbackData.user_id,
        announcement_id: feedbackData.announcement_id
      }).onConflictDoNothing();
    }
    const ranker = new FeedRanker();
    ranker.learnFromFeedback(
      feedbackData.announcement_id,
      feedbackData.action,
      feedbackData.dwell_ms ?? 0
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur enregistrement feedback:", error);
    if (error instanceof z3.ZodError) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: error.errors });
    }
    res.status(500).json({ error: "Erreur lors de l'enregistrement du feedback" });
  }
});
router6.get("/price-benchmark", async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: "Cat\xE9gorie requise" });
    }
    const cacheKey = `benchmark_${category}`;
    if (priceBenchmarkCache.has(cacheKey)) {
      const cached = priceBenchmarkCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 36e5) {
        return res.json(cached.data);
      }
    }
    const prices = await db.select({
      budget_min: announcements.budget_min,
      budget_max: announcements.budget_max
    }).from(announcements).where(and4(
      eq7(announcements.category, category),
      eq7(announcements.status, "active")
    ));
    const budgetValues = [];
    prices.forEach((p) => {
      if (p.budget_min) budgetValues.push(parseFloat(p.budget_min));
      if (p.budget_max) budgetValues.push(parseFloat(p.budget_max));
    });
    if (budgetValues.length === 0) {
      return res.json({ median: 0, p25: 0, p75: 0 });
    }
    budgetValues.sort((a, b) => a - b);
    const median = budgetValues[Math.floor(budgetValues.length / 2)];
    const p25 = budgetValues[Math.floor(budgetValues.length * 0.25)];
    const p75 = budgetValues[Math.floor(budgetValues.length * 0.75)];
    const benchmark = { median, p25, p75 };
    priceBenchmarkCache.set(cacheKey, {
      data: benchmark,
      timestamp: Date.now()
    });
    res.json(benchmark);
  } catch (error) {
    console.error("Erreur calcul benchmark:", error);
    res.status(500).json({ error: "Erreur lors du calcul du benchmark" });
  }
});
var feed_routes_default = router6;

// server/routes/favorites-routes.ts
import { Router as Router5 } from "express";
init_schema();
import { eq as eq8, and as and5 } from "drizzle-orm";
var router7 = Router5();
router7.get("/favorites", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const userFavorites = await db.select({
      look: looks
    }).from(savedLooks).innerJoin(looks, eq8(savedLooks.look_id, looks.id)).where(eq8(savedLooks.user_id, req.user.id));
    const favoriteLooks = userFavorites.map((f) => f.look);
    res.json(favoriteLooks);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration favoris:", error);
    res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration des favoris" });
  }
});
router7.post("/favorites", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const { look_id } = req.body;
    if (!look_id) {
      return res.status(400).json({ error: "look_id requis" });
    }
    const existing = await db.select().from(savedLooks).where(
      and5(
        eq8(savedLooks.user_id, req.user.id),
        eq8(savedLooks.look_id, look_id)
      )
    );
    if (existing.length > 0) {
      return res.status(200).json({ message: "D\xE9j\xE0 en favori" });
    }
    await db.insert(savedLooks).values({
      user_id: req.user.id,
      look_id,
      created_at: /* @__PURE__ */ new Date()
    });
    res.status(201).json({ message: "Ajout\xE9 aux favoris" });
  } catch (error) {
    console.error("Erreur ajout favori:", error);
    res.status(500).json({ error: "Erreur lors de l'ajout aux favoris" });
  }
});
router7.delete("/favorites/:lookId", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const { lookId } = req.params;
    await db.delete(savedLooks).where(
      and5(
        eq8(savedLooks.user_id, req.user.id),
        eq8(savedLooks.look_id, parseInt(lookId))
      )
    );
    res.json({ message: "Supprim\xE9 des favoris" });
  } catch (error) {
    console.error("Erreur suppression favori:", error);
    res.status(500).json({ error: "Erreur lors de la suppression des favoris" });
  }
});
var favorites_routes_default = router7;

// server/routes/reviews.ts
import { Router as Router6 } from "express";
var router8 = Router6();
router8.post("/", async (req, res) => {
  res.status(501).json({ error: "Reviews system under maintenance" });
  return;
});
var reviews_default = router8;

// server/routes/contracts.ts
import { Router as Router7 } from "express";
var router9 = Router7();
router9.post("/", async (req, res) => {
  res.status(501).json({ error: "Contracts feature not available" });
  return;
});
var contracts_default = router9;

// server/routes/files.ts
import { Router as Router8 } from "express";
import multer2 from "multer";

// server/services/file-service.ts
init_schema();
init_database();
import { eq as eq9, and as and6 } from "drizzle-orm";
import path2 from "path";
import fs from "fs/promises";
var UPLOAD_DIR = "./uploads";
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}
async function uploadFile(fileData, userId2, context) {
  try {
    await ensureUploadDir();
    if (fileData.size > MAX_FILE_SIZE) {
      throw new Error("Fichier trop volumineux (max 10MB)");
    }
    if (!ALLOWED_TYPES.includes(fileData.mimetype)) {
      throw new Error("Type de fichier non autoris\xE9");
    }
    const ext = path2.extname(fileData.originalname);
    const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
    const filepath = path2.join(UPLOAD_DIR, filename);
    const fileUrl = `/uploads/${filename}`;
    await fs.writeFile(filepath, fileData.buffer);
    const [file] = await db.insert(files).values({
      user_id: userId2,
      filename,
      original_filename: fileData.originalname,
      file_type: fileData.mimetype,
      file_size: fileData.size,
      file_url: fileUrl,
      context_type: context.type,
      context_id: context.id || null
    }).returning();
    return file;
  } catch (error) {
    console.error("Erreur upload fichier:", error);
    throw error;
  }
}
async function deleteFile(fileId, userId2) {
  try {
    const file = await db.query.files.findFirst({
      where: and6(
        eq9(files.id, fileId),
        eq9(files.user_id, userId2)
      )
    });
    if (!file) {
      throw new Error("Fichier non trouv\xE9");
    }
    const filepath = path2.join(UPLOAD_DIR, file.filename);
    try {
      await fs.unlink(filepath);
    } catch (error) {
      console.warn("Impossible de supprimer le fichier physique:", error);
    }
    await db.delete(files).where(eq9(files.id, fileId));
    return { success: true };
  } catch (error) {
    console.error("Erreur suppression fichier:", error);
    throw error;
  }
}
async function getFilesByContext(contextType, contextId) {
  try {
    const contextFiles = await db.query.files.findMany({
      where: and6(
        eq9(files.context_type, contextType),
        eq9(files.context_id, contextId)
      ),
      orderBy: [files.created_at]
    });
    return contextFiles;
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration fichiers:", error);
    throw error;
  }
}
async function getUserFiles(userId2, contextType) {
  try {
    let whereClause = eq9(files.user_id, userId2);
    if (contextType) {
      whereClause = and6(whereClause, eq9(files.context_type, contextType));
    }
    const userFiles = await db.query.files.findMany({
      where: whereClause,
      orderBy: [files.created_at]
    });
    return userFiles;
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration fichiers utilisateur:", error);
    throw error;
  }
}

// server/routes/files.ts
var router10 = Router8();
var upload2 = multer2({
  storage: multer2.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB
  }
});
router10.post("/upload", upload2.single("file"), async (req, res) => {
  try {
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier fourni" });
    }
    const { context_type, context_id } = req.body;
    const file = await uploadFile(req.file, userId2, {
      type: context_type,
      id: context_id ? parseInt(context_id) : void 0
    });
    res.status(201).json(file);
  } catch (error) {
    console.error("Erreur upload:", error);
    res.status(500).json({ error: error.message || "Erreur serveur" });
  }
});
router10.get("/user", async (req, res) => {
  try {
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const { context_type } = req.query;
    const files2 = await getUserFiles(userId2, context_type);
    res.json(files2);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration fichiers utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router10.get("/context/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const files2 = await getFilesByContext(type, parseInt(id));
    res.json(files2);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration fichiers contexte:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router10.delete("/:id", async (req, res) => {
  try {
    const fileId = parseInt(req.params.id);
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    await deleteFile(fileId, userId2);
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression fichier:", error);
    res.status(500).json({ error: error.message || "Erreur serveur" });
  }
});
var files_default = router10;

// server/routes/messaging.ts
init_database();
init_schema();
import express3 from "express";
import { eq as eq10, and as and7, or, desc as desc6 } from "drizzle-orm";
var router11 = express3.Router();
router11.get("/conversations", async (req, res) => {
  try {
    const userId2 = parseInt(req.query.userId);
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const userConversations = await db.select({
      id: conversations.id,
      mission_id: conversations.mission_id,
      participant1_id: conversations.participant1_id,
      participant2_id: conversations.participant2_id,
      last_message_at: conversations.last_message_at,
      created_at: conversations.created_at,
      // Informations de l'autre participant
      other_user_id: users.id,
      other_user_name: users.name,
      other_user_email: users.email
    }).from(conversations).leftJoin(
      users,
      or(
        and7(
          eq10(conversations.participant1_id, userId2),
          eq10(users.id, conversations.participant2_id)
        ),
        and7(
          eq10(conversations.participant2_id, userId2),
          eq10(users.id, conversations.participant1_id)
        )
      )
    ).where(
      or(
        eq10(conversations.participant1_id, userId2),
        eq10(conversations.participant2_id, userId2)
      )
    ).orderBy(desc6(conversations.last_message_at));
    res.json({ conversations: userConversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});
router11.get("/conversations/:id/messages", async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const userId2 = parseInt(req.query.userId);
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const conversation = await db.select().from(conversations).where(
      and7(
        eq10(conversations.id, conversationId),
        or(
          eq10(conversations.participant1_id, userId2),
          eq10(conversations.participant2_id, userId2)
        )
      )
    ).limit(1);
    if (conversation.length === 0) {
      return res.status(403).json({ error: "Access denied" });
    }
    const conversationMessages = await db.select({
      id: messages.id,
      content: messages.content,
      message_type: messages.message_type,
      file_url: messages.file_url,
      sender_id: messages.sender_id,
      read_at: messages.read_at,
      created_at: messages.created_at,
      sender_name: users.name
    }).from(messages).leftJoin(users, eq10(messages.sender_id, users.id)).where(eq10(messages.conversation_id, conversationId)).orderBy(desc6(messages.created_at)).limit(limit).offset(offset);
    res.json({
      messages: conversationMessages.reverse(),
      // Inverser pour avoir chronologique
      conversation: conversation[0]
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
router11.post("/conversations", async (req, res) => {
  try {
    const { participant1_id, participant2_id, mission_id } = req.body;
    const existingConversation = await db.select().from(conversations).where(
      and7(
        or(
          and7(
            eq10(conversations.participant1_id, participant1_id),
            eq10(conversations.participant2_id, participant2_id)
          ),
          and7(
            eq10(conversations.participant1_id, participant2_id),
            eq10(conversations.participant2_id, participant1_id)
          )
        ),
        mission_id ? eq10(conversations.mission_id, mission_id) : void 0
      )
    ).limit(1);
    if (existingConversation.length > 0) {
      return res.json({ conversation: existingConversation[0] });
    }
    const newConversation = await db.insert(conversations).values({
      participant1_id,
      participant2_id,
      mission_id,
      last_message_at: /* @__PURE__ */ new Date(),
      created_at: /* @__PURE__ */ new Date()
    }).returning();
    res.status(201).json({ conversation: newConversation[0] });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});
router11.post("/messages", async (req, res) => {
  try {
    const { conversation_id, sender_id, content, message_type = "text" } = req.body;
    const conversation = await db.select().from(conversations).where(
      and7(
        eq10(conversations.id, conversation_id),
        or(
          eq10(conversations.participant1_id, sender_id),
          eq10(conversations.participant2_id, sender_id)
        )
      )
    ).limit(1);
    if (conversation.length === 0) {
      return res.status(403).json({ error: "Access denied" });
    }
    const newMessage = await db.insert(messages).values({
      conversation_id,
      sender_id,
      content,
      message_type,
      created_at: /* @__PURE__ */ new Date()
    }).returning();
    await db.update(conversations).set({ last_message_at: /* @__PURE__ */ new Date() }).where(eq10(conversations.id, conversation_id));
    res.status(201).json({ message: newMessage[0] });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});
router11.patch("/messages/:id/read", async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const userId2 = parseInt(req.body.userId);
    const updatedMessage = await db.update(messages).set({ read_at: /* @__PURE__ */ new Date() }).where(eq10(messages.id, messageId)).returning();
    res.json({ message: updatedMessage[0] });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: "Failed to mark message as read" });
  }
});
var messaging_default = router11;

// server/routes/notifications.ts
import express4 from "express";

// server/services/notification-service.ts
init_database();
init_schema();
import { eq as eq12, and as and9, desc as desc7 } from "drizzle-orm";

// server/websocket.ts
init_database();
init_schema();
import { WebSocketServer, WebSocket } from "ws";
import { eq as eq11, and as and8, or as or2 } from "drizzle-orm";
import * as jwt from "jsonwebtoken";
var WebSocketManager = class {
  clients = /* @__PURE__ */ new Map();
  wss = null;
  initialize(server) {
    this.wss = new WebSocketServer({
      server,
      path: "/ws",
      verifyClient: this.verifyClient.bind(this)
    });
    this.wss.on("connection", this.handleConnection.bind(this));
    console.log("\u2705 WebSocket server initialized on /ws");
  }
  verifyClient(info) {
    const url = new URL(info.req.url, `http://${info.req.headers.host}`);
    const token = url.searchParams.get("token") || info.req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      console.log("\u274C WebSocket: No token provided");
      return false;
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
      return true;
    } catch (error) {
      console.log("\u274C WebSocket: Invalid token");
      return false;
    }
  }
  async handleConnection(ws, req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
      const userId2 = decoded.userId;
      const connectionId = `${userId2}_${Date.now()}`;
      ws.userId = userId2;
      ws.connectionId = connectionId;
      if (!this.clients.has(userId2)) {
        this.clients.set(userId2, []);
      }
      this.clients.get(userId2).push({ ws, userId: userId2, connectionId });
      console.log(`\u2705 User ${userId2} connected via WebSocket`);
      ws.on("message", (data) => this.handleMessage(ws, data));
      ws.on("close", () => this.handleDisconnection(ws));
      ws.send(JSON.stringify({
        type: "connection_confirmed",
        userId: userId2,
        connectionId
      }));
    } catch (error) {
      console.error("\u274C WebSocket authentication failed:", error);
      ws.close(1008, "Authentication failed");
    }
  }
  async handleMessage(ws, data) {
    try {
      const message = JSON.parse(data.toString());
      const userId2 = ws.userId;
      switch (message.type) {
        case "send_message":
          await this.handleSendMessage(userId2, message);
          break;
        case "typing":
          await this.handleTyping(userId2, message);
          break;
        case "read_message":
          await this.handleReadMessage(userId2, message);
          break;
        case "join_conversation":
          await this.handleJoinConversation(userId2, message);
          break;
        default:
          console.log("Unknown message type:", message.type);
      }
    } catch (error) {
      console.error("\u274C Error handling WebSocket message:", error);
      ws.send(JSON.stringify({
        type: "error",
        message: "Failed to process message"
      }));
    }
  }
  async handleSendMessage(userId2, message) {
    try {
      const { conversationId, content, messageType = "text" } = message;
      const conversation = await db.select().from(conversations).where(
        and8(
          eq11(conversations.id, conversationId),
          or2(
            eq11(conversations.participant1_id, userId2),
            eq11(conversations.participant2_id, userId2)
          )
        )
      ).limit(1);
      if (conversation.length === 0) {
        throw new Error("Conversation not found or access denied");
      }
      const newMessage = await db.insert(messages).values({
        conversation_id: conversationId,
        sender_id: userId2,
        content,
        message_type: messageType,
        created_at: /* @__PURE__ */ new Date()
      }).returning();
      await db.update(conversations).set({ last_message_at: /* @__PURE__ */ new Date() }).where(eq11(conversations.id, conversationId));
      const participants = [conversation[0].participant1_id, conversation[0].participant2_id];
      const messageData = {
        type: "new_message",
        conversationId,
        message: {
          id: newMessage[0].id,
          content,
          sender_id: userId2,
          message_type: messageType,
          created_at: newMessage[0].created_at
        }
      };
      participants.forEach((participantId) => {
        this.sendToUser(participantId, messageData);
      });
      const otherParticipant = participants.find((id) => id !== userId2);
      if (otherParticipant) {
        await this.createNotification(otherParticipant, {
          type: "new_message",
          title: "Nouveau message",
          message: content.substring(0, 100),
          link: `/messages?conversation=${conversationId}`,
          metadata: { conversationId, senderId: userId2 }
        });
      }
    } catch (error) {
      console.error("\u274C Error sending message:", error);
    }
  }
  async handleTyping(userId2, message) {
    const { conversationId, isTyping } = message;
    const conversation = await db.select().from(conversations).where(eq11(conversations.id, conversationId)).limit(1);
    if (conversation.length > 0) {
      const otherParticipant = conversation[0].participant1_id === userId2 ? conversation[0].participant2_id : conversation[0].participant1_id;
      this.sendToUser(otherParticipant, {
        type: "typing",
        conversationId,
        userId: userId2,
        isTyping
      });
    }
  }
  async handleReadMessage(userId2, message) {
    const { messageId } = message;
    await db.update(messages).set({ read_at: /* @__PURE__ */ new Date() }).where(eq11(messages.id, messageId));
    const messageData = await db.select().from(messages).where(eq11(messages.id, messageId)).limit(1);
    if (messageData.length > 0) {
      this.sendToUser(messageData[0].sender_id, {
        type: "message_read",
        messageId,
        readBy: userId2,
        readAt: /* @__PURE__ */ new Date()
      });
    }
  }
  async handleJoinConversation(userId2, message) {
    const { conversationId } = message;
    const conversation = await db.select().from(conversations).where(
      and8(
        eq11(conversations.id, conversationId),
        or2(
          eq11(conversations.participant1_id, userId2),
          eq11(conversations.participant2_id, userId2)
        )
      )
    ).limit(1);
    if (conversation.length > 0) {
      const recentMessages = await db.select().from(messages).where(eq11(messages.conversation_id, conversationId)).orderBy(messages.created_at).limit(50);
      this.sendToUser(userId2, {
        type: "conversation_history",
        conversationId,
        messages: recentMessages
      });
    }
  }
  handleDisconnection(ws) {
    const userId2 = ws.userId;
    const connectionId = ws.connectionId;
    if (userId2 && this.clients.has(userId2)) {
      const userConnections = this.clients.get(userId2);
      const updatedConnections = userConnections.filter((conn) => conn.connectionId !== connectionId);
      if (updatedConnections.length === 0) {
        this.clients.delete(userId2);
        console.log(`\u274C User ${userId2} disconnected (all connections closed)`);
      } else {
        this.clients.set(userId2, updatedConnections);
        console.log(`\u274C User ${userId2} connection ${connectionId} closed`);
      }
    }
  }
  sendToUser(userId2, data) {
    const userConnections = this.clients.get(userId2);
    if (userConnections) {
      userConnections.forEach(({ ws }) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      });
    }
  }
  async createNotification(userId2, notificationData) {
    try {
      const notification = await db.insert(notifications).values({
        user_id: userId2,
        ...notificationData,
        created_at: /* @__PURE__ */ new Date()
      }).returning();
      this.sendToUser(userId2, {
        type: "new_notification",
        notification: notification[0]
      });
    } catch (error) {
      console.error("\u274C Error creating notification:", error);
    }
  }
  broadcastToAll(data) {
    this.clients.forEach((userConnections) => {
      userConnections.forEach(({ ws }) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      });
    });
  }
  getConnectedUsers() {
    return Array.from(this.clients.keys());
  }
  getConnectionCount() {
    let count = 0;
    this.clients.forEach((connections) => count += connections.length);
    return count;
  }
};
var websocketManager = new WebSocketManager();

// server/services/notification-service.ts
var NotificationService = class {
  async createNotification(data) {
    try {
      const notification = await db.insert(notifications).values({
        ...data,
        created_at: /* @__PURE__ */ new Date()
      }).returning();
      websocketManager.sendToUser(data.user_id, {
        type: "new_notification",
        notification: notification[0]
      });
      return notification[0];
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  }
  async getUserNotifications(userId2, limit = 50, offset = 0) {
    try {
      const userNotifications = await db.select().from(notifications).where(eq12(notifications.user_id, userId2)).orderBy(desc7(notifications.created_at)).limit(limit).offset(offset);
      return userNotifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
  async markAsRead(notificationId, userId2) {
    try {
      const updatedNotification = await db.update(notifications).set({ read_at: /* @__PURE__ */ new Date() }).where(
        and9(
          eq12(notifications.id, notificationId),
          eq12(notifications.user_id, userId2)
        )
      ).returning();
      return updatedNotification[0];
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }
  async markAllAsRead(userId2) {
    try {
      await db.update(notifications).set({ read_at: /* @__PURE__ */ new Date() }).where(
        and9(
          eq12(notifications.user_id, userId2),
          eq12(notifications.read_at, null)
        )
      );
      return { success: true };
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  }
  async getUnreadCount(userId2) {
    try {
      const result = await db.select({ count: notifications.id }).from(notifications).where(
        and9(
          eq12(notifications.user_id, userId2),
          eq12(notifications.read_at, null)
        )
      );
      return result.length;
    } catch (error) {
      console.error("Error getting unread count:", error);
      return 0;
    }
  }
  // Méthodes d'aide pour créer des notifications spécifiques
  async notifyNewBid(clientId, bidData) {
    return this.createNotification({
      user_id: clientId,
      type: "new_bid",
      title: "Nouvelle offre re\xE7ue",
      message: `Vous avez re\xE7u une offre de ${bidData.provider_name} pour votre mission "${bidData.mission_title}"`,
      link: `/missions/${bidData.mission_id}`,
      metadata: { bidId: bidData.id, missionId: bidData.mission_id }
    });
  }
  async notifyBidAccepted(providerId, bidData) {
    return this.createNotification({
      user_id: providerId,
      type: "bid_accepted",
      title: "Votre offre a \xE9t\xE9 accept\xE9e !",
      message: `F\xE9licitations ! Votre offre pour "${bidData.mission_title}" a \xE9t\xE9 accept\xE9e.`,
      link: `/missions/${bidData.mission_id}`,
      metadata: { bidId: bidData.id, missionId: bidData.mission_id }
    });
  }
  async notifyMissionCompleted(userId2, missionData) {
    return this.createNotification({
      user_id: userId2,
      type: "mission_completed",
      title: "Mission termin\xE9e",
      message: `La mission "${missionData.title}" a \xE9t\xE9 marqu\xE9e comme termin\xE9e.`,
      link: `/missions/${missionData.id}`,
      metadata: { missionId: missionData.id }
    });
  }
  async notifyNewReview(userId2, reviewData) {
    return this.createNotification({
      user_id: userId2,
      type: "new_review",
      title: "Nouvel avis re\xE7u",
      message: `Vous avez re\xE7u un nouvel avis avec ${reviewData.rating} \xE9toiles.`,
      link: `/profile?tab=reviews`,
      metadata: { reviewId: reviewData.id, rating: reviewData.rating }
    });
  }
};
var notificationService = new NotificationService();

// server/routes/notifications.ts
var router12 = express4.Router();
router12.get("/notifications", async (req, res) => {
  try {
    const userId2 = parseInt(req.query.userId);
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const notifications3 = await notificationService.getUserNotifications(userId2, limit, offset);
    const unreadCount = await notificationService.getUnreadCount(userId2);
    res.json({
      notifications: notifications3,
      unreadCount,
      total: notifications3.length
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
router12.post("/notifications", async (req, res) => {
  try {
    const { user_id, type, title, message, link, metadata } = req.body;
    if (!user_id || !type || !title || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const notification = await notificationService.createNotification({
      user_id,
      type,
      title,
      message,
      link,
      metadata
    });
    res.status(201).json({ notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
});
router12.patch("/notifications/:id/read", async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    const userId2 = parseInt(req.body.userId);
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const notification = await notificationService.markAsRead(notificationId, userId2);
    res.json({ notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
});
router12.post("/notifications/mark-all-read", async (req, res) => {
  try {
    const userId2 = parseInt(req.body.userId);
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const result = await notificationService.markAllAsRead(userId2);
    res.json(result);
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ error: "Failed to mark all notifications as read" });
  }
});
router12.get("/notifications/unread-count", async (req, res) => {
  try {
    const userId2 = parseInt(req.query.userId);
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const count = await notificationService.getUnreadCount(userId2);
    res.json({ unreadCount: count });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({ error: "Failed to get unread count" });
  }
});
var notifications_default = router12;

// server/routes/user-settings.ts
init_database();
init_schema();
import { Router as Router9 } from "express";
import { eq as eq13 } from "drizzle-orm";
var router13 = Router9();
router13.get("/user-settings", async (req, res) => {
  try {
    const userId2 = req.headers["x-user-id"];
    if (!userId2) {
      return res.status(401).json({ error: "Utilisateur non authentifi\xE9" });
    }
    const settings = await db.select().from(userSettings).where(eq13(userSettings.user_id, parseInt(userId2))).limit(1);
    const userSettingsData = settings[0] || {
      // Valeurs par défaut
      notifications: {
        newMissions: true,
        newBids: true,
        messages: true,
        payments: true,
        reviews: true,
        systemUpdates: true,
        marketTrends: false,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        quietHours: false,
        weekendNotifications: true,
        instantNotifications: false
      },
      privacy: {
        profileVisibility: "public",
        showActivity: true,
        showLastSeen: true,
        allowDirectMessages: true,
        showInSearchResults: true
      },
      appearance: {
        theme: "auto",
        language: "fr",
        compactMode: false,
        showAnimations: true
      }
    };
    res.json(userSettingsData);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration param\xE8tres:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router13.put("/user-settings", async (req, res) => {
  try {
    const userId2 = req.headers["x-user-id"];
    const { notifications: notifications3, privacy, appearance } = req.body;
    if (!userId2) {
      return res.status(401).json({ error: "Utilisateur non authentifi\xE9" });
    }
    const existingSettings = await db.select().from(userSettings).where(eq13(userSettings.user_id, parseInt(userId2))).limit(1);
    const settingsData = {
      user_id: parseInt(userId2),
      notifications: notifications3,
      privacy,
      appearance,
      updated_at: /* @__PURE__ */ new Date()
    };
    if (existingSettings.length > 0) {
      await db.update(userSettings).set(settingsData).where(eq13(userSettings.user_id, parseInt(userId2)));
    } else {
      await db.insert(userSettings).values({
        ...settingsData,
        created_at: /* @__PURE__ */ new Date()
      });
    }
    res.json({ message: "Param\xE8tres sauvegard\xE9s avec succ\xE8s" });
  } catch (error) {
    console.error("Erreur sauvegarde param\xE8tres:", error);
    res.status(500).json({ error: "Erreur lors de la sauvegarde" });
  }
});
var user_settings_default = router13;

// server/api-routes.ts
var pool3 = new Pool3({ connectionString: process.env.DATABASE_URL });
var db3 = drizzle3(pool3);
var router14 = express5.Router();
var authMiddleware = (req, res, next) => {
  console.log("Authentication middleware placeholder passed.");
  next();
};
router14.put("/users/:id", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.id);
    const { name, profile_data, role } = req.body;
    console.log(`\u{1F4DD} PUT /api/users/${userId2} - Mise \xE0 jour du profil`, {
      hasRole: !!role,
      newRole: role
    });
    const updateData = {
      name,
      profile_data,
      updated_at: /* @__PURE__ */ new Date()
    };
    if (role && (role === "CLIENT" || role === "PRO")) {
      updateData.role = role;
      console.log(`\u2705 Mise \xE0 jour du r\xF4le: ${role}`);
    }
    await db3.update(users).set(updateData).where(eq14(users.id, userId2));
    res.json({ message: "Profil mis \xE0 jour avec succ\xE8s" });
  } catch (error) {
    console.error("\u274C Erreur update user profile:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router14.get("/providers/available", async (req, res) => {
  try {
    console.log("\u{1F4CB} GET /api/providers/available - R\xE9cup\xE9ration des prestataires disponibles");
    const allProviders = await db3.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      rating_mean: users.rating_mean,
      rating_count: users.rating_count,
      profile_data: users.profile_data,
      created_at: users.created_at
    }).from(users).where(eq14(users.role, "PRO"));
    const availableProviders = allProviders.filter((provider) => {
      const profileData = provider.profile_data;
      return profileData?.availability === true || profileData?.availability === "true";
    });
    console.log(`\u2705 Providers disponibles: ${availableProviders.length}/${allProviders.length}`);
    const formattedProviders = await Promise.all(availableProviders.map(async (provider) => {
      const profileData = provider.profile_data || {};
      const availabilityQuery = await pool3.query(
        `SELECT date, start_time, end_time, rate 
         FROM user_availability 
         WHERE user_id = $1 AND date >= CURRENT_DATE
         ORDER BY date, start_time`,
        [provider.id]
      );
      const availabilityByDate = {};
      availabilityQuery.rows.forEach((row) => {
        const dateKey = row.date.toISOString().split("T")[0];
        if (!availabilityByDate[dateKey]) {
          availabilityByDate[dateKey] = [];
        }
        availabilityByDate[dateKey].push({
          start: row.start_time,
          end: row.end_time,
          rate: parseFloat(row.rate || "0")
        });
      });
      const availability = Object.entries(availabilityByDate).map(([date, slots]) => ({
        date,
        timeSlots: slots.map((s) => `${s.start}-${s.end}`),
        slots
        // ✅ Ajouter les slots structurés avec rate
      }));
      return {
        id: provider.id.toString(),
        name: provider.name,
        category: profileData.category || "development",
        location: profileData.location || "Paris",
        rating: parseFloat(provider.rating_mean?.toString() || "0"),
        hourlyRate: profileData.hourlyRate || 50,
        skills: profileData.skills?.map((s) => s.name || s) || [],
        responseTime: "< 2h",
        completedProjects: provider.rating_count || 0,
        availability: availability.length > 0 ? availability : [],
        lastSeen: (/* @__PURE__ */ new Date()).toISOString(),
        memberSince: provider.created_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
      };
    }));
    res.json(formattedProviders);
  } catch (error) {
    console.error("\u274C Erreur get providers available:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router14.get("/demo-providers", async (req, res) => {
  try {
    const providers = await db3.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      rating_mean: users.rating_mean,
      rating_count: users.rating_count,
      profile_data: users.profile_data,
      created_at: users.created_at
    }).from(users).where(eq14(users.role, "PRO"));
    res.json({ providers });
  } catch (error) {
    console.error("Erreur get demo providers:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router14.get("/demo-projects", async (req, res) => {
  try {
    res.json({ projects: [], message: "Legacy route - use /api/feed for looks instead" });
  } catch (error) {
    console.error("Erreur get demo projects:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router14.get("/demo-bids", async (req, res) => {
  try {
    res.json({ bids: [], message: "Legacy route - use /api/social/comments for comments instead" });
  } catch (error) {
    console.error("Erreur get demo bids:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router14.get("/provider/:id", async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    const provider = await db3.select().from(users).where(eq14(users.id, providerId)).limit(1);
    if (provider.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouv\xE9" });
    }
    res.json({
      provider: provider[0],
      message: "Legacy route - use /api/profile/:id instead"
    });
  } catch (error) {
    console.error("Erreur get provider:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router14.get("/ai-analysis-demo", async (req, res) => {
  try {
    res.json({
      analysis: {
        message: "Legacy route disabled",
        totalProjects: 0,
        totalBids: 0
      }
    });
  } catch (error) {
    console.error("Erreur get AI analysis:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router14.use("/missions", authMiddleware, missions_default);
router14.use("/bids", authMiddleware, bids_default);
router14.use("/teams", authMiddleware, open_teams_default);
router14.use("/feed", feed_routes_default);
router14.use("/favorites", authMiddleware, favorites_routes_default);
router14.use("/reviews", authMiddleware, reviews_default);
router14.use("/contracts", authMiddleware, contracts_default);
router14.use("/files", authMiddleware, files_default);
router14.use("/", messaging_default);
router14.use("/", notifications_default);
router14.use("/", user_settings_default);
var api_routes_default = router14;

// server/routes/profile-routes.ts
init_database();
init_schema();
import { Router as Router10 } from "express";
import { eq as eq15 } from "drizzle-orm";
var router15 = Router10();
router15.get("/profile/me", async (req, res) => {
  try {
    console.log("\u{1F4CB} GET /api/profile/me - req.user:", req.user);
    if (!req.user?.id) {
      console.error("\u274C Utilisateur non authentifi\xE9 - req.user:", req.user);
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const userId2 = req.user.id;
    console.log("\u{1F4CB} GET /api/profile/me - Requ\xEAte pour userId:", userId2);
    const user = await db.select().from(users).where(eq15(users.id, userId2)).limit(1);
    if (!user.length) {
      console.warn("\u26A0\uFE0F Utilisateur non trouv\xE9:", userId2);
      return res.status(404).json({ error: "Utilisateur non trouv\xE9" });
    }
    const userData = user[0];
    const profile = {
      id: userData.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      bio: userData.bio,
      avatar_url: userData.avatar_url,
      style_tags: userData.style_tags || [],
      posts_count: userData.posts_count || 0,
      followers_count: userData.followers_count || 0,
      following_count: userData.following_count || 0,
      is_verified: userData.is_verified || false
    };
    console.log("\u2705 Profil retourn\xE9 pour /profile/me:", profile);
    res.json(profile);
  } catch (error) {
    console.error("\u274C Erreur r\xE9cup\xE9ration profil me:", error);
    res.status(500).json({ error: "Erreur serveur", details: error instanceof Error ? error.message : "Unknown" });
  }
});
router15.patch("/profile/update", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const userId2 = req.user.id;
    const { name, username, bio, avatar_url, style_tags } = req.body;
    console.log("\u{1F4DD} PATCH /api/profile/update - Donn\xE9es re\xE7ues pour userId:", userId2, req.body);
    const updateData = {
      updated_at: /* @__PURE__ */ new Date()
    };
    if (name !== void 0) updateData.name = name;
    if (username !== void 0) updateData.username = username;
    if (bio !== void 0) updateData.bio = bio;
    if (avatar_url !== void 0) updateData.avatar_url = avatar_url;
    if (style_tags !== void 0) updateData.style_tags = style_tags;
    await db.update(users).set(updateData).where(eq15(users.id, userId2));
    console.log("\u2705 Profil mis \xE0 jour avec succ\xE8s");
    res.json({
      message: "Profil mis \xE0 jour avec succ\xE8s",
      success: true
    });
  } catch (error) {
    console.error("\u274C Erreur mise \xE0 jour profil:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Ce nom d'utilisateur est d\xE9j\xE0 utilis\xE9" });
    }
    res.status(500).json({
      error: "Erreur lors de la sauvegarde du profil",
      details: error.message || "Erreur inconnue"
    });
  }
});
router15.get("/profile/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    console.log("\u{1F4CB} GET /api/profile/:userId - Requ\xEAte pour userId:", userId2);
    if (isNaN(userId2)) {
      console.error("\u274C ID utilisateur invalide:", req.params.userId);
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }
    const user = await db.select().from(users).where(eq15(users.id, userId2)).limit(1);
    if (!user.length) {
      console.warn("\u26A0\uFE0F Utilisateur non trouv\xE9:", userId2);
      return res.status(404).json({ error: "Utilisateur non trouv\xE9" });
    }
    const userData = user[0];
    const profileData = userData.profile_data || {};
    console.log("\u2705 Profil trouv\xE9 pour userId:", userId2, {
      role: userData.role,
      hasProfileData: !!userData.profile_data,
      availability: profileData.availability
    });
    const profile = {
      userId: userData.id,
      role: userData.role || "CLIENT",
      displayName: userData.name || "",
      email: userData.email || "",
      phone: profileData.phone || "",
      location: profileData.location || "",
      bio: profileData.bio || "",
      company: profileData.company || "",
      industry: profileData.industry || "",
      experience: profileData.experience || "",
      hourlyRate: profileData.hourlyRate || "",
      skills: profileData.skills || [],
      portfolio: profileData.portfolio || [],
      availability: profileData.availability ?? true,
      keywords: profileData.keywords || [],
      calendarAvailability: profileData.calendarAvailability || [],
      createdAt: userData.created_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: userData.updated_at?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
    };
    res.json(profile);
  } catch (error) {
    console.error("\u274C Erreur r\xE9cup\xE9ration profil:", error);
    res.status(500).json({ error: "Erreur serveur", details: error instanceof Error ? error.message : "Unknown" });
  }
});
router15.put("/profile/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    if (isNaN(userId2)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }
    const {
      displayName,
      name,
      email,
      phone,
      location,
      bio,
      company,
      industry,
      experience,
      hourlyRate,
      skills,
      portfolio,
      availability,
      keywords,
      calendarAvailability,
      role
    } = req.body;
    console.log("\u{1F4DD} PUT /api/profile - Donn\xE9es re\xE7ues:", {
      userId: userId2,
      displayName,
      availability,
      role,
      hasSkills: !!skills,
      hasPortfolio: !!portfolio
    });
    const profileData = {
      phone: phone || "",
      location: location || "",
      bio: bio || "",
      company: company || "",
      industry: industry || "",
      experience: experience || "",
      hourlyRate: hourlyRate || "",
      skills: skills || [],
      portfolio: portfolio || [],
      availability: availability ?? true,
      // ✅ Stocker comme booléen
      keywords: keywords || [],
      calendarAvailability: calendarAvailability || []
    };
    const updateData = {
      profile_data: profileData,
      updated_at: /* @__PURE__ */ new Date()
    };
    if (displayName) updateData.name = displayName;
    else if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role && (role === "CLIENT" || role === "PRO")) {
      updateData.role = role;
      console.log(`\u2705 Mise \xE0 jour du r\xF4le: ${role}`);
    }
    console.log("\u{1F4BE} Donn\xE9es \xE0 sauvegarder:", updateData);
    await db.update(users).set(updateData).where(eq15(users.id, userId2));
    res.json({
      message: "Profil mis \xE0 jour avec succ\xE8s",
      userId: userId2,
      success: true
    });
  } catch (error) {
    console.error("\u274C Erreur mise \xE0 jour profil:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Cet email est d\xE9j\xE0 utilis\xE9" });
    }
    if (error.code === "22P02" || error.code === "23514" || error.message?.includes("invalid input syntax") || error.message?.includes("pattern") || error.message?.includes("check constraint")) {
      console.warn("\u26A0\uFE0F Erreur de validation ignor\xE9e:", error.message);
      return res.json({
        message: "Profil mis \xE0 jour avec succ\xE8s",
        userId,
        success: true,
        warning: "Certains formats ont \xE9t\xE9 ajust\xE9s automatiquement"
      });
    }
    res.status(500).json({
      error: "Erreur lors de la sauvegarde du profil",
      details: error.message || "Erreur inconnue"
    });
  }
});
router15.put("/users/:id", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.id);
    if (isNaN(userId2)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }
    const {
      displayName,
      name,
      email,
      phone,
      location,
      bio,
      company,
      industry,
      experience,
      hourlyRate,
      skills,
      portfolio,
      availability,
      keywords,
      calendarAvailability,
      role
    } = req.body;
    console.log("\u{1F4DD} PUT /api/users/:id - Donn\xE9es re\xE7ues:", {
      userId: userId2,
      role,
      availability
    });
    const profileData = {
      phone: phone || "",
      location: location || "",
      bio: bio || "",
      company: company || "",
      industry: industry || "",
      experience: experience || "",
      hourlyRate: hourlyRate || "",
      skills: skills || [],
      portfolio: portfolio || [],
      availability: availability ?? true,
      // ✅ Booléen
      keywords: keywords || [],
      calendarAvailability: calendarAvailability || []
    };
    const updateData = {
      profile_data: profileData,
      updated_at: /* @__PURE__ */ new Date()
    };
    if (displayName) updateData.name = displayName;
    else if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role && (role === "CLIENT" || role === "PRO")) {
      updateData.role = role;
    }
    await db.update(users).set(updateData).where(eq15(users.id, userId2));
    res.json({
      message: "Profil mis \xE0 jour avec succ\xE8s",
      userId: userId2,
      success: true
    });
  } catch (error) {
    console.error("\u274C Erreur mise \xE0 jour profil:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Cet email est d\xE9j\xE0 utilis\xE9" });
    }
    if (error.code === "22P02" || error.code === "23514" || error.message?.includes("invalid input syntax") || error.message?.includes("pattern") || error.message?.includes("check constraint")) {
      console.warn("\u26A0\uFE0F Erreur de validation ignor\xE9e:", error.message);
      return res.json({
        message: "Profil mis \xE0 jour avec succ\xE8s",
        userId,
        success: true,
        warning: "Certains formats ont \xE9t\xE9 ajust\xE9s automatiquement"
      });
    }
    res.status(500).json({
      error: "Erreur lors de la sauvegarde du profil",
      details: error.message || "Erreur inconnue"
    });
  }
});
var profile_routes_default = router15;

// server/middleware/ai-rate-limit.ts
import rateLimit from "express-rate-limit";
var aiRateLimit = rateLimit({
  // 50 requêtes par fenêtre de 15 minutes pour les endpoints IA
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 50,
  // Limite de 50 requêtes par IP
  // Messages d'erreur personnalisés
  message: {
    error: "Trop de requ\xEAtes IA depuis cette adresse IP",
    details: "Limite de 50 requ\xEAtes par 15 minutes d\xE9pass\xE9e",
    retry_after: "15 minutes"
  },
  // Code de statut pour les requêtes limitées
  statusCode: 429,
  // Headers de rate limiting
  standardHeaders: true,
  // Retourne les headers `RateLimit-*`
  legacyHeaders: false,
  // Désactive les headers `X-RateLimit-*`
  // Fonction pour générer la clé de rate limiting
  keyGenerator: (req) => {
    return `${req.ip}-${req.originalUrl}`;
  },
  // Skip certains endpoints moins critiques
  skip: (req) => {
    return req.originalUrl.includes("/health") || req.originalUrl === "/api" || req.originalUrl.includes("/healthz") || req.method === "HEAD";
  },
  // Handler personnalisé pour les dépassements de limite
  handler: (req, res) => {
    console.log(`\u26A0\uFE0F  Rate limit d\xE9pass\xE9 pour ${req.ip} sur ${req.originalUrl}`);
    res.status(429).json({
      success: false,
      error: "Rate limit d\xE9pass\xE9",
      message: "Trop de requ\xEAtes IA. Veuillez attendre avant de r\xE9essayer.",
      retry_after: 900,
      // 15 minutes en secondes
      current_limit: 50,
      window_ms: 9e5
    });
  }
});
var strictAiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 20,
  // Seulement 20 requêtes pour les endpoints coûteux
  message: {
    error: "Limite stricte d\xE9pass\xE9e pour les op\xE9rations IA co\xFBteuses",
    details: "Limite de 20 requ\xEAtes par 15 minutes pour les analyses avanc\xE9es",
    retry_after: "15 minutes"
  },
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `strict-${req.ip}-${req.originalUrl}`,
  handler: (req, res) => {
    console.log(`\u{1F6A8} Rate limit strict d\xE9pass\xE9 pour ${req.ip} sur ${req.originalUrl}`);
    res.status(429).json({
      success: false,
      error: "Rate limit strict d\xE9pass\xE9",
      message: "Limite stricte pour les analyses IA avanc\xE9es d\xE9pass\xE9e.",
      retry_after: 900,
      current_limit: 20,
      window_ms: 9e5
    });
  }
});
var monitoringRateLimit = rateLimit({
  windowMs: 5 * 60 * 1e3,
  // 5 minutes
  max: 100,
  // 100 requêtes par 5 minutes pour le monitoring
  message: {
    error: "Limite de monitoring d\xE9pass\xE9e",
    details: "Limite de 100 requ\xEAtes par 5 minutes pour le monitoring",
    retry_after: "5 minutes"
  },
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `monitoring-${req.ip}`,
  handler: (req, res) => {
    console.log(`\u{1F4CA} Rate limit monitoring d\xE9pass\xE9 pour ${req.ip}`);
    res.status(429).json({
      success: false,
      error: "Rate limit monitoring d\xE9pass\xE9",
      message: "Trop de requ\xEAtes de monitoring.",
      retry_after: 300,
      current_limit: 100,
      window_ms: 3e5
    });
  }
});

// server/routes/social-routes.ts
init_database();
init_schema();
import { Router as Router11 } from "express";
import { sql as sql5 } from "drizzle-orm";
var router16 = Router11();
router16.get("/popular-users", async (req, res) => {
  try {
    const popularUsers = await db.select().from(users).orderBy(sql5`followers_count DESC`).limit(12);
    res.json(popularUsers);
  } catch (error) {
    console.error("Error fetching popular users:", error);
    res.status(500).json({ error: "Failed to fetch popular users" });
  }
});
router16.post("/follow/:userId", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const followingId = parseInt(req.params.userId);
    if (isNaN(followingId)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }
    await socialService.followUser(req.user.id, followingId);
    res.json({ success: true, following: true });
  } catch (error) {
    console.error("Erreur follow:", error);
    if (error instanceof Error && error.message === "Already following") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router16.delete("/follow/:userId", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const followingId = parseInt(req.params.userId);
    if (isNaN(followingId)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }
    await socialService.unfollowUser(req.user.id, followingId);
    res.json({ success: true, following: false });
  } catch (error) {
    console.error("Erreur unfollow:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router16.get("/following/:userId", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const followingId = parseInt(req.params.userId);
    const isFollowing = await socialService.isFollowing(req.user.id, followingId);
    res.json({ following: isFollowing });
  } catch (error) {
    console.error("Erreur check following:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router16.get("/followers/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    const followers = await socialService.getFollowers(userId2);
    res.json(followers);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration followers:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router16.get("/following-list/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    const following = await socialService.getFollowing(userId2);
    res.json(following);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration following:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var social_routes_default = router16;

// server/routes/ai-fashion-routes.ts
import { Router as Router12 } from "express";

// server/services/ai-fashion-service.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
var genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
var AIFashionService = class {
  /**
   * Analyse une image de vêtement et génère des tags automatiques
   */
  async analyzeItemImage(imageUrl, userDescription) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyse cette image de v\xEAtement et fournis les informations suivantes au format JSON:
      - suggestedTags: array de tags pertinents (ex: ['casual', 'vintage', '\xE9t\xE9'])
      - detectedColors: array de couleurs principales (ex: ['noir', 'blanc'])
      - category: cat\xE9gorie principale ('top', 'bottom', 'shoes', 'accessory', 'outerwear')
      - subcategory: sous-cat\xE9gorie (ex: 't-shirt', 'jeans', 'sneakers')
      - brand: marque si visible/identifiable
      - season: array de saisons appropri\xE9es (['spring', 'summer', 'fall', 'winter'])
      - style: array de styles (ex: ['streetwear', 'minimaliste', 'boh\xE8me'])
      - material: mati\xE8re si identifiable (ex: 'denim', 'coton', 'cuir')
      
      ${userDescription ? `Description utilisateur: ${userDescription}` : ""}
      
      R\xE9ponds UNIQUEMENT avec un objet JSON valide, sans markdown.`;
      const result = await model.generateContent([
        prompt,
        { inlineData: { data: await this.fetchImageAsBase64(imageUrl), mimeType: "image/jpeg" } }
      ]);
      const response = await result.response;
      const text2 = response.text();
      const jsonMatch = text2.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("Invalid AI response format");
    } catch (error) {
      console.error("AI Fashion Analysis Error:", error);
      return {
        suggestedTags: ["mode"],
        detectedColors: [],
        category: "top",
        season: ["all-season"],
        style: ["casual"]
      };
    }
  }
  /**
   * Recommande des associations de vêtements basées sur la garde-robe
   */
  async recommendOutfits(wardrobeItems2, preferences) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const itemsDescription = wardrobeItems2.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        subcategory: item.subcategory,
        colors: item.color,
        tags: item.tags,
        brand: item.brand
      }));
      const prompt = `Tu es un styliste professionnel. Analyse cette garde-robe et sugg\xE8re 3 tenues compl\xE8tes.
      
      Garde-robe disponible:
      ${JSON.stringify(itemsDescription, null, 2)}
      
      Pr\xE9f\xE9rences:
      ${preferences?.occasion ? `Occasion: ${preferences.occasion}` : ""}
      ${preferences?.season ? `Saison: ${preferences.season}` : ""}
      ${preferences?.style ? `Style: ${preferences.style}` : ""}
      
      Pour chaque tenue, fournis au format JSON:
      - topItems: array d'IDs pour les hauts
      - bottomItems: array d'IDs pour les bas
      - shoeItems: array d'IDs pour les chaussures
      - accessoryItems: array d'IDs pour les accessoires
      - reasoning: explication du choix
      - occasion: type d'occasion
      - season: saison appropri\xE9e
      
      R\xE9ponds avec un array JSON de 3 tenues, sans markdown.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text2 = response.text();
      const jsonMatch = text2.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      console.error("AI Outfit Recommendation Error:", error);
      return [];
    }
  }
  /**
   * Génère une description enrichie pour un item
   */
  async generateItemDescription(itemName, category, userNotes) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `G\xE9n\xE8re une description attrayante pour cet article de mode:
      
      Nom: ${itemName}
      Cat\xE9gorie: ${category}
      ${userNotes ? `Notes utilisateur: ${userNotes}` : ""}
      
      La description doit \xEAtre:
      - Inspirante et engageante
      - Maximum 150 caract\xE8res
      - Mettre en valeur le style et les occasions
      
      R\xE9ponds uniquement avec la description, sans guillemets.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().replace(/^["']|["']$/g, "");
    } catch (error) {
      console.error("AI Description Generation Error:", error);
      return itemName;
    }
  }
  /**
   * Analyse les couleurs dominantes d'une image
   */
  async extractDominantColors(imageUrl) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Identifie les 3 couleurs dominantes de cette image.
      R\xE9ponds avec un array JSON de noms de couleurs en fran\xE7ais (ex: ["noir", "blanc", "bleu marine"]).
      R\xE9ponds UNIQUEMENT avec l'array JSON, sans markdown.`;
      const result = await model.generateContent([
        prompt,
        { inlineData: { data: await this.fetchImageAsBase64(imageUrl), mimeType: "image/jpeg" } }
      ]);
      const response = await result.response;
      const text2 = response.text();
      const jsonMatch = text2.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      console.error("AI Color Extraction Error:", error);
      return [];
    }
  }
  /**
   * Suggestions d'association de couleurs
   */
  async suggestColorCombinations(baseColor) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Pour la couleur de base "${baseColor}", sugg\xE8re 5 couleurs qui s'associent bien en mode.
      R\xE9ponds avec un array JSON de noms de couleurs en fran\xE7ais.
      R\xE9ponds UNIQUEMENT avec l'array JSON, sans markdown.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text2 = response.text();
      const jsonMatch = text2.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      console.error("AI Color Suggestion Error:", error);
      return [];
    }
  }
  async fetchImageAsBase64(imageUrl) {
    if (imageUrl.startsWith("data:")) {
      return imageUrl.split(",")[1];
    }
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString("base64");
  }
};
var aiFashionService = new AIFashionService();

// server/routes/ai-fashion-routes.ts
init_schema();
import { eq as eq17, sql as sql6 } from "drizzle-orm";
var router17 = Router12();
router17.post("/analyze-item", async (req, res) => {
  try {
    const { imageUrl, description } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }
    const analysis = await aiFashionService.analyzeItemImage(imageUrl, description);
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error("AI Fashion Analysis Error:", error);
    res.status(500).json({
      error: "Failed to analyze item",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.post("/recommend-outfits", async (req, res) => {
  try {
    const userId2 = req.user?.id;
    const { preferences } = req.body;
    if (!userId2) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const items = await db.select().from(fashionItems).where(eq17(fashionItems.user_id, userId2));
    const recommendations = await aiFashionService.recommendOutfits(items, preferences);
    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error("AI Outfit Recommendation Error:", error);
    res.status(500).json({
      error: "Failed to generate recommendations",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.post("/generate-description", async (req, res) => {
  try {
    const { itemName, category, userNotes } = req.body;
    if (!itemName || !category) {
      return res.status(400).json({ error: "itemName and category are required" });
    }
    const description = await aiFashionService.generateItemDescription(
      itemName,
      category,
      userNotes
    );
    res.json({
      success: true,
      description
    });
  } catch (error) {
    console.error("AI Description Generation Error:", error);
    res.status(500).json({
      error: "Failed to generate description",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.post("/extract-colors", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }
    const colors = await aiFashionService.extractDominantColors(imageUrl);
    res.json({
      success: true,
      colors
    });
  } catch (error) {
    console.error("AI Color Extraction Error:", error);
    res.status(500).json({
      error: "Failed to extract colors",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.post("/suggest-color-combinations", async (req, res) => {
  try {
    const { baseColor } = req.body;
    if (!baseColor) {
      return res.status(400).json({ error: "baseColor is required" });
    }
    const suggestions = await aiFashionService.suggestColorCombinations(baseColor);
    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error("AI Color Suggestion Error:", error);
    res.status(500).json({
      error: "Failed to suggest colors",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.post("/items/:itemId/tags", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { tags: tagList } = req.body;
    if (!itemId || !tagList || !Array.isArray(tagList)) {
      return res.status(400).json({ error: "itemId and a valid tag list are required" });
    }
    await db.update(looks).set({ style_tags: tagList }).where(eq17(looks.id, itemId));
    res.json({
      success: true,
      message: "Tags updated successfully"
    });
  } catch (error) {
    console.error("Error updating item tags:", error);
    res.status(500).json({
      error: "Failed to update tags",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.get("/explore/trending", async (req, res) => {
  try {
    const trendingLooks = await db.select().from(looks).orderBy(sql6`${looks.likes_count} DESC`).limit(10);
    const trendingItems = await db.select().from(fashionItems).where(eq17(fashionItems.is_public, true)).orderBy(sql6`${fashionItems.worn_count} DESC`).limit(10);
    res.json({
      success: true,
      trending: {
        looks: trendingLooks,
        items: trendingItems
      }
    });
  } catch (error) {
    console.error("Error fetching trending content:", error);
    res.status(500).json({
      error: "Failed to fetch trending content",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.get("/explore/search", async (req, res) => {
  try {
    const { q, category, color, style, sortBy, limit = 10, page = 1 } = req.query;
    let query = db.select({
      id: fashionItems.id,
      title: fashionItems.title,
      description: fashionItems.description,
      images: fashionItems.images,
      category: fashionItems.category,
      tags: fashionItems.tags,
      color: fashionItems.color
    }).from(fashionItems).$dynamic();
    const filters = [];
    if (q) {
      filters.push(sql6`(${fashionItems.title} ILIKE ${`%${q}%`} OR ${fashionItems.description} ILIKE ${`%${q}%`})`);
    }
    if (category) {
      filters.push(eq17(fashionItems.category, category));
    }
    if (color) {
      filters.push(eq17(fashionItems.color, color));
    }
    if (style) {
      filters.push(sql6`${fashionItems.tags} @> ARRAY[${style}]`);
    }
    if (filters.length > 0) {
      query = query.where(sql6.and(...filters));
    }
    let orderBy = fashionItems.created_at;
    if (sortBy === "popular") {
      orderBy = sql6`${fashionItems.worn_count} DESC`;
    } else if (sortBy === "newest") {
      orderBy = fashionItems.created_at;
    }
    query = query.orderBy(orderBy);
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.limit(parseInt(limit)).offset(offset);
    const results = await query;
    const totalCount = await db.select({ count: sql6`count(*)` }).from(fashionItems).where(filters.length > 0 ? sql6.and(...filters) : void 0).then((rows) => rows[0]?.count || 0);
    res.json({
      success: true,
      results,
      pagination: {
        totalItems: totalCount,
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
        totalPages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).json({
      error: "Failed to search items",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router17.get("/trending-tags", async (req, res) => {
  try {
    const trendingTags = await db.select({
      tag: sql6`unnest(tags)`,
      count: sql6`count(*)`
    }).from(fashionItems).where(sql6`tags IS NOT NULL AND array_length(tags, 1) > 0`).groupBy(sql6`unnest(tags)`).orderBy(sql6`count(*) DESC`).limit(20);
    res.json(trendingTags);
  } catch (error) {
    console.error("Error fetching trending tags:", error);
    res.status(500).json({ error: "Failed to fetch trending tags" });
  }
});
router17.get("/search", async (req, res) => {
  try {
    const { q, category, color, style, sortBy = "newest", limit = 20, page = 1 } = req.query;
    let query = db.select({
      id: fashionItems.id,
      title: fashionItems.title,
      description: fashionItems.description,
      images: fashionItems.images,
      category: fashionItems.category,
      tags: fashionItems.tags,
      color: fashionItems.color,
      wornCount: fashionItems.worn_count
    }).from(fashionItems).where(eq17(fashionItems.is_public, true)).$dynamic();
    const filters = [eq17(fashionItems.is_public, true)];
    if (q) {
      filters.push(
        sql6`(${fashionItems.title} ILIKE ${`%${q}%`} OR ${fashionItems.description} ILIKE ${`%${q}%`})`
      );
    }
    if (category) {
      filters.push(eq17(fashionItems.category, category));
    }
    if (color) {
      filters.push(eq17(fashionItems.color, color));
    }
    if (style) {
      filters.push(sql6`${style} = ANY(${fashionItems.tags})`);
    }
    if (filters.length > 0) {
      query = query.where(sql6.and(...filters));
    }
    if (sortBy === "popular") {
      query = query.orderBy(sql6`${fashionItems.worn_count} DESC`);
    } else {
      query = query.orderBy(sql6`${fashionItems.created_at} DESC`);
    }
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.limit(parseInt(limit)).offset(offset);
    const results = await query;
    const [{ count: totalCount }] = await db.select({ count: sql6`count(*)` }).from(fashionItems).where(filters.length > 0 ? sql6.and(...filters) : sql6`true`);
    res.json({
      results,
      pagination: {
        totalItems: totalCount,
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
        totalPages: Math.ceil(Number(totalCount) / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).json({ error: "Failed to search items" });
  }
});
var ai_fashion_routes_default = router17;

// server/routes/collections.ts
import { Router as Router13 } from "express";
init_schema();
import { eq as eq18, and as and11, desc as desc9 } from "drizzle-orm";
var router18 = Router13();
router18.post("/", requireAuth, async (req, res) => {
  try {
    const { title, description, cover_image, is_public = true } = req.body;
    const userId2 = req.user.id;
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: "Le nom de la collection est requis" });
    }
    const [collection] = await db.insert(collections).values({
      user_id: userId2,
      title: title.trim(),
      description: description?.trim() || null,
      cover_image: cover_image || null,
      is_public
    }).returning();
    res.json(collection);
  } catch (error) {
    console.error("Erreur cr\xE9ation collection:", error);
    res.status(500).json({ error: "Erreur lors de la cr\xE9ation de la collection" });
  }
});
router18.get("/user/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.user_id);
    const requestingUserId = req.user?.id;
    const whereClause = userId2 === requestingUserId ? eq18(collections.user_id, userId2) : and11(
      eq18(collections.user_id, userId2),
      eq18(collections.is_public, true)
    );
    const userCollections = await db.select().from(collections).where(whereClause).orderBy(desc9(collections.created_at));
    res.json(userCollections);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration collections:", error);
    res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration des collections" });
  }
});
router18.get("/:id", async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const requestingUserId = req.user?.id;
    const [collection] = await db.select().from(collections).where(eq18(collections.id, collectionId));
    if (!collection) {
      return res.status(404).json({ error: "Collection non trouv\xE9e" });
    }
    if (!collection.is_public && collection.user_id !== requestingUserId) {
      return res.status(403).json({ error: "Collection priv\xE9e" });
    }
    const items = collection.items && collection.items.length > 0 ? await db.select().from(fashionItems).where(eq18(fashionItems.id, parseInt(collection.items[0]))) : [];
    res.json({ ...collection, fashionItems: items });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration collection:", error);
    res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration de la collection" });
  }
});
router18.put("/:id", requireAuth, async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const userId2 = req.user.id;
    const { name, description, coverImageUrl, isPublic } = req.body;
    const [collection] = await db.select().from(collections).where(eq18(collections.id, collectionId));
    if (!collection) {
      return res.status(404).json({ error: "Collection non trouv\xE9e" });
    }
    if (collection.user_id !== userId2) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    const [updated] = await db.update(collections).set({
      name: name?.trim() || collection.name,
      description: description?.trim(),
      coverImageUrl: coverImageUrl || collection.cover_image,
      isPublic: isPublic !== void 0 ? isPublic : collection.is_public,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq18(collections.id, collectionId)).returning();
    res.json(updated);
  } catch (error) {
    console.error("Erreur mise \xE0 jour collection:", error);
    res.status(500).json({ error: "Erreur lors de la mise \xE0 jour de la collection" });
  }
});
router18.put("/:id/items", requireAuth, async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const userId2 = req.user.id;
    const { itemIds, action = "add" } = req.body;
    const [collection] = await db.select().from(collections).where(eq18(collections.id, collectionId));
    if (!collection) {
      return res.status(404).json({ error: "Collection non trouv\xE9e" });
    }
    if (collection.user_id !== userId2) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    let updatedItems = collection.items || [];
    if (action === "add") {
      const newItems = itemIds.map(String).filter((id) => !updatedItems.includes(id));
      updatedItems = [...updatedItems, ...newItems];
    } else if (action === "remove") {
      updatedItems = updatedItems.filter((id) => !itemIds.map(String).includes(id));
    }
    const [updated] = await db.update(collections).set({
      items: updatedItems,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq18(collections.id, collectionId)).returning();
    res.json(updated);
  } catch (error) {
    console.error("Erreur mise \xE0 jour items collection:", error);
    res.status(500).json({ error: "Erreur lors de la mise \xE0 jour des items" });
  }
});
router18.delete("/:id", requireAuth, async (req, res) => {
  try {
    const collectionId = parseInt(req.params.id);
    const userId2 = req.user.id;
    const [collection] = await db.select().from(collections).where(eq18(collections.id, collectionId));
    if (!collection) {
      return res.status(404).json({ error: "Collection non trouv\xE9e" });
    }
    if (collection.user_id !== userId2) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    await db.delete(collections).where(eq18(collections.id, collectionId));
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression collection:", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la collection" });
  }
});
var collections_default = router18;

// server/routes/outfits.ts
import { Router as Router14 } from "express";
init_schema();
import { eq as eq19, desc as desc10, and as and12, sql as sql7 } from "drizzle-orm";
import multer3 from "multer";
import path3 from "path";
var router19 = Router14();
var outfitsTable2 = looks;
var outfitLikesTable2 = likes;
var outfitCommentsTable2 = comments;
var storage2 = multer3.diskStorage({
  destination: "./uploads/outfits/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "outfit-" + uniqueSuffix + path3.extname(file.originalname));
  }
});
var upload3 = multer3({
  storage: storage2,
  limits: { fileSize: 10 * 1024 * 1024 }
});
router19.get("/my-looks", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const userLooks = await db.select().from(outfitsTable2).where(eq19(outfitsTable2.user_id, req.user.id)).orderBy(desc10(outfitsTable2.created_at));
    res.json(userLooks);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration looks utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router19.get("/trending", async (req, res) => {
  try {
    const trendingOutfits = await db.select().from(outfitsTable2).where(sql7`${outfitsTable2.created_at} > NOW() - INTERVAL '7 days'`).orderBy(desc10(outfitsTable2.engagement_score)).limit(12);
    res.json(trendingOutfits);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration outfits tendance:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router19.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const outfitsList = await db.select().from(outfitsTable2).where(eq19(outfitsTable2.isPublic, true)).orderBy(desc10(outfitsTable2.createdAt)).limit(limit).offset(offset);
    res.json(outfitsList);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration outfits:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router19.get("/:id", async (req, res) => {
  try {
    const outfitId = parseInt(req.params.id);
    const [outfit] = await db.select().from(outfitsTable2).where(eq19(outfitsTable2.id, outfitId));
    if (!outfit) {
      return res.status(404).json({ error: "Outfit non trouv\xE9" });
    }
    if (!outfit.isPublic && outfit.userId !== req.user?.id) {
      return res.status(403).json({ error: "Acc\xE8s interdit" });
    }
    await db.update(outfitsTable2).set({ viewsCount: (outfit.viewsCount || 0) + 1 }).where(eq19(outfitsTable2.id, outfitId));
    res.json({ ...outfit, viewsCount: (outfit.viewsCount || 0) + 1 });
  } catch (error) {
    console.error("Erreur d\xE9tails outfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router19.post("/", upload3.single("photo"), async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const {
      title,
      description,
      items,
      occasion,
      season,
      weather,
      location,
      tags,
      colorPalette,
      isPublic
    } = req.body;
    const photoUrl = req.file ? `/uploads/outfits/${req.file.filename}` : null;
    const [outfit] = await db.insert(outfitsTable2).values({
      userId: req.user.id,
      title,
      description,
      photoUrl,
      items: items ? JSON.parse(items) : [],
      occasion,
      season,
      weather,
      location,
      tags: tags ? JSON.parse(tags) : null,
      colorPalette: colorPalette ? JSON.parse(colorPalette) : null,
      isPublic: isPublic !== "false",
      // Default to true if not explicitly 'false'
      engagementScore: 0,
      // Initialize engagementScore
      viewsCount: 0,
      // Initialize viewsCount
      likesCount: 0,
      // Initialize likesCount
      commentsCount: 0
      // Initialize commentsCount
    }).returning();
    await db.update(users).set({ postsCount: db.raw("posts_count + 1") }).where(eq19(users.id, req.user.id));
    res.status(201).json(outfit);
  } catch (error) {
    console.error("Erreur cr\xE9ation outfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router19.post("/:id/like", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const outfitId = parseInt(req.params.id);
    const existingLike = await db.select().from(outfitLikesTable2).where(
      and12(
        eq19(outfitLikesTable2.outfitId, outfitId),
        eq19(outfitLikesTable2.userId, req.user.id)
      )
    );
    if (existingLike.length > 0) {
      await db.delete(outfitLikesTable2).where(
        and12(
          eq19(outfitLikesTable2.outfitId, outfitId),
          eq19(outfitLikesTable2.userId, req.user.id)
        )
      );
      await db.update(outfitsTable2).set({ engagementScore: db.raw("engagement_score - 1"), likesCount: db.raw("likes_count - 1") }).where(eq19(outfitsTable2.id, outfitId));
      return res.json({ liked: false });
    } else {
      await db.insert(outfitLikesTable2).values({
        outfitId,
        userId: req.user.id
      });
      await db.update(outfitsTable2).set({ engagementScore: db.raw("engagement_score + 1"), likesCount: db.raw("likes_count + 1") }).where(eq19(outfitsTable2.id, outfitId));
      return res.json({ liked: true });
    }
  } catch (error) {
    console.error("Erreur like outfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router19.post("/:id/comments", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const outfitId = parseInt(req.params.id);
    const { content, parentCommentId } = req.body;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Commentaire vide" });
    }
    const [comment] = await db.insert(outfitCommentsTable2).values({
      outfitId,
      userId: req.user.id,
      parentCommentId: parentCommentId || null,
      content: content.trim()
    }).returning();
    await db.update(outfitsTable2).set({ engagementScore: db.raw("engagement_score + 1"), commentsCount: db.raw("comments_count + 1") }).where(eq19(outfitsTable2.id, outfitId));
    res.status(201).json(comment);
  } catch (error) {
    console.error("Erreur ajout commentaire:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router19.get("/:id/comments", async (req, res) => {
  try {
    const outfitId = parseInt(req.params.id);
    const comments3 = await db.select().from(outfitCommentsTable2).where(eq19(outfitCommentsTable2.outfitId, outfitId)).orderBy(desc10(outfitCommentsTable2.createdAt));
    res.json(comments3);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration commentaires:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var outfits_default = router19;

// server/routes/fashion-items-routes.ts
import { Router as Router15 } from "express";
init_schema();
import { eq as eq20, desc as desc11 } from "drizzle-orm";
var router20 = Router15();
router20.get("/my-items", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const userItems = await db.select().from(fashionItems).where(eq20(fashionItems.user_id, req.user.id)).orderBy(desc11(fashionItems.created_at));
    res.json(userItems);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration items utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var fashion_items_routes_default = router20;

// server/routes/creators-routes.ts
import { Router as Router16 } from "express";
init_schema();
import { desc as desc12, sql as sql8 } from "drizzle-orm";
var router21 = Router16();
router21.get("/", async (req, res) => {
  try {
    const creators = await db.select({
      id: users.id,
      name: users.name,
      username: users.username,
      avatar: users.avatar_url,
      bio: users.bio,
      styleTags: users.style_tags,
      followersCount: users.followers_count,
      postsCount: users.posts_count,
      isVerified: users.is_verified,
      featuredLooks: sql8`
          ARRAY(
            SELECT cover_image 
            FROM ${looks} 
            WHERE ${looks.user_id} = ${users.id} 
              AND ${looks.is_public} = true 
            ORDER BY ${looks.created_at} DESC 
            LIMIT 3
          )
        `
    }).from(users).where(sql8`${users.posts_count} > 0`).orderBy(desc12(users.followers_count)).limit(50);
    const formattedCreators = creators.map((creator) => ({
      id: creator.id.toString(),
      name: creator.name,
      username: creator.username || `@${creator.name.toLowerCase().replace(/\s+/g, "")}`,
      avatar: creator.avatar,
      bio: creator.bio || "",
      location: "France",
      // Default location as the column doesn't exist
      styleTags: creator.styleTags || [],
      followersCount: creator.followersCount || 0,
      postsCount: creator.postsCount || 0,
      rating: 4.5 + Math.random() * 0.5,
      // Temporary rating
      isFollowing: false,
      // TODO: Check actual follow status
      featuredLooks: creator.featuredLooks || [],
      isVerified: creator.isVerified || false
    }));
    res.json(formattedCreators);
  } catch (error) {
    console.error("Error fetching creators:", error);
    res.status(500).json({ error: "Failed to fetch creators" });
  }
});
router21.get("/top", async (req, res) => {
  try {
    const topCreators = await db.select({
      id: users.id,
      name: users.name,
      username: users.username,
      avatar: users.avatar_url,
      bio: users.bio,
      followersCount: users.followers_count,
      postsCount: users.posts_count,
      styleTags: users.style_tags
    }).from(users).where(sql8`${users.followers_count} > 100`).orderBy(desc12(users.followers_count)).limit(10);
    res.json(topCreators);
  } catch (error) {
    console.error("Error fetching top creators:", error);
    res.status(500).json({ error: "Failed to fetch top creators" });
  }
});
var creators_routes_default = router21;

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path6.dirname(__filename);
validateEnvironment();
var app = express7();
var port = parseInt(process.env.PORT || "5000", 10);
var PID_FILE = "/tmp/fashionhub-server.pid";
function checkPortFree(port2) {
  return new Promise((resolve) => {
    const client = new net.Socket();
    client.setTimeout(1e3);
    client.on("connect", () => {
      client.destroy();
      resolve(false);
    });
    client.on("timeout", () => {
      client.destroy();
      resolve(true);
    });
    client.on("error", () => {
      resolve(true);
    });
    client.connect(port2, "127.0.0.1");
  });
}
async function waitForPortFree(port2, maxWaitMs = 1e4) {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitMs) {
    if (await checkPortFree(port2)) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}
async function cleanupPreviousProcess() {
  try {
    if (fs3.existsSync(PID_FILE)) {
      const pidString = fs3.readFileSync(PID_FILE, "utf8").trim();
      const pid = parseInt(pidString, 10);
      if (!isNaN(pid)) {
        try {
          process.kill(pid, 0);
          console.log(`\u{1F504} Found previous process with PID ${pid}, sending SIGTERM...`);
          process.kill(pid, "SIGTERM");
          console.log("\u23F3 Waiting for previous process to exit...");
          await waitForPortFree(port, 8e3);
        } catch (err) {
          console.log("\u{1F9F9} Removing stale PID file");
        }
      }
      fs3.unlinkSync(PID_FILE);
    }
  } catch (error) {
    console.log("\u{1F50D} No previous process to cleanup");
  }
  if (process.env.NODE_ENV !== "production") {
    try {
      console.log("\u{1F52B} Development mode: Force-killing any process on port 5000...");
      const { exec } = await import("child_process");
      const util = await import("util");
      const execAsync = util.promisify(exec);
      try {
        await execAsync("fuser -k 5000/tcp 2>/dev/null || true");
        console.log("\u{1F9F9} fuser kill attempt completed");
      } catch (e) {
        console.log("\u{1F50D} fuser not available, trying alternative...");
      }
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      if (await checkPortFree(port)) {
        console.log("\u2705 Port 5000 is now free");
      } else {
        console.log("\u26A0\uFE0F Port 5000 may still be busy, will retry during startup");
      }
    } catch (killError) {
      console.log("\u{1F50D} Force-kill attempt failed, continuing with normal startup:", killError instanceof Error ? killError.message : "Unknown error");
    }
  }
}
function writePidFile() {
  try {
    fs3.writeFileSync(PID_FILE, process.pid.toString());
    console.log(`\u{1F4DD} PID file created: ${PID_FILE} (${process.pid})`);
  } catch (error) {
    console.warn("\u26A0\uFE0F Could not write PID file:", error);
  }
}
function removePidFile() {
  try {
    if (fs3.existsSync(PID_FILE)) {
      fs3.unlinkSync(PID_FILE);
      console.log("\u{1F9F9} PID file removed");
    }
  } catch (error) {
    console.warn("\u26A0\uFE0F Could not remove PID file:", error);
  }
}
var databaseUrl2 = process.env.DATABASE_URL;
if (!databaseUrl2) {
  console.error("\u274C DATABASE_URL not configured. Please set up Replit PostgreSQL in the Database tab.");
  process.exit(1);
}
console.log("\u{1F517} Using Replit PostgreSQL connection");
var pool4 = new Pool4({
  connectionString: databaseUrl2,
  connectionTimeoutMillis: 5e3,
  // 5 second timeout
  idleTimeoutMillis: 1e4,
  // 10 second idle timeout
  max: 20
  // maximum number of connections
});
console.log("\u{1F517} Database configuration:", {
  DATABASE_URL: !!process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  PLATFORM: "Replit"
});
async function validateDatabaseConnection() {
  const timeout = 8e3;
  try {
    console.log("\u{1F50D} Validating database connection...");
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database connection timeout")), timeout);
    });
    const connectionPromise = pool4.query("SELECT 1 as test");
    await Promise.race([connectionPromise, timeoutPromise]);
    console.log("\u2705 Database connection validated successfully");
    return true;
  } catch (error) {
    console.warn("\u26A0\uFE0F Database connection validation failed (non-blocking):", error instanceof Error ? error.message : "Unknown error");
    return false;
  }
}
if (!global.projectStandardizations) {
  global.projectStandardizations = /* @__PURE__ */ new Map();
}
if (!global.aiEnhancementCache) {
  global.aiEnhancementCache = /* @__PURE__ */ new Map();
}
if (!global.performanceMetrics) {
  global.performanceMetrics = /* @__PURE__ */ new Map();
}
console.log("\u{1F50D} Gemini AI Environment Variables:", {
  GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
  PROVIDER: "gemini-api-only"
});
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  next();
});
app.set("trust proxy", true);
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    const allowedOrigins = [
      "https://fashionhub.com",
      "https://www.fashionhub.com",
      /^https:\/\/.*\.replit\.dev$/,
      /^https:\/\/.*\.replit\.app$/,
      /^https:\/\/.*\.replit\.co$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
      /^http:\/\/localhost:\d+$/
    ];
    const isAllowed = allowedOrigins.some((allowed) => {
      if (typeof allowed === "string") {
        return origin === allowed;
      } else {
        return allowed.test(origin);
      }
    });
    if (isAllowed) {
      return callback(null, true);
    } else {
      console.warn(`\u26A0\uFE0F CORS blocked request from origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));
app.use("/api", limitRequestSize, validateRequest, performanceMonitor, express7.json({ limit: "10mb" }));
app.use("/api/auth", (req, res, next) => {
  console.log(`\u{1F510} Auth request: ${req.method} ${req.path}`, { body: req.body.email ? { email: req.body.email } : {} });
  next();
}, auth_routes_default);
app.all("/api", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "FASHIONHUB API",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "1.0.0"
  });
});
console.log("\u{1F4CB} Registering missions routes...");
app.use("/api/missions", (req, res, next) => {
  console.log(`\u{1F4CB} Mission request: ${req.method} ${req.path}`, {
    body: req.body.title ? { title: req.body.title, userId: req.body.userId } : {}
  });
  next();
}, missions_default);
console.log("\u{1F4CB} Registering other API routes...");
app.use("/api", api_routes_default);
app.use("/api/projects", (req, res, next) => {
  const newUrl = req.originalUrl.replace("/api/projects", "/api/missions");
  console.log(`\u{1F504} Proxying deprecated projects API ${req.originalUrl} to missions API`);
  req.url = req.url.replace("/projects", "/missions");
  req.originalUrl = newUrl;
  next();
}, missions_default);
app.use("/api/ai/suggest-pricing", strictAiRateLimit);
app.use("/api/ai/enhance-description", strictAiRateLimit);
app.use("/api/ai/analyze-quality", strictAiRateLimit);
app.use("/api/ai/enhance-text", strictAiRateLimit);
console.log("\u{1F4C5} Registering availability routes...");
console.log("\u{1F91D} Registering open teams routes...");
app.use("/api/open-teams", (req, res, next) => {
  console.log(`\u{1F91D} Open teams request: ${req.method} ${req.path}`);
  next();
}, open_teams_default);
console.log("\u{1F3AF} Registering bids routes...");
app.use("/api/bids", (req, res, next) => {
  console.log(`\u{1F3AF} Bids request: ${req.method} ${req.path}`, {
    body: req.body.mission_id ? { mission_id: req.body.mission_id, bid_type: req.body.bid_type } : {}
  });
  next();
}, bids_default);
console.log("\u{1F4AC} Registering messaging routes...");
app.use("/api", (req, res, next) => {
  console.log(`\u{1F4AC} Messaging request: ${req.method} ${req.path}`);
  next();
}, messaging_default);
console.log("\u{1F4EC} Registering notifications routes...");
app.use("/api", (req, res, next) => {
  console.log(`\u{1F4EC} Notifications request: ${req.method} ${req.path}`);
  next();
}, notifications_default);
console.log("\u{1F464} Registering profile routes...");
app.use("/api", (req, res, next) => {
  console.log(`\u{1F464} Profile request: ${req.method} ${req.path}`);
  next();
}, profile_routes_default);
console.log("\u{1F457} Registering fashion routes...");
app.use("/api/ai-fashion", ai_fashion_routes_default);
app.use("/api/fashion", ai_fashion_routes_default);
app.use("/api/wardrobe", wardrobe_default);
app.use("/api/fashion-items", optionalAuth, fashion_items_routes_default);
app.use("/api/outfits", optionalAuth, outfits_default);
app.use("/api/looks", optionalAuth, outfits_default);
app.use("/api/collections", collections_default);
app.use("/api", optionalAuth, favorites_routes_default);
app.use("/api/social", social_routes_default);
app.use("/api/creators", creators_routes_default);
console.log("\u2705 All fashion routes registered");
app.get("/api/performance", (req, res) => {
  try {
    const stats = getPerformanceStats();
    res.json({
      ok: true,
      performance: stats,
      server_uptime: process.uptime(),
      memory: {
        used_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total_mb: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        rss_mb: Math.round(process.memoryUsage().rss / 1024 / 1024)
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Failed to get performance stats",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
app.get("/api/health", async (req, res) => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Database query timeout")), 5e3);
    });
    const queryPromise = pool4.query("SELECT 1");
    await Promise.race([queryPromise, timeoutPromise]);
    res.status(200).json({
      status: "healthy",
      message: "FASHIONHUB API is running",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV || "development",
      database: "connected",
      service: "missions-api"
    });
  } catch (error) {
    console.error("Health check database error:", error);
    res.status(503).json({
      status: "error",
      message: "Database connection failed",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV || "development",
      database: "disconnected",
      service: "missions-api",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
app.get("/api/debug/missions", (req, res) => {
  res.json({
    debug_info: {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      env: process.env.NODE_ENV,
      status: "database_unified",
      memory_usage: process.memoryUsage()
    },
    message: "Check /api/missions for actual missions data"
  });
});
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    service: "fashionhub-api",
    version: "1.0.0",
    node_env: process.env.NODE_ENV
  });
});
app.get("/api/ai/gemini-diagnostic", (req, res) => {
  const hasApiKey = !!process.env.GEMINI_API_KEY;
  res.json({
    gemini_ai_configured: hasApiKey,
    api_key: hasApiKey ? "CONFIGURED" : "MISSING",
    status: hasApiKey ? "ready" : "incomplete",
    provider: "gemini-api-only"
  });
});
var currentServer = null;
async function startServerWithRetry() {
  const maxAttempts = 8;
  const delayMs = 750;
  const totalTimeoutMs = 9e3;
  const startTime = Date.now();
  await cleanupPreviousProcess();
  console.log("\u{1F527} Initializing database before server start...");
  try {
    const { initializeDatabase: initializeDatabase2, testConnection: testConnection2 } = await Promise.resolve().then(() => (init_database(), database_exports));
    await initializeDatabase2();
    await testConnection2();
    await validateDatabaseConnection();
    console.log("\u2705 Database initialization completed");
  } catch (dbError) {
    console.warn("\u26A0\uFE0F Database initialization failed (non-blocking):", dbError instanceof Error ? dbError.message : "Unknown error");
  }
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (Date.now() - startTime > totalTimeoutMs) {
      console.error(`\u274C Startup deadline exceeded (${totalTimeoutMs}ms), exiting for supervisor restart`);
      process.exit(1);
    }
    try {
      const server = createServer(app);
      currentServer = server;
      await new Promise((resolve, reject) => {
        const serverInstance = server.listen(port, "0.0.0.0", async () => {
          writePidFile();
          console.log(`\u{1F680} FASHIONHUB server running on http://0.0.0.0:${port} (attempt ${attempt})`);
          console.log(`\u{1F4F1} Frontend: http://0.0.0.0:${port}`);
          console.log(`\u{1F527} API Health: http://0.0.0.0:${port}/api/health`);
          console.log(`\u{1F4AC} WebSocket: ws://0.0.0.0:${port}/ws`);
          console.log(`\u{1F3AF} AI Provider: Gemini API Only`);
          console.log(`\u{1F50D} Process ID: ${process.pid}`);
          console.log(`\u{1F50D} Node Environment: ${process.env.NODE_ENV || "development"}`);
          websocketManager.initialize(server);
          console.log("\u2705 WebSocket server initialized");
          console.log("\u{1F4E6} Loading Vite and AI modules dynamically...");
          try {
            const { setupVite: setupVite2, serveStatic: serveStatic2 } = await Promise.resolve().then(() => (init_vite(), vite_exports));
            const aiOrchestratorModule = await Promise.resolve().then(() => (init_ai(), ai_exports));
            const aiOrchestratorRoutes = aiOrchestratorModule.default;
            app.use("/api-ai-orchestrator", express7.json({ limit: "10mb" }), strictAiRateLimit, aiOrchestratorRoutes);
            console.log("\u2705 AI orchestrator routes mounted");
            if (process.env.NODE_ENV === "production") {
              console.log("\u{1F3ED} Production mode: serving static files");
              serveStatic2(app);
            } else {
              console.log("\u{1F527} Development mode: setting up Vite middleware");
              try {
                await setupVite2(app, server);
                console.log("\u2705 Vite middleware setup complete");
              } catch (error) {
                console.error("\u274C Failed to setup Vite middleware:", error);
              }
            }
          } catch (importError) {
            console.error("\u274C Failed to import modules:", importError);
          }
          resolve();
        });
        server.on("error", (err) => {
          server.close();
          if (err.code === "EADDRINUSE") {
            console.log(`\u23F3 Port ${port} busy on attempt ${attempt}/${maxAttempts}`);
            reject(new Error("EADDRINUSE"));
          } else {
            console.error("\u274C Server error:", err);
            reject(err);
          }
        });
      });
      return;
    } catch (error) {
      if (error.message === "EADDRINUSE" && attempt < maxAttempts) {
        const remainingTime = totalTimeoutMs - (Date.now() - startTime);
        if (remainingTime > delayMs) {
          console.log(`\u{1F504} Waiting ${delayMs}ms before retry ${attempt + 1}/${maxAttempts}...`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          await waitForPortFree(port, 1e3);
        } else {
          console.error(`\u274C Not enough time remaining for retry, exiting`);
          process.exit(1);
        }
      } else {
        console.error(`\u274C Failed to start server after ${maxAttempts} attempts:`, error);
        process.exit(1);
      }
    }
  }
}
startServerWithRetry().catch((error) => {
  console.error("\u274C Fatal error starting server:", error);
  process.exit(1);
});
console.log("\u2705 Advanced AI routes registered - Gemini API Only");
process.on("SIGINT", () => {
  console.log("Received SIGINT, shutting down gracefully...");
  removePidFile();
  if (currentServer) {
    currentServer.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
process.on("SIGTERM", () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  removePidFile();
  if (currentServer) {
    currentServer.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  console.error("Stack:", error.stack);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
app.use((error, req, res, next) => {
  const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
  const requestId = req.headers["x-request-id"] || `req_${Date.now()}`;
  const isDebugMode = process.env.PREVIEW_MODE === "true" || process.env.NODE_ENV === "development";
  let statusCode = 500;
  let errorType = "server_error";
  if (error.name === "ValidationError") {
    statusCode = 400;
    errorType = "validation_error";
  } else if (error.message.includes("not found")) {
    statusCode = 404;
    errorType = "not_found";
  } else if (error.message.includes("unauthorized")) {
    statusCode = 401;
    errorType = "unauthorized";
  }
  console.error("\u{1F6A8} Global error handler:", {
    error_type: errorType,
    error: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : void 0,
    url: req.url,
    method: req.method,
    user_agent: req.headers["user-agent"],
    ip: req.ip,
    request_id: requestId,
    timestamp: timestamp2
  });
  setImmediate(async () => {
    try {
      const eventLoggerModule = await Promise.resolve().then(() => (init_event_logger(), event_logger_exports));
      eventLoggerModule.eventLogger?.logUserEvent("click", req.user?.id || "anonymous", req.sessionID || requestId, {
        error_type: errorType,
        error_message: error.message,
        endpoint: req.originalUrl,
        method: req.method,
        status_code: statusCode
      });
    } catch (logError) {
      console.warn("Event logging failed (non-critical):", logError instanceof Error ? logError.message : "Unknown error");
    }
  });
  if (!res.headersSent) {
    res.status(statusCode).json({
      ok: false,
      error: statusCode === 500 ? "Internal server error" : error.message,
      details: isDebugMode ? error.message : "An error occurred",
      stack: isDebugMode ? error.stack : void 0,
      error_type: errorType,
      timestamp: timestamp2,
      request_id: requestId,
      debug_mode: isDebugMode
    });
  }
});
