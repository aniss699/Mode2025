import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mvpStore } from '@/lib/mvpStore';

// small uuid generator to avoid external dependency
function uuid() {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function ArticleFormMVP({ onSaved }: { onSaved?: (a:any)=>void }) {
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const currentUserId = 'me';

  async function handleSubmit(e:any) {
    e.preventDefault();
    // for MVP we simulate upload by using object URLs
    const images: string[] = [];
    for (const f of files) {
      const url = URL.createObjectURL(f);
      images.push(url);
    }
    const article = {
      id: uuid(),
      userId: currentUserId,
      title: title || 'Article sans titre',
      images,
      isPublic: true,
      createdAt: new Date().toISOString(),
      likes: []
    };
    mvpStore.addArticle(article);
    setTitle('');
    setFiles([]);
    if (onSaved) onSaved(article);
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 space-y-3 bg-white shadow-sm">
      <h3 className="font-semibold">Ajouter un article à ton dressing</h3>
      <Input placeholder="Titre (ex: Veste en jean)" value={title} onChange={e=>setTitle(e.target.value)} />
      <input type="file" accept="image/*" multiple onChange={e=>setFiles(Array.from(e.target.files||[]))} />
      <div className="flex space-x-2">
        <Button type="submit">Enregistrer</Button>
        <Button variant="ghost" onClick={()=>{ setTitle(''); setFiles([]); }}>Annuler</Button>
      </div>
    </form>
  );
}
