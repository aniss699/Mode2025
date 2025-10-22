import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
  jsonb,
  index,
  uniqueIndex,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

// Helper pour numeric
function numeric(name: string, config: { precision: number; scale: number }) {
  return decimal(name, config);
}

// ==========================================
// TABLES UTILISATEURS ET PROFILS
// ==========================================

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  username: text('username').unique(), // Nom d'utilisateur unique pour le réseau social
  avatar_url: text('avatar_url'),
  bio: text('bio'),
  
  // Style et préférences mode
  style_tags: text('style_tags').array().default([]), // ["minimalist", "vintage", "streetwear"]
  favorite_colors: text('favorite_colors').array().default([]),
  favorite_brands: text('favorite_brands').array().default([]),
  
  // Statistiques
  followers_count: integer('followers_count').default(0),
  following_count: integer('following_count').default(0),
  posts_count: integer('posts_count').default(0),
  
  // Paramètres
  is_private: boolean('is_private').default(false), // Profil privé
  is_verified: boolean('is_verified').default(false), // Badge vérifié
  
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ==========================================
// SYSTÈME DE FOLLOWS
// ==========================================

export const follows = pgTable('follows', {
  id: serial('id').primaryKey(),
  follower_id: integer('follower_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  following_id: integer('following_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  // Index unique pour éviter les doublons de follows
  uniqueFollow: unique().on(table.follower_id, table.following_id),
}));

// ==========================================
// ARTICLES DE MODE (DRESSING VIRTUEL)
// ==========================================

export const fashionItems = pgTable('fashion_items', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  // Informations de base
  title: text('title').notNull(),
  description: text('description'),
  
  // Images
  images: text('images').array().default([]), // URLs des images
  
  // Catégorisation
  category: text('category').notNull(), // "top", "bottom", "shoes", "accessory", "outerwear", "dress", "bag"
  sub_category: text('sub_category'), // "t-shirt", "jeans", "sneakers", etc.
  
  // Caractéristiques
  brand: text('brand'),
  color: text('color'),
  season: text('season'), // "spring", "summer", "fall", "winter", "all"
  occasion: text('occasion'), // "casual", "formal", "sport", "party"
  tags: text('tags').array().default([]),
  
  // Métadonnées
  purchase_date: timestamp('purchase_date'),
  price: integer('price'), // Prix en centimes
  size: text('size'),
  
  // Statistiques d'utilisation
  worn_count: integer('worn_count').default(0), // Nombre de fois porté dans des looks
  
  // Visibilité
  is_public: boolean('is_public').default(true),
  
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ==========================================
// LOOKS (TENUES COMPLÈTES)
// ==========================================

export const looks = pgTable('looks', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  // Contenu
  title: text('title').notNull(),
  description: text('description'),
  cover_image: text('cover_image'), // Image principale du look
  
  // Catégorisation
  style_tags: text('style_tags').array().default([]), // ["casual", "chic", "streetwear"]
  occasion: text('occasion'), // "daily", "work", "party", "date", "sport"
  season: text('season'), // "spring", "summer", "fall", "winter"
  
  // Statistiques d'engagement
  likes_count: integer('likes_count').default(0),
  comments_count: integer('comments_count').default(0),
  saves_count: integer('saves_count').default(0),
  views_count: integer('views_count').default(0),
  
  // Algorithme feed
  engagement_score: decimal('engagement_score', { precision: 5, scale: 2 }).default('0.0'),
  
  // Visibilité
  is_public: boolean('is_public').default(true),
  is_featured: boolean('is_featured').default(false), // Mis en avant par la plateforme
  
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ==========================================
// LIAISON LOOKS <-> ARTICLES
// ==========================================

export const lookItems = pgTable('look_items', {
  id: serial('id').primaryKey(),
  look_id: integer('look_id').references(() => looks.id, { onDelete: 'cascade' }).notNull(),
  fashion_item_id: integer('fashion_item_id').references(() => fashionItems.id, { onDelete: 'cascade' }).notNull(),
  position: integer('position').default(0), // Ordre d'affichage
  created_at: timestamp('created_at').defaultNow(),
});

// ==========================================
// COLLECTIONS (BOARDS PINTEREST-STYLE)
// ==========================================

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  title: text('title').notNull(),
  description: text('description'),
  cover_image: text('cover_image'),
  
  // Visibilité
  is_public: boolean('is_public').default(true),
  
  // Statistiques
  looks_count: integer('looks_count').default(0),
  followers_count: integer('followers_count').default(0),
  
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ==========================================
// LOOKS DANS LES COLLECTIONS
// ==========================================

export const collectionLooks = pgTable('collection_looks', {
  id: serial('id').primaryKey(),
  collection_id: integer('collection_id').references(() => collections.id, { onDelete: 'cascade' }).notNull(),
  look_id: integer('look_id').references(() => looks.id, { onDelete: 'cascade' }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  uniqueCollectionLook: unique().on(table.collection_id, table.look_id),
}));

// ==========================================
// LIKES SUR LES LOOKS
// ==========================================

export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  look_id: integer('look_id').references(() => looks.id, { onDelete: 'cascade' }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  uniqueLike: unique().on(table.user_id, table.look_id),
}));

