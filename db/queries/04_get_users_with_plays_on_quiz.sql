SELECT *
FROM users
JOIN user_scores ON user_scores.user_id = users.id
WHERE user_scores.quiz_id = 1;
