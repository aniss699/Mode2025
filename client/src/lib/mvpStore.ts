// Simple localStorage-backed store for MVP: profiles, articles, follows
export type Article = {
  id: string;
  userId: string;
  title: string;
  images: string[];
  isPublic?: boolean;
  createdAt: string;
  likes?: string[];
};

export type Profile = {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
};

const LS_KEY = "swideal_mvp_v1";

function readState(): { profiles: Profile[], articles: Article[], following: string[] } {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      const seed = seedState();
      localStorage.setItem(LS_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch (e) {
    const seed = seedState();
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
    return seed;
  }
}

function writeState(state: any) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function seedState() {
  const profiles: Profile[] = [
    { id: '1', name: 'Alice Dupont', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces', bio: 'Vintage lover' },
    { id: '2', name: 'Marc Lemaire', avatar: 'https://images.unsplash.com/photo-1545996124-1b1b8c8b1f5d?w=200&h=200&fit=crop&crop=faces', bio: 'Minimalist' },
    { id: 'me', name: 'Toi (moi)', avatar: '', bio: 'Mon dressing' }
  ];
  const articles: Article[] = [
    { id: 'a1', userId: '1', title: 'Veste en cuir', images: ['https://images.unsplash.com/photo-1520975698510-1d0aebd3b286?w=800&h=800&fit=crop'], isPublic: true, createdAt: new Date().toISOString(), likes: [] },
    { id: 'a2', userId: '2', title: 'Manteau long', images: ['https://images.unsplash.com/photo-1514995669114-4f0b8b1d1f3a?w=800&h=800&fit=crop'], isPublic: true, createdAt: new Date().toISOString(), likes: [] }
  ];
  return { profiles, articles, following: [] };
}

export const mvpStore = {
  getState() { return readState(); },
  getProfiles() { return readState().profiles; },
  getArticles() { return readState().articles; },
  addArticle(article: Article) {
    const s = readState();
    s.articles.unshift(article);
    writeState(s);
  },
  toggleLike(articleId: string, userId: string) {
    const s = readState();
    const a = s.articles.find((x: any) => x.id === articleId);
    if (!a) return;
    a.likes = a.likes || [];
    const idx = a.likes.indexOf(userId);
    if (idx === -1) a.likes.push(userId); else a.likes.splice(idx,1);
    writeState(s);
    return a;
  },
  addProfile(p: Profile) {
    const s = readState();
    s.profiles.push(p);
    writeState(s);
  },
  follow(userId: string) {
    const s = readState();
    if (!s.following.includes(userId)) s.following.push(userId);
    writeState(s);
  },
  unfollow(userId: string) {
    const s = readState();
    s.following = s.following.filter((id: string) => id !== userId);
    writeState(s);
  },
  getFollowing() { return readState().following; }
};
