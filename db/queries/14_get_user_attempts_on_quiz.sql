SELECT users.name, quizzes.title, count(*) as number_of_quiz_attempts
FROM user_scores
JOIN quizzes ON quizzes.id = quiz_id
JOIN users on users.id = user_scores.user_id
GROUP BY user_scores.quiz_id, user_scores.user_id, users.name, quizzes.title
HAVING user_scores.quiz_id = 1 AND user_scores.user_id = 1;
