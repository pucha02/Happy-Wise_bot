import { testMenuKeyboard } from '../keyboards.js';
import { questions } from '../questionsForTEst.js';
import { sendQuestion } from '../sendQuestion.js';

const isTakingTest = {};
const currentQuestion = {};
const countTrueAnswers = {};

export function testHandler(bot, updateLastInteractionTime) {
  bot.onText(/Перевірити свій рівень/, async (msg) => {
    const chatId = msg.chat.id;
    await updateLastInteractionTime(chatId);

    await bot.sendMessage(chatId, 'Обирайте кнопками, що цікавить👇', testMenuKeyboard);
  });

  bot.onText(/Почати тест/, async (msg) => {
    const chatId = msg.chat.id;
    isTakingTest[chatId] = true;
    currentQuestion[chatId] = 0;
    countTrueAnswers[chatId] = 0;
    await bot.sendMessage(chatId, 'Починаємо тест з англійської! Для виходу з тесту натисніть кнопку "Вийти з тесту".');
    sendQuestion(chatId, questions, currentQuestion, bot);
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === 'Вийти з тесту') {
      isTakingTest[chatId] = false;
      await bot.sendMessage(chatId, 'Ви успішно вийшли з тесту.', testMenuKeyboard);
      return;
    }

    if (isTakingTest[chatId]) {
      const questionData = questions[currentQuestion[chatId]];
      if (msg.text === questionData.answer) {
        currentQuestion[chatId]++;
        countTrueAnswers[chatId]++;
      } else {
        currentQuestion[chatId]++;
      }

      if (currentQuestion[chatId] < questions.length) {
        sendQuestion(chatId, questions, currentQuestion, bot);
      } else {
        await bot.sendMessage(chatId, `Тест завершено! Кількість правильних відповідей: ${countTrueAnswers[chatId]}. Дякую за участь!`, testMenuKeyboard);
        isTakingTest[chatId] = false;
      }
    }
  });
}
