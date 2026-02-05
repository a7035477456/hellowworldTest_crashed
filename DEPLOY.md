# Deploy (currentProject2 + origProject1 config)

## Ubuntu: febedev / febeprod

Set `cdcurrent` to this repo root (or your clone path on the server), then use the aliases below.

**One-time alias setup** (add to `~/.bashrc` on each webserver, e.g. xbox3–xbox7):

```bash
# Point to this project root (e.g. after git clone)
alias cdcurrent='cd ~/code/adaptCurrentToOrig/currentProject2'

alias feclean='cdcurrent; cd ./fe; sudo rm -rfv ./node_modules; sudo rm -rfv ./dist; sudo rm -rfv package-lock.json'
alias beclean='cdcurrent; cd ./be; rm -rf node_modules; rm -rf package-lock.json'
alias resetpm2='clear; pm2 stop all; pm2 delete all'

alias cleancompilebuildfedev='feclean; cdcurrent && cd ./fe && npm i && npm run builddev'
alias cleancompileresetrunbedev='beclean; cdcurrent && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

alias febedev='cleancompilebuildfedev; cleancompileresetrunbedev'
```

**Production:**

```bash
alias cleancompilebuildfeprod='feclean; cdcurrent && cd ./fe && npm i && npm run buildprod'
alias cleancompileresetrunbeprod='beclean; cdcurrent && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'
alias febeprod='cleancompilebuildfeprod; cleancompileresetrunbeprod'
```

**Flow:** Pull code → `febedev` (or `febeprod`) → app runs under PM2 on port 40000. HAProxy on xbox2 load-balances vsingles.club to these backends.

## Frontend scripts

- `npm run builddev` and `npm run buildprod` both run `vite build` so the aliases work without changes.
- If your frontend uses **yarn**, run `yarn install` and `yarn build` (or add `builddev`/`buildprod` and use yarn in the aliases).

## Backend

- `npm run pm2:start` starts the API from `ecosystem.config.cjs` (2 instances, port 40000).
- Ensure `be/.env` exists (copy from `be/.env.example`) with DB and other vars per server.

## Verify (command line)

**On a webserver (e.g. xbox3) – backend on this host:**

```bash
curl -s http://localhost:40000/
# expect: {"status":"ok"}

curl -s http://localhost:40000/health
# expect: {"status":"ok"}
```

**From any machine – direct to a webserver (no HAProxy):**

```bash
curl -s http://192.168.222.203:40000/
curl -s http://192.168.222.204:40000/
# ... 205, 206, 207
```

**Through HAProxy / vsingles.club (HTTPS):**

```bash
curl -s https://vsingles.club/
# expect: {"status":"ok"} or HTML depending on HAProxy routing

curl -sI https://vsingles.club/
# check HTTP status (200, 301, etc.)
```

**PM2 on a webserver:**

```bash
pm2 list
pm2 logs
```
