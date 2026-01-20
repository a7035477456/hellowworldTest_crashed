# Vetted Singles API Server

Backend API server for the Vetted Singles application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `server` directory with your PostgreSQL database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3005
```

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