// ==========================================
// COMMENTAIRES SUR LES LOOKS
// ==========================================

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  look_id: integer('look_id').references(() => looks.id, { onDelete: 'cascade' }).notNull(),
  
  content: text('content').notNull(),
  parent_id: integer('parent_id').references((): any => comments.id, { onDelete: 'cascade' }), // Pour les réponses
  
  likes_count: integer('likes_count').default(0),
  
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ==========================================
// SAUVEGARDES/FAVORIS DE LOOKS
// ==========================================

export const savedLooks = pgTable('saved_looks', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  look_id: integer('look_id').references(() => looks.id, { onDelete: 'cascade' }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => ({
  uniqueSave: unique().on(table.user_id, table.look_id),
}));

// ==========================================
// NOTIFICATIONS
// ==========================================

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  type: text('type').notNull(), // 'like', 'comment', 'follow', 'mention'
  title: text('title').notNull(),
  message: text('message').notNull(),
  link: text('link'), // URL de redirection
  
  // Acteur de la notification
  actor_id: integer('actor_id').references(() => users.id, { onDelete: 'cascade' }),
  actor_name: text('actor_name'),
  actor_avatar: text('actor_avatar'),
  
  // Métadonnées
  metadata: jsonb('metadata'),
  
  read_at: timestamp('read_at'),
  created_at: timestamp('created_at').defaultNow(),
});

// ==========================================
// MESSAGERIE
// ==========================================

export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  participant1_id: integer('participant1_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  participant2_id: integer('participant2_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  last_message_at: timestamp('last_message_at').defaultNow(),
  created_at: timestamp('created_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversation_id: integer('conversation_id').references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  sender_id: integer('sender_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  content: text('content').notNull(),
  message_type: text('message_type').$type<'text' | 'image' | 'look'>().default('text'),
  
  // Pour partager un look
  look_id: integer('look_id').references(() => looks.id),
  image_url: text('image_url'),
  
  read_at: timestamp('read_at'),
  created_at: timestamp('created_at').defaultNow(),
});

// ==========================================
// FICHIERS (POUR UPLOADS)
// ==========================================

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  filename: text('filename').notNull(),
  original_filename: text('original_filename').notNull(),
  file_type: text('file_type').notNull(), // mime type
  file_size: integer('file_size').notNull(), // en bytes
  file_url: text('file_url').notNull(),
  
  // Contexte d'utilisation
  context_type: text('context_type'), // 'fashion_item', 'look', 'avatar', 'message'
  context_id: integer('context_id'),
  
  metadata: jsonb('metadata'),
  created_at: timestamp('created_at').defaultNow(),
});

// ==========================================
// PARAMÈTRES UTILISATEUR
// ==========================================

export const userSettings = pgTable('user_settings', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  
  notifications: jsonb('notifications'), // Préférences de notifications
  privacy: jsonb('privacy'), // Paramètres de confidentialité
  appearance: jsonb('appearance'), // Thème, langue, etc.
  
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// ==========================================
// RELATIONS
// ==========================================

export const usersRelations = relations(users, ({ many }) => ({
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
  messages: many(messages),
}));

export const fashionItemsRelations = relations(fashionItems, ({ one, many }) => ({
  user: one(users, {
    fields: [fashionItems.user_id],
    references: [users.id]
  }),
  lookItems: many(lookItems),
}));

export const looksRelations = relations(looks, ({ one, many }) => ({
  user: one(users, {
    fields: [looks.user_id],
    references: [users.id]
  }),
  lookItems: many(lookItems),
  likes: many(likes),
  comments: many(comments),
  savedLooks: many(savedLooks),
  collectionLooks: many(collectionLooks),
}));

export const lookItemsRelations = relations(lookItems, ({ one }) => ({
  look: one(looks, {
    fields: [lookItems.look_id],
    references: [looks.id]
  }),
  fashionItem: one(fashionItems, {
    fields: [lookItems.fashion_item_id],
    references: [fashionItems.id]
  }),
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, {
    fields: [collections.user_id],
    references: [users.id]
  }),
  collectionLooks: many(collectionLooks),
}));

