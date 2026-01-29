# Vetted Singles API Server

Backend API server for the Vetted Singles application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `be` directory with your PostgreSQL database credentials, SMTP settings, and Twilio configuration:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
PORT=4000

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
   - Copy these values to your `.env` file:
     - `TWILIO_ACCOUNT_SID` = Your Account SID
     - `TWILIO_AUTH_TOKEN` = Your Auth Token

3. **Get a Phone Number:**
   - In the Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a number**
   - For trial accounts, you can use a Twilio trial number (free, but can only send to verified numbers)
   - For production, purchase a phone number
   - Copy the phone number (including the `+` and country code, e.g., `+1234567890`)
   - Add it to your `.env` file as `TWILIO_PHONE_NUMBER`

4. **Trial Account Limitations:**
   - Trial accounts can only send SMS to verified phone numbers
   - To verify a number: Twilio Console → Phone Numbers → Verified Caller IDs → Add a new number
   - For production use, upgrade your account to remove this limitation

**Note:** If Twilio is not configured, the app will run in "mock mode" and log SMS messages to the console instead of sending them.

3. Set up the database:
   - Create a PostgreSQL database (if not already created)
   - Run the schema file to create the table:
   ```bash
   psql -U postgres -d postgres -f db/schema.sql
   ```
   Or if using a different database name:
   ```bash
   psql -U your_user -d your_database -f db/schema.sql
   ```

4. (Optional) Seed the database with sample data:
```bash
npm run seed
```

5. Start the server:
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

