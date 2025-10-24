import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users, fashionItems, looks, collections, lookItems, collectionLooks } from '../shared/schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

// Catégories de vêtements
const categories = ['top', 'bottom', 'shoes', 'accessory', 'outerwear', 'dress'];
const subCategories = {
  top: ['t-shirt', 'chemise', 'pull', 'débardeur', 'crop-top', 'blouse'],
  bottom: ['jeans', 'pantalon', 'short', 'jupe', 'legging'],
  shoes: ['sneakers', 'bottes', 'sandales', 'talons', 'baskets'],
  accessory: ['sac', 'chapeau', 'écharpe', 'lunettes', 'bijoux', 'ceinture'],
  outerwear: ['veste', 'manteau', 'blouson', 'cardigan', 'parka'],
  dress: ['robe-courte', 'robe-longue', 'combinaison']
};

// Marques populaires
const brands = [
  'Zara', 'H&M', 'Mango', 'Uniqlo', 'COS', 'Massimo Dutti',
  'Nike', 'Adidas', 'Vans', 'Converse', 'New Balance',
  'Levi\'s', 'Diesel', 'Tommy Hilfiger', 'Calvin Klein',
  'Sezane', 'Ba&sh', 'Claudie Pierlot', 'Maje',
  'Vintage', 'Thrift', 'Local Brand'
];

// Couleurs
const colors = [
  '#000000', '#FFFFFF', '#808080', '#FF0000', '#0000FF', 
  '#008000', '#FFFF00', '#FFA500', '#800080', '#FFC0CB',
  '#A52A2A', '#F5F5DC', '#FFE4E1', '#E6E6FA', '#F0E68C'
];

// Tags de style
const styleTags = [
  'minimalist', 'vintage', 'streetwear', 'chic', 'casual',
  'bohemian', 'preppy', 'grunge', 'sporty', 'elegant',
  'edgy', 'romantic', 'modern', 'classic', 'trendy'
];

// Saisons
const seasons = ['spring', 'summer', 'fall', 'winter', 'all'];

// Occasions
const occasions = ['casual', 'formal', 'sport', 'party', 'work', 'date'];

