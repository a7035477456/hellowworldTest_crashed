-- Create singles table
CREATE TABLE IF NOT EXISTS singles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255),
    description TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    profile_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_singles_email ON singles(email);
