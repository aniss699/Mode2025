import React, { useEffect, useState } from 'react';
import { mvpStore } from '@/lib/mvpStore';
import ArticleFormMVP from '@/components/ArticleFormMVP';
import { Button } from '@/components/ui/button';

/**
 * Simplified feed for MVP: uses localStorage-backed mvpStore.
 * Shows public articles, allows like, and allows current user to add article.
 */

export default function FeedPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);

  function refresh() {
    setArticles(mvpStore.getArticles().filter((a:any)=>a.isPublic));
    setProfiles(mvpStore.getProfiles());
  }

  useEffect(()=>{ refresh(); },[]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6 grid grid-cols-1 gap-4">
        <ArticleFormMVP onSaved={()=>refresh()} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Feed communautaire</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(a=>{
          const author = profiles.find((p:any)=>p.id===a.userId) || { name: 'Utilisateur', avatar: '' };
          return (
            <div key={a.id} className="bg-white rounded shadow-sm overflow-hidden">
              <img src={a.images?.[0]} alt={a.title} className="w-full h-56 object-cover" />
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">{author.name.split(' ').map((n:any)=>n[0]).join('')}</div>
                    <div>
                      <div className="font-medium">{author.name}</div>
                      <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" onClick={()=>{ mvpStore.toggleLike(a.id,'me'); setArticles(mvpStore.getArticles().filter((x:any)=>x.isPublic)); }}>
                      ❤️ {a.likes?.length||0}
                    </Button>
                  </div>
                </div>
                <div className="font-semibold">{a.title}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
