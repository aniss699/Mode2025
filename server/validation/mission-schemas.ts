import { z } from 'zod';

// Schema pour mission équipe (team requirements)
const teamRequirementSchema = z.object({
  profession: z.string(),
  description: z.string(),
  required_skills: z.array(z.string()),
  estimated_budget: z.number(),
  estimated_days: z.number(),
  min_experience: z.number(),
  is_lead_role: z.boolean(),
  importance: z.enum(['high', 'medium', 'low'])
});

// Schema simplifié pour création de mission
export const createSimpleMissionSchema = z.object({
  title: z.string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(500, "Le titre ne peut pas dépasser 500 caractères")
    .transform(str => str.trim()),

  description: z.string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(5000, "La description ne peut pas dépasser 5000 caractères")
    .transform(str => str.trim()),

  budget: z.union([
    z.number()
      .int("Le budget doit être un nombre entier")
      .positive("Le budget doit être positif")
      .min(10, "Budget minimum de 10€")
      .max(1000000, "Budget maximum de 1 000 000€"),
    z.string()
      .transform(val => parseInt(val.replace(/[^0-9]/g, ''), 10))
      .pipe(z.number().int().positive().min(10).max(1000000))
  ]),

  category: z.string().optional(),
  location: z.string().optional(),
  isTeamMode: z.boolean().default(false),
  teamRequirements: z.array(teamRequirementSchema).optional()
});

// Schema pour la validation des missions complètes
// ============================================
// SCHEMAS ZOD POUR VALIDATION SERVER-SIDE
// ============================================

// Schémas optimisés pour le nouveau schéma de base

// Schéma de localisation unifié
const locationDataSchema = z.object({
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

// Budget simplifié - une seule valeur obligatoire
const budgetSchema = z.object({
  value_cents: z.number().int().positive().min(1000, "Budget minimum de 10€").max(100000000, "Budget maximum de 1M€"),
  currency: z.enum(['EUR', 'USD', 'GBP', 'CHF']).default('EUR')
});

// ENUMs PostgreSQL
const statusEnum = z.enum(['draft', 'open', 'in_progress', 'completed', 'cancelled']);
const urgencyEnum = z.enum(['low', 'medium', 'high', 'urgent']);
const qualityTargetEnum = z.enum(['basic', 'standard', 'premium', 'luxury']);

// Location schema
const locationSchema = z.object({
  raw: z.string().optional(),
  city: z.string().min(1).optional(),
  postalCode: z.string().regex(/^\d{5}$/).optional(),
  country: z.string().default('France'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  remoteAllowed: z.boolean().default(true)
});

// Team schema
const teamSchema = z.object({
  isTeamMission: z.boolean().default(false),
  teamSize: z.number().int().positive().default(1)
}).refine(data => !data.isTeamMission || data.teamSize > 1, {
  message: "Une mission d'équipe doit avoir plus d'1 personne",
  path: ['teamSize']
});

// Schema principal pour POST /api/missions
export const createMissionSchema = z.object({
  // Contenu obligatoire
  title: z.string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(500, "Le titre ne peut pas dépasser 500 caractères")
    .transform(str => str.trim()),

  description: z.string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(5000, "La description ne peut pas dépasser 5000 caractères")
    .transform(str => str.trim()),

  // Catégorisation
  category: z.string()
    .min(1, "La catégorie est requise")
    .default('developpement'),

  tags: z.array(z.string().min(1))
    .max(10, "Maximum 10 tags")
    .default([])
    .transform(tags => tags.map(tag => tag.toLowerCase().trim())),

  skillsRequired: z.array(z.string().min(1))
    .max(15, "Maximum 15 compétences")
    .default([])
    .transform(skills => skills.map(skill => skill.trim())),

  // Budget obligatoire en euros
  budget: z.number()
    .int("Le budget doit être un nombre entier")
    .positive("Le budget doit être positif")
    .min(10, "Budget minimum de 10€")
    .max(1000000, "Budget maximum de 1 000 000€"),

  // Localisation
  location: locationSchema.optional(),

  // Équipe
  team: teamSchema.optional(),

  // Timing et urgence
  urgency: z.enum(['low', 'medium', 'high', 'urgent'])
    .default('medium'),

  deadline: z.string()
    .datetime("Format de date invalide")
    .optional()
    .transform(str => str ? new Date(str) : undefined),

  // Métadonnées
  requirements: z.string()
    .max(2000, "Les exigences ne peuvent pas dépasser 2000 caractères")
    .optional()
    .transform(str => str?.trim()),

  deliverables: z.array(z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional()
  })).max(20, "Maximum 20 livrables").default([]),

  // Status (draft par défaut, published si publié immédiatement)
  status: z.enum(['draft', 'published']).default('draft')
});

// Schema pour UPDATE /api/missions/:id
export const updateMissionSchema = createMissionSchema.partial().extend({
  id: z.number().int().positive()
});

// Schema pour les requêtes de recherche
export const searchMissionsSchema = z.object({
  query: z.string().min(1).optional(),
  category: z.string().optional(),
  budgetMin: z.number().int().positive().optional(),
  budgetMax: z.number().int().positive().optional(),
  location: z.string().optional(),
  remoteOnly: z.boolean().default(false),
  urgency: z.array(z.enum(['low', 'medium', 'high', 'urgent'])).optional(),
  tags: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  sortBy: z.enum(['recent', 'budget_asc', 'budget_desc', 'deadline']).default('recent'),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(20)
});

// Types dérivés
export type CreateMissionInput = z.infer<typeof createMissionSchema>;
export type UpdateMissionInput = z.infer<typeof updateMissionSchema>;
export type SearchMissionsInput = z.infer<typeof searchMissionsSchema>;
export type BudgetInput = z.infer<typeof budgetSchema>;
export type LocationInput = z.infer<typeof locationSchema>;
export type TeamInput = z.infer<typeof teamSchema>;

// Fonction utilitaire de validation
export function validateMissionInput(data: unknown): CreateMissionInput {
  return createMissionSchema.parse(data);
}

export function validateUpdateInput(data: unknown): UpdateMissionInput {
  return updateMissionSchema.parse(data);
}

export function validateSearchInput(data: unknown): SearchMissionsInput {
  return searchMissionsSchema.parse(data);
}