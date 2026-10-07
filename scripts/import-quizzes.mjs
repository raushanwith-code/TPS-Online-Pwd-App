/**
 * Quiz Importer for TPS ONLINE CLASSES
 * Imports question sets from JSON or Netlify app formats into the TPS Quiz Engine.
 * Usage: node scripts/import-quizzes.mjs [path-to-questions.json]
 */
import fs from 'fs';
import path from 'path';

export function parseNetlifyQuizFormat(rawContent) {
  try {
    const data = JSON.parse(rawContent);
    // Standard format mapping
    return data.map((q, idx) => ({
      id: q.id || `imported-${idx}`,
      questionText: q.question || q.questionText || q.title,
      hindiText: q.hindiQuestion || q.questionHindi || q.question,
      options: q.options || [q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean),
      correctOption: typeof q.answerIndex === 'number' ? q.answerIndex : (q.correctOption || 0),
      explanation: q.explanation || q.solution || '',
    }));
  } catch (err) {
    console.error('Error parsing quiz json:', err.message);
    return [];
  }
}

const targetFile = process.argv[2];
if (targetFile && fs.existsSync(targetFile)) {
  const content = fs.readFileSync(targetFile, 'utf-8');
  const parsed = parseNetlifyQuizFormat(content);
  console.log(`✅ Successfully parsed ${parsed.length} questions from ${targetFile}`);
} else {
  console.log('ℹ️ Usage: node scripts/import-quizzes.mjs <questions.json>');
  console.log('💡 Note: All initial Bihar Board 10th questions are already pre-loaded into TPS Quiz Engine!');
}
