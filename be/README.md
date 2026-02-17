# Vetted Singles API Server

Backend API server for the Vetted Singles application.

## Setup

1. Install dependencies:

```bash
npm install
```

1. Create a `.env` file at `~/.ssh/be/.env` (e.g. `/Users/a/.ssh/be/.env` on Mac) with your PostgreSQL database credentials, SMTP settings, and Twilio configuration:

```
DB_HOST=localhost
DB_PORT=50010
DB_NAME=vsingles
DB_USER=postgres
DB_PASSWORD=[fix me]
PORT=40000

# SMTP Configuration for sending registration emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NODE_ENV=development

# Twilio Configuration for sending SMS verification codes
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

**SMTP Setup (Gmail):**

- For Gmail, you need to use an App Password (not your regular password)
- Go to your Google Account settings → Security → 2-Step Verification → App passwords
- Generate an app password for "Mail" and use it as `SMTP_PASS`
- Use your Gmail address as `SMTP_USER`

**Twilio Setup (for SMS verification):**

1. **Create a Twilio Account:**
  - Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
  - Sign up for a free account (includes trial credits)
2. **Get Your Credentials:**
  - After signing up, go to the [Twilio Console Dashboard](https://console.twilio.com/)
  - Your **Account SID** and **Auth Token** are displayed on the dashboard
  - Copy these values to your `~/.ssh/be/.env` file:
    - `TWILIO_ACCOUNT_SID` = Your Account SID
    - `TWILIO_AUTH_TOKEN` = Your Auth Token
3. **Get a Phone Number:**
  - In the Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a number**
  - For trial accounts, you can use a Twilio trial number (free, but can only send to verified numbers)
  - For production, purchase a phone number
  - Copy the phone number (including the `+` and country code, e.g., `+1234567890`)
  - Add it to your `~/.ssh/be/.env` file as `TWILIO_PHONE_NUMBER`
4. **Trial Account Limitations:**
  - Trial accounts can only send SMS to verified phone numbers
  - To verify a number: Twilio Console → Phone Numbers → Verified Caller IDs → Add a new number
  - For production use, upgrade your account to remove this limitation

**Note:** If Twilio is not configured, the app will run in "mock mode" and log SMS messages to the console instead of sending them.

**Verify SMTP credentials (without changing app code):**

1. **Confirm which env the app uses**  
   The backend loads from `~/.ssh/be/.env`. Your shell’s `showenv` may show a different env. After a sign-up attempt, check app logs for `[SMTP] Using: SMTP_HOST=... SMTP_PORT=... SMTP_USER=... SMTP_PASS=jj****ii` to see exactly what the process is using.

2. **Test host and port** (no auth):
   ```bash
   openssl s_client -connect smtp.gmail.com:587 -starttls smtp -brief
   ```
   You should see a TLS handshake and connection; type `QUIT` and Enter to exit.

3. **Test full login (Gmail)**  
   From the machine where the app runs, run this from the **`be/`** directory. It loads `~/.ssh/be/.env` the same way the app does (via dotenv), so you don’t need to source the file in the shell:
   ```bash
   cd be
   node -e "
   const path = require('path');
   const os = require('os');
   require('dotenv').config({ path: path.join(os.homedir(), '.ssh', 'be', '.env') });
   const nodemailer = require('nodemailer');
   const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
   const host = process.env.SMTP_HOST || 'smtp.gmail.com';
   const port = process.env.SMTP_PORT || '587';
   const user = process.env.SMTP_USER || '';
   const mask = (p) => (p && p.length >= 4) ? p.slice(0,2) + '****' + p.slice(-2) : '(empty or short)';
   console.log('[SMTP] Using: SMTP_HOST=' + host + ' SMTP_PORT=' + port + ' SMTP_USER=' + user + ' SMTP_PASS=' + mask(pass));
   const t = nodemailer.createTransport({
     host: host,
     port: +port,
     secure: false,
     auth: { user: process.env.SMTP_USER, pass }
   });
   t.verify().then(() => console.log('SMTP OK')).catch(e => console.error('SMTP verify failed:', e.message));
   "
   ```
   If you see “Missing credentials for PLAIN”, the env file wasn’t loaded (check that `~/.ssh/be/.env` exists and has `SMTP_USER` and `SMTP_PASS`). If this fails with “Username and Password not accepted”, use a Gmail App Password (see [Google BadCredentials](https://support.google.com/mail/?p=BadCredentials)) and set it in `~/.ssh/be/.env` as `SMTP_PASS` (spaces optional; the app strips them).

4. **Gmail 535 / BadCredentials**  
   If you still get 535 after setting an App Password, ensure 2-Step Verification is on, the App Password is for “Mail”, and there are no typos or extra quotes in `~/.ssh/be/.env`. Restart the backend (e.g. `pm2 restart vsingles`) so it reloads the file.

1. Set up the database:
  - Create a PostgreSQL database (if not already created)
  - Run the schema file to create the table:
   Or if using a different database name:
2. (Optional) Seed the database with sample data:

```bash
npm run seed
```

1. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

- `GET /api/allSingles` - Get all singles from the database
- `GET /health` - Health check endpoint

## Database Schema

The server expects a `singles` table with the following columns:

- `id` (integer)
- `firstname` (varchar)
- `job_title` (varchar)
- `description` (text)
- `email` (varchar)
- `phone` (varchar)
- `location` (varchar)
- `profile_image_url` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

