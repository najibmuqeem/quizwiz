SELECT option
FROM options
JOIN questions ON questions.id = question_id
JOIN quizzes ON quizzes.id = quiz_id
WHERE is_correct = true
AND quiz_id = $1;
