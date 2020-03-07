
DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  picture_url VARCHAR(255),
  number_of_questions INTEGER NOT NULL,
  number_of_plays INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true
);
