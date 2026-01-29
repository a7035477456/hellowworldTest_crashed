# Deploy FE + BE to Ubuntu with PM2 (and HAProxy)

One PM2 app (backend) serves both the API and the built frontend on **one port** (default 4000). Each of your 6 webservers runs this single process; HAProxy load-balances across them.

---

## 1. Prerequisites on each Ubuntu server

```bash
# Node 18+ (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 globally
sudo npm install -g pm2

# Optional: PM2 startup so apps restart on reboot
pm2 startup
# Run the command it prints (sudo env PATH=...)
```

---

## 2. Clone and install (per server)

```bash
cd /var/www   # or your app directory
git clone <your-repo-url> hellowworldTest
cd hellowworldTest
```

**Backend**

```bash
cd be
npm i
cd ..
```

**Frontend** (use npm so PM2 and scripts match; or keep yarn and use `yarn` below)

```bash
cd fe
npm i
# or: yarn install
cd ..
```

---

## 3. Environment and build

### Backend `.env` (in `be/`)

Create `be/.env` with production values (DB, SMTP, Twilio, etc.):

```bash
# be/.env
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=vsingles
DB_USER=postgres
DB_PASSWORD=your-secure-password
PORT=4000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
TWILIO_ServiceSID=...
```

Do **not** commit `.env`; keep it only on servers.

### Frontend build (API URL)

The frontend calls the API using `VITE_API_BASE_URL` at **build time**. For same-port deployment (recommended), use an **empty** value so API requests go to the same origin:

```bash
cd fe
VITE_API_BASE_URL= npm run build
# or: VITE_API_BASE_URL= yarn build
cd ..
```

After build, `fe/dist` is served by the backend on the same port. If you use a separate API domain, set `VITE_API_BASE_URL=https://api.yourdomain.com` instead.

---

## 4. Run with PM2 (from repo root)

From the project root (where `ecosystem.config.cjs` lives):

```bash
cd /var/www/hellowworldTest
pm2 start ecosystem.config.cjs --env production
```

Check status:

```bash
pm2 status
pm2 logs
pm2 logs be --lines 50
```

- **App (FE + API)**: http://localhost:4000 (health: http://localhost:4000/health)

Useful PM2 commands:

```bash
pm2 restart all
pm2 restart be
pm2 stop all
pm2 delete all
```

---

## 5. HAProxy: load balance 6 webservers

Assumptions:

- One app on each server: **port 4000** (serves both frontend and API)
- Your 6 servers: `ws1.example.com` … `ws6.example.com` (or IPs)

Example HAProxy config (add to your existing `haproxy.cfg`):

```haproxy
frontend main
    bind *:80
    # or bind *:443 for HTTPS
    default_backend app_servers

backend app_servers
    balance roundrobin
    option httpchk GET /health
    http-check expect status 200
    server ws1 ws1.example.com:4000 check
    server ws2 ws2.example.com:4000 check
    server ws3 ws3.example.com:4000 check
    server ws4 ws4.example.com:4000 check
    server ws5 ws5.example.com:4000 check
    server ws6 ws6.example.com:4000 check
```

All traffic (pages and `/api/*`) goes to the same backend; the app serves static files and API from one port.

Reload HAProxy after editing:

```bash
sudo haproxy -c -f /etc/haproxy/haproxy.cfg
sudo systemctl reload haproxy
```

---

## 6. Deploy / update workflow (per server or all 6)

From your machine or a CI job, for each server:

```bash
ssh user@ws1.example.com "cd /var/www/hellowworldTest && git pull"
ssh user@ws1.example.com "cd /var/www/hellowworldTest/be && npm i"
ssh user@ws1.example.com "cd /var/www/hellowworldTest/fe && npm i && VITE_API_BASE_URL= npm run build"
ssh user@ws1.example.com "cd /var/www/hellowworldTest && pm2 restart all"
```

Repeat for `ws2` … `ws6`, or use a loop/Ansible.

---

## 7. Optional: deploy script on server

Save as `scripts/deploy.sh` in the repo (and `chmod +x scripts/deploy.sh`). Run from repo root after `git pull`:

```bash
#!/bin/bash
set -e
cd "$(dirname "$0")/.."
export VITE_API_BASE_URL="${VITE_API_BASE_URL:-}"

echo "Installing backend deps..."
(cd be && npm i)

echo "Installing frontend deps and building..."
(cd fe && npm i && npm run build)

echo "Restarting PM2..."
pm2 restart ecosystem.config.cjs --env production

echo "Done."
```

Usage on server:

```bash
./scripts/deploy.sh
# or, if using a separate API domain: VITE_API_BASE_URL=https://api.yourdomain.com ./scripts/deploy.sh
```

---

## Port summary

| App | Port | Purpose                          |
|-----|------|----------------------------------|
| be  | 4000 | API + built frontend (same port) |

HAProxy backends should point to port 4000 on each of the 6 webservers.
