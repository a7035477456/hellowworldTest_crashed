/**
 * PM2 ecosystem config – run from repo root.
 * Usage: pm2 start ecosystem.config.cjs
 *
 * Single app: backend serves API and built frontend (fe/dist) on one port (PORT, default 4000).
 * Build fe before starting: cd fe && npm run build (set VITE_API_BASE_URL='' for same-origin).
 * HAProxy: point backends to :4000 on each server.
 */
module.exports = {
  apps: [
    {
      name: 'be',
      cwd: './be',
      script: 'server_be.js',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
};
