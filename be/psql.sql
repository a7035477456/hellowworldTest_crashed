-- PostgreSQL table schema for user profile cards
-- Run this command: psql -U your_username -d your_database -f schema.sql

CREATE TABLE IF NOT EXISTS user_cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    description TEXT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    profile_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO user_cards (name, job_title, description, email, phone, location, profile_image_url) VALUES
('Phoebe', 'Dynamic Operations Officer', 'Experienced operations professional with expertise in dynamic systems management.', 'phoebe@example.com', '+1-555-0101', 'New York, USA', 'https://i.pravatar.cc/150?img=1'),
('Gaetano', 'Investor Division Strategist', 'Strategic thinker specializing in investment division operations and market analysis.', 'gaetano@example.com', '+1-555-0102', 'San Francisco, USA', 'https://i.pravatar.cc/150?img=2'),
('Elisabeth', 'Future Markets Associate', 'Dedicated associate focused on emerging market trends and future opportunities.', 'elisabeth@example.com', '+1-555-0103', 'Chicago, USA', 'https://i.pravatar.cc/150?img=3'),
('Rosalia', 'Dynamic Operations Officer', 'Operations expert with a proven track record in dynamic business environments.', 'rosalia@example.com', '+1-555-0104', 'Los Angeles, USA', 'https://i.pravatar.cc/150?img=4'),
('Lizeth', 'Investor Division Strategist', 'Strategic advisor with deep knowledge of investment strategies and portfolio management.', 'lizeth@example.com', '+1-555-0105', 'Boston, USA', 'https://i.pravatar.cc/150?img=5'),
('Jessyca', 'Future Markets Associate', 'Market research specialist with expertise in identifying future market trends.', 'jessyca@example.com', '+1-555-0106', 'Seattle, USA', 'https://i.pravatar.cc/150?img=6'),
('John', 'Senior Financial Analyst', 'Experienced analyst with expertise in financial modeling and market research.', 'john@example.com', '+1-555-0107', 'Austin, USA', 'https://i.pravatar.cc/150?img=7'),
('Sarah', 'Business Development Manager', 'Proven manager with success in expanding business operations and partnerships.', 'sarah@example.com', '+1-555-0108', 'Denver, USA', 'https://i.pravatar.cc/150?img=8'),
('Michael', 'Operations Coordinator', 'Detail-oriented coordinator ensuring smooth operational workflows.', 'michael@example.com', '+1-555-0109', 'Miami, USA', 'https://i.pravatar.cc/150?img=9');
