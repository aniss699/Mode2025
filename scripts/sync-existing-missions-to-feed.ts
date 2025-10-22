import { db } from '../server/database.js';
import { missions, announcements } from '../shared/schema.js';
import { eq, inArray } from 'drizzle-orm';

async function syncExistingMissions() {
  console.log('🔄 Synchronisation des missions vers le feed...');

  try {
    // Récupérer toutes les missions actives (tous statuts sauf draft/cancelled)
    const allMissions = await db
      .select()
      .from(missions)
      .where(inArray(missions.status, ['open', 'published', 'in_progress']));

    console.log(`📊 ${allMissions.length} missions à synchroniser`);

    for (const mission of allMissions) {
      try {
        console.log(`🔄 Syncing mission ${mission.id}: ${mission.title} (team: ${mission.is_team_mission})`);
        
        // Préparer les données pour announcements (schéma simple)
        await db.insert(announcements).values({
          id: mission.id,
          title: mission.title,
          content: mission.description || '', // Utilise 'content' au lieu de 'description'
          type: 'info',
          priority: 1,
          is_active: true,
          status: 'active',
          category: mission.category || 'general',
          budget: mission.budget_value_cents,
          location: (mission.location_data as any)?.raw || 'Remote',
          user_id: mission.user_id,
          sponsored: false,
          created_at: mission.created_at,
          updated_at: mission.updated_at
        }).onConflictDoUpdate({
          target: [announcements.id],
          set: {
            title: mission.title,
            content: mission.description || '',
            category: mission.category || 'general',
            budget: mission.budget_value_cents,
            location: (mission.location_data as any)?.raw || 'Remote',
            updated_at: new Date()
          }
        });

        console.log(`✅ Mission ${mission.id} synchronisée: ${mission.title}`);
      } catch (error) {
        console.error(`❌ Erreur sync mission ${mission.id}:`, error);
      }
    }

    console.log('✅ Synchronisation terminée');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur globale:', error);
    process.exit(1);
  }
}

syncExistingMissions();