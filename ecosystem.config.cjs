module.exports = {
  apps: [
    {
      name: 'app',
      script: './build/index.js',
      instances: 4,
      exec_mode: 'cluster',
      node_args: '--env-file=.env',
      env: {
        HOST: '0.0.0.0',
        PORT: '4000'
      }
    }
  ],
  deploy: {
    production: {
      user: 'yasha',
      host: ['alienware.one'],
      ref: 'origin/main',
      repo: 'git@github.com:nisanov/math.git',
      path: '/var/www/math.alienware.one',
      'post-deploy': 'npm ci && npm run build && pm2 reload ecosystem.config.cjs'
    }
  }
};
