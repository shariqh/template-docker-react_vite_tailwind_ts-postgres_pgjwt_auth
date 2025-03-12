-- Enable pgjwt extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pgjwt;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

-- Insert sample user (password: test123)
INSERT INTO users (email, password_hash) 
VALUES ('test@example.com', crypt('test123', gen_salt('bf')))
ON CONFLICT (email) DO NOTHING;

-- ✅ Fix the function definition
CREATE OR REPLACE FUNCTION create_jwt(user_id integer) RETURNS text AS $$
DECLARE
  jwt text;
  payload json;
BEGIN
  -- Create payload using SELECT INTO (correct way)
  SELECT row_to_json(r) INTO payload
  FROM (
    SELECT user_id, now() AS iat, now() + interval '7 days' AS exp
  ) r;

  -- Sign the payload
  jwt := sign(payload, 'your-secret-key');
  RETURN jwt;
END;
$$ LANGUAGE plpgsql;
