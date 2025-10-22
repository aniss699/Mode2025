
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface FashionItemAnalysis {
  suggestedTags: string[];
  detectedColors: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  season: string[];
  style: string[];
  material?: string;
}

export interface OutfitRecommendation {
  topItems: number[];
  bottomItems: number[];
  shoeItems: number[];
  accessoryItems: number[];
  reasoning: string;
  occasion: string;
  season: string;
}

export class AIFashionService {
  
  /**
   * Analyse une image de vêtement et génère des tags automatiques
   */
  async analyzeItemImage(imageUrl: string, userDescription?: string): Promise<FashionItemAnalysis> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `Analyse cette image de vêtement et fournis les informations suivantes au format JSON:
      - suggestedTags: array de tags pertinents (ex: ['casual', 'vintage', 'été'])
      - detectedColors: array de couleurs principales (ex: ['noir', 'blanc'])
      - category: catégorie principale ('top', 'bottom', 'shoes', 'accessory', 'outerwear')
      - subcategory: sous-catégorie (ex: 't-shirt', 'jeans', 'sneakers')
      - brand: marque si visible/identifiable
      - season: array de saisons appropriées (['spring', 'summer', 'fall', 'winter'])
      - style: array de styles (ex: ['streetwear', 'minimaliste', 'bohème'])
      - material: matière si identifiable (ex: 'denim', 'coton', 'cuir')
      
      ${userDescription ? `Description utilisateur: ${userDescription}` : ''}
      
      Réponds UNIQUEMENT avec un objet JSON valide, sans markdown.`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: await this.fetchImageAsBase64(imageUrl), mimeType: 'image/jpeg' } }
      ]);
      
      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid AI response format');
    } catch (error) {
      console.error('AI Fashion Analysis Error:', error);
      // Fallback basique
      return {
        suggestedTags: ['mode'],
        detectedColors: [],
        category: 'top',
        season: ['all-season'],
        style: ['casual']
      };
    }
  }

  /**
   * Recommande des associations de vêtements basées sur la garde-robe
   */
  async recommendOutfits(
    wardrobeItems: any[],
    preferences?: { occasion?: string; season?: string; style?: string }
  ): Promise<OutfitRecommendation[]> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const itemsDescription = wardrobeItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        subcategory: item.subcategory,
        colors: item.color,
        tags: item.tags,
        brand: item.brand
      }));

      const prompt = `Tu es un styliste professionnel. Analyse cette garde-robe et suggère 3 tenues complètes.
      
      Garde-robe disponible:
      ${JSON.stringify(itemsDescription, null, 2)}
      
      Préférences:
      ${preferences?.occasion ? `Occasion: ${preferences.occasion}` : ''}
      ${preferences?.season ? `Saison: ${preferences.season}` : ''}
      ${preferences?.style ? `Style: ${preferences.style}` : ''}
      
      Pour chaque tenue, fournis au format JSON:
      - topItems: array d'IDs pour les hauts
      - bottomItems: array d'IDs pour les bas
      - shoeItems: array d'IDs pour les chaussures
      - accessoryItems: array d'IDs pour les accessoires
      - reasoning: explication du choix
      - occasion: type d'occasion
      - season: saison appropriée
      
      Réponds avec un array JSON de 3 tenues, sans markdown.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
    } catch (error) {
      console.error('AI Outfit Recommendation Error:', error);
      return [];
    }
  }

  /**
   * Génère une description enrichie pour un item
   */
  async generateItemDescription(
    itemName: string,
    category: string,
    userNotes?: string
  ): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `Génère une description attrayante pour cet article de mode:
      
      Nom: ${itemName}
      Catégorie: ${category}
      ${userNotes ? `Notes utilisateur: ${userNotes}` : ''}
      
      La description doit être:
      - Inspirante et engageante
      - Maximum 150 caractères
      - Mettre en valeur le style et les occasions
      
      Réponds uniquement avec la description, sans guillemets.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().replace(/^["']|["']$/g, '');
    } catch (error) {
      console.error('AI Description Generation Error:', error);
      return itemName;
    }
  }

  /**
   * Analyse les couleurs dominantes d'une image
   */
  async extractDominantColors(imageUrl: string): Promise<string[]> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `Identifie les 3 couleurs dominantes de cette image.
      Réponds avec un array JSON de noms de couleurs en français (ex: ["noir", "blanc", "bleu marine"]).
      Réponds UNIQUEMENT avec l'array JSON, sans markdown.`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: await this.fetchImageAsBase64(imageUrl), mimeType: 'image/jpeg' } }
      ]);
      
      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
    } catch (error) {
      console.error('AI Color Extraction Error:', error);
      return [];
    }
  }

  /**
   * Suggestions d'association de couleurs
   */
  async suggestColorCombinations(baseColor: string): Promise<string[]> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `Pour la couleur de base "${baseColor}", suggère 5 couleurs qui s'associent bien en mode.
      Réponds avec un array JSON de noms de couleurs en français.
      Réponds UNIQUEMENT avec l'array JSON, sans markdown.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
    } catch (error) {
      console.error('AI Color Suggestion Error:', error);
      return [];
    }
  }

  private async fetchImageAsBase64(imageUrl: string): Promise<string> {
    // Si l'URL est déjà en base64
    if (imageUrl.startsWith('data:')) {
      return imageUrl.split(',')[1];
    }
    
    // Sinon, fetch l'image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
  }
}

export const aiFashionService = new AIFashionService();