export const collectionLooksRelations = relations(collectionLooks, ({ one }) => ({
  collection: one(collections, {
    fields: [collectionLooks.collection_id],
    references: [collections.id]
  }),
  look: one(looks, {
    fields: [collectionLooks.look_id],
    references: [looks.id]
  }),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.user_id],
    references: [users.id]
  }),
  look: one(looks, {
    fields: [likes.look_id],
    references: [looks.id]
  }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
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
  replies: many(comments),
}));

export const savedLooksRelations = relations(savedLooks, ({ one }) => ({
  user: one(users, {
    fields: [savedLooks.user_id],
    references: [users.id]
  }),
  look: one(looks, {
    fields: [savedLooks.look_id],
    references: [looks.id]
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.follower_id],
    references: [users.id],
    relationName: "follower"
  }),
  following: one(users, {
    fields: [follows.following_id],
    references: [users.id],
    relationName: "following"
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.user_id],
    references: [users.id]
  }),
  actor: one(users, {
    fields: [notifications.actor_id],
    references: [users.id]
  }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
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

export const messagesRelations = relations(messages, ({ one }) => ({
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
  }),
}));

export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.user_id],
    references: [users.id]
  })
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.user_id],
    references: [users.id]
  })
}));

// ==========================================
// ZOD SCHEMAS POUR VALIDATION
// ==========================================

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
  updated_at: true,
  followers_count: true,
  following_count: true,
  posts_count: true,
});

export const insertFashionItemSchema = createInsertSchema(fashionItems).omit({
  id: true,
  created_at: true,
  updated_at: true,
  worn_count: true,
});

export const insertLookSchema = createInsertSchema(looks).omit({
  id: true,
  created_at: true,
  updated_at: true,
  likes_count: true,
  comments_count: true,
  saves_count: true,
  views_count: true,
  engagement_score: true,
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  created_at: true,
  updated_at: true,
  looks_count: true,
  followers_count: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  created_at: true,
  updated_at: true,
  likes_count: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  created_at: true,
});

// ==========================================
// TYPES TYPESCRIPT
// ==========================================

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type FashionItem = typeof fashionItems.$inferSelect;
export type InsertFashionItem = z.infer<typeof insertFashionItemSchema>;

export type Look = typeof looks.$inferSelect;
export type InsertLook = z.infer<typeof insertLookSchema>;

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type Like = typeof likes.$inferSelect;
export type Follow = typeof follows.$inferSelect;
export type SavedLook = typeof savedLooks.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type File = typeof files.$inferSelect;

// Types pour les vues enrichies
export type LookWithUser = Look & {
  user: User;
  items: (typeof lookItems.$inferSelect & { fashionItem: FashionItem })[];
  likesCount: number;
  commentsCount: number;
  isLikedByUser?: boolean;
  isSavedByUser?: boolean;
};

export type FashionItemWithUser = FashionItem & {
  user: User;
};

export type CollectionWithLooks = Collection & {
  user: User;
  looks: LookWithUser[];
};

// ==========================================
// ALIASES DE COMPATIBILITÉ TEMPORAIRE
// (Pour le code backend existant pendant la transition)
// ==========================================

// Ancien nom -> Nouveau nom
export const wardrobeItems = fashionItems;
export const missions = looks; // Les "missions" sont maintenant des "looks"
export const announcements = looks; // Les "announcements" sont maintenant des "looks"
export const bids = comments; // Les "bids" (offres) sont maintenant des "comments"
export const outfitsTable = looks; // Les "outfits" sont maintenant des "looks"
export const outfitLikesTable = likes; // Les "outfit likes" sont maintenant des "likes"
export const outfitCommentsTable = comments; // Les "outfit comments" sont maintenant des "comments"

// Types d'alias
export type WardrobeItem = FashionItem;
export type Mission = Look;
export type Announcement = Look;
export type Bid = Comment;
export type Outfit = Look;
