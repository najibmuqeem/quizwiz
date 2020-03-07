SELECT users.name, count(*) as number_of_quiz_attempts, quizzes.title
FROM user_scores
JOIN quizzes ON quizzes.id = quiz_id
JOIN users on users.id = user_scores.user_id
GROUP BY user_scores.user_id, users.name, quizzes.title
HAVING user_scores.user_id = 1;