// Images d'exemple (placeholder)
const sampleImages = [
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500',
  'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function seedWardrobe() {
  try {
    console.log('🌱 Début du peuplement de la base de données...');

    // Créer des utilisateurs de test
    const usernames = [
      { name: 'Sophie Martin', username: 'sophie_style', bio: 'Fashion lover & trendsetter 🌟', tags: ['minimalist', 'chic', 'elegant'] },
      { name: 'Lucas Dubois', username: 'lucas_streetwear', bio: 'Streetwear enthusiast 👟', tags: ['streetwear', 'casual', 'sporty'] },
      { name: 'Emma Laurent', username: 'emma_vintage', bio: 'Vintage vibes only ✨', tags: ['vintage', 'romantic', 'bohemian'] },
      { name: 'Thomas Bernard', username: 'thomas_minimal', bio: 'Less is more 🖤', tags: ['minimalist', 'modern', 'classic'] },
      { name: 'Léa Rousseau', username: 'lea_chic', bio: 'Chic parisienne 🇫🇷', tags: ['chic', 'elegant', 'romantic'] },
      { name: 'Hugo Moreau', username: 'hugo_urban', bio: 'Urban explorer 🏙️', tags: ['streetwear', 'edgy', 'trendy'] },
      { name: 'Chloé Petit', username: 'chloe_boho', bio: 'Bohemian soul 🌸', tags: ['bohemian', 'casual', 'romantic'] },
      { name: 'Nathan Simon', username: 'nathan_sport', bio: 'Athleisure addict 💪', tags: ['sporty', 'casual', 'modern'] }
    ];

    const createdUsers = [];
    
    for (const userData of usernames) {
      const email = `${userData.username}@fashionhub.com`;
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
      
      if (existingUser.length === 0) {
        const [user] = await db.insert(users).values({
          email,
          password: 'password123',
          name: userData.name,
          username: userData.username,
          bio: userData.bio,
          style_tags: userData.tags,
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
          is_verified: Math.random() > 0.5,
          role: 'CLIENT'
        }).returning();
        
        createdUsers.push(user);
        console.log(`✅ Utilisateur créé: ${user.name} (@${user.username})`);
      } else {
        createdUsers.push(existingUser[0]);
        console.log(`ℹ️ Utilisateur existant: ${userData.name} (@${userData.username})`);
      }
    }

    console.log(`\n📦 Création d'articles de mode pour ${createdUsers.length} utilisateurs...\n`);

    // Créer des articles de mode pour chaque utilisateur
    for (const user of createdUsers) {
      const itemCount = Math.floor(Math.random() * 15) + 10; // 10 à 25 items par utilisateur
      
      for (let i = 0; i < itemCount; i++) {
        const category = randomElement(categories);
        const subCategory = randomElement(subCategories[category as keyof typeof subCategories] || [category]);
        const brand = randomElement(brands);
        const color = randomElement(colors);
        const season = randomElement(seasons);
        const occasion = randomElement(occasions);
        const tags = randomElements(styleTags, Math.floor(Math.random() * 3) + 1);
        
        await db.insert(fashionItems).values({
          user_id: user.id,
          title: `${brand} ${subCategory}`,
          description: `Beautiful ${subCategory} perfect for ${occasion} occasions`,
          images: [randomElement(sampleImages)],
          category,
          sub_category: subCategory,
          brand,
          color,
          season,
          occasion,
          tags,
          size: randomElement(['XS', 'S', 'M', 'L', 'XL']),
          price: Math.floor(Math.random() * 20000) + 2000, // 20€ à 200€
          is_public: Math.random() > 0.2, // 80% publics
          worn_count: Math.floor(Math.random() * 10)
        });
      }
      
      console.log(`✅ ${itemCount} articles créés pour ${user.name}`);
    }

    console.log(`\n👗 Création de looks...\n`);

    // Créer des looks pour certains utilisateurs
    for (const user of createdUsers) {
      const userItems = await db.select().from(fashionItems).where(eq(fashionItems.user_id, user.id));
      
      if (userItems.length < 3) continue; // Besoin d'au moins 3 items pour un look
      
      const lookCount = Math.floor(Math.random() * 5) + 2; // 2 à 7 looks par utilisateur
      
      for (let i = 0; i < lookCount; i++) {
        const lookTags = randomElements(styleTags, Math.floor(Math.random() * 3) + 1);
        const occasion = randomElement(occasions);
        const season = randomElement(seasons);
        
        const [look] = await db.insert(looks).values({
          user_id: user.id,
          title: `${randomElement(['Mon look', 'Tenue', 'Outfit', 'Style'])} ${occasion}`,
          description: `Perfect outfit for ${occasion} occasions in ${season}`,
          cover_image: randomElement(sampleImages),
          style_tags: lookTags,
          occasion,
          season,
          is_public: Math.random() > 0.1, // 90% publics
          likes_count: Math.floor(Math.random() * 100),
          comments_count: Math.floor(Math.random() * 20),
          saves_count: Math.floor(Math.random() * 50),
          views_count: Math.floor(Math.random() * 500)
        }).returning();
        
        // Ajouter 3 à 5 items au look
        const itemsForLook = randomElements(userItems, Math.floor(Math.random() * 3) + 3);
        
        for (let j = 0; j < itemsForLook.length; j++) {
          await db.insert(lookItems).values({
            look_id: look.id,
            fashion_item_id: itemsForLook[j].id,
            position: j
          });
        }
      }
      
      console.log(`✅ ${lookCount} looks créés pour ${user.name}`);
    }

    console.log(`\n📚 Création de collections...\n`);

    // Créer des collections pour certains utilisateurs
    for (const user of createdUsers.slice(0, 5)) { // Seulement 5 premiers utilisateurs
      const userLooks = await db.select().from(looks).where(eq(looks.user_id, user.id));
      
      if (userLooks.length < 2) continue;
      
      const collectionCount = Math.floor(Math.random() * 3) + 1; // 1 à 3 collections
      
      for (let i = 0; i < collectionCount; i++) {
        const [collection] = await db.insert(collections).values({
          user_id: user.id,
          title: randomElement([
            'Summer Vibes', 'Winter Essentials', 'Party Ready',
            'Work Outfits', 'Casual Days', 'Date Night',
            'Weekend Style', 'Vacation Mode', 'Cozy Season'
          ]),
          description: 'My favorite looks collection',
          cover_image: randomElement(sampleImages),
          is_public: true,
          looks_count: 0
        }).returning();
        
        // Ajouter des looks à la collection
        const looksForCollection = randomElements(userLooks, Math.min(userLooks.length, Math.floor(Math.random() * 4) + 2));
        
        for (const look of looksForCollection) {
          await db.insert(collectionLooks).values({
            collection_id: collection.id,
            look_id: look.id
          });
        }
        
        // Mettre à jour le compteur de looks
        await db.update(collections)
          .set({ looks_count: looksForCollection.length })
          .where(eq(collections.id, collection.id));
      }
      
      console.log(`✅ ${collectionCount} collections créées pour ${user.name}`);
    }

    // Mettre à jour les compteurs de posts pour chaque utilisateur
    for (const user of createdUsers) {
      const userLooks = await db.select().from(looks).where(eq(looks.user_id, user.id));
      
      await db.update(users)
        .set({ 
          posts_count: userLooks.length,
          followers_count: Math.floor(Math.random() * 500) + 50,
          following_count: Math.floor(Math.random() * 300) + 20
        })
        .where(eq(users.id, user.id));
    }

    console.log('\n✅ Base de données peuplée avec succès !');
    console.log(`\n📊 Résumé:`);
    console.log(`   - ${createdUsers.length} utilisateurs`);
    
    const totalItems = await db.select().from(fashionItems);
    console.log(`   - ${totalItems.length} articles de mode`);
    
    const totalLooks = await db.select().from(looks);
    console.log(`   - ${totalLooks.length} looks`);
    
    const totalCollections = await db.select().from(collections);
    console.log(`   - ${totalCollections.length} collections`);
    
    console.log('\n🎉 Vous pouvez maintenant tester l\'application !');

  } catch (error) {
    console.error('❌ Erreur lors du peuplement:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedWardrobe();
