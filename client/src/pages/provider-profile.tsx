import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Page remplacée : affichage de tous les profils utilisateurs avec aperçu de leur garde-robe.
 * Utilise des données mock pour l'instant (si l'API existe, remplacer fetchProfiles par appel réel).
 */

const mockProfiles = [
  {
    id: '1',
    name: 'Alice Dupont',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
    bio: 'Amatrice de vintage et upcycling.',
    wardrobe: [
      'https://images.unsplash.com/photo-1520975698510-1d0aebd3b286?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514995669114-4f0b8b1d1f3a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542060748-1b5a0b7b1c1a?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Marc Lemaire',
    avatar: 'https://images.unsplash.com/photo-1545996124-1b1b8c8b1f5d?w=200&h=200&fit=crop&crop=faces',
    bio: 'Minimaliste, collection de manteaux.',
    wardrobe: [
      'https://images.unsplash.com/photo-1520975698510-1d0aebd3b286?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514995669114-4f0b8b1d1f3a?w=400&h=400&fit=crop',
    ]
  },
  {
    id: '3',
    name: 'Marie Leroy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    bio: 'Créatrice, adore mixer couleurs et textures.',
    wardrobe: [
      'https://images.unsplash.com/photo-1542060748-1b5a0b7b1c1a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1520975698510-1d0aebd3b286?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514995669114-4f0b8b1d1f3a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1520975698510-1d0aebd3b286?w=400&h=400&fit=crop'
    ]
  }
];

export default function ProvidersList() {
  const [q, setQ] = useState('');
  // TODO: replace by real fetch
  const profiles = mockProfiles.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profils & Garde-robes</h1>
        <Input placeholder="Rechercher un utilisateur..." value={q} onChange={e => setQ(e.target.value)} className="max-w-sm" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <Card key={profile.id} className="shadow-sm">
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p className="text-sm text-gray-600">{profile.bio}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {profile.wardrobe.slice(0,6).map((img, i) => (
                  <img key={i} src={img} alt={`wardrobe-${i}`} className="w-full h-24 object-cover rounded-md" />
                ))}
              </div>
              <div className="flex justify-between">
                <Button as={Link} to={`/profile?id=${profile.id}`}>Voir le profil</Button>
                <Button variant="ghost" onClick={() => alert('Fonction follow à implémenter')}>Suivre</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
