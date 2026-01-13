import pool from './connection.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedData = [
  {
    name: "Phoebe",
    job_title: "Dynamic Operations Officer",
    description: "Experienced operations professional with a track record of driving efficiency and excellence.",
    email: "claudia_kuhn@yahoo.com",
    phone: "380-293-0177",
    location: "Port Narcos",
    profile_image_url: "user-round.svg"
  },
  {
    name: "Gaetano",
    job_title: "Investor Division Strategist",
    description: "Strategic thinker specializing in investment analysis and portfolio optimization.",
    email: "alia_shields25@yahoo.com",
    phone: "253-418-5940",
    location: "Herminahaven",
    profile_image_url: "user-round.svg"
  },
  {
    name: "Elisabeth",
    job_title: "Future Markets Associate",
    description: "Forward-looking professional focused on emerging market trends and opportunities.",
    email: "kieran.mertz87@hotmail.com",
    phone: "283-029-1364",
    location: "Kihnland",
    profile_image_url: "user-round.svg"
  },
  {
    name: "Rosalia",
    job_title: "Global Brand Planner",
    description: "Creative strategist with expertise in global brand development and market positioning.",
    email: "luis.nader30@hotmail.com",
    phone: "972-477-5225",
    location: "Collinsborough",
    profile_image_url: "user-round.svg"
  },
  {
    name: "Lizeth",
    job_title: "District Intranet Executive",
    description: "Technology leader specializing in internal systems and digital transformation.",
    email: "alicia.ohara@company.com",
    phone: "474-215-1871",
    location: "Alizaville",
    profile_image_url: "user-round.svg"
  },
  {
    name: "Jessyca",
    job_title: "Future Accountability Liaison",
    description: "Dedicated professional ensuring transparency and accountability across organizations.",
    email: "titus.kunde76@hotmail.com",
    phone: "235-802-6863",
    location: "Brandonville",
    profile_image_url: "user-round.svg"
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');
    
    // Check if data already exists
    const checkResult = await pool.query('SELECT COUNT(*) FROM singles');
    if (parseInt(checkResult.rows[0].count) > 0) {
      console.log('Database already contains data. Skipping seed.');
      process.exit(0);
    }

    // Insert seed data
    for (const single of seedData) {
      await pool.query(
        `INSERT INTO singles (name, job_title, description, email, phone, location, profile_image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [single.name, single.job_title, single.description, single.email, single.phone, single.location, single.profile_image_url]
      );
    }

    console.log(`Successfully seeded ${seedData.length} records into the database.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
