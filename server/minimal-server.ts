import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

// Middleware JSON
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fashion Social Network API' });
});

// Mode développement avec Vite
async function startDev() {
  try {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.resolve(__dirname, '../'),
    });
    
    app.use(vite.middlewares);
    
    app.listen(port, '0.0.0.0', () => {
      console.log(`✨ Fashion Social Network running on http://localhost:${port}`);
      console.log(`📱 Frontend: Vite dev server`);
      console.log(`💾 Storage: localStorage (mvpStore)`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startDev();
