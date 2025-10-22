import React, { useEffect, useState } from 'react';
import ArticleFormMVP from '@/components/ArticleFormMVP';
import { mvpStore } from '@/lib/mvpStore';
import { Button } from '@/components/ui/button';

/**
 * Profile page: shows current user 'me' wardrobe and public view.
 */

export default function ProfilePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(()=>{
    const profiles = mvpStore.getProfiles();
    setProfile(profiles.find((p:any)=>p.id==='me') || { id: 'me', name: 'Toi', avatar: '' });
    setArticles(mvpStore.getArticles().filter((a:any)=>a.userId==='me'));
  },[]);

  function refresh() {
    setArticles(mvpStore.getArticles().filter((a:any)=>a.userId==='me'));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl">{profile?.name?.split(' ').map((n:any)=>n[0]).join('')}</div>
        <div>
          <h1 className="text-2xl font-semibold">{profile?.name}</h1>
          <p className="text-sm text-gray-600">{profile?.bio}</p>
        </div>
      </div>

      <div className="mb-6">
        <ArticleFormMVP onSaved={()=>refresh()} />
      </div>

      <h2 className="text-xl font-semibold mb-3">Mes articles</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(a=>(
          <div key={a.id} className="bg-white rounded shadow-sm overflow-hidden">
            <img src={a.images?.[0]} alt={a.title} className="w-full h-48 object-cover" />
            <div className="p-3">
              <div className="font-semibold">{a.title}</div>
              <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
