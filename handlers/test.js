import { testMenuKeyboard } from '../keyboards.js';
import { questions } from '../questionsForTEst.js';
import { sendQuestion } from '../sendQuestion.js';
import { sendToKeyCRM } from '../sendToKeyCRM.js';

const isTakingTest = {};
const currentQuestion = {};
const countTrueAnswers = {};
const levelStats = {};

const levelEndings = [3, 7, 11, 15, 19];
const levelNames = ["Beginner (preA1)", "Elementary (A1)", "Pre-Intermediate (A2)", "Intermediate (B1)", "Upper-Intermediate (B2)"];
const requiredAccuracy = 0.7;

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
    levelStats[chatId] = levelEndings.map((_, i) => ({ level: levelNames[i], correct: 0, total: 0 }));

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
      const levelIndex = levelEndings.findIndex(ending => currentQuestion[chatId] <= ending);

      levelStats[chatId][levelIndex].total++;
      if (msg.text === questionData.answer) {
        countTrueAnswers[chatId]++;
        levelStats[chatId][levelIndex].correct++;
      }

      if (levelEndings.includes(currentQuestion[chatId])) {
        const questionsInLevel = levelStats[chatId][levelIndex].total;
        const correctAnswersInLevel = levelStats[chatId][levelIndex].correct;
        const accuracy = correctAnswersInLevel / questionsInLevel;

        if (accuracy < requiredAccuracy) {
          const reachedLevel = levelNames[levelIndex - 1];
          const reachedLevelall = levelNames[levelIndex];
          if (levelIndex > 0) {
            await bot.sendMessage(
              chatId,
              `Ваш рівень: ${reachedLevel}. Ви відповіли правильно на менше ${Math.round(requiredAccuracy * 100)}% питань рівня ${reachedLevelall}.`,
              testMenuKeyboard
            );

            await bot.sendMessage(
              chatId,
              `Чудово, у вас вже є певний рівень знань! Ми можемо допомогти вам покращити його ще більше. Натисніть кнопку  "📞 Зв'язатися із менеджером", щоб підібрати курс, який допоможе вам досягти нових висот у вивченні англійської мови!`,
              testMenuKeyboard
            );

            sendLevelSummary(chatId, bot, levelIndex);
            isTakingTest[chatId] = false;
            return;
          } else {
            await bot.sendMessage(
              chatId,
              `Ви відповіли правильно на менше ${Math.round(requiredAccuracy * 100)}% питань рівня ${reachedLevelall}`,
              testMenuKeyboard
            );
            await bot.sendMessage(
              chatId,
              `Не засмучуйтесь! Ви завжди можете натиснути кнопку  "📞 Зв'язатися із менеджером", і ми допоможемо підібрати для вас курс, на якому ви обов'язково досягнете своєї мети у вивченні англійської мови!`,
              testMenuKeyboard
            );
            sendLevelSummary(chatId, bot, levelIndex);
            isTakingTest[chatId] = false;
            return;
          }

        }

        if (levelIndex <= 3) {
          await bot.sendMessage(chatId, `🎉 Круто! Ви пройшли рівень ${levelNames[levelIndex]}. Наступний рівень: ${levelNames[levelIndex + 1]}.`);

        } else {
          await bot.sendMessage(
            chatId,
            `Вітаємо! 🎉 Ви успішно пройшли всі рівні тесту і показали чудові результати. Ваш рівень знань в англійській мові вже високий!`,
            testMenuKeyboard
          );

          await bot.sendMessage(
            chatId,
            `Хочете ще більше удосконалити свої навички та впевнено користуватися англійською в будь-яких ситуаціях? 📚 Наші спеціальні просунуті курси допоможуть закріпити знання і додадуть впевненості у використанні англійської як у професійній, так і в повсякденній сфері.`,
            testMenuKeyboard
          );

          await bot.sendMessage(
            chatId,
            `Натисніть 📞 "Зв'язатися із менеджером", щоб дізнатися більше про програми, які допоможуть вам досягти нових висот у володінні англійською! Ми підберемо курс, що підходить саме вам.`,
            testMenuKeyboard
          );

        }
      }

      currentQuestion[chatId]++;

      if (currentQuestion[chatId] < questions.length) {
        sendQuestion(chatId, questions, currentQuestion, bot);
      } else {
        await bot.sendMessage(
          chatId,
          `✅ Тест завершено!\nПравильні відповіді: ${countTrueAnswers[chatId]} з ${questions.length} (${((countTrueAnswers[chatId] / questions.length) * 100).toFixed(2)}%). Дякую за участь!`,
          testMenuKeyboard
        );
        sendLevelSummary(chatId, bot, levelEndings.length - 1);
        isTakingTest[chatId] = false;
      }
    }
  });
}

// Отправка статистики только по пройденным уровням
const sendLevelSummary = async (chatId, bot, lastCompletedLevelIndex) => {
  const summary = levelStats[chatId]
    .slice(0, lastCompletedLevelIndex + 1)
    .map(stat => `Рівень ${stat.level}: ${stat.correct} з ${stat.total} правильних відповідей`)
    .join('\n');

  await bot.sendMessage(chatId, `📊 Результати по пройдених рівнях:\n${summary}`);
};


export function contactManagerHandler(bot, updateLastInteractionTime) {
  const awaitingContactInfo = {};

  bot.onText(/Зв'язатися із менеджером/, async (msg) => {
    const chatId = msg.chat.id;
    awaitingContactInfo[chatId] = true;  // Устанавливаем флаг для ожидания данных
    await bot.sendMessage(chatId, "Будь ласка, надішліть ваше ім'я та контактний номер телефону у форматі: Ім'я, Телефон.");
    await updateLastInteractionTime(chatId);
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
  
    if (awaitingContactInfo[chatId]) {
      const contactInfo = msg.text.split(',');
  
      if (contactInfo.length < 2) {
        await bot.sendMessage(chatId, "Будь ласка, введіть дані у форматі: Ім'я, Телефон.");
      } else {
        const fullName = contactInfo[0].trim();
        const phone = contactInfo[1].trim();
  
        // Получаем уровень клиента по последнему завершенному уровню
        const lastLevelIndex = levelStats[chatId].findLastIndex(stat => stat.total > 0);
        const clientLevel = lastLevelIndex > 0 && lastLevelIndex < 4 ? levelNames[lastLevelIndex - 1] : lastLevelIndex == 0 ? 'Не пройшов 1 рівень' : lastLevelIndex >= 4 ? levelNames[lastLevelIndex] : 'Не визначено';
  
        const contactData = {
          full_name: `${fullName} ${clientLevel}`,
          level: clientLevel,
          phone: phone,
          chatId: chatId
        };
  
        // Отправляем подтверждение с уровнем
        await bot.sendMessage(chatId, `Дякую! Ми зв'яжемося з вами за наступним номером: ${phone}`);
        awaitingContactInfo[chatId] = false;  // Убираем флаг ожидания
  
        sendToKeyCRM(contactData);
      }
      await updateLastInteractionTime(chatId);
    }
  });
  
}