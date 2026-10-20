import prisma from '../src/lib/prisma';

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data if any
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  // Create Sample Quiz 1: Web Development & JavaScript
  await prisma.quiz.create({
    data: {
      title: 'JavaScript & Web Fundamentals',
      questions: {
        create: [
          {
            type: 'boolean',
            text: 'Is JavaScript a single-threaded programming language?',
            order: 1,
            correctAnswer: 'true',
          },
          {
            type: 'short_answer',
            text: 'What keyword was introduced in ES6 to declare block-scoped, reassignable variables?',
            order: 2,
            correctAnswer: 'let',
          },
          {
            type: 'multiple_choice',
            text: 'Which of the following are valid JavaScript primitive data types?',
            order: 3,
            options: {
              create: [
                { text: 'String', isCorrect: true },
                { text: 'Number', isCorrect: true },
                { text: 'Boolean', isCorrect: true },
                { text: 'ArrayList', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  // Create Sample Quiz 2: General Knowledge & Geography
  await prisma.quiz.create({
    data: {
      title: 'World Geography & Trivia',
      questions: {
        create: [
          {
            type: 'short_answer',
            text: 'What is the capital of Ukraine?',
            order: 1,
            correctAnswer: 'Kyiv',
          },
          {
            type: 'boolean',
            text: 'The Atlantic Ocean is larger than the Pacific Ocean.',
            order: 2,
            correctAnswer: 'false',
          },
          {
            type: 'multiple_choice',
            text: 'Which of the following countries are in Europe?',
            order: 3,
            options: {
              create: [
                { text: 'Poland', isCorrect: true },
                { text: 'Germany', isCorrect: true },
                { text: 'Brazil', isCorrect: false },
                { text: 'Norway', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Seed completed successfully! Created 2 sample quizzes.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
