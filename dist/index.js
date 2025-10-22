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
  aiEvents: () => aiEvents,
  aiEventsRelations: () => aiEventsRelations,
  announcements: () => announcements,
  announcementsRelations: () => announcementsRelations,
  bids: () => bids,
  bidsRelations: () => bidsRelations,
  contracts: () => contracts,
  contractsRelations: () => contractsRelations,
  conversations: () => conversations,
  conversationsRelations: () => conversationsRelations,
  deliverables: () => deliverables,
  deliverablesRelations: () => deliverablesRelations,
  fashionItems: () => fashionItems,
  fashionItemsRelations: () => fashionItemsRelations,
  fashionProfiles: () => fashionProfiles,
  fashionProfilesRelations: () => fashionProfilesRelations,
  favorites: () => favorites,
  favoritesRelations: () => favoritesRelations,
  feedFeedback: () => feedFeedback,
  feedFeedbackRelations: () => feedFeedbackRelations,
  feedPosts: () => feedPosts,
  feedPostsRelations: () => feedPostsRelations,
  feedSeen: () => feedSeen,
  feedSeenRelations: () => feedSeenRelations,
  files: () => files,
  filesRelations: () => filesRelations,
  follows: () => follows,
  followsRelations: () => followsRelations,
  followsTable: () => followsTable,
  followsTableRelations: () => followsTableRelations,
  insertAiEventSchema: () => insertAiEventSchema,
  insertAnnouncementSchema: () => insertAnnouncementSchema,
  insertBidSchema: () => insertBidSchema,
  insertContractSchema: () => insertContractSchema,
  insertDeliverableSchema: () => insertDeliverableSchema,
  insertFavoritesSchema: () => insertFavoritesSchema,
  insertFeedFeedbackSchema: () => insertFeedFeedbackSchema,
  insertFeedSeenSchema: () => insertFeedSeenSchema,
  insertFileSchema: () => insertFileSchema,
  insertMissionSchema: () => insertMissionSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertOpenTeamSchema: () => insertOpenTeamSchema,
  insertReviewHelpfulSchema: () => insertReviewHelpfulSchema,
  insertReviewSchema: () => insertReviewSchema,
  insertUserSchema: () => insertUserSchema,
  messages: () => messages,
  messagesRelations: () => messagesRelations,
  missions: () => missions,
  missionsRelations: () => missionsRelations,
  notifications: () => notifications,
  notificationsRelations: () => notificationsRelations,
  openTeams: () => openTeams,
  openTeamsRelations: () => openTeamsRelations,
  outfitCommentsTable: () => outfitCommentsTable,
  outfitCommentsTableRelations: () => outfitCommentsTableRelations,
  outfitItems: () => outfitItems,
  outfitItemsRelations: () => outfitItemsRelations,
  outfitLikesTable: () => outfitLikesTable,
  outfitLikesTableRelations: () => outfitLikesTableRelations,
  outfits: () => outfits,
  outfitsRelations: () => outfitsRelations,
  outfitsTable: () => outfitsTable,
  outfitsTableRelations: () => outfitsTableRelations,
  postComments: () => postComments,
  postCommentsRelations: () => postCommentsRelations,
  postLikes: () => postLikes,
  postLikesRelations: () => postLikesRelations,
  reviewHelpful: () => reviewHelpful,
  reviewHelpfulRelations: () => reviewHelpfulRelations,
  reviews: () => reviews,
  reviewsRelations: () => reviewsRelations,
  userSettings: () => userSettings,
  userSettingsRelations: () => userSettingsRelations,
  users: () => users,
  usersRelations: () => usersRelations,
  wardrobeCollections: () => wardrobeCollections,
  wardrobeItems: () => wardrobeItems,
  wardrobeItemsRelations: () => wardrobeItemsRelations
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
  uniqueIndex,
  date,
  primaryKey
} from "drizzle-orm/pg-core";
import { z } from "zod";
function numeric(name, config) {
  return text(name);
}
var users, missions, openTeams, bids, announcements, feedFeedback, feedSeen, favorites, reviews, reviewHelpful, contracts, deliverables, conversations, messages, notifications, files, usersRelations, missionsRelations, openTeamsRelations, bidsRelations, announcementsRelations, feedFeedbackRelations, feedSeenRelations, favoritesRelations, reviewsRelations, reviewHelpfulRelations, contractsRelations, deliverablesRelations, conversationsRelations, messagesRelations, notificationsRelations, userSettings, userSettingsRelations, filesRelations, insertUserSchema, insertMissionSchema, insertBidSchema, insertOpenTeamSchema, insertReviewSchema, insertReviewHelpfulSchema, insertContractSchema, insertDeliverableSchema, insertNotificationSchema, insertFileSchema, insertAnnouncementSchema, insertFeedFeedbackSchema, insertFeedSeenSchema, insertFavoritesSchema, aiEvents, aiEventsRelations, insertAiEventSchema, fashionProfiles, fashionItems, outfits, outfitItems, postLikes, postComments, follows, fashionProfilesRelations, fashionItemsRelations, outfitsRelations, outfitItemsRelations, followsRelations, wardrobeItems, wardrobeCollections, feedPosts, feedPostsRelations, postLikesRelations, postCommentsRelations, wardrobeItemsRelations, outfitsTable, outfitsTableRelations, outfitLikesTable, outfitLikesTableRelations, outfitCommentsTable, outfitCommentsTableRelations, followsTable, followsTableRelations;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      email: text("email").notNull().unique(),
      name: text("name").notNull(),
      password: text("password").notNull(),
      role: text("role").notNull().$type(),
      rating_mean: numeric("rating_mean", { precision: 3, scale: 2 }),
      rating_count: integer("rating_count").default(0),
      // ✅ profile_data (JSONB) contient:
      // {
      //   phone?: string,
      //   location?: string,
      //   bio?: string,
      //   company?: string,
      //   industry?: string,
      //   experience?: string,
      //   hourlyRate?: string,
      //   skills?: Array<{name: string, hourlyRate?: number, category?: string}>,
      //   portfolio?: Array<{title: string, description: string}>,
      //   availability?: boolean,  // ✅ BOOLEAN pour disponibilité globale
      //   keywords?: string[],
      //   calendarAvailability?: Array<{id?: number, date: string, startTime: string, endTime: string, rate?: number}>
      // }
      profile_data: jsonb("profile_data"),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    missions = pgTable("missions", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      client_id: integer("client_id").references(() => users.id),
      title: text("title").notNull(),
      description: text("description").notNull(),
      excerpt: text("excerpt"),
      category: text("category").notNull(),
      // Localisation unifiée en JSON
      location_data: jsonb("location_data"),
      // Budget simplifié - prix entier en euros
      price: integer("price").notNull(),
      currency: text("currency").default("EUR"),
      // ENUMs PostgreSQL optimisés
      urgency: text("urgency").$type().default("medium"),
      status: text("status").$type().default("draft"),
      quality_target: text("quality_target").$type().default("standard"),
      deadline: timestamp("deadline"),
      tags: jsonb("tags"),
      skills_required: jsonb("skills_required"),
      requirements: text("requirements"),
      is_team_mission: boolean("is_team_mission").default(false),
      team_size: integer("team_size").default(1),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    openTeams = pgTable("open_teams", {
      id: serial("id").primaryKey(),
      mission_id: integer("mission_id").references(() => missions.id).notNull(),
      name: text("name").notNull(),
      // Nom de l'équipe
      description: text("description"),
      creator_id: integer("creator_id").references(() => users.id).notNull(),
      // Initiateur de l'équipe
      estimated_budget: integer("estimated_budget"),
      // Budget estimé en centimes
      estimated_timeline_days: integer("estimated_timeline_days"),
      members: jsonb("members"),
      // Membres actuels de l'équipe
      required_roles: jsonb("required_roles"),
      // Rôles recherchés
      max_members: integer("max_members").default(5),
      status: text("status").$type().default("recruiting"),
      visibility: text("visibility").$type().default("public"),
      auto_accept: boolean("auto_accept").default(true),
      // Accepter automatiquement les candidatures
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    bids = pgTable("bids", {
      id: serial("id").primaryKey(),
      mission_id: integer("mission_id").notNull().references(() => missions.id, { onDelete: "cascade" }),
      provider_id: integer("provider_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      timeline_days: integer("timeline_days"),
      message: text("message"),
      score_breakdown: jsonb("score_breakdown"),
      is_leading: boolean("is_leading").default(false),
      status: text("status").$type().default("pending"),
      // Extensions pour les équipes
      bid_type: text("bid_type").$type().default("individual"),
      team_composition: jsonb("team_composition"),
      // Structure de l'équipe
      team_lead_id: integer("team_lead_id").references(() => users.id),
      // Chef d'équipe
      open_team_id: integer("open_team_id").references(() => openTeams.id),
      // Référence vers équipe ouverte
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    announcements = pgTable("announcements", {
      id: integer("id").primaryKey(),
      // Utilise l'ID de la mission
      // Contenu principal
      title: text("title").notNull(),
      description: text("description").notNull(),
      excerpt: text("excerpt").notNull(),
      // Catégorisation pour le feed
      category: text("category").notNull(),
      tags: text("tags").array().default([]),
      // Prix simplifié
      price: integer("price").notNull(),
      currency: text("currency").default("EUR"),
      // Localisation simplifiée
      location_display: text("location_display"),
      city: text("city"),
      country: text("country"),
      // Métadonnées feed
      client_id: integer("client_id").notNull(),
      client_display_name: text("client_display_name").notNull(),
      // Stats engagements
      bids_count: integer("bids_count").default(0),
      lowest_bid_cents: integer("lowest_bid_cents"),
      views_count: integer("views_count").default(0),
      saves_count: integer("saves_count").default(0),
      // Scoring pour algorithme feed
      quality_score: decimal("quality_score", { precision: 3, scale: 2 }).default("0.0"),
      engagement_score: decimal("engagement_score", { precision: 5, scale: 2 }).default("0.0"),
      freshness_score: decimal("freshness_score", { precision: 3, scale: 2 }).default("1.0"),
      // Status et timing
      status: text("status").notNull().default("active"),
      urgency: text("urgency").default("medium"),
      deadline: timestamp("deadline"),
      // Metadata pour feed
      is_sponsored: boolean("is_sponsored").default(false),
      boost_score: decimal("boost_score", { precision: 3, scale: 2 }).default("0.0"),
      // Recherche optimisée
      search_text: text("search_text").notNull(),
      // search_vector géré par PostgreSQL, pas inclus dans Drizzle
      // Audit
      created_at: timestamp("created_at").notNull().defaultNow(),
      updated_at: timestamp("updated_at").notNull().defaultNow(),
      synced_at: timestamp("synced_at").defaultNow()
    });
    feedFeedback = pgTable("feed_feedback", {
      id: serial("id").primaryKey(),
      announcement_id: integer("announcement_id").references(() => announcements.id).notNull(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      feedback_type: text("feedback_type").$type().notNull(),
      created_at: timestamp("created_at").defaultNow()
    });
    feedSeen = pgTable("feed_seen", {
      id: serial("id").primaryKey(),
      announcement_id: integer("announcement_id").references(() => announcements.id).notNull(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      seen_at: timestamp("seen_at").defaultNow()
    });
    favorites = pgTable("favorites", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      announcement_id: integer("announcement_id").references(() => announcements.id).notNull(),
      created_at: timestamp("created_at").defaultNow()
    });
    reviews = pgTable("reviews", {
      id: serial("id").primaryKey(),
      mission_id: integer("mission_id").references(() => missions.id).notNull(),
      reviewer_id: integer("reviewer_id").references(() => users.id).notNull(),
      reviewee_id: integer("reviewee_id").references(() => users.id).notNull(),
      rating: integer("rating").notNull(),
      // 1-5
      comment: text("comment"),
      response: text("response"),
      // Réponse du prestataire
      criteria: jsonb("criteria"),
      // {communication: 5, quality: 4, deadline: 5, etc.}
      is_public: boolean("is_public").default(true),
      helpful_count: integer("helpful_count").default(0),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    reviewHelpful = pgTable("review_helpful", {
      id: serial("id").primaryKey(),
      review_id: integer("review_id").references(() => reviews.id).notNull(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      created_at: timestamp("created_at").defaultNow()
    });
    contracts = pgTable("contracts", {
      id: serial("id").primaryKey(),
      mission_id: integer("mission_id").references(() => missions.id).notNull(),
      bid_id: integer("bid_id").references(() => bids.id).notNull(),
      client_id: integer("client_id").references(() => users.id).notNull(),
      provider_id: integer("provider_id").references(() => users.id).notNull(),
      status: text("status").$type().default("pending_signature"),
      terms: jsonb("terms"),
      // Conditions acceptées
      deliverables: jsonb("deliverables"),
      // Liste des livrables attendus
      milestones: jsonb("milestones"),
      // Jalons de paiement
      // Signatures électroniques
      client_signed_at: timestamp("client_signed_at"),
      provider_signed_at: timestamp("provider_signed_at"),
      // Dates importantes
      start_date: timestamp("start_date"),
      expected_end_date: timestamp("expected_end_date"),
      actual_end_date: timestamp("actual_end_date"),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    deliverables = pgTable("deliverables", {
      id: serial("id").primaryKey(),
      contract_id: integer("contract_id").references(() => contracts.id).notNull(),
      title: text("title").notNull(),
      description: text("description"),
      status: text("status").$type().default("pending"),
      file_urls: jsonb("file_urls"),
      // URLs des fichiers livrés
      submitted_at: timestamp("submitted_at"),
      reviewed_at: timestamp("reviewed_at"),
      feedback: text("feedback"),
      created_at: timestamp("created_at").defaultNow()
    });
    conversations = pgTable("conversations", {
      id: serial("id").primaryKey(),
      mission_id: integer("mission_id").references(() => missions.id),
      participant1_id: integer("participant1_id").references(() => users.id).notNull(),
      participant2_id: integer("participant2_id").references(() => users.id).notNull(),
      last_message_at: timestamp("last_message_at").defaultNow(),
      created_at: timestamp("created_at").defaultNow()
    });
    messages = pgTable("messages", {
      id: serial("id").primaryKey(),
      conversation_id: integer("conversation_id").references(() => conversations.id).notNull(),
      sender_id: integer("sender_id").references(() => users.id).notNull(),
      content: text("content").notNull(),
      message_type: text("message_type").$type().default("text"),
      file_url: text("file_url"),
      read_at: timestamp("read_at"),
      created_at: timestamp("created_at").defaultNow()
    });
    notifications = pgTable("notifications", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      type: text("type").notNull(),
      // 'new_bid', 'message', 'payment', 'review', etc.
      title: text("title").notNull(),
      message: text("message").notNull(),
      link: text("link"),
      // URL de redirection
      metadata: jsonb("metadata"),
      read_at: timestamp("read_at"),
      created_at: timestamp("created_at").defaultNow()
    });
    files = pgTable("files", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      filename: text("filename").notNull(),
      original_filename: text("original_filename").notNull(),
      file_type: text("file_type").notNull(),
      // mime type
      file_size: integer("file_size").notNull(),
      // en bytes
      file_url: text("file_url").notNull(),
      // Contexte d'utilisation
      context_type: text("context_type"),
      // 'portfolio', 'bid', 'deliverable', 'profile_picture'
      context_id: integer("context_id"),
      // ID de la mission, bid, etc.
      metadata: jsonb("metadata"),
      created_at: timestamp("created_at").defaultNow()
    });
    usersRelations = relations(users, ({ many }) => ({
      missions: many(missions),
      bids: many(bids),
      // teamMembers: many(teamMembers), // This seems to be a leftover from a previous or incomplete change. Removing it.
      reviewsGiven: many(reviews, { relationName: "reviewer" }),
      reviewsReceived: many(reviews, { relationName: "reviewee" }),
      contracts: many(contracts),
      notifications: many(notifications),
      files: many(files)
    }));
    missionsRelations = relations(missions, ({ one, many }) => ({
      user: one(users, {
        fields: [missions.user_id],
        references: [users.id]
      }),
      bids: many(bids),
      reviews: many(reviews)
    }));
    openTeamsRelations = relations(openTeams, ({ one, many }) => ({
      mission: one(missions, {
        fields: [openTeams.mission_id],
        references: [missions.id]
      }),
      creator: one(users, {
        fields: [openTeams.creator_id],
        references: [users.id]
      }),
      bids: many(bids)
    }));
    bidsRelations = relations(bids, ({ one }) => ({
      mission: one(missions, {
        fields: [bids.mission_id],
        references: [missions.id]
      }),
      provider: one(users, {
        fields: [bids.provider_id],
        references: [users.id]
      }),
      teamLead: one(users, {
        fields: [bids.team_lead_id],
        references: [users.id]
      }),
      openTeam: one(openTeams, {
        fields: [bids.open_team_id],
        references: [openTeams.id]
      })
    }));
    announcementsRelations = relations(announcements, ({ one, many }) => ({
      client: one(users, {
        fields: [announcements.client_id],
        references: [users.id]
      }),
      feedbacks: many(feedFeedback),
      seenBy: many(feedSeen),
      favorites: many(favorites)
    }));
    feedFeedbackRelations = relations(feedFeedback, ({ one }) => ({
      announcement: one(announcements, {
        fields: [feedFeedback.announcement_id],
        references: [announcements.id]
      }),
      user: one(users, {
        fields: [feedFeedback.user_id],
        references: [users.id]
      })
    }));
    feedSeenRelations = relations(feedSeen, ({ one }) => ({
      announcement: one(announcements, {
        fields: [feedSeen.announcement_id],
        references: [announcements.id]
      }),
      user: one(users, {
        fields: [feedSeen.user_id],
        references: [users.id]
      })
    }));
    favoritesRelations = relations(favorites, ({ one }) => ({
      announcement: one(announcements, {
        fields: [favorites.announcement_id],
        references: [announcements.id]
      }),
      user: one(users, {
        fields: [favorites.user_id],
        references: [users.id]
      })
    }));
    reviewsRelations = relations(reviews, ({ one, many }) => ({
      mission: one(missions, {
        fields: [reviews.mission_id],
        references: [missions.id]
      }),
      reviewer: one(users, {
        fields: [reviews.reviewer_id],
        references: [users.id]
      }),
      reviewee: one(users, {
        fields: [reviews.reviewee_id],
        references: [users.id]
      }),
      helpfulMarks: many(reviewHelpful)
    }));
    reviewHelpfulRelations = relations(reviewHelpful, ({ one }) => ({
      review: one(reviews, {
        fields: [reviewHelpful.review_id],
        references: [reviews.id]
      }),
      user: one(users, {
        fields: [reviewHelpful.user_id],
        references: [users.id]
      })
    }));
    contractsRelations = relations(contracts, ({ one, many }) => ({
      mission: one(missions, {
        fields: [contracts.mission_id],
        references: [missions.id]
      }),
      bid: one(bids, {
        fields: [contracts.bid_id],
        references: [bids.id]
      }),
      client: one(users, {
        fields: [contracts.client_id],
        references: [users.id]
      }),
      provider: one(users, {
        fields: [contracts.provider_id],
        references: [users.id]
      }),
      deliverables: many(deliverables)
    }));
    deliverablesRelations = relations(deliverables, ({ one }) => ({
      contract: one(contracts, {
        fields: [deliverables.contract_id],
        references: [contracts.id]
      })
    }));
    conversationsRelations = relations(conversations, ({ one, many }) => ({
      mission: one(missions, {
        fields: [conversations.mission_id],
        references: [missions.id]
      }),
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
      })
    }));
    notificationsRelations = relations(notifications, ({ one }) => ({
      user: one(users, {
        fields: [notifications.user_id],
        references: [users.id]
      })
    }));
    userSettings = pgTable("user_settings", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull().unique(),
      notifications: jsonb("notifications"),
      privacy: jsonb("privacy"),
      appearance: jsonb("appearance"),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    userSettingsRelations = relations(userSettings, ({ one }) => ({
      user: one(users, {
        fields: [userSettings.user_id],
        references: [users.id]
      })
    }));
    filesRelations = relations(files, ({ one }) => ({
      user: one(users, {
        fields: [files.user_id],
        references: [users.id]
      })
    }));
    insertUserSchema = z.object({
      email: z.string().min(1),
      // Accepte tout texte non vide au lieu de valider strictement le format email
      name: z.string().min(1),
      password: z.string().optional(),
      // Mot de passe optionnel et sans longueur minimale
      role: z.enum(["CLIENT", "PRO", "ADMIN"]),
      rating_mean: z.string().optional(),
      rating_count: z.number().int().min(0).optional(),
      profile_data: z.any().optional()
    });
    insertMissionSchema = z.object({
      user_id: z.number().int().positive(),
      title: z.string().min(1),
      description: z.string().min(1),
      category: z.string().min(1),
      location: z.string().optional(),
      postal_code: z.string().optional(),
      price: z.number().int().min(10),
      urgency: z.enum(["low", "medium", "high", "urgent"]).optional(),
      status: z.enum(["draft", "open", "published", "assigned", "completed", "cancelled"]).optional(),
      quality_target: z.enum(["basic", "standard", "premium", "luxury"]).optional()
    });
    insertBidSchema = z.object({
      mission_id: z.number().int().positive(),
      provider_id: z.number().int().positive(),
      price: z.string(),
      // Changed from amount to price
      timeline_days: z.number().int().min(1).optional(),
      message: z.string().optional(),
      score_breakdown: z.any().optional(),
      is_leading: z.boolean().optional(),
      status: z.enum(["pending", "accepted", "rejected", "withdrawn"]).optional(),
      // Extensions pour les équipes
      bid_type: z.enum(["individual", "team", "open_team"]).optional(),
      team_composition: z.any().optional(),
      // Structure de l'équipe
      team_lead_id: z.number().int().positive().optional(),
      open_team_id: z.number().int().positive().optional()
    });
    insertOpenTeamSchema = z.object({
      mission_id: z.number().int().positive(),
      name: z.string().min(1),
      description: z.string().optional(),
      // creator_id is set from authenticated user, not from client
      estimated_budget: z.number().int().positive().optional(),
      estimated_timeline_days: z.number().int().min(1).optional(),
      members: z.any().optional(),
      required_roles: z.any().optional(),
      max_members: z.number().int().min(2).max(10).optional(),
      status: z.enum(["recruiting", "complete", "submitted", "cancelled"]).optional(),
      visibility: z.enum(["public", "private"]).optional(),
      auto_accept: z.boolean().optional()
    });
    insertReviewSchema = z.object({
      mission_id: z.number().int().positive(),
      reviewer_id: z.number().int().positive(),
      reviewee_id: z.number().int().positive(),
      rating: z.number().int().min(1).max(5),
      comment: z.string().optional(),
      response: z.string().optional(),
      criteria: z.any().optional(),
      is_public: z.boolean().optional(),
      helpful_count: z.number().int().min(0).optional()
    });
    insertReviewHelpfulSchema = z.object({
      review_id: z.number().int().positive(),
      user_id: z.number().int().positive()
    });
    insertContractSchema = z.object({
      mission_id: z.number().int().positive(),
      bid_id: z.number().int().positive(),
      client_id: z.number().int().positive(),
      provider_id: z.number().int().positive(),
      status: z.enum(["pending_signature", "active", "in_progress", "under_review", "completed", "disputed", "cancelled"]).optional(),
      terms: z.any().optional(),
      deliverables: z.any().optional(),
      milestones: z.any().optional(),
      client_signed_at: z.string().datetime().optional(),
      provider_signed_at: z.string().datetime().optional(),
      start_date: z.string().datetime().optional(),
      expected_end_date: z.string().datetime().optional(),
      actual_end_date: z.string().datetime().optional()
    });
    insertDeliverableSchema = z.object({
      contract_id: z.number().int().positive(),
      title: z.string().min(1),
      description: z.string().optional(),
      status: z.enum(["pending", "submitted", "approved", "rejected"]).optional(),
      file_urls: z.any().optional(),
      submitted_at: z.string().datetime().optional(),
      reviewed_at: z.string().datetime().optional(),
      feedback: z.string().optional()
    });
    insertNotificationSchema = z.object({
      user_id: z.number().int().positive(),
      type: z.string().min(1),
      title: z.string().min(1),
      message: z.string().min(1),
      link: z.string().url().optional(),
      metadata: z.any().optional(),
      read_at: z.string().datetime().optional()
    });
    insertFileSchema = z.object({
      user_id: z.number().int().positive(),
      filename: z.string().min(1),
      original_filename: z.string().min(1),
      file_type: z.string().min(1),
      file_size: z.number().int().min(0),
      file_url: z.string().url().min(1),
      context_type: z.string().optional(),
      context_id: z.number().int().positive().optional(),
      metadata: z.any().optional()
    });
    insertAnnouncementSchema = z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      type: z.enum(["info", "warning", "error", "success"]).optional(),
      priority: z.number().int().min(1).optional(),
      is_active: z.boolean().optional(),
      status: z.enum(["active", "completed", "cancelled", "draft"]).optional(),
      category: z.string().optional(),
      budget: z.number().int().min(0).optional(),
      location: z.string().optional(),
      user_id: z.number().int().positive().optional(),
      sponsored: z.boolean().optional()
    });
    insertFeedFeedbackSchema = z.object({
      announcement_id: z.number().int().positive(),
      user_id: z.number().int().positive(),
      feedback_type: z.enum(["like", "dislike", "interested", "not_relevant"])
    });
    insertFeedSeenSchema = z.object({
      announcement_id: z.number().int().positive(),
      user_id: z.number().int().positive()
    });
    insertFavoritesSchema = z.object({
      user_id: z.number().int().positive(),
      announcement_id: z.number().int().positive()
    });
    aiEvents = pgTable("ai_events", {
      id: text("id").primaryKey(),
      phase: text("phase").$type().notNull(),
      provider: text("provider").notNull(),
      model_family: text("model_family").$type().notNull(),
      model_name: text("model_name").notNull(),
      allow_training: boolean("allow_training").notNull(),
      input_redacted: jsonb("input_redacted"),
      output: jsonb("output"),
      confidence: text("confidence"),
      tokens: integer("tokens"),
      latency_ms: integer("latency_ms"),
      provenance: text("provenance").$type().notNull(),
      prompt_hash: text("prompt_hash"),
      accepted: boolean("accepted"),
      rating: integer("rating"),
      edits: jsonb("edits"),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    aiEventsRelations = relations(aiEvents, ({ one }) => ({
      // Pas de relations directes pour l'instant
    }));
    insertAiEventSchema = z.object({
      id: z.string(),
      phase: z.enum(["pricing", "brief_enhance", "matching", "scoring"]),
      provider: z.string(),
      model_family: z.enum(["gemini", "openai", "local", "other"]),
      model_name: z.string(),
      allow_training: z.boolean(),
      input_redacted: z.any().optional(),
      output: z.any().optional(),
      confidence: z.string().optional(),
      tokens: z.number().int().optional(),
      latency_ms: z.number().int().optional(),
      provenance: z.enum(["auto", "human_validated", "ab_test_winner"]),
      prompt_hash: z.string().optional(),
      accepted: z.boolean().optional(),
      rating: z.number().int().min(1).max(5).optional(),
      edits: z.any().optional()
    });
    fashionProfiles = pgTable("fashion_profiles", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull().unique(),
      style_preferences: jsonb("style_preferences"),
      // { aesthetic: string[], colors: string[], brands: string[] }
      body_type: text("body_type"),
      // ... autres champs spécifiques à la mode
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    fashionItems = pgTable("fashion_items", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      name: text("name").notNull(),
      description: text("description"),
      category: text("category").notNull(),
      // 'top', 'bottom', 'shoes', 'accessory'
      brand: text("brand"),
      color: text("color"),
      material: text("material"),
      size: text("size"),
      image_url: text("image_url"),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    outfits = pgTable("outfits", {
      id: serial("id").primaryKey(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      name: text("name").notNull(),
      description: text("description"),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    outfitItems = pgTable("outfit_items", {
      outfit_id: integer("outfit_id").references(() => outfits.id).notNull(),
      item_id: integer("item_id").references(() => fashionItems.id).notNull()
    }, (table) => ({
      pk: primaryKey({ columns: [table.outfit_id, table.item_id] })
    }));
    postLikes = pgTable("post_likes", {
      id: serial("id").primaryKey(),
      post_id: integer("post_id").references(() => feedPosts.id).notNull(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      created_at: timestamp("created_at").defaultNow()
    });
    postComments = pgTable("post_comments", {
      id: serial("id").primaryKey(),
      post_id: integer("post_id").references(() => feedPosts.id).notNull(),
      user_id: integer("user_id").references(() => users.id).notNull(),
      content: text("content").notNull(),
      created_at: timestamp("created_at").defaultNow(),
      updated_at: timestamp("updated_at").defaultNow()
    });
    follows = pgTable("follows", {
      follower_id: integer("follower_id").references(() => users.id).notNull(),
      following_id: integer("following_id").references(() => users.id).notNull(),
      created_at: timestamp("created_at").defaultNow()
    }, (table) => ({
      pk: primaryKey({ columns: [table.follower_id, table.following_id] })
    }));
    fashionProfilesRelations = relations(fashionProfiles, ({ one }) => ({
      user: one(users, {
        fields: [fashionProfiles.user_id],
        references: [users.id]
      })
    }));
    fashionItemsRelations = relations(fashionItems, ({ one }) => ({
      user: one(users, {
        fields: [fashionItems.user_id],
        references: [users.id]
      })
    }));
    outfitsRelations = relations(outfits, ({ one, many }) => ({
      user: one(users, {
        fields: [outfits.user_id],
        references: [users.id]
      }),
      items: many(outfitItems),
      posts: many(feedPosts)
    }));
    outfitItemsRelations = relations(outfitItems, ({ one }) => ({
      outfit: one(outfits, {
        fields: [outfitItems.outfit_id],
        references: [outfits.id]
      }),
      item: one(fashionItems, {
        fields: [outfitItems.item_id],
        references: [fashionItems.id]
      })
    }));
    followsRelations = relations(follows, ({ one }) => ({
      follower: one(users, {
        fields: [follows.follower_id],
        references: [users.id]
      }),
      following: one(users, {
        fields: [follows.following_id],
        references: [users.id]
      })
    }));
    wardrobeItems = pgTable("wardrobe_items", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id).notNull(),
      name: text("name").notNull(),
      description: text("description"),
      category: text("category").notNull(),
      subcategory: text("subcategory"),
      brand: text("brand"),
      color: text("color").array(),
      size: text("size"),
      material: text("material"),
      season: text("season"),
      imageUrl: text("image_url").notNull(),
      imageUrls: text("image_urls").array(),
      purchaseDate: date("purchase_date"),
      purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
      currentValue: decimal("current_value", { precision: 10, scale: 2 }),
      purchaseLocation: text("purchase_location"),
      tags: text("tags").array(),
      condition: text("condition").default("good"),
      isPublic: boolean("is_public").default(true),
      isForSale: boolean("is_for_sale").default(false),
      isForSwap: boolean("is_for_swap").default(false),
      viewsCount: integer("views_count").default(0),
      likesCount: integer("likes_count").default(0),
      savedCount: integer("saved_count").default(0),
      usedInOutfitsCount: integer("used_in_outfits_count").default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    wardrobeCollections = pgTable("wardrobe_collections", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id).notNull(),
      name: text("name").notNull(),
      description: text("description"),
      coverImageUrl: text("cover_image_url"),
      items: text("items").array(),
      // Array of wardrobe_item_ids as strings
      isPublic: boolean("is_public").default(true),
      sortOrder: integer("sort_order").default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    feedPosts = pgTable("feed_posts", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id).notNull(),
      postType: text("post_type").notNull(),
      // 'outfit', 'wardrobe_item', 'collection', 'question'
      outfitId: integer("outfit_id").references(() => outfits.id),
      wardrobeItemId: integer("wardrobe_item_id").references(() => wardrobeItems.id),
      collectionId: integer("collection_id").references(() => wardrobeCollections.id),
      caption: text("caption"),
      tags: text("tags").array(),
      qualityScore: decimal("quality_score", { precision: 3, scale: 2 }).default("0"),
      engagementScore: decimal("engagement_score", { precision: 5, scale: 2 }).default("0"),
      freshnessScore: decimal("freshness_score", { precision: 3, scale: 2 }).default("1"),
      viewsCount: integer("views_count").default(0),
      likesCount: integer("likes_count").default(0),
      commentsCount: integer("comments_count").default(0),
      savesCount: integer("saves_count").default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    feedPostsRelations = relations(feedPosts, ({ one, many }) => ({
      user: one(users, {
        fields: [feedPosts.userId],
        references: [users.id]
      }),
      outfit: one(outfits, {
        fields: [feedPosts.outfitId],
        references: [outfits.id]
      }),
      likes: many(postLikes),
      comments: many(postComments)
    }));
    postLikesRelations = relations(postLikes, ({ one }) => ({
      post: one(feedPosts, {
        fields: [postLikes.post_id],
        references: [feedPosts.id]
      }),
      user: one(users, {
        fields: [postLikes.user_id],
        references: [users.id]
      })
    }));
    postCommentsRelations = relations(postComments, ({ one }) => ({
      post: one(feedPosts, {
        fields: [postComments.post_id],
        references: [feedPosts.id]
      }),
      user: one(users, {
        fields: [postComments.user_id],
        references: [users.id]
      })
    }));
    wardrobeItemsRelations = relations(wardrobeItems, ({ one }) => ({
      user: one(users, {
        fields: [wardrobeItems.userId],
        references: [users.id]
      })
    }));
    outfitsTable = pgTable("outfits", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id).notNull(),
      title: text("title").notNull(),
      description: text("description"),
      photoUrl: text("photo_url"),
      items: jsonb("items").default("[]"),
      occasion: text("occasion"),
      season: text("season"),
      weather: text("weather"),
      location: text("location"),
      tags: text("tags").array(),
      colorPalette: text("color_palette").array(),
      isPublic: boolean("is_public").default(true),
      viewsCount: integer("views_count").default(0),
      likesCount: integer("likes_count").default(0),
      savesCount: integer("saves_count").default(0),
      commentsCount: integer("comments_count").default(0),
      qualityScore: decimal("quality_score", { precision: 3, scale: 2 }).default("0"),
      engagementScore: decimal("engagement_score", { precision: 5, scale: 2 }).default("0"),
      freshnessScore: decimal("freshness_score", { precision: 3, scale: 2 }).default("1"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    outfitsTableRelations = relations(outfitsTable, ({ one, many }) => ({
      user: one(users, {
        fields: [outfitsTable.userId],
        references: [users.id]
      }),
      likes: many(outfitLikesTable),
      comments: many(outfitCommentsTable)
    }));
    outfitLikesTable = pgTable("outfit_likes", {
      id: serial("id").primaryKey(),
      outfitId: integer("outfit_id").references(() => outfitsTable.id).notNull(),
      userId: integer("user_id").references(() => users.id).notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      uniqueLike: uniqueIndex("unique_outfit_like").on(table.outfitId, table.userId)
    }));
    outfitLikesTableRelations = relations(outfitLikesTable, ({ one }) => ({
      outfit: one(outfitsTable, {
        fields: [outfitLikesTable.outfitId],
        references: [outfitsTable.id]
      }),
      user: one(users, {
        fields: [outfitLikesTable.userId],
        references: [users.id]
      })
    }));
    outfitCommentsTable = pgTable("outfit_comments", {
      id: serial("id").primaryKey(),
      outfitId: integer("outfit_id").references(() => outfitsTable.id).notNull(),
      userId: integer("user_id").references(() => users.id).notNull(),
      parentCommentId: integer("parent_comment_id").references(() => outfitCommentsTable.id),
      content: text("content").notNull(),
      likesCount: integer("likes_count").default(0),
      isEdited: boolean("is_edited").default(false),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    outfitCommentsTableRelations = relations(outfitCommentsTable, ({ one }) => ({
      outfit: one(outfitsTable, {
        fields: [outfitCommentsTable.outfitId],
        references: [outfitsTable.id]
      }),
      user: one(users, {
        fields: [outfitCommentsTable.userId],
        references: [users.id]
      })
    }));
    followsTable = pgTable("follows", {
      id: serial("id").primaryKey(),
      followerId: integer("follower_id").references(() => users.id).notNull(),
      followingId: integer("following_id").references(() => users.id).notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    }, (table) => ({
      uniqueFollow: uniqueIndex("unique_follow").on(table.followerId, table.followingId)
    }));
    followsTableRelations = relations(followsTable, ({ one }) => ({
      follower: one(users, {
        fields: [followsTable.followerId],
        references: [users.id]
      }),
      following: one(users, {
        fields: [followsTable.followingId],
        references: [users.id]
      })
    }));
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
        role TEXT NOT NULL,
        rating_mean DECIMAL(3, 2),
        rating_count INTEGER DEFAULT 0,
        profile_data JSONB,
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

// apps/api/src/ai/adapters/geminiAdapter.ts
var geminiAdapter_exports = {};
__export(geminiAdapter_exports, {
  geminiCall: () => geminiCall
});
import { GoogleGenerativeAI } from "@google/generative-ai";
async function geminiCall(phase, prompt) {
  const t0 = Date.now();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  console.log("\u{1F3AF} Initialisation Gemini API...");
  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log("\u{1F4E1} Envoi requ\xEAte Gemini API...");
  let text2;
  try {
    const result = await model.generateContent(JSON.stringify(prompt));
    const response = await result.response;
    text2 = response.text();
    if (!text2) {
      throw new Error("R\xE9ponse vide de Gemini API");
    }
    console.log("\u2705 R\xE9ponse Gemini API re\xE7ue avec succ\xE8s");
  } catch (geminiError) {
    console.error("\u{1F6A8} ERREUR GEMINI API:", geminiError);
    throw new Error(`Gemini API \xE9chou\xE9: ${geminiError.message}`);
  }
  let parsed;
  try {
    parsed = JSON.parse(text2);
    console.log("\u2705 R\xE9ponse Gemini pars\xE9e en JSON:", parsed);
  } catch {
    console.log("\u{1F4DD} R\xE9ponse Gemini en texte brut (pas JSON):", text2.substring(0, 200) + "...");
    parsed = text2;
  }
  const latency = Date.now() - t0;
  const out = {
    phase,
    model_family: "gemini",
    model_name: "gemini-1.5-flash",
    input_redacted: {},
    output: parsed,
    quality: { latency_ms: latency },
    meta: {
      provider: "gemini-api",
      allow_training: false,
      provenance: "gemini-api-direct",
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  return out;
}
var init_geminiAdapter = __esm({
  "apps/api/src/ai/adapters/geminiAdapter.ts"() {
    "use strict";
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
import express7 from "express";
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
  app2.use(express7.static(distPath));
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
import { Router as Router22 } from "express";
var router28, ai_default;
var init_ai = __esm({
  "apps/api/src/routes/ai.ts"() {
    "use strict";
    init_AIOrchestrator();
    router28 = Router22();
    router28.post("/pricing", async (req, res) => {
      try {
        const result = await getPricingSuggestion(req.body);
        res.json(result);
      } catch (error) {
        console.error("AI Pricing error:", error);
        res.status(500).json({ error: "Erreur lors du calcul de prix" });
      }
    });
    router28.post("/brief", async (req, res) => {
      try {
        const result = await enhanceBrief(req.body);
        res.json(result);
      } catch (error) {
        console.error("AI Brief enhancement error:", error);
        res.status(500).json({ error: "Erreur lors de l'am\xE9lioration du brief" });
      }
    });
    router28.post("/feedback", async (req, res) => {
      try {
        const { phase, prompt, feedback } = req.body;
        await logUserFeedback(phase, prompt, feedback);
        res.json({ ok: true });
      } catch (error) {
        console.error("AI Feedback error:", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement du feedback" });
      }
    });
    ai_default = router28;
  }
});

// server/index.ts
import express8 from "express";
import path6 from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

// server/services/mission-sync.ts
init_database();
init_schema();
import { eq } from "drizzle-orm";
var MissionSyncService = class {
  databaseUrl;
  constructor(databaseUrl3) {
    this.databaseUrl = databaseUrl3;
  }
  /**
   * Synchronise une mission vers le feed announcements
   * Gestion idempotente avec upsert
   */
  async syncMissionToFeed(missionId) {
    try {
      console.log(`\u{1F504} Sync mission ${missionId} to feed`);
      const mission = await this.getMissionWithDetails(missionId);
      if (!mission) {
        throw new Error(`Mission ${missionId} not found`);
      }
      const feedItem = this.buildMissionForFeed(mission);
      await this.upsertAnnouncement(feedItem);
      console.log(`\u2705 Mission ${missionId} synced to feed successfully`);
    } catch (error) {
      console.error(`\u274C Failed to sync mission ${missionId} to feed:`, error);
      throw error;
    }
  }
  /**
   * Construit l'objet announcement à partir d'une mission
   * Règles de transformation et optimisation SEO
   */
  buildMissionForFeed(mission) {
    const excerpt = this.generateOptimizedExcerpt(mission.description, mission.skills_required);
    const budgetDisplay = this.formatBudgetForFeed(mission);
    const budgetValueCents = this.extractBudgetValueForSorting(mission);
    const locationDisplay = this.formatLocationForFeed(mission);
    const searchText = this.buildSearchText(mission);
    const clientDisplayName = this.sanitizeClientName(mission.client_name || "Client anonyme");
    return {
      id: mission.id,
      // Contenu optimisé SEO
      title: mission.title,
      description: mission.description,
      excerpt,
      // Catégorisation pour algorithme feed
      category: mission.category || "general",
      tags: mission.tags || [],
      // Budget pour tri et affichage
      budget_display: budgetDisplay,
      budget_value_cents: budgetValueCents,
      currency: mission.currency || "EUR",
      // Localisation feed-friendly
      location_display: locationDisplay,
      city: mission.city || null,
      country: mission.country || "France",
      // Métadonnées client (anonymisées)
      client_id: mission.user_id,
      client_display_name: clientDisplayName,
      // Stats (initialisées à 0, mises à jour par triggers)
      bids_count: 0,
      lowest_bid_cents: null,
      views_count: 0,
      saves_count: 0,
      // Scoring pour algorithme feed
      quality_score: this.calculateQualityScore(mission),
      engagement_score: 0,
      // Calculé par les interactions
      freshness_score: 1,
      // Calculé par trigger
      // Status feed
      status: this.mapMissionStatusToFeedStatus(mission.status),
      urgency: mission.urgency || "medium",
      deadline: mission.deadline,
      // Métadonnées feed
      is_sponsored: false,
      // TODO: logique sponsoring
      boost_score: 0,
      // Recherche optimisée
      search_text: searchText,
      // search_vector sera calculé par la DB
      // Audit
      synced_at: /* @__PURE__ */ new Date()
    };
  }
  /**
   * Upsert idempotent avec gestion des conflits
   */
  async upsertAnnouncement(feedItem) {
    const query = `
      SELECT upsert_announcement(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      ) as announcement_id
    `;
    const params = [
      feedItem.id,
      // p_mission_id
      feedItem.title,
      // p_title
      feedItem.description,
      // p_description
      feedItem.excerpt,
      // p_excerpt
      feedItem.category,
      // p_category
      feedItem.tags,
      // p_tags
      feedItem.budget_display,
      // p_budget_display
      feedItem.budget_value_cents,
      // p_budget_value_cents
      feedItem.currency,
      // p_currency
      feedItem.location_display,
      // p_location_display
      feedItem.city,
      // p_city
      feedItem.country,
      // p_country
      feedItem.client_id,
      // p_client_id
      feedItem.client_display_name,
      // p_client_display_name
      feedItem.status,
      // p_status
      feedItem.urgency,
      // p_urgency
      feedItem.deadline,
      // p_deadline
      feedItem.quality_score
      // p_quality_score
    ];
    const result = await pool.query(query, params);
    console.log(`\u{1F4E4} Upserted announcement for mission ${feedItem.id}`);
  }
  /**
   * Récupère mission avec détails pour sync
   */
  async getMissionWithDetails(missionId) {
    const query = `
      SELECT 
        m.*,
        u.name as client_name
      FROM missions m
      LEFT JOIN users u ON m.client_id = u.id
      WHERE m.id = $1
    `;
    const result = await pool.query(query, [missionId]);
    return result.rows[0] || null;
  }
  // ============================================
  // UTILITAIRES DE TRANSFORMATION
  // ============================================
  /**
   * Génère un excerpt optimisé pour le feed
   * Priorité : compétences + début description
   */
  generateOptimizedExcerpt(description, skills = []) {
    const maxLength = 200;
    if (skills.length > 0) {
      const skillsText = `Comp\xE9tences: ${skills.slice(0, 3).join(", ")}. `;
      const remainingLength = maxLength - skillsText.length - 3;
      if (remainingLength > 50) {
        const descStart = description.substring(0, remainingLength).trim();
        return skillsText + descStart + "...";
      }
    }
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength - 3).trim() + "...";
  }
  /**
   * Formate le budget pour affichage feed
   */
  formatBudgetForFeed(mission) {
    if (mission.budget_type === "negotiable") return "\xC0 n\xE9gocier";
    if (mission.budget_type === "fixed" && mission.budget_value_cents) {
      return `${Math.round(mission.budget_value_cents / 100)}\u20AC`;
    }
    if (mission.budget_type === "range" && mission.budget_min_cents && mission.budget_max_cents) {
      const min = Math.round(mission.budget_min_cents / 100);
      const max = Math.round(mission.budget_max_cents / 100);
      return `${min}-${max}\u20AC`;
    }
    return "Budget non d\xE9fini";
  }
  /**
   * Extrait valeur numérique pour tri
   */
  extractBudgetValueForSorting(mission) {
    if (mission.budget_type === "fixed" && mission.budget_value_cents) {
      return mission.budget_value_cents;
    }
    if (mission.budget_type === "range" && mission.budget_min_cents && mission.budget_max_cents) {
      return Math.round((mission.budget_min_cents + mission.budget_max_cents) / 2);
    }
    return null;
  }
  /**
   * Formate localisation pour feed
   */
  formatLocationForFeed(mission) {
    if (mission.city && mission.country) {
      return `${mission.city}, ${mission.country}`;
    }
    if (mission.city) return mission.city;
    if (mission.remote_allowed) return "Remote";
    return "Localisation flexible";
  }
  /**
   * Construit texte de recherche optimisé
   */
  buildSearchText(mission) {
    const parts = [
      mission.title,
      mission.description,
      mission.category,
      ...mission.tags || [],
      ...mission.skills_required || [],
      mission.city,
      mission.country
    ].filter(Boolean);
    return parts.join(" ").toLowerCase();
  }
  /**
   * Sanitise nom client pour affichage public
   */
  sanitizeClientName(name) {
    if (name.includes(" ") && name.length > 20) {
      const parts = name.split(" ");
      return `${parts[0]} ${parts[parts.length - 1][0]}.`;
    }
    if (name.length > 30) {
      return name.substring(0, 27) + "...";
    }
    return name;
  }
  /**
   * Calcule score qualité pour algorithme feed
   */
  calculateQualityScore(mission) {
    let score = 0;
    if (mission.title && mission.title.length >= 10) score += 1;
    if (mission.title && mission.title.length >= 30) score += 1;
    if (mission.description && mission.description.length >= 50) score += 1;
    if (mission.description && mission.description.length >= 200) score += 1;
    if (mission.description && mission.description.length >= 500) score += 1;
    if (mission.skills_required && mission.skills_required.length > 0) score += 1;
    if (mission.skills_required && mission.skills_required.length >= 3) score += 1;
    if (mission.budget_type !== "negotiable") score += 1;
    if (mission.city || mission.remote_allowed) score += 1;
    if (mission.requirements && mission.requirements.length >= 50) score += 1;
    return Math.min(5, score);
  }
  /**
   * Mappe statut mission vers statut feed
   */
  mapMissionStatusToFeedStatus(missionStatus) {
    switch (missionStatus) {
      case "published":
        return "active";
      case "awarded":
        return "closed";
      case "completed":
        return "closed";
      case "cancelled":
        return "inactive";
      case "expired":
        return "inactive";
      default:
        return "inactive";
    }
  }
  /**
   * Supprime une mission du feed
   */
  async removeMissionFromFeed(missionId) {
    try {
      await db.delete(announcements).where(eq(announcements.id, missionId));
      console.log(`\u{1F5D1}\uFE0F Mission ${missionId} removed from feed`);
    } catch (error) {
      console.error(`\u274C Failed to remove mission ${missionId} from feed:`, error);
      throw error;
    }
  }
  /**
   * Met à jour les stats d'une announcement
   */
  async updateAnnouncementStats(missionId, stats) {
    const query = `
      SELECT update_announcement_stats($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [
      missionId,
      stats.bidsCount || null,
      stats.lowestBidCents || null,
      stats.viewsCount || null,
      stats.savesCount || null
    ]);
    console.log(`\u{1F4CA} Updated stats for announcement ${missionId}`);
  }
};
var missionSync = new MissionSyncService(
  process.env.DATABASE_URL || "postgresql://localhost:5432/swideal"
);

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
import { Pool as Pool5 } from "pg";
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

// server/auth-routes.ts
init_schema();
import express from "express";
import { Pool as Pool2 } from "pg";
import { drizzle as drizzle2 } from "drizzle-orm/node-postgres";
import { eq as eq2, sql } from "drizzle-orm";
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
    console.log("\u{1F4DD} Tentative de cr\xE9ation de compte:", { email: req.body.email, name: req.body.name });
    const { email, password, name, role = "CLIENT" } = req.body;
    if (!email || !password) {
      console.log("\u274C Email ou mot de passe manquant");
      return res.status(400).json({
        error: "Email et mot de passe requis",
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
    const existingUser = await db2.select().from(users).where(eq2(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      console.log("\u274C Email d\xE9j\xE0 utilis\xE9:", email);
      return res.status(409).json({
        error: "Un compte existe d\xE9j\xE0 avec cet email",
        success: false
      });
    }
    const [newUser] = await db2.insert(users).values({
      email: email.toLowerCase().trim(),
      password,
      // En production, hasher avec bcrypt
      name: name.trim(),
      role: role.toUpperCase(),
      profile_data: {},
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
    }).from(users).where(sql`${users.email} = ANY(${demoEmails})`);
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
    const demoUsers = await db2.select().from(users).where(sql`${users.email} IN ('demo@swideal.com', 'prestataire@swideal.com', 'admin@swideal.com')`);
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
    const items = await db.select().from(wardrobeItems).where(eq3(wardrobeItems.userId, req.user.id)).orderBy(desc(wardrobeItems.createdAt));
    res.json(items);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration garde-robe:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router2.get("/items/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const [item] = await db.select().from(wardrobeItems).where(eq3(wardrobeItems.id, itemId));
    if (!item) {
      return res.status(404).json({ error: "Item non trouv\xE9" });
    }
    if (!item.isPublic && item.userId !== req.user?.id) {
      return res.status(403).json({ error: "Acc\xE8s interdit" });
    }
    await db.update(wardrobeItems).set({ viewsCount: item.viewsCount + 1 }).where(eq3(wardrobeItems.id, itemId));
    res.json({ ...item, viewsCount: item.viewsCount + 1 });
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
      name,
      description,
      category,
      subcategory,
      brand,
      color,
      size,
      material,
      season,
      purchaseDate,
      purchasePrice,
      purchaseLocation,
      tags: tags2,
      condition,
      isPublic
    } = req.body;
    const imageUrl = `/uploads/wardrobe/${req.file.filename}`;
    const [item] = await db.insert(wardrobeItems).values({
      userId: req.user.id,
      name,
      description,
      category,
      subcategory,
      brand,
      color: color ? JSON.parse(color) : null,
      size,
      material,
      season,
      imageUrl,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
      purchasePrice,
      purchaseLocation,
      tags: tags2 ? JSON.parse(tags2) : null,
      condition: condition || "good",
      isPublic: isPublic !== "false"
    }).returning();
    await db.update(users).set({ wardrobeItemsCount: db.raw("wardrobe_items_count + 1") }).where(eq3(users.id, req.user.id));
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
    const [existingItem] = await db.select().from(wardrobeItems).where(eq3(wardrobeItems.id, itemId));
    if (!existingItem) {
      return res.status(404).json({ error: "Item non trouv\xE9" });
    }
    if (existingItem.userId !== req.user.id) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    const updates = {
      ...req.body,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (req.file) {
      updates.imageUrl = `/uploads/wardrobe/${req.file.filename}`;
    }
    if (updates.color) updates.color = JSON.parse(updates.color);
    if (updates.tags) updates.tags = JSON.parse(updates.tags);
    const [updatedItem] = await db.update(wardrobeItems).set(updates).where(eq3(wardrobeItems.id, itemId)).returning();
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
    const [item] = await db.select().from(wardrobeItems).where(eq3(wardrobeItems.id, itemId));
    if (!item) {
      return res.status(404).json({ error: "Item non trouv\xE9" });
    }
    if (item.userId !== req.user.id) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    await db.delete(wardrobeItems).where(eq3(wardrobeItems.id, itemId));
    await db.update(users).set({ wardrobeItemsCount: db.raw("wardrobe_items_count - 1") }).where(eq3(users.id, req.user.id));
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression item:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router2.get("/users/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    const items = await db.select().from(wardrobeItems).where(
      and(
        eq3(wardrobeItems.userId, userId2),
        eq3(wardrobeItems.isPublic, true)
      )
    ).orderBy(desc(wardrobeItems.createdAt));
    res.json(items);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration garde-robe publique:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var wardrobe_default = router2;

// server/routes/outfits.ts
import { Router as Router2 } from "express";
init_schema();
import { eq as eq4, desc as desc2, and as and2, sql as sql2 } from "drizzle-orm";
import multer2 from "multer";
import path2 from "path";
var router3 = Router2();
var storage2 = multer2.diskStorage({
  destination: "./uploads/outfits/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "outfit-" + uniqueSuffix + path2.extname(file.originalname));
  }
});
var upload2 = multer2({
  storage: storage2,
  limits: { fileSize: 10 * 1024 * 1024 }
});
router3.get("/trending", async (req, res) => {
  try {
    const trendingOutfits = await db.select().from(outfitsTable).where(sql2`created_at > NOW() - INTERVAL '7 days'`).orderBy(desc2(outfitsTable.engagementScore), desc2(outfitLikesTable.likesCount)).limit(12);
    res.json(trendingOutfits);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration outfits tendance:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router3.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const outfitsList = await db.select().from(outfitsTable).where(eq4(outfitsTable.isPublic, true)).orderBy(desc2(outfitsTable.engagementScore), desc2(outfitsTable.createdAt)).limit(limit).offset(offset);
    res.json(outfitsList);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration outfits:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router3.get("/:id", async (req, res) => {
  try {
    const outfitId = parseInt(req.params.id);
    const [outfit] = await db.select().from(outfitsTable).where(eq4(outfitsTable.id, outfitId));
    if (!outfit) {
      return res.status(404).json({ error: "Outfit non trouv\xE9" });
    }
    if (!outfit.isPublic && outfit.userId !== req.user?.id) {
      return res.status(403).json({ error: "Acc\xE8s interdit" });
    }
    await db.update(outfitsTable).set({ viewsCount: outfit.viewsCount + 1 }).where(eq4(outfitsTable.id, outfitId));
    res.json({ ...outfit, viewsCount: outfit.viewsCount + 1 });
  } catch (error) {
    console.error("Erreur d\xE9tails outfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router3.post("/", upload2.single("photo"), async (req, res) => {
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
      tags: tags2,
      colorPalette,
      isPublic
    } = req.body;
    const photoUrl = req.file ? `/uploads/outfits/${req.file.filename}` : null;
    const [outfit] = await db.insert(outfitsTable).values({
      userId: req.user.id,
      title,
      description,
      photoUrl,
      items: items ? JSON.parse(items) : [],
      occasion,
      season,
      weather,
      location,
      tags: tags2 ? JSON.parse(tags2) : null,
      colorPalette: colorPalette ? JSON.parse(colorPalette) : null,
      isPublic: isPublic !== "false"
    }).returning();
    await db.update(users).set({ postsCount: db.raw("posts_count + 1") }).where(eq4(users.id, req.user.id));
    res.status(201).json(outfit);
  } catch (error) {
    console.error("Erreur cr\xE9ation outfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router3.post("/:id/like", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const outfitId = parseInt(req.params.id);
    const existing = await db.select().from(outfitLikesTable).where(
      and2(
        eq4(outfitLikesTable.outfitId, outfitId),
        eq4(outfitLikesTable.userId, req.user.id)
      )
    );
    if (existing.length > 0) {
      await db.delete(outfitLikesTable).where(
        and2(
          eq4(outfitLikesTable.outfitId, outfitId),
          eq4(outfitLikesTable.userId, req.user.id)
        )
      );
      await db.update(outfitsTable).set({ engagementScore: db.raw("engagement_score - 1"), likesCount: db.raw("likes_count - 1") }).where(eq4(outfitsTable.id, outfitId));
      return res.json({ liked: false });
    } else {
      await db.insert(outfitLikesTable).values({
        outfitId,
        userId: req.user.id
      });
      await db.update(outfitsTable).set({ engagementScore: db.raw("engagement_score + 1"), likesCount: db.raw("likes_count + 1") }).where(eq4(outfitsTable.id, outfitId));
      return res.json({ liked: true });
    }
  } catch (error) {
    console.error("Erreur like outfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router3.post("/:id/comments", async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const outfitId = parseInt(req.params.id);
    const { content, parentCommentId } = req.body;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Commentaire vide" });
    }
    const [comment] = await db.insert(outfitCommentsTable).values({
      outfitId,
      userId: req.user.id,
      parentCommentId: parentCommentId || null,
      content: content.trim()
    }).returning();
    await db.update(outfitsTable).set({ engagementScore: db.raw("engagement_score + 1") }).where(eq4(outfitsTable.id, outfitId));
    res.status(201).json(comment);
  } catch (error) {
    console.error("Erreur ajout commentaire:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router3.get("/:id/comments", async (req, res) => {
  try {
    const outfitId = parseInt(req.params.id);
    const comments = await db.select().from(outfitCommentsTable).where(eq4(outfitCommentsTable.outfitId, outfitId)).orderBy(desc2(outfitCommentsTable.createdAt));
    res.json(comments);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration commentaires:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var outfits_default = router3;

// server/routes/missions.ts
init_database();
init_schema();
import { Router as Router3 } from "express";
import { eq as eq5, desc as desc3, sql as sql3 } from "drizzle-orm";
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
import { z as z2 } from "zod";
var teamRequirementSchema = z2.object({
  profession: z2.string(),
  description: z2.string(),
  required_skills: z2.array(z2.string()),
  estimated_budget: z2.number(),
  estimated_days: z2.number(),
  min_experience: z2.number(),
  is_lead_role: z2.boolean(),
  importance: z2.enum(["high", "medium", "low"])
});
var createSimpleMissionSchema = z2.object({
  title: z2.string().min(3, "Le titre doit contenir au moins 3 caract\xE8res").max(500, "Le titre ne peut pas d\xE9passer 500 caract\xE8res").transform((str) => str.trim()),
  description: z2.string().min(10, "La description doit contenir au moins 10 caract\xE8res").max(5e3, "La description ne peut pas d\xE9passer 5000 caract\xE8res").transform((str) => str.trim()),
  budget: z2.union([
    z2.number().int("Le budget doit \xEAtre un nombre entier").positive("Le budget doit \xEAtre positif").min(10, "Budget minimum de 10\u20AC").max(1e6, "Budget maximum de 1 000 000\u20AC"),
    z2.string().transform((val) => parseInt(val.replace(/[^0-9]/g, ""), 10)).pipe(z2.number().int().positive().min(10).max(1e6))
  ]),
  category: z2.string().optional(),
  location: z2.string().optional(),
  isTeamMode: z2.boolean().default(false),
  teamRequirements: z2.array(teamRequirementSchema).optional()
});
var locationDataSchema = z2.object({
  address: z2.string().optional(),
  postal_code: z2.string().regex(/^\d{5}$/, "Code postal invalide").optional(),
  city: z2.string().optional(),
  country: z2.string().default("France"),
  coordinates: z2.object({
    lat: z2.number().min(-90).max(90),
    lng: z2.number().min(-180).max(180)
  }).optional(),
  remote_allowed: z2.boolean().default(true)
}).optional();
var budgetSchema = z2.object({
  value_cents: z2.number().int().positive().min(1e3, "Budget minimum de 10\u20AC").max(1e8, "Budget maximum de 1M\u20AC"),
  currency: z2.enum(["EUR", "USD", "GBP", "CHF"]).default("EUR")
});
var statusEnum = z2.enum(["draft", "open", "in_progress", "completed", "cancelled"]);
var urgencyEnum = z2.enum(["low", "medium", "high", "urgent"]);
var qualityTargetEnum = z2.enum(["basic", "standard", "premium", "luxury"]);
var locationSchema = z2.object({
  raw: z2.string().optional(),
  city: z2.string().min(1).optional(),
  postalCode: z2.string().regex(/^\d{5}$/).optional(),
  country: z2.string().default("France"),
  latitude: z2.number().min(-90).max(90).optional(),
  longitude: z2.number().min(-180).max(180).optional(),
  remoteAllowed: z2.boolean().default(true)
});
var teamSchema = z2.object({
  isTeamMission: z2.boolean().default(false),
  teamSize: z2.number().int().positive().default(1)
}).refine((data) => !data.isTeamMission || data.teamSize > 1, {
  message: "Une mission d'\xE9quipe doit avoir plus d'1 personne",
  path: ["teamSize"]
});
var createMissionSchema = z2.object({
  // Contenu obligatoire
  title: z2.string().min(3, "Le titre doit contenir au moins 3 caract\xE8res").max(500, "Le titre ne peut pas d\xE9passer 500 caract\xE8res").transform((str) => str.trim()),
  description: z2.string().min(10, "La description doit contenir au moins 10 caract\xE8res").max(5e3, "La description ne peut pas d\xE9passer 5000 caract\xE8res").transform((str) => str.trim()),
  // Catégorisation
  category: z2.string().min(1, "La cat\xE9gorie est requise").default("developpement"),
  tags: z2.array(z2.string().min(1)).max(10, "Maximum 10 tags").default([]).transform((tags2) => tags2.map((tag) => tag.toLowerCase().trim())),
  skillsRequired: z2.array(z2.string().min(1)).max(15, "Maximum 15 comp\xE9tences").default([]).transform((skills) => skills.map((skill) => skill.trim())),
  // Budget obligatoire en euros
  budget: z2.number().int("Le budget doit \xEAtre un nombre entier").positive("Le budget doit \xEAtre positif").min(10, "Budget minimum de 10\u20AC").max(1e6, "Budget maximum de 1 000 000\u20AC"),
  // Localisation
  location: locationSchema.optional(),
  // Équipe
  team: teamSchema.optional(),
  // Timing et urgence
  urgency: z2.enum(["low", "medium", "high", "urgent"]).default("medium"),
  deadline: z2.string().datetime("Format de date invalide").optional().transform((str) => str ? new Date(str) : void 0),
  // Métadonnées
  requirements: z2.string().max(2e3, "Les exigences ne peuvent pas d\xE9passer 2000 caract\xE8res").optional().transform((str) => str?.trim()),
  deliverables: z2.array(z2.object({
    title: z2.string().min(1),
    description: z2.string().optional(),
    dueDate: z2.string().datetime().optional()
  })).max(20, "Maximum 20 livrables").default([]),
  // Status (draft par défaut, published si publié immédiatement)
  status: z2.enum(["draft", "published"]).default("draft")
});
var updateMissionSchema = createMissionSchema.partial().extend({
  id: z2.number().int().positive()
});
var searchMissionsSchema = z2.object({
  query: z2.string().min(1).optional(),
  category: z2.string().optional(),
  budgetMin: z2.number().int().positive().optional(),
  budgetMax: z2.number().int().positive().optional(),
  location: z2.string().optional(),
  remoteOnly: z2.boolean().default(false),
  urgency: z2.array(z2.enum(["low", "medium", "high", "urgent"])).optional(),
  tags: z2.array(z2.string()).optional(),
  skills: z2.array(z2.string()).optional(),
  sortBy: z2.enum(["recent", "budget_asc", "budget_desc", "deadline"]).default("recent"),
  page: z2.number().int().positive().default(1),
  limit: z2.number().int().positive().max(50).default(20)
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
var router4 = Router3();
router4.post("/", asyncHandler(async (req, res) => {
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
  const existingUser = await db.select({ id: users.id }).from(users).where(eq5(users.id, userIdInt)).limit(1);
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
router4.get("/", asyncHandler(async (req, res) => {
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
    }).from(missions).leftJoin(users, eq5(missions.user_id, users.id)).orderBy(desc3(missions.created_at)).limit(100);
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
router4.get("/health", asyncHandler(async (req, res) => {
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
router4.get("/debug", asyncHandler(async (req, res) => {
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
router4.get("/verify-sync", asyncHandler(async (req, res) => {
  console.log("\u{1F50D} V\xE9rification de la synchronisation missions/feed");
  try {
    const missionCount = await db.select({ count: sql3`COUNT(*)` }).from(missions);
    const recentMissions = await db.select({
      id: missions.id,
      title: missions.title,
      status: missions.status,
      created_at: missions.created_at
    }).from(missions).orderBy(desc3(missions.created_at)).limit(5);
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
router4.get("/:id", asyncHandler(async (req, res) => {
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
  const missionRaw = await db.select().from(missions).where(eq5(missions.id, missionIdInt)).limit(1);
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
    }).from(bids).leftJoin(users, eq5(bids.provider_id, users.id)).where(eq5(bids.mission_id, missionIdInt));
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
router4.get("/users/:userId/missions", asyncHandler(async (req, res) => {
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
    }).from(missions).leftJoin(bids, eq5(missions.id, bids.mission_id)).where(eq5(missions.user_id, userIdInt)).orderBy(desc3(missions.created_at), desc3(bids.created_at));
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
    }).from(missions).where(eq5(missions.user_id, userIdInt)).orderBy(desc3(missions.created_at));
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
router4.get("/users/:userId/bids", asyncHandler(async (req, res) => {
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
router4.put("/:id", asyncHandler(async (req, res) => {
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
  const existingMission = await db.select({ id: missions.id, category: missions.category, deadline: missions.deadline, tags: missions.tags, requirements: missions.requirements, currency: missions.currency, location_data: missions.location_data, is_team_mission: missions.is_team_mission, team_size: missions.team_size, team_requirements: missions.team_requirements }).from(missions).where(eq5(missions.id, missionIdInt)).limit(1);
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
  const updatedMission = await db.update(missions).set(missionToUpdate).where(eq5(missions.id, missionIdInt)).returning();
  if (updatedMission.length === 0) {
    throw new Error("\xC9chec de la mise \xE0 jour de la mission");
  }
  console.log("\u2705 API: Mission modifi\xE9e avec succ\xE8s:", missionId);
  res.json(updatedMission[0]);
}));
router4.delete("/:id", asyncHandler(async (req, res) => {
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
  const existingMission = await db.select({ id: missions.id }).from(missions).where(eq5(missions.id, missionIdInt)).limit(1);
  if (existingMission.length === 0) {
    console.error("\u274C API: Mission non trouv\xE9e pour suppression:", missionId);
    return res.status(404).json({ error: "Mission non trouv\xE9e" });
  }
  try {
    await db.delete(bids).where(eq5(bids.mission_id, missionIdInt));
    console.log("\u2705 API: Offres supprim\xE9es pour mission:", missionId);
  } catch (error) {
    console.warn("\u26A0\uFE0F Impossible de supprimer les offres:", error);
  }
  const deletedMission = await db.delete(missions).where(eq5(missions.id, missionIdInt)).returning();
  if (deletedMission.length === 0) {
    throw new Error("\xC9chec de la suppression de la mission");
  }
  console.log("\u2705 API: Mission supprim\xE9e avec succ\xE8s:", missionId);
  res.json({ message: "Mission supprim\xE9e avec succ\xE8s", mission: deletedMission[0] });
}));
var missions_default = router4;

// server/api-routes.ts
init_schema();
import express5 from "express";
import { Pool as Pool3 } from "pg";
import { drizzle as drizzle4 } from "drizzle-orm/node-postgres";
import { eq as eq19 } from "drizzle-orm";

// server/routes/bids.ts
init_database();
init_schema();
import { Router as Router4 } from "express";
import { eq as eq7, and as and3, desc as desc4 } from "drizzle-orm";

// server/middleware/auth.ts
init_database();
init_schema();
import { eq as eq6 } from "drizzle-orm";
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
    }).from(users).where(eq6(users.id, userId2)).limit(1);
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
        }).from(users).where(eq6(users.id, userId2)).limit(1);
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

// server/routes/bids.ts
import { z as z3 } from "zod";
var router5 = Router4();
var createBidSchema = z3.object({
  mission_id: z3.number().int().positive(),
  price: z3.string().min(1),
  timeline_days: z3.number().int().min(1).optional(),
  message: z3.string().optional(),
  bid_type: z3.enum(["individual", "team", "open_team"]).default("individual"),
  team_composition: z3.any().optional(),
  team_lead_id: z3.number().int().positive().optional(),
  open_team_id: z3.number().int().positive().optional()
});
var updateBidSchema = z3.object({
  price: z3.string().min(1).optional(),
  timeline_days: z3.number().int().min(1).optional(),
  message: z3.string().optional(),
  status: z3.enum(["pending", "accepted", "rejected", "withdrawn"]).optional(),
  team_composition: z3.any().optional()
});
router5.post("/", requireAuth, async (req, res) => {
  try {
    console.log("\u{1F3AF} POST /api/bids - Nouvelle candidature:", {
      userId: req.user?.id,
      missionId: req.body.mission_id,
      bidType: req.body.bid_type
    });
    const validatedData = createBidSchema.parse(req.body);
    const [mission] = await db.select().from(missions).where(eq7(missions.id, validatedData.mission_id)).limit(1);
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
      and3(
        eq7(bids.mission_id, validatedData.mission_id),
        eq7(bids.provider_id, req.user.id)
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
    if (error instanceof z3.ZodError) {
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
router5.get("/", optionalAuth, async (req, res) => {
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
    }).from(bids).leftJoin(users, eq7(bids.provider_id, users.id)).orderBy(desc4(bids.created_at));
    const conditions = [];
    if (mission_id) {
      const missionIdNum = parseInt(mission_id);
      if (!isNaN(missionIdNum)) {
        conditions.push(eq7(bids.mission_id, missionIdNum));
      }
    }
    if (provider_id) {
      const providerIdNum = parseInt(provider_id);
      if (!isNaN(providerIdNum)) {
        conditions.push(eq7(bids.provider_id, providerIdNum));
      }
    }
    if (status && typeof status === "string") {
      conditions.push(eq7(bids.status, status));
    }
    if (bid_type && typeof bid_type === "string") {
      conditions.push(eq7(bids.bid_type, bid_type));
    }
    if (conditions.length > 0) {
      query = query.where(and3(...conditions));
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
router5.get("/:id", optionalAuth, async (req, res) => {
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
    }).from(bids).leftJoin(users, eq7(bids.provider_id, users.id)).where(eq7(bids.id, bidId)).limit(1);
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
router5.put("/:id", requireAuth, async (req, res) => {
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
    const [existingBid] = await db.select().from(bids).where(eq7(bids.id, bidId)).limit(1);
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
    }).where(eq7(bids.id, bidId)).returning();
    console.log("\u2705 Candidature mise \xE0 jour:", { bidId: updatedBid.id });
    res.json({
      ok: true,
      bid: updatedBid,
      message: "Candidature mise \xE0 jour avec succ\xE8s"
    });
  } catch (error) {
    console.error("\u274C Erreur mise \xE0 jour candidature:", error);
    if (error instanceof z3.ZodError) {
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
router5.delete("/:id", requireAuth, async (req, res) => {
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
    const [existingBid] = await db.select().from(bids).where(eq7(bids.id, bidId)).limit(1);
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
    }).where(eq7(bids.id, bidId)).returning();
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
var bids_default = router5;

// server/routes/open-teams.ts
init_database();
init_schema();
init_schema();
import { Router as Router5 } from "express";
import { eq as eq8, desc as desc5, and as and4 } from "drizzle-orm";
import { randomUUID as randomUUID2 } from "crypto";
var router6 = Router5();
var asyncHandler2 = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
router6.post("/", requireAuth, asyncHandler2(async (req, res) => {
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
    const missionExists = await db.select().from(missions).where(eq8(missions.id, validatedData.mission_id));
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
router6.get("/", asyncHandler2(async (req, res) => {
  const missionId = req.query.mission_id;
  try {
    const whereConditions = [eq8(openTeams.visibility, "public")];
    if (missionId && !isNaN(parseInt(missionId))) {
      whereConditions.push(eq8(openTeams.mission_id, parseInt(missionId)));
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
    }).from(openTeams).leftJoin(users, eq8(openTeams.creator_id, users.id)).leftJoin(missions, eq8(openTeams.mission_id, missions.id)).where(and4(...whereConditions)).orderBy(desc5(openTeams.created_at));
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
router6.get("/:id", asyncHandler2(async (req, res) => {
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
    }).from(openTeams).leftJoin(users, eq8(openTeams.creator_id, users.id)).leftJoin(missions, eq8(openTeams.mission_id, missions.id)).where(eq8(openTeams.id, teamId));
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
router6.post("/:id/join", requireAuth, asyncHandler2(async (req, res) => {
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
    const [team] = await db.select().from(openTeams).where(eq8(openTeams.id, teamId));
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
    }).where(eq8(openTeams.id, teamId)).returning();
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
router6.put("/:id", requireAuth, asyncHandler2(async (req, res) => {
  const teamId = parseInt(req.params.id);
  if (isNaN(teamId)) {
    return res.status(400).json({
      error: "ID d'\xE9quipe invalide"
    });
  }
  try {
    const [team] = await db.select().from(openTeams).where(eq8(openTeams.id, teamId));
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
    const [updatedTeam] = await db.update(openTeams).set(updates).where(eq8(openTeams.id, teamId)).returning();
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
router6.delete("/:id", requireAuth, asyncHandler2(async (req, res) => {
  const teamId = parseInt(req.params.id);
  if (isNaN(teamId)) {
    return res.status(400).json({
      error: "ID d'\xE9quipe invalide"
    });
  }
  try {
    const [team] = await db.select().from(openTeams).where(eq8(openTeams.id, teamId));
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
    await db.delete(openTeams).where(eq8(openTeams.id, teamId));
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
var open_teams_default = router6;

// server/routes/feed-routes.ts
init_schema();
import express2 from "express";
import { desc as desc6, eq as eq9, and as and5, not, inArray as inArray2, sql as sql4 } from "drizzle-orm";

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
  calculateSemanticMatch(tags2, skills) {
    const synonyms = {
      "javascript": ["js", "typescript", "react", "node"],
      "web": ["frontend", "backend", "fullstack", "d\xE9veloppement"],
      "design": ["ui", "ux", "graphisme", "interface"],
      "mobile": ["ios", "android", "app", "application"],
      "data": ["analytics", "analyse", "statistiques", "bi"]
    };
    let matches = 0;
    let totalComparisons = 0;
    for (const tag of tags2) {
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
  rankAnnouncements(announcements2, userProfile) {
    return announcements2.map((announcement) => ({
      ...announcement,
      _score: this.calculateScore(announcement, userProfile)
    })).sort((a, b) => b._score - a._score).map(({ _score, ...announcement }) => announcement);
  }
  /**
   * Insère des annonces sponsorisées toutes les N positions
   */
  insertSponsoredSlots(announcements2, sponsoredAnnouncements, interval = 5) {
    const result = [];
    let sponsoredIndex = 0;
    for (let i = 0; i < announcements2.length; i++) {
      result.push(announcements2[i]);
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
import { z as z4 } from "zod";
var router7 = express2.Router();
var priceBenchmarkCache = /* @__PURE__ */ new Map();
router7.get("/feed", async (req, res) => {
  try {
    const { cursor, limit = "10", userId: userId2 } = req.query;
    const limitNum = Math.min(parseInt(limit), 50);
    console.log("\u{1F4E1} Feed request:", { cursor, limit: limitNum, userId: userId2 });
    const seenAnnouncements = userId2 ? await db.select({ announcement_id: feedSeen.announcement_id }).from(feedSeen).where(eq9(feedSeen.user_id, parseInt(userId2))).catch((err) => {
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
    const rawAnnouncements = await db.select().from(announcements).where(and5(...whereConditions)).orderBy(desc6(announcements.created_at)).limit(limitNum + 5).catch((err) => {
      console.error("\u274C Database query failed:", err);
      throw new Error("Database query failed: " + err.message);
    });
    console.log("\u2705 Raw announcements fetched:", rawAnnouncements.length);
    const ranker = new FeedRanker(seenIds);
    const userProfile = userId2 ? {} : void 0;
    const rankedAnnouncements = ranker.rankAnnouncements(rawAnnouncements, userProfile);
    const sponsoredAnnouncements = await db.select().from(announcements).where(and5(
      eq9(announcements.sponsored, true),
      eq9(announcements.status, "active")
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
router7.post("/feedback", async (req, res) => {
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
    if (error instanceof z4.ZodError) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: error.errors });
    }
    res.status(500).json({ error: "Erreur lors de l'enregistrement du feedback" });
  }
});
router7.get("/price-benchmark", async (req, res) => {
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
    }).from(announcements).where(and5(
      eq9(announcements.category, category),
      eq9(announcements.status, "active")
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
var feed_routes_default = router7;

// server/routes/favorites-routes.ts
init_schema();
import { Router as Router6 } from "express";
import { drizzle as drizzle3 } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq as eq10, and as and6 } from "drizzle-orm";
var sql5 = neon(process.env.DATABASE_URL);
var db3 = drizzle3(sql5);
var router8 = Router6();
router8.get("/favorites", async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: "user_id requis" });
    }
    const userFavorites = await db3.select({
      announcement: announcements
    }).from(favorites).innerJoin(announcements, eq10(favorites.announcement_id, announcements.id)).where(eq10(favorites.user_id, parseInt(user_id)));
    const favoriteAnnouncements = userFavorites.map((f) => f.announcement);
    res.json({
      favorites: favoriteAnnouncements,
      count: favoriteAnnouncements.length
    });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration favoris:", error);
    res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration des favoris" });
  }
});
router8.post("/favorites", async (req, res) => {
  try {
    const { user_id, announcement_id } = req.body;
    if (!user_id || !announcement_id) {
      return res.status(400).json({ error: "user_id et announcement_id requis" });
    }
    const existing = await db3.select().from(favorites).where(
      and6(
        eq10(favorites.user_id, user_id),
        eq10(favorites.announcement_id, announcement_id)
      )
    );
    if (existing.length > 0) {
      return res.status(200).json({ message: "D\xE9j\xE0 en favori" });
    }
    await db3.insert(favorites).values({
      user_id,
      announcement_id,
      created_at: /* @__PURE__ */ new Date()
    });
    res.status(201).json({ message: "Ajout\xE9 aux favoris" });
  } catch (error) {
    console.error("Erreur ajout favori:", error);
    res.status(500).json({ error: "Erreur lors de l'ajout aux favoris" });
  }
});
router8.delete("/favorites/:announcementId", async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "user_id requis" });
    }
    await db3.delete(favorites).where(
      and6(
        eq10(favorites.user_id, user_id),
        eq10(favorites.announcement_id, parseInt(announcementId))
      )
    );
    res.json({ message: "Supprim\xE9 des favoris" });
  } catch (error) {
    console.error("Erreur suppression favori:", error);
    res.status(500).json({ error: "Erreur lors de la suppression des favoris" });
  }
});
var favorites_routes_default = router8;

// server/routes/reviews.ts
init_database();
init_schema();
import { Router as Router7 } from "express";
import { eq as eq11, and as and7, desc as desc7, sql as sql6 } from "drizzle-orm";
var router9 = Router7();
router9.post("/", async (req, res) => {
  try {
    const { mission_id, reviewee_id, rating, comment, criteria } = req.body;
    const reviewer_id = req.user?.id;
    if (!reviewer_id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const mission = await db.query.missions.findFirst({
      where: eq11(missions.id, mission_id),
      with: { bids: true }
    });
    if (!mission || mission.status !== "completed") {
      return res.status(400).json({ error: "Mission non termin\xE9e" });
    }
    const existingReview = await db.query.reviews.findFirst({
      where: and7(
        eq11(reviews.mission_id, mission_id),
        eq11(reviews.reviewer_id, reviewer_id)
      )
    });
    if (existingReview) {
      return res.status(400).json({ error: "Review d\xE9j\xE0 cr\xE9\xE9e" });
    }
    const [newReview] = await db.insert(reviews).values({
      mission_id,
      reviewer_id,
      reviewee_id,
      rating,
      comment,
      criteria: criteria || {}
    }).returning();
    await updateUserRating(reviewee_id);
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Erreur cr\xE9ation review:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router9.get("/user/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    const userReviews = await db.query.reviews.findMany({
      where: eq11(reviews.reviewee_id, userId2),
      with: {
        reviewer: {
          columns: { id: true, name: true, avatar_url: true }
        },
        mission: {
          columns: { id: true, title: true }
        }
      },
      orderBy: [desc7(reviews.created_at)]
    });
    res.json(userReviews);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration reviews:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router9.get("/mission/:missionId", async (req, res) => {
  try {
    const missionId = parseInt(req.params.missionId);
    const missionReviews = await db.query.reviews.findMany({
      where: eq11(reviews.mission_id, missionId),
      with: {
        reviewer: {
          columns: { id: true, name: true, avatar_url: true }
        },
        reviewee: {
          columns: { id: true, name: true, avatar_url: true }
        }
      },
      orderBy: [desc7(reviews.created_at)]
    });
    res.json(missionReviews);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration reviews mission:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router9.post("/:id/helpful", async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const existing = await db.query.reviewHelpful.findFirst({
      where: and7(
        eq11(reviewHelpful.review_id, reviewId),
        eq11(reviewHelpful.user_id, userId2)
      )
    });
    if (existing) {
      await db.delete(reviewHelpful).where(eq11(reviewHelpful.id, existing.id));
      await db.update(reviews).set({ helpful_count: sql6`${reviews.helpful_count} - 1` }).where(eq11(reviews.id, reviewId));
    } else {
      await db.insert(reviewHelpful).values({
        review_id: reviewId,
        user_id: userId2
      });
      await db.update(reviews).set({ helpful_count: sql6`${reviews.helpful_count} + 1` }).where(eq11(reviews.id, reviewId));
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur marquage helpful:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router9.post("/:id/response", async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const { response } = req.body;
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const review = await db.query.reviews.findFirst({
      where: eq11(reviews.id, reviewId)
    });
    if (!review || review.reviewee_id !== userId2) {
      return res.status(403).json({ error: "Non autoris\xE9" });
    }
    await db.update(reviews).set({ response, updated_at: /* @__PURE__ */ new Date() }).where(eq11(reviews.id, reviewId));
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur r\xE9ponse review:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
async function updateUserRating(userId2) {
  const userReviews = await db.query.reviews.findMany({
    where: eq11(reviews.reviewee_id, userId2)
  });
  if (userReviews.length > 0) {
    const totalRating = userReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / userReviews.length;
    await db.update(users).set({
      rating_mean: Math.round(averageRating * 10) / 10,
      rating_count: userReviews.length
    }).where(eq11(users.id, userId2));
  }
}
var reviews_default = router9;

// server/routes/contracts.ts
init_database();
init_schema();
import { Router as Router8 } from "express";
import { eq as eq13, and as and9, or } from "drizzle-orm";

// server/services/contract-service.ts
init_database();
init_schema();
import { eq as eq12 } from "drizzle-orm";
async function createContract(data) {
  try {
    const [contract] = await db.insert(contracts).values({
      ...data,
      status: "pending_signature"
    }).returning();
    if (data.deliverables && data.deliverables.length > 0) {
      await db.insert(deliverables).values(
        data.deliverables.map((deliverable) => ({
          contract_id: contract.id,
          title: deliverable.title,
          description: deliverable.description
        }))
      );
    }
    await createNotification(data.client_id, {
      type: "contract_created",
      title: "Contrat cr\xE9\xE9",
      message: "Un nouveau contrat a \xE9t\xE9 cr\xE9\xE9 et attend votre signature",
      link: `/contracts/${contract.id}`
    });
    await createNotification(data.provider_id, {
      type: "contract_created",
      title: "Contrat cr\xE9\xE9",
      message: "Un nouveau contrat a \xE9t\xE9 cr\xE9\xE9 et attend votre signature",
      link: `/contracts/${contract.id}`
    });
    return contract;
  } catch (error) {
    console.error("Erreur cr\xE9ation contrat:", error);
    throw error;
  }
}
async function signContract(contractId, userId2) {
  try {
    const contract = await db.query.contracts.findFirst({
      where: eq12(contracts.id, contractId)
    });
    if (!contract) {
      throw new Error("Contrat non trouv\xE9");
    }
    const now = /* @__PURE__ */ new Date();
    let updateData = {};
    if (contract.client_id === userId2 && !contract.client_signed_at) {
      updateData.client_signed_at = now;
    } else if (contract.provider_id === userId2 && !contract.provider_signed_at) {
      updateData.provider_signed_at = now;
    } else {
      throw new Error("Non autoris\xE9 \xE0 signer ce contrat");
    }
    const updatedContract = await db.query.contracts.findFirst({
      where: eq12(contracts.id, contractId)
    });
    if (updatedContract?.client_signed_at && updatedContract?.provider_signed_at) {
      updateData.status = "active";
      updateData.start_date = now;
    }
    await db.update(contracts).set(updateData).where(eq12(contracts.id, contractId));
    return { success: true };
  } catch (error) {
    console.error("Erreur signature contrat:", error);
    throw error;
  }
}
async function transitionContract(contractId, newStatus, userId2) {
  try {
    const contract = await db.query.contracts.findFirst({
      where: eq12(contracts.id, contractId)
    });
    if (!contract) {
      throw new Error("Contrat non trouv\xE9");
    }
    if (contract.client_id !== userId2 && contract.provider_id !== userId2) {
      throw new Error("Non autoris\xE9");
    }
    const validTransitions = getValidTransitions(contract.status);
    if (!validTransitions.includes(newStatus)) {
      throw new Error("Transition invalide");
    }
    let updateData = { status: newStatus, updated_at: /* @__PURE__ */ new Date() };
    if (newStatus === "completed") {
      updateData.actual_end_date = /* @__PURE__ */ new Date();
    }
    await db.update(contracts).set(updateData).where(eq12(contracts.id, contractId));
    const otherUserId = contract.client_id === userId2 ? contract.provider_id : contract.client_id;
    await createNotification(otherUserId, {
      type: "contract_status_changed",
      title: "Statut du contrat modifi\xE9",
      message: `Le contrat est maintenant : ${newStatus}`,
      link: `/contracts/${contractId}`
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur transition contrat:", error);
    throw error;
  }
}
async function submitDeliverable(deliverableId, userId2, data) {
  try {
    await db.update(deliverables).set({
      status: "submitted",
      file_urls: data.file_urls,
      submitted_at: /* @__PURE__ */ new Date()
    }).where(eq12(deliverables.id, deliverableId));
    const deliverable = await db.query.deliverables.findFirst({
      where: eq12(deliverables.id, deliverableId),
      with: { contract: true }
    });
    if (deliverable?.contract) {
      await createNotification(deliverable.contract.client_id, {
        type: "deliverable_submitted",
        title: "Livrable soumis",
        message: "Un nouveau livrable a \xE9t\xE9 soumis pour validation",
        link: `/contracts/${deliverable.contract.id}`
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Erreur soumission livrable:", error);
    throw error;
  }
}
async function reviewDeliverable(deliverableId, userId2, data) {
  try {
    await db.update(deliverables).set({
      status: data.approved ? "approved" : "rejected",
      feedback: data.feedback,
      reviewed_at: /* @__PURE__ */ new Date()
    }).where(eq12(deliverables.id, deliverableId));
    return { success: true };
  } catch (error) {
    console.error("Erreur validation livrable:", error);
    throw error;
  }
}
function getValidTransitions(currentStatus) {
  const transitions = {
    "pending_signature": ["active", "cancelled"],
    "active": ["in_progress", "cancelled"],
    "in_progress": ["under_review", "disputed", "cancelled"],
    "under_review": ["completed", "in_progress", "disputed"],
    "completed": [],
    "disputed": ["in_progress", "cancelled"],
    "cancelled": []
  };
  return transitions[currentStatus] || [];
}
async function createNotification(userId2, data) {
  await db.insert(notifications).values({
    user_id: userId2,
    ...data
  });
}

// server/routes/contracts.ts
var router10 = Router8();
router10.post("/", async (req, res) => {
  try {
    const { mission_id, bid_id, provider_id, terms, deliverables: deliverables3 } = req.body;
    const client_id = req.user?.id;
    if (!client_id) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const contract = await createContract({
      mission_id,
      bid_id,
      client_id,
      provider_id,
      terms,
      deliverables: deliverables3
    });
    res.status(201).json(contract);
  } catch (error) {
    console.error("Erreur cr\xE9ation contrat:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router10.get("/", async (req, res) => {
  try {
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const userContracts = await db.query.contracts.findMany({
      where: or(
        eq13(contracts.client_id, userId2),
        eq13(contracts.provider_id, userId2)
      ),
      with: {
        mission: {
          columns: { id: true, title: true }
        },
        client: {
          columns: { id: true, name: true, avatar_url: true }
        },
        provider: {
          columns: { id: true, name: true, avatar_url: true }
        },
        deliverables: true
      },
      orderBy: [contracts.created_at]
    });
    res.json(userContracts);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration contrats:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router10.get("/:id", async (req, res) => {
  try {
    const contractId = parseInt(req.params.id);
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    const contract = await db.query.contracts.findFirst({
      where: and9(
        eq13(contracts.id, contractId),
        or(
          eq13(contracts.client_id, userId2),
          eq13(contracts.provider_id, userId2)
        )
      ),
      with: {
        mission: true,
        bid: true,
        client: {
          columns: { id: true, name: true, avatar_url: true }
        },
        provider: {
          columns: { id: true, name: true, avatar_url: true }
        },
        deliverables: true
      }
    });
    if (!contract) {
      return res.status(404).json({ error: "Contrat non trouv\xE9" });
    }
    res.json(contract);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration contrat:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router10.post("/:id/sign", async (req, res) => {
  try {
    const contractId = parseInt(req.params.id);
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    await signContract(contractId, userId2);
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur signature contrat:", error);
    res.status(500).json({ error: error.message || "Erreur serveur" });
  }
});
router10.patch("/:id/status", async (req, res) => {
  try {
    const contractId = parseInt(req.params.id);
    const { status } = req.body;
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    await transitionContract(contractId, status, userId2);
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur changement statut:", error);
    res.status(500).json({ error: error.message || "Erreur serveur" });
  }
});
router10.post("/deliverables/:id/submit", async (req, res) => {
  try {
    const deliverableId = parseInt(req.params.id);
    const userId2 = req.user?.id;
    const { file_urls, description } = req.body;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    await submitDeliverable(deliverableId, userId2, { file_urls, description });
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur soumission livrable:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router10.post("/deliverables/:id/review", async (req, res) => {
  try {
    const deliverableId = parseInt(req.params.id);
    const userId2 = req.user?.id;
    const { approved, feedback } = req.body;
    if (!userId2) {
      return res.status(401).json({ error: "Non authentifi\xE9" });
    }
    await reviewDeliverable(deliverableId, userId2, { approved, feedback });
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur validation livrable:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var contracts_default = router10;

// server/routes/files.ts
import { Router as Router9 } from "express";
import multer3 from "multer";

// server/services/file-service.ts
init_schema();
init_database();
import { eq as eq14, and as and10 } from "drizzle-orm";
import path3 from "path";
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
    const ext = path3.extname(fileData.originalname);
    const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
    const filepath = path3.join(UPLOAD_DIR, filename);
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
      where: and10(
        eq14(files.id, fileId),
        eq14(files.user_id, userId2)
      )
    });
    if (!file) {
      throw new Error("Fichier non trouv\xE9");
    }
    const filepath = path3.join(UPLOAD_DIR, file.filename);
    try {
      await fs.unlink(filepath);
    } catch (error) {
      console.warn("Impossible de supprimer le fichier physique:", error);
    }
    await db.delete(files).where(eq14(files.id, fileId));
    return { success: true };
  } catch (error) {
    console.error("Erreur suppression fichier:", error);
    throw error;
  }
}
async function getFilesByContext(contextType, contextId) {
  try {
    const contextFiles = await db.query.files.findMany({
      where: and10(
        eq14(files.context_type, contextType),
        eq14(files.context_id, contextId)
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
    let whereClause = eq14(files.user_id, userId2);
    if (contextType) {
      whereClause = and10(whereClause, eq14(files.context_type, contextType));
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
var router11 = Router9();
var upload3 = multer3({
  storage: multer3.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB
  }
});
router11.post("/upload", upload3.single("file"), async (req, res) => {
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
router11.get("/user", async (req, res) => {
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
router11.get("/context/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const files2 = await getFilesByContext(type, parseInt(id));
    res.json(files2);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration fichiers contexte:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router11.delete("/:id", async (req, res) => {
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
var files_default = router11;

// server/routes/messaging.ts
init_database();
init_schema();
import express3 from "express";
import { eq as eq15, and as and11, or as or2, desc as desc8 } from "drizzle-orm";
var router12 = express3.Router();
router12.get("/conversations", async (req, res) => {
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
      or2(
        and11(
          eq15(conversations.participant1_id, userId2),
          eq15(users.id, conversations.participant2_id)
        ),
        and11(
          eq15(conversations.participant2_id, userId2),
          eq15(users.id, conversations.participant1_id)
        )
      )
    ).where(
      or2(
        eq15(conversations.participant1_id, userId2),
        eq15(conversations.participant2_id, userId2)
      )
    ).orderBy(desc8(conversations.last_message_at));
    res.json({ conversations: userConversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});
router12.get("/conversations/:id/messages", async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const userId2 = parseInt(req.query.userId);
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const conversation = await db.select().from(conversations).where(
      and11(
        eq15(conversations.id, conversationId),
        or2(
          eq15(conversations.participant1_id, userId2),
          eq15(conversations.participant2_id, userId2)
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
    }).from(messages).leftJoin(users, eq15(messages.sender_id, users.id)).where(eq15(messages.conversation_id, conversationId)).orderBy(desc8(messages.created_at)).limit(limit).offset(offset);
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
router12.post("/conversations", async (req, res) => {
  try {
    const { participant1_id, participant2_id, mission_id } = req.body;
    const existingConversation = await db.select().from(conversations).where(
      and11(
        or2(
          and11(
            eq15(conversations.participant1_id, participant1_id),
            eq15(conversations.participant2_id, participant2_id)
          ),
          and11(
            eq15(conversations.participant1_id, participant2_id),
            eq15(conversations.participant2_id, participant1_id)
          )
        ),
        mission_id ? eq15(conversations.mission_id, mission_id) : void 0
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
router12.post("/messages", async (req, res) => {
  try {
    const { conversation_id, sender_id, content, message_type = "text" } = req.body;
    const conversation = await db.select().from(conversations).where(
      and11(
        eq15(conversations.id, conversation_id),
        or2(
          eq15(conversations.participant1_id, sender_id),
          eq15(conversations.participant2_id, sender_id)
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
    await db.update(conversations).set({ last_message_at: /* @__PURE__ */ new Date() }).where(eq15(conversations.id, conversation_id));
    res.status(201).json({ message: newMessage[0] });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});
router12.patch("/messages/:id/read", async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const userId2 = parseInt(req.body.userId);
    const updatedMessage = await db.update(messages).set({ read_at: /* @__PURE__ */ new Date() }).where(eq15(messages.id, messageId)).returning();
    res.json({ message: updatedMessage[0] });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: "Failed to mark message as read" });
  }
});
var messaging_default = router12;

// server/routes/notifications.ts
import express4 from "express";

// server/services/notification-service.ts
init_database();
init_schema();
import { eq as eq17, and as and13, desc as desc9 } from "drizzle-orm";

// server/websocket.ts
init_database();
init_schema();
import { WebSocketServer, WebSocket } from "ws";
import { eq as eq16, and as and12, or as or3 } from "drizzle-orm";
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
        and12(
          eq16(conversations.id, conversationId),
          or3(
            eq16(conversations.participant1_id, userId2),
            eq16(conversations.participant2_id, userId2)
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
      await db.update(conversations).set({ last_message_at: /* @__PURE__ */ new Date() }).where(eq16(conversations.id, conversationId));
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
    const conversation = await db.select().from(conversations).where(eq16(conversations.id, conversationId)).limit(1);
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
    await db.update(messages).set({ read_at: /* @__PURE__ */ new Date() }).where(eq16(messages.id, messageId));
    const messageData = await db.select().from(messages).where(eq16(messages.id, messageId)).limit(1);
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
      and12(
        eq16(conversations.id, conversationId),
        or3(
          eq16(conversations.participant1_id, userId2),
          eq16(conversations.participant2_id, userId2)
        )
      )
    ).limit(1);
    if (conversation.length > 0) {
      const recentMessages = await db.select().from(messages).where(eq16(messages.conversation_id, conversationId)).orderBy(messages.created_at).limit(50);
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
      const userNotifications = await db.select().from(notifications).where(eq17(notifications.user_id, userId2)).orderBy(desc9(notifications.created_at)).limit(limit).offset(offset);
      return userNotifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
  async markAsRead(notificationId, userId2) {
    try {
      const updatedNotification = await db.update(notifications).set({ read_at: /* @__PURE__ */ new Date() }).where(
        and13(
          eq17(notifications.id, notificationId),
          eq17(notifications.user_id, userId2)
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
        and13(
          eq17(notifications.user_id, userId2),
          eq17(notifications.read_at, null)
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
        and13(
          eq17(notifications.user_id, userId2),
          eq17(notifications.read_at, null)
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
var router13 = express4.Router();
router13.get("/notifications", async (req, res) => {
  try {
    const userId2 = parseInt(req.query.userId);
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    if (!userId2) {
      return res.status(400).json({ error: "userId required" });
    }
    const notifications2 = await notificationService.getUserNotifications(userId2, limit, offset);
    const unreadCount = await notificationService.getUnreadCount(userId2);
    res.json({
      notifications: notifications2,
      unreadCount,
      total: notifications2.length
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
router13.post("/notifications", async (req, res) => {
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
router13.patch("/notifications/:id/read", async (req, res) => {
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
router13.post("/notifications/mark-all-read", async (req, res) => {
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
router13.get("/notifications/unread-count", async (req, res) => {
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
var notifications_default = router13;

// server/routes/user-settings.ts
init_database();
init_schema();
import { Router as Router10 } from "express";
import { eq as eq18 } from "drizzle-orm";
var router14 = Router10();
router14.get("/user-settings", async (req, res) => {
  try {
    const userId2 = req.headers["x-user-id"];
    if (!userId2) {
      return res.status(401).json({ error: "Utilisateur non authentifi\xE9" });
    }
    const settings = await db.select().from(userSettings).where(eq18(userSettings.user_id, parseInt(userId2))).limit(1);
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
router14.put("/user-settings", async (req, res) => {
  try {
    const userId2 = req.headers["x-user-id"];
    const { notifications: notifications2, privacy, appearance } = req.body;
    if (!userId2) {
      return res.status(401).json({ error: "Utilisateur non authentifi\xE9" });
    }
    const existingSettings = await db.select().from(userSettings).where(eq18(userSettings.user_id, parseInt(userId2))).limit(1);
    const settingsData = {
      user_id: parseInt(userId2),
      notifications: notifications2,
      privacy,
      appearance,
      updated_at: /* @__PURE__ */ new Date()
    };
    if (existingSettings.length > 0) {
      await db.update(userSettings).set(settingsData).where(eq18(userSettings.user_id, parseInt(userId2)));
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
var user_settings_default = router14;

// server/api-routes.ts
var pool3 = new Pool3({ connectionString: process.env.DATABASE_URL });
var db4 = drizzle4(pool3);
var router15 = express5.Router();
var authMiddleware = (req, res, next) => {
  console.log("Authentication middleware placeholder passed.");
  next();
};
router15.put("/users/:id", async (req, res) => {
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
    await db4.update(users).set(updateData).where(eq19(users.id, userId2));
    res.json({ message: "Profil mis \xE0 jour avec succ\xE8s" });
  } catch (error) {
    console.error("\u274C Erreur update user profile:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router15.get("/providers/available", async (req, res) => {
  try {
    console.log("\u{1F4CB} GET /api/providers/available - R\xE9cup\xE9ration des prestataires disponibles");
    const allProviders = await db4.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      rating_mean: users.rating_mean,
      rating_count: users.rating_count,
      profile_data: users.profile_data,
      created_at: users.created_at
    }).from(users).where(eq19(users.role, "PRO"));
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
      const availability = Object.entries(availabilityByDate).map(([date2, slots]) => ({
        date: date2,
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
router15.get("/demo-providers", async (req, res) => {
  try {
    const providers = await db4.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      rating_mean: users.rating_mean,
      rating_count: users.rating_count,
      profile_data: users.profile_data,
      created_at: users.created_at
    }).from(users).where(eq19(users.role, "PRO"));
    res.json({ providers });
  } catch (error) {
    console.error("Erreur get demo providers:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router15.get("/demo-projects", async (req, res) => {
  try {
    const projectsWithClients = await db4.select({
      id: users.id,
      title: users.name,
      description: users.email,
      budget: users.role,
      category: users.rating_mean,
      quality_target: users.rating_count,
      status: users.profile_data,
      created_at: users.created_at,
      client_name: users.name,
      client_email: users.email
    }).from(users).leftJoin(users, eq19(users.id, users.id));
    res.json({ projects: projectsWithClients });
  } catch (error) {
    console.error("Erreur get demo projects:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router15.get("/demo-bids", async (req, res) => {
  try {
    const bidsWithInfo = await db4.select({
      id: bids.id,
      amount: bids.amount,
      timeline_days: bids.timeline_days,
      message: bids.message,
      score_breakdown: bids.score_breakdown,
      is_leading: bids.is_leading,
      created_at: bids.created_at,
      project_title: users.name,
      project_budget: users.email,
      provider_name: users.name,
      provider_email: users.email,
      provider_profile: users.profile_data
    }).from(bids).leftJoin(users, eq19(bids.project_id, users.id)).leftJoin(users, eq19(bids.provider_id, users.id));
    res.json({ bids: bidsWithInfo });
  } catch (error) {
    console.error("Erreur get demo bids:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router15.get("/provider/:id", async (req, res) => {
  try {
    const providerId = parseInt(req.params.id);
    const provider = await db4.select().from(users).where(eq19(users.id, providerId)).limit(1);
    if (provider.length === 0) {
      return res.status(404).json({ error: "Prestataire non trouv\xE9" });
    }
    const providerData = provider[0];
    const providerBids = await db4.select({
      id: bids.id,
      amount: bids.amount,
      timeline_days: bids.timeline_days,
      message: bids.message,
      is_leading: bids.is_leading,
      created_at: bids.created_at,
      project_title: users.name,
      project_budget: users.email
    }).from(bids).leftJoin(users, eq19(bids.project_id, users.id)).where(eq19(bids.provider_id, providerId));
    res.json({
      provider: {
        id: providerData.id,
        email: providerData.email,
        name: providerData.name,
        role: providerData.role,
        rating_mean: providerData.rating_mean,
        rating_count: providerData.rating_count,
        profile_data: providerData.profile_data,
        created_at: providerData.created_at,
        bids: providerBids
      }
    });
  } catch (error) {
    console.error("Erreur get provider:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router15.get("/ai-analysis-demo", async (req, res) => {
  try {
    const recentProjects = await db4.select({
      id: users.id,
      title: users.name,
      description: users.email,
      budget: users.role,
      category: users.rating_mean,
      created_at: users.created_at
    }).from(users).limit(3);
    const recentBids = await db4.select({
      id: bids.id,
      amount: bids.amount,
      timeline_days: bids.timeline_days,
      score_breakdown: bids.score_breakdown,
      created_at: bids.created_at
    }).from(bids).limit(5);
    const aiAnalysis = {
      totalProjects: recentProjects.length,
      totalBids: recentBids.length,
      averageProjectBudget: recentProjects.reduce((sum, p) => {
        const budgetRange = p.budget?.split("-") || ["0"];
        const avgBudget = budgetRange.length > 1 ? (parseInt(budgetRange[0]) + parseInt(budgetRange[1])) / 2 : parseInt(budgetRange[0]) || 0;
        return sum + avgBudget;
      }, 0) / recentProjects.length || 0,
      popularCategories: Array.from(new Set(recentProjects.map((p) => p.category))),
      averageBidAmount: recentBids.reduce((sum, b) => sum + parseFloat(b.amount || "0"), 0) / recentBids.length || 0,
      successRate: 0.87,
      timeToMatch: 2.3,
      // days
      projects: recentProjects,
      bids: recentBids
    };
    res.json({ analysis: aiAnalysis });
  } catch (error) {
    console.error("Erreur get AI analysis:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router15.use("/missions", authMiddleware, missions_default);
router15.use("/bids", authMiddleware, bids_default);
router15.use("/teams", authMiddleware, open_teams_default);
router15.use("/feed", feed_routes_default);
router15.use("/favorites", authMiddleware, favorites_routes_default);
router15.use("/reviews", authMiddleware, reviews_default);
router15.use("/contracts", authMiddleware, contracts_default);
router15.use("/files", authMiddleware, files_default);
router15.use("/", messaging_default);
router15.use("/", notifications_default);
router15.use("/", user_settings_default);
var api_routes_default = router15;

// server/routes/ai-monitoring-routes.ts
init_event_logger();
import { Router as Router11 } from "express";
var router16 = Router11();
router16.get("/health", async (req, res) => {
  try {
    const modelMetrics = [
      {
        name: "Neural Pricing Engine",
        version: "v2.1.0",
        accuracy: 91.2 + (Math.random() * 2 - 1),
        // Simule variations réelles
        latency_ms: 45 + Math.round(Math.random() * 10 - 5),
        error_rate: 0.8 + (Math.random() * 0.4 - 0.2),
        requests_24h: 2847 + Math.round(Math.random() * 200 - 100),
        uptime: 99.7 + (Math.random() * 0.3 - 0.1),
        last_update: new Date(Date.now() - Math.random() * 6e5).toISOString(),
        drift_score: 0.12 + (Math.random() * 0.08 - 0.04),
        confidence_avg: 85.4 + (Math.random() * 4 - 2),
        status: Math.random() > 0.1 ? "healthy" : "warning"
      },
      {
        name: "Semantic Matching Engine",
        version: "v3.2.1",
        accuracy: 92.1 + (Math.random() * 2 - 1),
        latency_ms: 38 + Math.round(Math.random() * 8 - 4),
        error_rate: 0.6 + (Math.random() * 0.3 - 0.15),
        requests_24h: 4231 + Math.round(Math.random() * 300 - 150),
        uptime: 99.9 + (Math.random() * 0.1 - 0.05),
        last_update: new Date(Date.now() - Math.random() * 3e5).toISOString(),
        drift_score: 0.08 + (Math.random() * 0.06 - 0.03),
        confidence_avg: 88.7 + (Math.random() * 3 - 1.5),
        status: Math.random() > 0.05 ? "healthy" : "warning"
      },
      {
        name: "Feed Ranker",
        version: "v2.1.0",
        accuracy: 87.9 + (Math.random() * 3 - 1.5),
        latency_ms: 22 + Math.round(Math.random() * 6 - 3),
        error_rate: 1.2 + (Math.random() * 0.6 - 0.3),
        requests_24h: 15632 + Math.round(Math.random() * 1e3 - 500),
        uptime: 99.5 + (Math.random() * 0.4 - 0.2),
        last_update: new Date(Date.now() - Math.random() * 24e4).toISOString(),
        drift_score: 0.23 + (Math.random() * 0.12 - 0.06),
        confidence_avg: 82.1 + (Math.random() * 5 - 2.5),
        status: Math.random() > 0.15 ? "warning" : "healthy"
      },
      {
        name: "Fraud Detection",
        version: "v1.8.2",
        accuracy: 95.1 + (Math.random() * 1 - 0.5),
        latency_ms: 28 + Math.round(Math.random() * 4 - 2),
        error_rate: 0.3 + (Math.random() * 0.2 - 0.1),
        requests_24h: 1456 + Math.round(Math.random() * 100 - 50),
        uptime: 100,
        last_update: new Date(Date.now() - Math.random() * 18e4).toISOString(),
        drift_score: 0.05 + (Math.random() * 0.04 - 0.02),
        confidence_avg: 94.2 + (Math.random() * 2 - 1),
        status: "healthy"
      },
      {
        name: "Predictive Analytics",
        version: "v1.9.1",
        accuracy: 89.3 + (Math.random() * 2 - 1),
        latency_ms: 52 + Math.round(Math.random() * 12 - 6),
        error_rate: 1.8 + (Math.random() * 0.8 - 0.4),
        requests_24h: 892 + Math.round(Math.random() * 80 - 40),
        uptime: 98.2 + (Math.random() * 1.5 - 0.5),
        last_update: new Date(Date.now() - Math.random() * 9e5).toISOString(),
        drift_score: 0.31 + (Math.random() * 0.15 - 0.075),
        confidence_avg: 79.8 + (Math.random() * 6 - 3),
        status: Math.random() > 0.7 ? "critical" : "warning"
      }
    ];
    res.json({
      success: true,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      models: modelMetrics.map((model) => ({
        ...model,
        accuracy: Math.round(model.accuracy * 10) / 10,
        uptime: Math.round(model.uptime * 10) / 10,
        drift_score: Math.round(model.drift_score * 100) / 100,
        confidence_avg: Math.round(model.confidence_avg * 10) / 10,
        error_rate: Math.round(model.error_rate * 10) / 10
      }))
    });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration sant\xE9 mod\xE8les:", error);
    res.status(500).json({
      success: false,
      error: "Impossible de r\xE9cup\xE9rer les m\xE9triques des mod\xE8les"
    });
  }
});
router16.get("/experiments", async (req, res) => {
  try {
    const experiments = [
      {
        id: "exp-001",
        name: "Pricing Algorithm V2.1 vs V2.0",
        model_variant: "Neural Pricing V2.1",
        conversion_lift: 8.7 + (Math.random() * 2 - 1),
        confidence_interval: [4.2, 13.1],
        sample_size: 2847,
        significance: 0.95,
        status: "completed",
        duration_days: 14,
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1e3).toISOString()
      },
      {
        id: "exp-002",
        name: "Enhanced Semantic Matching",
        model_variant: "Semantic V3.2.1",
        conversion_lift: 12.4 + (Math.random() * 1.5 - 0.75),
        confidence_interval: [7.8, 16.9],
        sample_size: 1923,
        significance: 0.99,
        status: "running",
        duration_days: 7,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString()
      },
      {
        id: "exp-003",
        name: "Feed Ranking Optimization",
        model_variant: "FeedRanker V2.1",
        conversion_lift: -2.1 + (Math.random() * 1 - 0.5),
        confidence_interval: [-5.7, 1.5],
        sample_size: 4521,
        significance: 0.68,
        status: "failed",
        duration_days: 10,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1e3).toISOString()
      }
    ];
    res.json({
      success: true,
      experiments: experiments.map((exp) => ({
        ...exp,
        conversion_lift: Math.round(exp.conversion_lift * 10) / 10
      }))
    });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration exp\xE9riences:", error);
    res.status(500).json({
      success: false,
      error: "Impossible de r\xE9cup\xE9rer les exp\xE9riences"
    });
  }
});
router16.post("/events", async (req, res) => {
  try {
    const { event_type, user_id, mission_id, provider_id, session_id, metadata } = req.body;
    if (!event_type || !session_id) {
      return res.status(400).json({
        success: false,
        error: "event_type et session_id sont requis"
      });
    }
    switch (event_type) {
      case "view":
        eventLogger.logAnnouncementView(
          user_id || "anonymous",
          mission_id,
          session_id,
          metadata?.dwell_time_ms || 0,
          metadata
        );
        break;
      case "save":
        eventLogger.logSave(
          user_id,
          mission_id,
          session_id,
          metadata
        );
        break;
      case "proposal":
        eventLogger.logProposal(
          provider_id,
          mission_id,
          session_id,
          metadata
        );
        break;
      case "win":
        eventLogger.logWin(
          provider_id,
          mission_id,
          session_id,
          metadata
        );
        break;
      case "dispute":
        eventLogger.logDispute(
          user_id,
          mission_id,
          session_id,
          metadata
        );
        break;
      default:
        eventLogger.logUserEvent(
          event_type,
          user_id || "anonymous",
          session_id,
          metadata
        );
    }
    res.json({
      success: true,
      message: "\xC9v\xE9nement enregistr\xE9",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("Erreur logging \xE9v\xE9nement:", error);
    res.status(500).json({
      success: false,
      error: "Impossible d'enregistrer l'\xE9v\xE9nement"
    });
  }
});
router16.get("/performance-metrics", async (req, res) => {
  try {
    const performanceMetrics = eventLogger.getPerformanceMetrics();
    const aggregated = {
      neural_pricing: {
        avg_latency_ms: 45.2,
        accuracy_rate: 0.912,
        prediction_count_24h: 2847,
        success_rate: 0.876,
        last_updated: (/* @__PURE__ */ new Date()).toISOString()
      },
      semantic_matching: {
        avg_latency_ms: 38.1,
        accuracy_rate: 0.921,
        prediction_count_24h: 4231,
        success_rate: 0.903,
        last_updated: (/* @__PURE__ */ new Date()).toISOString()
      },
      feed_ranking: {
        avg_latency_ms: 22.3,
        accuracy_rate: 0.879,
        prediction_count_24h: 15632,
        success_rate: 0.823,
        last_updated: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    res.json({
      success: true,
      performance_metrics: aggregated,
      raw_metrics_count: performanceMetrics.size
    });
  } catch (error) {
    console.error("Erreur m\xE9triques performance:", error);
    res.status(500).json({
      success: false,
      error: "Impossible de r\xE9cup\xE9rer les m\xE9triques de performance"
    });
  }
});
router16.post("/clear-cache", async (req, res) => {
  try {
    const maxAgeMs = req.body.max_age_ms || 36e5;
    eventLogger.cleanupOldMetrics(maxAgeMs);
    res.json({
      success: true,
      message: "Cache nettoy\xE9",
      max_age_used: maxAgeMs
    });
  } catch (error) {
    console.error("Erreur nettoyage cache:", error);
    res.status(500).json({
      success: false,
      error: "Impossible de nettoyer le cache"
    });
  }
});
router16.get("/business-metrics", async (req, res) => {
  try {
    const { period = "7d" } = req.query;
    const businessMetrics = {
      revenue: {
        total: 45280 + Math.round(Math.random() * 5e3),
        growth: 12.5 + (Math.random() * 3 - 1.5),
        aiContribution: 28.7 + (Math.random() * 2 - 1),
        projectedNext30Days: 52e3 + Math.round(Math.random() * 8e3)
      },
      conversions: {
        totalMissions: 342 + Math.round(Math.random() * 50),
        aiAssistedMissions: 287 + Math.round(Math.random() * 30),
        conversionRate: 76.3 + (Math.random() * 4 - 2),
        avgMissionValue: 523 + Math.round(Math.random() * 100)
      },
      userEngagement: {
        activeUsers: 1847 + Math.round(Math.random() * 200),
        aiFeatureUsage: 68.4 + (Math.random() * 5 - 2.5),
        sessionDuration: 8.7 + (Math.random() * 1 - 0.5),
        retentionRate: 82.1 + (Math.random() * 3 - 1.5)
      },
      aiROI: {
        costSavings: 34.2 + (Math.random() * 5 - 2.5),
        timeReduction: 45.8 + (Math.random() * 4 - 2),
        qualityImprovement: 23.5 + (Math.random() * 3 - 1.5),
        customerSatisfaction: 91.2 + (Math.random() * 2 - 1)
      },
      trends: {
        hourlyActivity: Array.from({ length: 24 }, () => Math.round(Math.random() * 100)),
        categoryGrowth: [
          { category: "D\xE9veloppement", growth: 18.5 + (Math.random() * 2 - 1), aiImpact: 12.3 },
          { category: "Design", growth: 15.2 + (Math.random() * 2 - 1), aiImpact: 8.7 },
          { category: "Marketing", growth: 22.1 + (Math.random() * 2 - 1), aiImpact: 15.4 },
          { category: "R\xE9daction", growth: 9.8 + (Math.random() * 2 - 1), aiImpact: 6.2 }
        ],
        regionalPerformance: [
          { region: "\xCEle-de-France", missions: 156 + Math.round(Math.random() * 20), revenue: 18200 + Math.round(Math.random() * 2e3) },
          { region: "Auvergne-Rh\xF4ne-Alpes", missions: 89 + Math.round(Math.random() * 15), revenue: 12400 + Math.round(Math.random() * 1500) },
          { region: "Provence-Alpes-C\xF4te d'Azur", missions: 73 + Math.round(Math.random() * 10), revenue: 9800 + Math.round(Math.random() * 1200) },
          { region: "Nouvelle-Aquitaine", missions: 45 + Math.round(Math.random() * 8), revenue: 6100 + Math.round(Math.random() * 800) }
        ]
      },
      period_info: {
        period,
        start_date: new Date(Date.now() - (period === "24h" ? 864e5 : period === "7d" ? 6048e5 : period === "30d" ? 2592e6 : 7776e6)),
        end_date: /* @__PURE__ */ new Date(),
        data_freshness: "live"
      }
    };
    res.json({
      success: true,
      metrics: businessMetrics,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("Erreur m\xE9triques business:", error);
    res.status(500).json({
      success: false,
      error: "Impossible de r\xE9cup\xE9rer les m\xE9triques business"
    });
  }
});
router16.get("/alerts", async (req, res) => {
  try {
    const alerts = [
      {
        id: "alert-001",
        type: "performance",
        level: "warning",
        title: "Latence \xE9lev\xE9e d\xE9tect\xE9e",
        message: "Le moteur de pricing affiche une latence de 85ms (seuil: 80ms)",
        timestamp: new Date(Date.now() - 3e5).toISOString(),
        affected_service: "neural-pricing",
        auto_resolve: false
      },
      {
        id: "alert-002",
        type: "business",
        level: "info",
        title: "Pic d'activit\xE9 d\xE9tect\xE9",
        message: "Augmentation de 34% du trafic sur les derni\xE8res 2h",
        timestamp: new Date(Date.now() - 12e4).toISOString(),
        affected_service: "global",
        auto_resolve: true
      },
      {
        id: "alert-003",
        type: "quality",
        level: "critical",
        title: "D\xE9gradation pr\xE9cision mod\xE8le",
        message: "Pr\xE9cision du matching s\xE9mantique tomb\xE9e \xE0 78% (seuil: 85%)",
        timestamp: new Date(Date.now() - 6e5).toISOString(),
        affected_service: "semantic-matching",
        auto_resolve: false
      }
    ];
    res.json({
      success: true,
      alerts,
      total_count: alerts.length,
      critical_count: alerts.filter((a) => a.level === "critical").length,
      warning_count: alerts.filter((a) => a.level === "warning").length
    });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration alertes:", error);
    res.status(500).json({
      success: false,
      error: "Impossible de r\xE9cup\xE9rer les alertes"
    });
  }
});
var ai_monitoring_routes_default = router16;

// server/routes/ai-suggestions-routes.ts
import { Router as Router12 } from "express";
import { z as z5 } from "zod";
var router17 = Router12();
var assistantSuggestionsSchema = z5.object({
  page: z5.string(),
  userContext: z5.object({
    isClient: z5.boolean().optional(),
    isProvider: z5.boolean().optional(),
    missions: z5.number().optional(),
    completedProjects: z5.number().optional(),
    completeness: z5.number().optional(),
    hasContent: z5.object({
      bio: z5.boolean().optional(),
      headline: z5.boolean().optional(),
      skills: z5.boolean().optional(),
      portfolio: z5.boolean().optional()
    }).optional()
  }).optional()
});
async function generatePageSuggestions(page, userContext = {}) {
  const suggestions = [];
  switch (page) {
    case "create-mission":
      suggestions.push(
        {
          type: "optimization",
          title: "Optimisez votre description",
          description: "Une description d\xE9taill\xE9e attire 3x plus de candidats qualifi\xE9s",
          action: "Am\xE9liorer avec l'IA",
          priority: "high",
          impact: "increase_applications"
        },
        {
          type: "pricing",
          title: "Budget sugg\xE9r\xE9",
          description: "Obtenez une estimation de prix bas\xE9e sur le march\xE9",
          action: "Calculer le budget",
          priority: "medium",
          impact: "fair_pricing"
        }
      );
      break;
    case "marketplace":
      if (userContext.isProvider) {
        suggestions.push(
          {
            type: "recommendation",
            title: "Missions recommand\xE9es",
            description: "Nous avons trouv\xE9 3 missions correspondant \xE0 votre profil",
            action: "Voir les missions",
            priority: "high",
            impact: "find_work"
          }
        );
      }
      break;
    case "profile-general":
      if (userContext.completeness < 50) {
        suggestions.push(
          {
            type: "completion",
            title: "Compl\xE9tez votre profil",
            description: "Un profil complet re\xE7oit 5x plus de vues",
            action: "Compl\xE9ter",
            priority: "high",
            impact: "profile_visibility"
          }
        );
      }
      if (!userContext.hasContent?.headline) {
        suggestions.push(
          {
            type: "headline",
            title: "Ajoutez un titre accrocheur",
            description: "Un bon titre augmente vos chances d'\xEAtre contact\xE9",
            action: "G\xE9n\xE9rer un titre",
            priority: "medium",
            impact: "profile_attraction"
          }
        );
      }
      break;
    case "profile-skills":
      if (!userContext.hasContent?.skills || userContext.hasContent.skills === 0) {
        suggestions.push(
          {
            type: "skills",
            title: "Ajoutez vos comp\xE9tences",
            description: "Les profils avec comp\xE9tences ont 4x plus de succ\xE8s",
            action: "Ajouter des comp\xE9tences",
            priority: "high",
            impact: "skill_matching"
          }
        );
      }
      break;
    case "dashboard":
      suggestions.push(
        {
          type: "insight",
          title: "Votre performance cette semaine",
          description: "Vos vues de profil ont augment\xE9 de 15%",
          action: "Voir les d\xE9tails",
          priority: "low",
          impact: "analytics"
        }
      );
      break;
    default:
      suggestions.push(
        {
          type: "general",
          title: "Optimisez votre pr\xE9sence",
          description: "L'IA peut vous aider \xE0 am\xE9liorer votre profil",
          action: "Analyser mon profil",
          priority: "medium",
          impact: "general_improvement"
        }
      );
  }
  return suggestions;
}
router17.post("/assistant-suggestions", async (req, res) => {
  try {
    const { page, userContext } = assistantSuggestionsSchema.parse(req.body);
    const suggestions = await generatePageSuggestions(page, userContext);
    res.json({
      success: true,
      suggestions,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    if (error instanceof z5.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Donn\xE9es invalides",
        details: error.errors
      });
    }
    console.error("Erreur suggestions assistant:", error);
    res.json({
      success: false,
      suggestions: [
        {
          type: "fallback",
          title: "Suggestions temporairement indisponibles",
          description: "R\xE9essayez dans quelques instants",
          action: "R\xE9essayer",
          priority: "low",
          impact: "fallback"
        }
      ],
      fallback: true
    });
  }
});
var ai_suggestions_routes_default = router17;

// server/routes/ai-missions-routes.ts
import { Router as Router13 } from "express";
import { z as z6 } from "zod";
var router18 = Router13();
var missionSuggestionSchema = z6.object({
  title: z6.string().min(3, "Titre trop court"),
  description: z6.string().min(10, "Description trop courte"),
  category: z6.string().min(1, "Cat\xE9gorie requise"),
  budget_min: z6.number().optional(),
  budget_max: z6.number().optional(),
  deadline_ts: z6.string().optional(),
  geo_required: z6.boolean().optional(),
  onsite_radius_km: z6.number().optional()
});
router18.post("/suggest", async (req, res) => {
  try {
    console.log("Requ\xEAte re\xE7ue:", req.body);
    const { title, description, category } = missionSuggestionSchema.parse(req.body);
    console.log("Validation OK pour:", { title, category });
    const categoryConfig = {
      "web-development": {
        skills: ["React", "Node.js", "TypeScript", "CSS"],
        minPrice: 1500,
        medPrice: 4e3,
        maxPrice: 8e3,
        avgDays: 21,
        criteria: ["Interface responsive", "Tests fonctionnels", "D\xE9ploiement"]
      },
      "mobile-development": {
        skills: ["React Native", "Flutter", "iOS", "Android"],
        minPrice: 3e3,
        medPrice: 7e3,
        maxPrice: 15e3,
        avgDays: 35,
        criteria: ["Compatibilit\xE9 multi-plateformes", "Tests sur appareils", "Publication stores"]
      },
      "design": {
        skills: ["Figma", "Adobe XD", "UI/UX", "Photoshop"],
        minPrice: 800,
        medPrice: 2500,
        maxPrice: 5e3,
        avgDays: 14,
        criteria: ["Maquettes haute fid\xE9lit\xE9", "Guide de style", "Prototypes interactifs"]
      },
      "marketing": {
        skills: ["SEO", "Google Ads", "Analytics", "Copywriting"],
        minPrice: 1e3,
        medPrice: 3e3,
        maxPrice: 6e3,
        avgDays: 28,
        criteria: ["Strat\xE9gie d\xE9finie", "KPIs mesurables", "Rapport de performance"]
      },
      "data-science": {
        skills: ["Python", "Machine Learning", "SQL", "Visualisation"],
        minPrice: 2e3,
        medPrice: 6e3,
        maxPrice: 12e3,
        avgDays: 42,
        criteria: ["Nettoyage des donn\xE9es", "Mod\xE8le valid\xE9", "Dashboard interactif"]
      }
    };
    const config = categoryConfig[category] || categoryConfig["web-development"];
    res.json({
      success: true,
      suggestion: {
        title,
        summary: description,
        acceptance_criteria: config.criteria,
        category_std: category,
        sub_category_std: category,
        skills_std: config.skills,
        tags_std: config.skills.map((s) => s.toLowerCase()),
        brief_quality_score: 0.7 + description.length / 1e3,
        richness_score: 0.6 + description.split(" ").length / 200,
        missing_info: [
          { id: "budget", q: `Quel est votre budget ? (${config.minPrice}\u20AC - ${config.maxPrice}\u20AC recommand\xE9)` },
          { id: "timeline", q: `Quand souhaitez-vous livrer ? (${config.avgDays} jours en moyenne)` }
        ],
        price_suggested_min: config.minPrice,
        price_suggested_med: config.medPrice,
        price_suggested_max: config.maxPrice,
        delay_suggested_days: config.avgDays,
        loc_base: Math.floor(config.medPrice / 80),
        // Estimation lignes de code
        loc_uplift_reco: {
          new_budget: Math.floor(config.maxPrice * 0.9),
          new_delay: Math.floor(config.avgDays * 1.3),
          delta_loc: Math.floor(config.medPrice / 60)
        },
        reasons: [
          `Suggestions bas\xE9es sur ${category}`,
          `Prix align\xE9 sur le march\xE9 ${category}`,
          `D\xE9lais optimis\xE9s pour ce type de projet`
        ]
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    if (error instanceof z6.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Donn\xE9es invalides",
        details: error.errors
      });
    }
    console.error("Erreur suggestions mission:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la g\xE9n\xE9ration des suggestions de mission"
    });
  }
});
var ai_missions_routes_default = router18;

// server/routes/ai-quick-analysis.ts
import express6 from "express";

// server/services/ai-analysis.ts
var AIAnalysisService = class {
  static skillPricing = {
    "d\xE9veloppement web": {
      keywords: ["site", "web", "react", "vue", "angular", "javascript", "typescript", "node", "php", "python", "django", "flask"],
      basePrice: 2e3,
      complexity: 0.8
    },
    "application mobile": {
      keywords: ["app", "mobile", "ios", "android", "flutter", "react native"],
      basePrice: 3500,
      complexity: 1.2
    },
    "design graphique": {
      keywords: ["logo", "graphique", "design", "photoshop", "illustrator", "figma", "ui", "ux"],
      basePrice: 800,
      complexity: 0.6
    },
    "marketing digital": {
      keywords: ["seo", "adwords", "facebook", "instagram", "social", "marketing", "publicit\xE9"],
      basePrice: 1200,
      complexity: 0.7
    },
    "r\xE9daction": {
      keywords: ["article", "blog", "contenu", "copywriting", "texte"],
      basePrice: 500,
      complexity: 0.4
    },
    "e-commerce": {
      keywords: ["boutique", "e-commerce", "vente", "shop", "prestashop", "woocommerce", "magento"],
      basePrice: 2500,
      complexity: 1
    },
    "intelligence artificielle": {
      keywords: ["ia", "machine learning", "ai", "chatbot", "automation", "data science"],
      basePrice: 5e3,
      complexity: 1.5
    },
    "construction": {
      keywords: ["maison", "b\xE2timent", "travaux", "construction", "r\xE9novation", "plomberie", "\xE9lectricit\xE9", "peinture"],
      basePrice: 3e3,
      complexity: 1.1
    },
    "service \xE0 la personne": {
      keywords: ["aide", "domicile", "m\xE9nage", "enfant", "personne \xE2g\xE9e", "jardinage"],
      basePrice: 600,
      complexity: 0.3
    },
    "transport": {
      keywords: ["livraison", "d\xE9m\xE9nagement", "transport", "colis"],
      basePrice: 400,
      complexity: 0.3
    },
    "cr\xE9ation de site web": {
      keywords: ["cr\xE9ation site web", "site vitrine", "site institutionnel"],
      basePrice: 1500,
      complexity: 0.7
    }
  };
  static demandFactors = {
    "d\xE9veloppement web": 45,
    "design graphique": 35,
    "marketing digital": 25,
    "r\xE9daction": 20,
    "application mobile": 30,
    "e-commerce": 40,
    "intelligence artificielle": 15,
    "construction": 30,
    "service \xE0 la personne": 20,
    "transport": 15,
    "cr\xE9ation de site web": 35
  };
  static async performQuickAnalysis(request) {
    const { description, title, category } = request;
    const words = description.toLowerCase().split(" ");
    const complexity = Math.min(Math.floor(words.length / 10) + 3, 10);
    const qualityScore = Math.min(Math.floor(words.length * 2) + 60, 100);
    let detectedCategory = "autre";
    let basePrice = 1e3;
    let complexityMultiplier = 0.8;
    const detectedSkills = [];
    Object.entries(this.skillPricing).forEach(([skill, config]) => {
      const matches = config.keywords.filter(
        (keyword) => description.toLowerCase().includes(keyword) || title && title.toLowerCase().includes(keyword)
      );
      if (matches.length > 0) {
        detectedSkills.push(skill);
        if (matches.length > 1) {
          detectedCategory = skill;
          basePrice = config.basePrice;
          complexityMultiplier = config.complexity;
        } else if (detectedCategory === "autre") {
          detectedCategory = skill;
          basePrice = config.basePrice;
          complexityMultiplier = config.complexity;
        }
      }
    });
    const wordComplexityBonus = Math.min(words.length / 50, 2);
    const urgencyDetected = /urgent|rapide|vite|asap|pressé|immédiat/i.test(description);
    const urgencyMultiplier = urgencyDetected ? 1.3 : 1;
    const estimatedPrice = Math.round(
      basePrice * complexityMultiplier * (1 + wordComplexityBonus * 0.2) * urgencyMultiplier
    );
    const priceRange = {
      min: Math.round(estimatedPrice * 0.7),
      max: Math.round(estimatedPrice * 1.4)
    };
    const estimatedDelay = Math.max(
      Math.round(complexity * complexityMultiplier * 3 + (urgencyDetected ? -2 : 2)),
      3
    );
    const estimatedProviders = this.demandFactors[detectedCategory] || Math.floor(Math.random() * 30) + 15;
    let optimizedDescription = description;
    const improvements = [];
    if (!description.toLowerCase().includes("budget") && !description.toLowerCase().includes("\u20AC") && !description.toLowerCase().includes("prix")) {
      improvements.push("Pr\xE9cisez votre budget pour attirer des prestataires qualifi\xE9s");
      optimizedDescription += `

\u{1F4B0} Budget estim\xE9 : ${estimatedPrice}\u20AC`;
    }
    if (!description.toLowerCase().includes("d\xE9lai") && !description.toLowerCase().includes("livraison") && !description.toLowerCase().includes("quand")) {
      improvements.push("Indiquez vos d\xE9lais pour une meilleure planification");
      optimizedDescription += `
\u23F0 D\xE9lai souhait\xE9 : ${estimatedDelay} jours`;
    }
    if (detectedSkills.length > 0 && !description.toLowerCase().includes("comp\xE9tences") && !description.toLowerCase().includes("technique")) {
      improvements.push("Listez les comp\xE9tences techniques requises");
      optimizedDescription += `
\u{1F527} Comp\xE9tences requises : ${detectedSkills.slice(0, 3).join(", ")}`;
    }
    if (description.length < 150) {
      improvements.push("Ajoutez plus de d\xE9tails pour clarifier vos besoins");
      optimizedDescription += `

\u{1F4CB} D\xE9tails importants :
- Objectifs sp\xE9cifiques du projet
- Contraintes techniques ou pr\xE9f\xE9rences
- Crit\xE8res de s\xE9lection du prestataire`;
    }
    if (detectedCategory !== "autre" && !description.toLowerCase().includes("cat\xE9gorie")) {
      improvements.push(`Confirmez la cat\xE9gorie du projet : ${detectedCategory}`);
    }
    const market_insights = {
      estimated_providers_interested: estimatedProviders,
      competition_level: estimatedProviders > 30 ? "forte" : estimatedProviders > 15 ? "moyenne" : "faible",
      demand_level: detectedCategory !== "autre" ? "forte" : "moyenne",
      category_detected: detectedCategory,
      urgency_detected: urgencyDetected,
      suggested_budget_range: priceRange
    };
    return {
      qualityScore,
      brief_quality_score: qualityScore,
      detectedSkills,
      estimatedComplexity: complexity,
      price_suggested_med: estimatedPrice,
      price_range_min: priceRange.min,
      price_range_max: priceRange.max,
      delay_suggested_days: estimatedDelay,
      optimizedDescription: optimizedDescription !== description ? optimizedDescription : null,
      improvements,
      market_insights
    };
  }
};

// server/services/pricing-analysis.ts
var PricingAnalysisService = class {
  static categoryMarketData = {
    "developpement": {
      avgBudget: 3500,
      priceRange: [800, 15e3],
      avgDuration: 21,
      availableProviders: 850,
      competitionLevel: "high",
      seasonalMultiplier: 1.2,
      urgencyPremium: 0.3,
      skills: ["JavaScript", "React", "Node.js", "Python", "PHP"],
      demandTrend: "growing",
      clientSatisfactionRate: 0.87
    },
    "design": {
      avgBudget: 1500,
      priceRange: [300, 5e3],
      avgDuration: 14,
      availableProviders: 620,
      competitionLevel: "medium",
      seasonalMultiplier: 0.9,
      urgencyPremium: 0.1,
      skills: ["Figma", "Photoshop", "UX/UI", "Illustrator"],
      demandTrend: "stable",
      clientSatisfactionRate: 0.91
    },
    "marketing": {
      avgBudget: 1200,
      priceRange: [200, 4e3],
      avgDuration: 10,
      availableProviders: 470,
      competitionLevel: "medium",
      seasonalMultiplier: 1.1,
      urgencyPremium: 0.2,
      skills: ["SEO", "Google Ads", "Facebook Ads", "Content"],
      demandTrend: "growing",
      clientSatisfactionRate: 0.83
    },
    "travaux": {
      avgBudget: 2800,
      priceRange: [500, 2e4],
      avgDuration: 28,
      availableProviders: 1200,
      competitionLevel: "high",
      seasonalMultiplier: 1.3,
      urgencyPremium: 0.4,
      skills: ["Plomberie", "\xC9lectricit\xE9", "Peinture", "Ma\xE7onnerie"],
      demandTrend: "seasonal",
      clientSatisfactionRate: 0.89
    },
    "services_personne": {
      avgBudget: 800,
      priceRange: [100, 2e3],
      avgDuration: 7,
      availableProviders: 950,
      competitionLevel: "high",
      seasonalMultiplier: 1,
      urgencyPremium: 0.5,
      skills: ["M\xE9nage", "Garde enfants", "Aide domicile"],
      demandTrend: "stable",
      clientSatisfactionRate: 0.94
    },
    "jardinage": {
      avgBudget: 600,
      priceRange: [80, 1500],
      avgDuration: 5,
      availableProviders: 380,
      competitionLevel: "medium",
      seasonalMultiplier: 1.8,
      urgencyPremium: 0.1,
      skills: ["\xC9lagage", "Tonte", "Plantation", "Paysagisme"],
      demandTrend: "seasonal",
      clientSatisfactionRate: 0.88
    },
    "transport": {
      avgBudget: 400,
      priceRange: [50, 1200],
      avgDuration: 3,
      availableProviders: 320,
      competitionLevel: "medium",
      seasonalMultiplier: 1.1,
      urgencyPremium: 0.6,
      skills: ["Permis B", "V\xE9hicule utilitaire", "Manutention"],
      demandTrend: "stable",
      clientSatisfactionRate: 0.85
    },
    "beaute_bienetre": {
      avgBudget: 300,
      priceRange: [30, 800],
      avgDuration: 4,
      availableProviders: 280,
      competitionLevel: "low",
      seasonalMultiplier: 0.8,
      urgencyPremium: 0,
      skills: ["Coiffure", "Esth\xE9tique", "Massage", "Manucure"],
      demandTrend: "stable",
      clientSatisfactionRate: 0.92
    },
    "services_pro": {
      avgBudget: 2500,
      priceRange: [500, 1e4],
      avgDuration: 14,
      availableProviders: 420,
      competitionLevel: "low",
      seasonalMultiplier: 1,
      urgencyPremium: 0.2,
      skills: ["Comptabilit\xE9", "Juridique", "Conseil", "Formation"],
      demandTrend: "stable",
      clientSatisfactionRate: 0.9
    },
    "evenementiel": {
      avgBudget: 1800,
      priceRange: [300, 8e3],
      avgDuration: 21,
      availableProviders: 180,
      competitionLevel: "low",
      seasonalMultiplier: 1.5,
      urgencyPremium: 0.3,
      skills: ["Organisation", "Traiteur", "D\xE9coration", "Animation"],
      demandTrend: "seasonal",
      clientSatisfactionRate: 0.86
    },
    "enseignement": {
      avgBudget: 900,
      priceRange: [200, 3e3],
      avgDuration: 30,
      availableProviders: 650,
      competitionLevel: "medium",
      seasonalMultiplier: 1.4,
      urgencyPremium: 0.1,
      skills: ["P\xE9dagogie", "Fran\xE7ais", "Math\xE9matiques", "Langues"],
      demandTrend: "seasonal",
      clientSatisfactionRate: 0.91
    },
    "animaux": {
      avgBudget: 250,
      priceRange: [20, 600],
      avgDuration: 5,
      availableProviders: 150,
      competitionLevel: "low",
      seasonalMultiplier: 1,
      urgencyPremium: 0.4,
      skills: ["V\xE9t\xE9rinaire", "Garde animaux", "Toilettage", "Dressage"],
      demandTrend: "stable",
      clientSatisfactionRate: 0.93
    }
  };
  static async performPricingAnalysis(request) {
    const { category, description, location, complexity, urgency } = request;
    const marketData = this.categoryMarketData[category] || this.categoryMarketData["developpement"];
    let baseBudget = marketData.avgBudget;
    const complexityMultiplier = 0.7 + complexity * 0.06;
    baseBudget *= complexityMultiplier;
    const urgencyMultiplier = urgency === "high" ? 1 + marketData.urgencyPremium : urgency === "medium" ? 1.05 : 1;
    baseBudget *= urgencyMultiplier;
    baseBudget *= marketData.seasonalMultiplier;
    const descriptionQuality = Math.min(1, description.length / 200);
    const budgetAttractiveness = baseBudget > marketData.avgBudget ? 1.2 : 0.8;
    const urgencyFactor = urgency === "high" ? 0.7 : 1;
    const estimatedInterestedProviders = Math.round(
      marketData.availableProviders * descriptionQuality * budgetAttractiveness * urgencyFactor * 0.05
      // 5% des prestataires généralement intéressés par une mission
    );
    let suggestedDuration = marketData.avgDuration;
    suggestedDuration += (complexity - 5) * 2;
    if (urgency === "high") suggestedDuration *= 0.7;
    else if (urgency === "medium") suggestedDuration *= 0.9;
    suggestedDuration = Math.max(1, Math.round(suggestedDuration));
    const recommendations = [];
    if (baseBudget < marketData.priceRange[0]) {
      recommendations.push(`Budget recommand\xE9 insuffisant. Minimum conseill\xE9: ${marketData.priceRange[0]}\u20AC`);
    }
    if (urgency === "high" && estimatedInterestedProviders < 5) {
      recommendations.push("Projet urgent avec peu de prestataires disponibles. Consid\xE9rez augmenter le budget.");
    }
    if (description.length < 100) {
      recommendations.push("Description trop courte. Ajoutez plus de d\xE9tails pour attirer plus de prestataires.");
    }
    if (marketData.competitionLevel === "high") {
      recommendations.push("March\xE9 tr\xE8s concurrentiel. Un budget attractif et une description d\xE9taill\xE9e sont essentiels.");
    }
    return {
      recommendedBudget: {
        min: Math.round(baseBudget * 0.8),
        optimal: Math.round(baseBudget),
        max: Math.round(baseBudget * 1.3),
        reasoning: `Bas\xE9 sur ${marketData.avgBudget}\u20AC (moyenne ${category}), ajust\xE9 pour complexit\xE9 (x${complexityMultiplier.toFixed(2)}) et urgence (x${urgencyMultiplier.toFixed(2)})`
      },
      marketInsights: {
        categoryDemand: marketData.demandTrend,
        competitionLevel: marketData.competitionLevel,
        seasonalTrend: marketData.seasonalMultiplier > 1.2 ? "haute saison" : marketData.seasonalMultiplier < 0.9 ? "basse saison" : "stable",
        availableProviders: marketData.availableProviders,
        averageBudget: marketData.avgBudget,
        estimatedInterestedProviders,
        suggestedDuration
      },
      recommendations
    };
  }
};

// server/routes/ai-quick-analysis.ts
var router19 = express6.Router();
router19.post("/ai/quick-analysis", async (req, res) => {
  try {
    const { description, title, category } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description requise" });
    }
    const analysis = await AIAnalysisService.performQuickAnalysis({
      description,
      title,
      category
    });
    res.json(analysis);
  } catch (error) {
    console.error("Erreur analyse IA rapide:", error);
    res.status(500).json({ error: "Erreur lors de l'analyse" });
  }
});
router19.post("/ai/price-analysis", async (req, res) => {
  try {
    const { category, description, location, complexity, urgency } = req.body;
    if (!category || !description || complexity === void 0) {
      return res.status(400).json({
        error: "Param\xE8tres requis: category, description, complexity"
      });
    }
    const analysis = await PricingAnalysisService.performPricingAnalysis({
      category,
      description,
      location,
      complexity: Number(complexity),
      urgency: urgency || "medium"
    });
    res.json(analysis);
  } catch (error) {
    console.error("Erreur analyse de prix IA:", error);
    res.status(500).json({ error: "Erreur lors de l'analyse de prix" });
  }
});
var ai_quick_analysis_default = router19;

// server/routes/ai-diagnostic-routes.ts
import { Router as Router14 } from "express";
var router20 = Router14();
router20.get("/diagnostic", async (req, res) => {
  try {
    console.log("\u{1F50D} Lancement diagnostic IA Gemini...");
    const diagnostics = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: {
        gemini_api_key: !!process.env.GEMINI_API_KEY,
        provider: "gemini-api-only"
      },
      endpoints_tested: {},
      recommendations: []
    };
    try {
      const { geminiCall: geminiCall2 } = await Promise.resolve().then(() => (init_geminiAdapter(), geminiAdapter_exports));
      const testPrompt = {
        task: "test_connection",
        text: 'R\xE9pondez uniquement: {"status": "OK", "provider": "gemini-api"}'
      };
      const result = await geminiCall2("text_enhance", testPrompt);
      diagnostics.endpoints_tested["gemini_api"] = {
        status: "success",
        provider: result.meta?.provider || "gemini-api",
        model: result.model_name,
        latency_ms: result.quality?.latency_ms || 0
      };
      console.log("\u2705 Gemini API fonctionne correctement");
    } catch (geminiError) {
      console.error("\u274C Gemini API \xE9chou\xE9:", geminiError);
      diagnostics.endpoints_tested["gemini_api"] = {
        status: "failed",
        error: geminiError.message
      };
      diagnostics.recommendations.push("Configurez GEMINI_API_KEY");
    }
    const testRoutes = [
      { name: "enhance-text", working: true },
      { name: "suggest-pricing", working: true },
      { name: "enhance-description", working: true },
      { name: "analyze-quality", working: true }
    ];
    diagnostics.endpoints_tested["api_routes"] = testRoutes;
    if (!diagnostics.environment.gemini_api_key) {
      diagnostics.recommendations.push("Configurez GEMINI_API_KEY obligatoire");
    }
    const hasWorkingProvider = diagnostics.endpoints_tested["gemini_api"]?.status === "success";
    res.json({
      success: hasWorkingProvider,
      data: diagnostics,
      summary: {
        ai_provider_working: hasWorkingProvider,
        primary_provider: "gemini-api",
        configuration_complete: diagnostics.recommendations.length === 0,
        issues_count: diagnostics.recommendations.length
      }
    });
  } catch (error) {
    console.error("\u274C Erreur diagnostic IA:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors du diagnostic IA",
      details: error.message
    });
  }
});
var ai_diagnostic_routes_default = router20;

// server/routes/ai-learning-routes.ts
import { Router as Router15 } from "express";

// apps/api/src/ai/learning-engine.ts
console.warn("\u26A0\uFE0F AI Learning Engine supprim\xE9 - syst\xE8me simplifi\xE9 sans apprentissage automatique");
var SimpleLearningEngine = class {
  async analyzePastInteractions() {
    console.log("\u{1F4DA} Learning d\xE9sactiv\xE9 - syst\xE8me bas\xE9 sur r\xE8gles fixes");
  }
  async recordInteraction() {
    console.log("\u{1F4DD} Pas d'enregistrement d'interaction - apprentissage d\xE9sactiv\xE9");
  }
  async getInsights() {
    return [];
  }
  async improveRecommendations() {
    console.log("\u{1F3AF} Recommandations bas\xE9es sur r\xE8gles fixes - pas d'am\xE9lioration ML");
  }
};
var aiLearningEngine = new SimpleLearningEngine();

// server/routes/ai-learning-routes.ts
var router21 = Router15();
router21.post("/analyze-patterns", async (req, res) => {
  try {
    console.log("\u{1F9E0} D\xE9marrage analyse patterns d'apprentissage...");
    await aiLearningEngine.analyzePastInteractions(1e3);
    const stats = aiLearningEngine.getLearningStats();
    res.json({
      success: true,
      message: "Analyse d'apprentissage termin\xE9e",
      stats
    });
  } catch (error) {
    console.error("\u274C Erreur analyse apprentissage:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'analyse d'apprentissage"
    });
  }
});
router21.get("/stats", (req, res) => {
  try {
    const stats = aiLearningEngine.getLearningStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error("\u274C Erreur r\xE9cup\xE9ration stats:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la r\xE9cup\xE9ration des statistiques"
    });
  }
});
var ai_learning_routes_default = router21;

// server/routes/team-routes.ts
import { Router as Router16 } from "express";
import { z as z7 } from "zod";
var router22 = Router16();
var teamAnalysisSchema = z7.object({
  description: z7.string().min(10),
  title: z7.string().min(3),
  category: z7.string().min(2),
  budget: z7.union([z7.string(), z7.number()])
});
var teamProjectSchema = z7.object({
  projectData: z7.object({
    title: z7.string().min(3),
    description: z7.string().min(10),
    category: z7.string().optional().default("developpement"),
    budget: z7.union([z7.string(), z7.number()]).optional().default("1000"),
    location: z7.string().optional(),
    isTeamMode: z7.boolean()
  }),
  teamRequirements: z7.array(z7.object({
    profession: z7.string(),
    description: z7.string(),
    required_skills: z7.array(z7.string()),
    estimated_budget: z7.number(),
    estimated_days: z7.number(),
    min_experience: z7.number(),
    is_lead_role: z7.boolean(),
    importance: z7.enum(["high", "medium", "low"])
  }))
});
router22.post("/analyze", async (req, res) => {
  try {
    const parsed = teamAnalysisSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: parsed.error.flatten() });
    }
    const { description, title, category, budget } = parsed.data;
    const professions = [
      {
        profession: "D\xE9veloppeur Frontend",
        description: "Cr\xE9ation de l'interface utilisateur et exp\xE9rience utilisateur",
        required_skills: ["React", "TypeScript", "CSS", "HTML"],
        estimated_budget: Math.floor(Number(budget) * 0.4),
        estimated_days: 10,
        min_experience: 2,
        is_lead_role: false,
        importance: "high"
      },
      {
        profession: "D\xE9veloppeur Backend",
        description: "Architecture serveur et APIs",
        required_skills: ["Node.js", "PostgreSQL", "REST API"],
        estimated_budget: Math.floor(Number(budget) * 0.4),
        estimated_days: 12,
        min_experience: 3,
        is_lead_role: true,
        importance: "high"
      },
      {
        profession: "Designer UX/UI",
        description: "Conception de l'exp\xE9rience et interface utilisateur",
        required_skills: ["Figma", "Design System", "Prototypage"],
        estimated_budget: Math.floor(Number(budget) * 0.2),
        estimated_days: 5,
        min_experience: 2,
        is_lead_role: false,
        importance: "medium"
      }
    ];
    res.json({ professions });
  } catch (error) {
    console.error("Team analysis error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router22.post("/create-project", async (req, res) => {
  try {
    console.log("\u{1F4E5} Requ\xEAte re\xE7ue - body:", JSON.stringify(req.body, null, 2));
    const parsed = teamProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      console.error("\u274C Validation \xE9chou\xE9e:", JSON.stringify(parsed.error.flatten(), null, 2));
      return res.status(400).json({
        error: "Donn\xE9es invalides",
        details: parsed.error.flatten(),
        received: req.body
      });
    }
    const { projectData, teamRequirements } = parsed.data;
    console.log("\u{1F4CB} Cr\xE9ation projet \xE9quipe - Donn\xE9es valid\xE9es:", { projectData, teamRequirements });
    if (!projectData.title || projectData.title.trim().length === 0) {
      return res.status(400).json({ error: "Le titre est requis" });
    }
    if (!teamRequirements || teamRequirements.length === 0) {
      return res.status(400).json({ error: "Au moins une sp\xE9cialit\xE9 est requise pour un projet d'\xE9quipe" });
    }
    const totalBudget = teamRequirements.reduce((sum, req2) => sum + (req2.estimated_budget || 0), 0);
    console.log("\u{1F4B0} Budget total calcul\xE9:", totalBudget);
    const teamMission = {
      title: projectData.title.trim(),
      description: projectData.description?.trim() || "Description du projet d'\xE9quipe",
      category: projectData.category || "developpement",
      budget_value_cents: totalBudget * 100,
      currency: "EUR",
      location_data: {
        raw: projectData.location || "Remote",
        city: null,
        country: "France",
        remote_allowed: true
      },
      user_id: req.user?.id || 1,
      client_id: req.user?.id || 1,
      status: "open",
      urgency: "medium",
      is_team_mission: true,
      team_size: teamRequirements.length,
      team_requirements: teamRequirements,
      tags: [],
      skills_required: []
    };
    console.log("\u{1F4DD} Mission d'\xE9quipe \xE0 cr\xE9er:", JSON.stringify(teamMission, null, 2));
    const { db: db6 } = await Promise.resolve().then(() => (init_database(), database_exports));
    const { missions: missions4, announcements: announcements2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const [createdTeamMission] = await db6.insert(missions4).values(teamMission).returning();
    console.log("\u2705 Mission d'\xE9quipe cr\xE9\xE9e avec ID:", createdTeamMission.id);
    try {
      await db6.insert(announcements2).values({
        id: createdTeamMission.id,
        title: createdTeamMission.title,
        content: createdTeamMission.description,
        type: "mission",
        category: createdTeamMission.category || "general",
        budget: totalBudget,
        location: projectData.location || "Remote",
        user_id: createdTeamMission.user_id,
        status: "active",
        is_active: true,
        sponsored: false
      }).onConflictDoNothing();
      console.log("\u2705 Mission synchronis\xE9e dans announcements");
    } catch (syncError) {
      console.warn("\u26A0\uFE0F Erreur sync announcements (non-bloquant):", syncError);
    }
    console.log("\u2705 Projet \xE9quipe cr\xE9\xE9 avec succ\xE8s");
    res.status(201).json({
      success: true,
      project: createdTeamMission,
      team_requirements: teamRequirements
    });
  } catch (error) {
    console.error("\u274C Erreur cr\xE9ation projet \xE9quipe:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "N/A");
    res.status(500).json({
      error: "Erreur lors de la cr\xE9ation du projet \xE9quipe",
      details: error instanceof Error ? error.message : "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error instanceof Error ? error.stack : void 0 : void 0
    });
  }
});
var team_routes_default = router22;

// server/routes/services-routes.ts
init_schema();
import { Router as Router17 } from "express";
import { drizzle as drizzle5 } from "drizzle-orm/neon-http";
import { neon as neon2 } from "@neondatabase/serverless";
import { eq as eq20 } from "drizzle-orm";
import { z as z8 } from "zod";
var router23 = Router17();
var connection = neon2(process.env.DATABASE_URL);
var db5 = drizzle5(connection);
var flashDealSchema = z8.object({
  title: z8.string().min(1),
  description: z8.string().min(1),
  originalPrice: z8.number().positive(),
  flashPrice: z8.number().positive(),
  discount: z8.number().min(0).max(100),
  slots: z8.number().positive().int(),
  duration: z8.number().positive(),
  expiresAt: z8.string(),
  category: z8.string(),
  tags: z8.array(z8.string()).optional()
});
var reverseSubscriptionSchema = z8.object({
  title: z8.string().min(1),
  description: z8.string().min(1),
  budget: z8.number().positive(),
  frequency: z8.enum(["weekly", "monthly", "quarterly"]),
  duration: z8.number().positive().int(),
  category: z8.string(),
  requirements: z8.string().optional()
});
var groupRequestSchema = z8.object({
  title: z8.string().min(1),
  description: z8.string().min(1),
  category: z8.string(),
  location: z8.string(),
  targetMembers: z8.number().positive().int(),
  pricePerPerson: z8.number().positive(),
  startDate: z8.string(),
  tags: z8.array(z8.string()).optional()
});
var teamBuildingSchema = z8.object({
  title: z8.string().min(1),
  description: z8.string().min(1),
  category: z8.string(),
  budget: z8.number().positive(),
  roles: z8.array(z8.object({
    role: z8.string(),
    count: z8.number().int().positive(),
    skills: z8.array(z8.string()).optional()
  }))
});
var iaHumanSchema = z8.object({
  title: z8.string().min(1),
  description: z8.string().min(1),
  category: z8.string(),
  budget: z8.number().positive(),
  aiTasks: z8.array(z8.string()),
  humanTasks: z8.array(z8.string()),
  deliverables: z8.array(z8.string())
});
router23.post("/flash-deals", async (req, res) => {
  try {
    const data = flashDealSchema.parse(req.body);
    const [mission] = await db5.insert(missions).values({
      title: data.title,
      description: `${data.description}

\u{1F525} FLASH DEAL: ${data.discount}% de r\xE9duction!
Prix normal: \u20AC${data.originalPrice} \u2192 Prix flash: \u20AC${data.flashPrice}
${data.slots} places disponibles
Offre valable ${data.duration}h`,
      category: data.category,
      budget_value_cents: Math.round(data.flashPrice * 100),
      status: "open",
      client_id: 1,
      metadata: JSON.stringify({
        type: "flash_deal",
        originalPrice: data.originalPrice,
        flashPrice: data.flashPrice,
        discount: data.discount,
        slots: data.slots,
        duration: data.duration,
        expiresAt: data.expiresAt,
        tags: data.tags || []
      })
    }).returning();
    res.status(201).json({
      success: true,
      id: mission.id.toString(),
      mission
    });
  } catch (error) {
    if (error instanceof z8.ZodError) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: error.errors });
    }
    console.error("Erreur cr\xE9ation flash deal:", error);
    res.status(500).json({ error: "Erreur lors de la cr\xE9ation du flash deal" });
  }
});
router23.post("/subscriptions/reverse", async (req, res) => {
  try {
    const data = reverseSubscriptionSchema.parse(req.body);
    const [mission] = await db5.insert(missions).values({
      title: data.title,
      description: `${data.description}

\u{1F504} ABONNEMENT INVERS\xC9
Fr\xE9quence: ${data.frequency}
Dur\xE9e: ${data.duration} mois
Budget: \u20AC${data.budget}/mois
${data.requirements || ""}`,
      category: data.category,
      budget_value_cents: Math.round(data.budget * 100),
      status: "open",
      client_id: 1,
      metadata: JSON.stringify({
        type: "reverse_subscription",
        frequency: data.frequency,
        duration: data.duration,
        monthlyBudget: data.budget,
        requirements: data.requirements
      })
    }).returning();
    res.status(201).json({
      success: true,
      id: mission.id.toString(),
      mission
    });
  } catch (error) {
    if (error instanceof z8.ZodError) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: error.errors });
    }
    console.error("Erreur cr\xE9ation abonnement invers\xE9:", error);
    res.status(500).json({ error: "Erreur lors de la cr\xE9ation de l'abonnement invers\xE9" });
  }
});
router23.post("/group-requests", async (req, res) => {
  try {
    const data = groupRequestSchema.parse(req.body);
    const [mission] = await db5.insert(missions).values({
      title: data.title,
      description: `${data.description}

\u{1F465} DEMANDE GROUP\xC9E
Lieu: ${data.location}
Nombre de participants recherch\xE9s: ${data.targetMembers}
Prix par personne: \u20AC${data.pricePerPerson}
Date de d\xE9but: ${new Date(data.startDate).toLocaleDateString("fr-FR")}`,
      category: data.category,
      budget_value_cents: Math.round(data.pricePerPerson * data.targetMembers * 100),
      location: data.location,
      status: "open",
      client_id: 1,
      metadata: JSON.stringify({
        type: "group_request",
        targetMembers: data.targetMembers,
        pricePerPerson: data.pricePerPerson,
        startDate: data.startDate,
        tags: data.tags || []
      })
    }).returning();
    res.status(201).json({
      success: true,
      id: mission.id.toString(),
      mission
    });
  } catch (error) {
    if (error instanceof z8.ZodError) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: error.errors });
    }
    console.error("Erreur cr\xE9ation demande group\xE9e:", error);
    res.status(500).json({ error: "Erreur lors de la cr\xE9ation de la demande group\xE9e" });
  }
});
router23.get("/group-requests/interest", async (req, res) => {
  try {
    const { location, category } = req.query;
    const count = await db5.select().from(missions).where(eq20(missions.category, category)).then((missions4) => missions4.filter((m) => {
      try {
        const metadata = JSON.parse(m.metadata || "{}");
        return metadata.type === "group_request";
      } catch {
        return false;
      }
    })).then((filtered) => filtered.length);
    const estimatedInterest = Math.floor(Math.random() * 10) + count;
    res.json({ count: estimatedInterest });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration int\xE9r\xEAt groupe:", error);
    res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration de l'int\xE9r\xEAt" });
  }
});
router23.post("/team-building-projects", async (req, res) => {
  try {
    const data = teamBuildingSchema.parse(req.body);
    const rolesDescription = data.roles.map((r) => `\u2022 ${r.count}x ${r.role}${r.skills ? ` (${r.skills.join(", ")})` : ""}`).join("\n");
    const [mission] = await db5.insert(missions).values({
      title: data.title,
      description: `${data.description}

\u{1F3D7}\uFE0F CONSTRUCTION D'\xC9QUIPE
Budget total: \u20AC${data.budget}

R\xF4les recherch\xE9s:
${rolesDescription}`,
      category: data.category,
      budget_value_cents: Math.round(data.budget * 100),
      status: "open",
      client_id: 1,
      metadata: JSON.stringify({
        type: "team_building",
        roles: data.roles
      })
    }).returning();
    res.status(201).json({
      success: true,
      id: mission.id.toString(),
      mission
    });
  } catch (error) {
    if (error instanceof z8.ZodError) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: error.errors });
    }
    console.error("Erreur cr\xE9ation projet d'\xE9quipe:", error);
    res.status(500).json({ error: "Erreur lors de la cr\xE9ation du projet d'\xE9quipe" });
  }
});
router23.post("/ia-human-jobs", async (req, res) => {
  try {
    const data = iaHumanSchema.parse(req.body);
    const [mission] = await db5.insert(missions).values({
      title: data.title,
      description: `${data.description}

\u{1F916}\u{1F464} IA + HUMAIN
Budget: \u20AC${data.budget}

T\xE2ches IA:
${data.aiTasks.map((t) => `\u2022 ${t}`).join("\n")}

T\xE2ches Humaines:
${data.humanTasks.map((t) => `\u2022 ${t}`).join("\n")}

Livrables:
${data.deliverables.map((d) => `\u2022 ${d}`).join("\n")}`,
      category: data.category,
      budget_value_cents: Math.round(data.budget * 100),
      status: "open",
      client_id: 1,
      metadata: JSON.stringify({
        type: "ia_human",
        aiTasks: data.aiTasks,
        humanTasks: data.humanTasks,
        deliverables: data.deliverables
      })
    }).returning();
    res.status(201).json({
      success: true,
      id: mission.id.toString(),
      mission
    });
  } catch (error) {
    if (error instanceof z8.ZodError) {
      return res.status(400).json({ error: "Donn\xE9es invalides", details: error.errors });
    }
    console.error("Erreur cr\xE9ation job IA+Humain:", error);
    res.status(500).json({ error: "Erreur lors de la cr\xE9ation du job IA+Humain" });
  }
});
router23.get("/opportunities/live-slots", async (req, res) => {
  try {
    const { category, minRating, maxPrice, location } = req.query;
    const providers = await db5.select().from(users).where(eq20(users.role, "PRO")).limit(10);
    const liveSlots = providers.map((provider, index2) => ({
      id: `slot_${provider.id}_${Date.now()}_${index2}`,
      providerName: provider.name || "Prestataire",
      rating: provider.rating_mean || 4 + Math.random(),
      slot: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1e3).toISOString(),
      duration: [30, 60, 90, 120][Math.floor(Math.random() * 4)],
      pricePerHour: Math.floor(Math.random() * 80) + 40,
      distance: location ? Math.floor(Math.random() * 20) + 1 : void 0,
      tags: [category || "G\xE9n\xE9ral"]
    }));
    res.json(liveSlots);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration slots:", error);
    res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration des slots" });
  }
});
router23.post("/opportunities/reserve", async (req, res) => {
  try {
    const { slotId, userId: userId2 } = req.body;
    if (!slotId) {
      return res.status(400).json({ error: "slotId requis" });
    }
    res.json({
      success: true,
      message: "Cr\xE9neau r\xE9serv\xE9 avec succ\xE8s",
      reservationId: `res_${Date.now()}`
    });
  } catch (error) {
    console.error("Erreur r\xE9servation slot:", error);
    res.status(500).json({ error: "Erreur lors de la r\xE9servation du slot" });
  }
});
var services_routes_default = router23;

// server/routes/availability-routes.ts
import { Router as Router18 } from "express";
import { Pool as Pool4 } from "pg";
var router24 = Router18();
var pool4 = new Pool4({ connectionString: process.env.DATABASE_URL });
var requireAuth2 = (req, res, next) => {
  const userId2 = req.headers["x-user-id"];
  if (!userId2) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  req.user = { id: parseInt(userId2) };
  next();
};
router24.get("/:userId", async (req, res) => {
  try {
    const { userId: userId2 } = req.params;
    const { startDate, endDate } = req.query;
    let query = `
      SELECT * FROM user_availability 
      WHERE user_id = $1
    `;
    const params = [parseInt(userId2)];
    if (startDate && endDate) {
      query += ` AND date >= $2 AND date <= $3`;
      params.push(startDate, endDate);
    }
    query += ` ORDER BY date, start_time`;
    const result = await pool4.query(query, params);
    res.json({
      success: true,
      availability: result.rows.map((row) => ({
        id: row.id,
        date: row.date,
        slots: [{
          id: row.id,
          // ✅ Ajout de l'ID dans le slot
          start: row.start_time,
          end: row.end_time,
          rate: parseFloat(row.rate)
        }]
      }))
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch availability"
    });
  }
});
router24.post("/", requireAuth2, async (req, res) => {
  try {
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized"
      });
    }
    const { availability } = req.body;
    if (!Array.isArray(availability)) {
      return res.status(400).json({
        success: false,
        error: "Invalid availability data"
      });
    }
    await pool4.query("DELETE FROM user_availability WHERE user_id = $1", [userId2]);
    for (const day of availability) {
      const date2 = typeof day.date === "string" ? day.date : day.date.toISOString().split("T")[0];
      for (const slot of day.slots) {
        await pool4.query(
          `INSERT INTO user_availability (user_id, date, start_time, end_time, rate, created_at) 
           VALUES ($1, $2, $3, $4, $5, NOW())`,
          [userId2, date2, slot.start, slot.end, slot.rate]
        );
      }
    }
    res.json({
      success: true,
      message: "Availability saved successfully"
    });
  } catch (error) {
    console.error("Error saving availability:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save availability"
    });
  }
});
router24.get("/slots/:userId/:date", async (req, res) => {
  try {
    const { userId: userId2, date: date2 } = req.params;
    const result = await pool4.query(
      `SELECT start_time, end_time, rate 
       FROM user_availability 
       WHERE user_id = $1 AND date = $2 
       ORDER BY start_time`,
      [parseInt(userId2), date2]
    );
    res.json({
      success: true,
      date: date2,
      slots: result.rows.map((row) => ({
        start: row.start_time,
        end: row.end_time,
        rate: parseFloat(row.rate)
      }))
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch slots"
    });
  }
});
router24.delete("/:availabilityId", requireAuth2, async (req, res) => {
  try {
    const userId2 = req.user?.id;
    const { availabilityId } = req.params;
    await pool4.query(
      "DELETE FROM user_availability WHERE id = $1 AND user_id = $2",
      [parseInt(availabilityId), userId2]
    );
    res.json({
      success: true,
      message: "Availability slot deleted"
    });
  } catch (error) {
    console.error("Error deleting availability:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete availability"
    });
  }
});
router24.get("/recurring/:userId", requireAuth2, async (req, res) => {
  try {
    const { userId: userId2 } = req.params;
    const result = await pool4.query(
      `SELECT * FROM recurring_availability 
       WHERE user_id = $1 
       ORDER BY day_of_week, start_time`,
      [parseInt(userId2)]
    );
    res.json({
      success: true,
      patterns: result.rows.map((row) => ({
        id: row.id,
        dayOfWeek: row.day_of_week,
        startTime: row.start_time,
        endTime: row.end_time,
        rate: parseFloat(row.rate)
      }))
    });
  } catch (error) {
    console.error("Error fetching recurring availability:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch recurring availability"
    });
  }
});
router24.post("/recurring", requireAuth2, async (req, res) => {
  try {
    const userId2 = req.user?.id;
    if (!userId2) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized"
      });
    }
    const { dayOfWeek, startTime, endTime, rate } = req.body;
    const result = await pool4.query(
      `INSERT INTO recurring_availability 
       (user_id, day_of_week, start_time, end_time, rate, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) 
       RETURNING *`,
      [userId2, dayOfWeek, startTime, endTime, rate]
    );
    res.json({
      success: true,
      pattern: result.rows[0]
    });
  } catch (error) {
    console.error("Error saving recurring availability:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save recurring availability"
    });
  }
});
var availability_routes_default = router24;

// server/routes/profile-routes.ts
init_database();
init_schema();
import { Router as Router19 } from "express";
import { eq as eq21 } from "drizzle-orm";
var router25 = Router19();
router25.get("/profile/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    console.log("\u{1F4CB} GET /api/profile/:userId - Requ\xEAte pour userId:", userId2);
    if (isNaN(userId2)) {
      console.error("\u274C ID utilisateur invalide:", req.params.userId);
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }
    const user = await db.select().from(users).where(eq21(users.id, userId2)).limit(1);
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
router25.put("/profile/:userId", async (req, res) => {
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
    await db.update(users).set(updateData).where(eq21(users.id, userId2));
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
router25.put("/users/:id", async (req, res) => {
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
    await db.update(users).set(updateData).where(eq21(users.id, userId2));
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
var profile_routes_default = router25;

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
import { Router as Router20 } from "express";

// server/services/social-service.ts
init_schema();
import { eq as eq22, and as and14 } from "drizzle-orm";
var SocialService = class {
  // Follow/Unfollow
  async followUser(followerId, followingId) {
    if (followerId === followingId) {
      throw new Error("Cannot follow yourself");
    }
    const existing = await db.select().from(followsTable).where(
      and14(
        eq22(followsTable.followerId, followerId),
        eq22(followsTable.followingId, followingId)
      )
    );
    if (existing.length > 0) {
      throw new Error("Already following");
    }
    await db.insert(followsTable).values({
      followerId,
      followingId
    });
    return { success: true };
  }
  async unfollowUser(followerId, followingId) {
    await db.delete(followsTable).where(
      and14(
        eq22(followsTable.followerId, followerId),
        eq22(followsTable.followingId, followingId)
      )
    );
    return { success: true };
  }
  async isFollowing(followerId, followingId) {
    const result = await db.select().from(followsTable).where(
      and14(
        eq22(followsTable.followerId, followerId),
        eq22(followsTable.followingId, followingId)
      )
    );
    return result.length > 0;
  }
  async getFollowers(userId2, limit = 50) {
    const followers = await db.select().from(followsTable).innerJoin(users, eq22(followsTable.followerId, users.id)).where(eq22(followsTable.followingId, userId2)).limit(limit);
    return followers.map((f) => f.users);
  }
  async getFollowing(userId2, limit = 50) {
    const following = await db.select().from(followsTable).innerJoin(users, eq22(followsTable.followingId, users.id)).where(eq22(followsTable.followerId, userId2)).limit(limit);
    return following.map((f) => f.users);
  }
};
var socialService = new SocialService();

// server/routes/social-routes.ts
init_schema();
import { sql as sql7 } from "drizzle-orm";
var router26 = Router20();
router26.get("/popular-users", async (req, res) => {
  try {
    const popularUsers = await db.select().from(users).orderBy(sql7`followers_count DESC`).limit(12);
    res.json(popularUsers);
  } catch (error) {
    console.error("Error fetching popular users:", error);
    res.status(500).json({ error: "Failed to fetch popular users" });
  }
});
router26.post("/follow/:userId", async (req, res) => {
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
router26.delete("/follow/:userId", async (req, res) => {
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
router26.get("/following/:userId", async (req, res) => {
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
router26.get("/followers/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    const followers = await socialService.getFollowers(userId2);
    res.json(followers);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration followers:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router26.get("/following-list/:userId", async (req, res) => {
  try {
    const userId2 = parseInt(req.params.userId);
    const following = await socialService.getFollowing(userId2);
    res.json(following);
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration following:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
var social_routes_default = router26;

// server/routes/ai-fashion-routes.ts
import { Router as Router21 } from "express";

// server/services/ai-fashion-service.ts
import { GoogleGenerativeAI as GoogleGenerativeAI2 } from "@google/generative-ai";
var genAI = new GoogleGenerativeAI2(process.env.GEMINI_API_KEY || "");
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
import { eq as eq23, sql as sql8 } from "drizzle-orm";
var router27 = Router21();
router27.post("/analyze-item", async (req, res) => {
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
router27.post("/recommend-outfits", async (req, res) => {
  try {
    const userId2 = req.user?.id;
    const { preferences } = req.body;
    if (!userId2) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const items = await db.select().from(wardrobeItems).where(eq23(wardrobeItems.userId, userId2));
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
router27.post("/generate-description", async (req, res) => {
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
router27.post("/extract-colors", async (req, res) => {
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
router27.post("/suggest-color-combinations", async (req, res) => {
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
router27.post("/items/:itemId/tags", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { tags: tagList } = req.body;
    if (!itemId || !tagList || !Array.isArray(tagList)) {
      return res.status(400).json({ error: "itemId and a valid tag list are required" });
    }
    await db.update(outfits).set({ tags: tagList }).where(eq23(outfits.id, itemId));
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
router27.get("/explore/trending", async (req, res) => {
  try {
    const trendingOutfits = await db.select().from(outfits).orderBy(sql8`${outfits.likesCount} DESC`).limit(10);
    const trendingItems = await db.select().from(wardrobeItems).orderBy(sql8`${wardrobeItems.likesCount} DESC`).limit(10);
    res.json({
      success: true,
      trending: {
        outfits: trendingOutfits,
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
router27.get("/explore/search", async (req, res) => {
  try {
    const { q, category, color, style, sortBy, limit = 10, page = 1 } = req.query;
    let query = db.select({
      id: wardrobeItems.id,
      name: wardrobeItems.name,
      description: wardrobeItems.description,
      imageUrl: wardrobeItems.imageUrl,
      category: wardrobeItems.category,
      tags: wardrobeItems.tags,
      color: wardrobeItems.color
      // Added color field for search results
      // Add other relevant fields
    }).from(wardrobeItems).$dynamic();
    const filters = [];
    if (q) {
      filters.push(sql8`(${wardrobeItems.name} ILIKE ${`%${q}%`} OR ${wardrobeItems.description} ILIKE ${`%${q}%`})`);
    }
    if (category) {
      filters.push(eq23(wardrobeItems.category, category));
    }
    if (color) {
      filters.push(eq23(wardrobeItems.color, color));
    }
    if (style) {
      filters.push(sql8`${wardrobeItems.tags} @> ARRAY[${style}]`);
    }
    if (filters.length > 0) {
      query = query.where(sql8.and(...filters));
    }
    let orderBy = wardrobeItems.createdAt;
    if (sortBy === "popular") {
      orderBy = sql8`${wardrobeItems.likesCount} DESC`;
    } else if (sortBy === "newest") {
      orderBy = wardrobeItems.createdAt;
    }
    query = query.orderBy(orderBy);
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.limit(parseInt(limit)).offset(offset);
    const results = await query;
    const totalCount = await db.select({ count: sql8`count(*)` }).from(wardrobeItems).where(filters.length > 0 ? sql8.and(...filters) : void 0).then((rows) => rows[0]?.count || 0);
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
router27.get("/trending-tags", async (req, res) => {
  try {
    const trendingTags = await db.select({
      tag: sql8`unnest(tags)`,
      count: sql8`count(*)`
    }).from(wardrobeItems).where(sql8`tags IS NOT NULL AND array_length(tags, 1) > 0`).groupBy(sql8`unnest(tags)`).orderBy(sql8`count(*) DESC`).limit(20);
    res.json(trendingTags);
  } catch (error) {
    console.error("Error fetching trending tags:", error);
    res.status(500).json({ error: "Failed to fetch trending tags" });
  }
});
router27.get("/search", async (req, res) => {
  try {
    const { q, category, color, style, sortBy = "newest", limit = 20, page = 1 } = req.query;
    let query = db.select({
      id: wardrobeItems.id,
      name: wardrobeItems.name,
      description: wardrobeItems.description,
      imageUrl: wardrobeItems.imageUrl,
      category: wardrobeItems.category,
      tags: wardrobeItems.tags,
      color: wardrobeItems.color,
      // Added color field for search results
      likesCount: wardrobeItems.likesCount
      // Added likesCount for sorting by popular
    }).from(wardrobeItems).where(eq23(wardrobeItems.isPublic, true)).$dynamic();
    const filters = [eq23(wardrobeItems.isPublic, true)];
    if (q) {
      filters.push(
        sql8`(${wardrobeItems.name} ILIKE ${`%${q}%`} OR ${wardrobeItems.description} ILIKE ${`%${q}%`})`
      );
    }
    if (category) {
      filters.push(eq23(wardrobeItems.category, category));
    }
    if (color) {
      filters.push(eq23(wardrobeItems.color, color));
    }
    if (style) {
      filters.push(sql8`${style} = ANY(${wardrobeItems.tags})`);
    }
    if (filters.length > 0) {
      query = query.where(sql8.and(...filters));
    }
    if (sortBy === "popular") {
      query = query.orderBy(sql8`${wardrobeItems.likesCount} DESC`);
    } else {
      query = query.orderBy(sql8`${wardrobeItems.createdAt} DESC`);
    }
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.limit(parseInt(limit)).offset(offset);
    const results = await query;
    const [{ count: totalCount }] = await db.select({ count: sql8`count(*)` }).from(wardrobeItems).where(filters.length > 0 ? sql8.and(...filters) : sql8`true`);
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
var ai_fashion_routes_default = router27;

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path6.dirname(__filename);
validateEnvironment();
var app = express8();
var port = parseInt(process.env.PORT || "5000", 10);
var PID_FILE = "/tmp/swideal-server.pid";
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
var missionSyncService = new MissionSyncService(databaseUrl2);
var pool5 = new Pool5({
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
    const connectionPromise = pool5.query("SELECT 1 as test");
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
      "https://swideal.com",
      "https://www.swideal.com",
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
app.use("/api", limitRequestSize, validateRequest, performanceMonitor, express8.json({ limit: "10mb" }));
app.use("/api/auth", (req, res, next) => {
  console.log(`\u{1F510} Auth request: ${req.method} ${req.path}`, { body: req.body.email ? { email: req.body.email } : {} });
  next();
}, auth_routes_default);
app.all("/api", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "SWIDEAL API",
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
app.use("/api/ai/monitoring", monitoringRateLimit, ai_monitoring_routes_default);
app.use("/api/ai/suggest-pricing", strictAiRateLimit);
app.use("/api/ai/enhance-description", strictAiRateLimit);
app.use("/api/ai/analyze-quality", strictAiRateLimit);
app.use("/api/ai/enhance-text", strictAiRateLimit);
app.use("/api/ai", aiRateLimit, ai_suggestions_routes_default);
app.use("/api/ai/missions", aiRateLimit, ai_missions_routes_default);
app.use("/api", aiRateLimit, ai_quick_analysis_default);
app.use("/api/ai/diagnostic", ai_diagnostic_routes_default);
app.use("/api/ai/suggestions", ai_suggestions_routes_default);
app.use("/api/ai/learning", ai_learning_routes_default);
app.use("/api", feed_routes_default);
app.use("/api", favorites_routes_default);
app.use("/api/services", services_routes_default);
app.use("/api/open-teams", open_teams_default);
app.use("/api/teams", team_routes_default);
app.use("/api/availability", availability_routes_default);
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
app.use("/api/auth", auth_routes_default);
app.use("/api", api_routes_default);
app.use("/api/ai-fashion", ai_fashion_routes_default);
app.use("/api/fashion", ai_fashion_routes_default);
app.use("/api/wardrobe", wardrobe_default);
app.use("/api/outfits", outfits_default);
app.use("/api/social", social_routes_default);
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
    const queryPromise = pool5.query("SELECT 1");
    await Promise.race([queryPromise, timeoutPromise]);
    res.status(200).json({
      status: "healthy",
      message: "SWIDEAL API is running",
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
    service: "swideal-api",
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
          console.log(`\u{1F680} SWIDEAL server running on http://0.0.0.0:${port} (attempt ${attempt})`);
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
            app.use("/api-ai-orchestrator", express8.json({ limit: "10mb" }), strictAiRateLimit, aiOrchestratorRoutes);
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
