import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, X, Upload, Sparkles, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mvpStore } from '@/lib/mvpStore';

// Catégories disponibles
const CATEGORIES = [
  { value: 'top', label: 'Haut', subcategories: ['T-shirt', 'Chemise', 'Pull', 'Sweat', 'Débardeur', 'Gilet'] },
  { value: 'bottom', label: 'Bas', subcategories: ['Jean', 'Pantalon', 'Short', 'Jupe', 'Legging'] },
  { value: 'dress', label: 'Robe', subcategories: ['Robe courte', 'Robe longue', 'Robe midi'] },
  { value: 'outerwear', label: 'Veste', subcategories: ['Blouson', 'Manteau', 'Parka', 'Blazer', 'Veste en jean'] },
  { value: 'shoes', label: 'Chaussures', subcategories: ['Baskets', 'Bottes', 'Sandales', 'Escarpins', 'Mocassins'] },
  { value: 'accessory', label: 'Accessoire', subcategories: ['Sac', 'Ceinture', 'Écharpe', 'Chapeau', 'Bijoux'] },
];

const SEASONS = ['Printemps', 'Été', 'Automne', 'Hiver', 'Toutes saisons'];
const OCCASIONS = ['Décontracté', 'Formel', 'Sport', 'Soirée', 'Travail'];
const COLORS = [
  { name: 'Noir', hex: '#000000' },
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Gris', hex: '#808080' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Marron', hex: '#8B4513' },
  { name: 'Rouge', hex: '#FF0000' },
  { name: 'Rose', hex: '#FFC0CB' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Jaune', hex: '#FFFF00' },
  { name: 'Vert', hex: '#008000' },
  { name: 'Bleu', hex: '#0000FF' },
  { name: 'Violet', hex: '#800080' },
];

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

interface AddClothingFormProps {
  onSaved?: () => void;
  onCancel?: () => void;
}

export default function AddClothingForm({ onSaved, onCancel }: AddClothingFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [season, setSeason] = useState('');
  const [occasion, setOccasion] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const selectedCategory = CATEGORIES.find(cat => cat.value === category);

  const handleFileChange = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 images
    
    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string].slice(0, 5));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "Photo requise",
        description: "Veuillez ajouter au moins une photo de votre vêtement",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Titre requis",
        description: "Veuillez donner un titre à votre vêtement",
        variant: "destructive",
      });
      return;
    }

    // Create the article
    const article = {
      id: uuid(),
      userId: 'me',
      title: title.trim(),
      description: description.trim() || null,
      images: previews,
      category: category || 'other',
      subCategory: subCategory || null,
      brand: brand.trim() || null,
      color: color || null,
      size: size.trim() || null,
      season: season || null,
      occasion: occasion || null,
      tags,
      isPublic: true,
      createdAt: new Date().toISOString(),
      likes: []
    };

    mvpStore.addArticle(article);
    
    toast({
      title: "✨ Vêtement ajouté !",
      description: "Votre article a été ajouté à votre dressing",
    });

    if (onSaved) {
      onSaved();
    }
  };

  const canGoToStep2 = files.length > 0;
  const canGoToStep3 = canGoToStep2 && title.trim().length > 0 && category;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step >= s
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-1 mx-1 transition-all ${
                  step > s ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Photos */}
      {step === 1 && (
        <div className="space-y-4" data-testid="step-photos">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Ajoutez des photos
            </h3>
            <p className="text-gray-600">Téléchargez jusqu'à 5 photos de votre vêtement</p>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-8 transition-all ${
              isDragging
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-300 hover:border-pink-400 bg-white'
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-pink-600" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Glissez vos photos ici
              </p>
              <p className="text-sm text-gray-500 mb-4">ou</p>
              <label className="cursor-pointer">
                <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all">
                  <Upload className="w-4 h-4 mr-2" />
                  Parcourir
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                  className="hidden"
                  data-testid="input-file-upload"
                />
              </label>
              <p className="text-xs text-gray-400 mt-4">PNG, JPG ou WEBP (max 5 Mo par image)</p>
            </div>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    data-testid={`button-remove-image-${index}`}
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  {index === 0 && (
                    <Badge className="absolute bottom-2 left-2 bg-pink-500">
                      Photo principale
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
                Annuler
              </Button>
            )}
            <Button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canGoToStep2}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              data-testid="button-next-step-1"
            >
              Continuer
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Basic Info */}
      {step === 2 && (
        <div className="space-y-4" data-testid="step-basic-info">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Informations principales
            </h3>
            <p className="text-gray-600">Décrivez votre vêtement</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre du vêtement *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Veste en jean vintage"
                className="mt-1"
                data-testid="input-title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre vêtement (matière, style, état...)"
                rows={3}
                className="mt-1"
                data-testid="textarea-description"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1" data-testid="select-category">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory && (
                <div>
                  <Label htmlFor="subCategory">Sous-catégorie</Label>
                  <Select value={subCategory} onValueChange={setSubCategory}>
                    <SelectTrigger className="mt-1" data-testid="select-subcategory">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory.subcategories.map(sub => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marque</Label>
                <Input
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="ex: Levi's, Zara..."
                  className="mt-1"
                  data-testid="input-brand"
                />
              </div>

              <div>
                <Label htmlFor="size">Taille</Label>
                <Input
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="ex: M, 38, L..."
                  className="mt-1"
                  data-testid="input-size"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setStep(1)} data-testid="button-back-step-2">
              Retour
            </Button>
            <div className="flex gap-3">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Annuler
                </Button>
              )}
              <Button
                type="button"
                onClick={() => setStep(3)}
                disabled={!canGoToStep3}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                data-testid="button-next-step-2"
              >
                Continuer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div className="space-y-4" data-testid="step-details">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Détails et tags
            </h3>
            <p className="text-gray-600">Personnalisez votre article</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Couleur principale</Label>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 mt-2">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                      color === c.name ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    data-testid={`button-color-${c.name}`}
                  >
                    {color === c.name && (
                      <Check className="w-4 h-4 mx-auto text-white drop-shadow-lg" />
                    )}
                  </button>
                ))}
              </div>
              {color && <p className="text-sm text-gray-600 mt-2">Couleur sélectionnée: {color}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="season">Saison</Label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger className="mt-1" data-testid="select-season">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEASONS.map(s => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="mt-1" data-testid="select-occasion">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASIONS.map(o => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags personnalisés</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="ex: vintage, casual, streetwear..."
                  data-testid="input-tags"
                />
                <Button type="button" onClick={addTag} variant="outline" data-testid="button-add-tag">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-red-100"
                      onClick={() => removeTag(tag)}
                      data-testid={`badge-tag-${tag}`}
                    >
                      {tag} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setStep(2)} data-testid="button-back-step-3">
              Retour
            </Button>
            <div className="flex gap-3">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Annuler
                </Button>
              )}
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                data-testid="button-submit"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Ajouter à mon dressing
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
