import { testMenuKeyboard } from '../keyboards.js';
import { questions } from '../questionsForTEst.js';
import { sendQuestion } from '../sendQuestion.js';
import { sendToKeyCRM } from '../sendToKeyCRM.js';
import { isTakingTest } from '../testState.js';

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

    await bot.sendMessage(chatId,
      `Починаємо тест з англійської!

Надайте відповіді на питання ✅

Для того, щоб припинити проходження тесту натисніть кнопку "❌ Вийти з тесту"`);
    sendQuestion(chatId, questions, currentQuestion, bot);
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === '❌ Вийти з тесту') {
      isTakingTest[chatId] = false;
      await bot.sendMessage(chatId, 'Ви успішно вийшли з тесту.', testMenuKeyboard);
      return;
    }

    if (msg.text === '/start') {
      isTakingTest[chatId] = false;
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
          if (levelIndex > 1) {
            const testMenuKeyboard = {
              reply_markup: {
                keyboard: [
                  [{ text: "📞 Запис на безкоштовне пробне" }, { text: '📝 Почати тест' }],
                  [{ text: '🗣️ Speaking Club' }],
                  [{ text: '🏠 Головне меню' }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false
              }
            };
            
            await bot.sendMessage(
              chatId,
              `Ваш рівень: ${reachedLevel}. Ви відповіли правильно на менше ${Math.round(requiredAccuracy * 100)}% питань рівня ${reachedLevelall}.`,
              testMenuKeyboard
            );

            await bot.sendMessage(
              chatId,
              `Чудово, у вас вже є певний рівень знань! Ми можемо допомогти вам покращити його ще більше. Натисніть кнопку  "📞 Запис на безкоштовне пробне", щоб підібрати курс, який допоможе вам досягти нових висот у вивченні англійської мови!`,
              testMenuKeyboard
            );
            await bot.sendMessage(
              chatId,
              `Долучайтеся до нашого`,
              testMenuKeyboard
            );
            sendLevelSummary(chatId, bot, levelIndex);
            isTakingTest[chatId] = false;
            return;
          }
          if (levelIndex > 0) {


            await bot.sendMessage(
              chatId,
              `Ваш рівень: ${reachedLevel}. Ви відповіли правильно на менше ${Math.round(requiredAccuracy * 100)}% питань рівня ${reachedLevelall}.`,
              testMenuKeyboard
            );

            await bot.sendMessage(
              chatId,
              `Чудово, у вас вже є певний рівень знань! Ми можемо допомогти вам покращити його ще більше. Натисніть кнопку  "📞 Запис на безкоштовне пробне", щоб підібрати курс, який допоможе вам досягти нових висот у вивченні англійської мови!`,
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
              `Не засмучуйтесь! Ви завжди можете натиснути кнопку  "📞 Запис на безкоштовне пробне", і ми допоможемо підібрати для вас курс, на якому ви обов'язково досягнете своєї мети у вивченні англійської мови!`,
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
            `Натисніть 📞 "Запис на безкоштовне пробне", щоб дізнатися більше про програми, які допоможуть вам досягти нових висот у володінні англійською! Ми підберемо курс, що підходить саме вам.`,
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
  const awaitingContactInfo = {}; // Объект для хранения состояния ожидания ввода пользователя

  bot.onText(/Запис на безкоштовне пробне/, async (msg) => {
    const chatId = msg.chat.id;

    awaitingContactInfo[chatId] = { step: 1, canceled: false };  // Устанавливаем начальный шаг ожидания
    await bot.sendMessage(chatId, "Будь ласка, надішліть ваше ім'я. \n\nЯкщо бажаєте скасувати введення даних, уведіть та відправте команду '/cancel' (або оберіть у меню зліва від поля введення)");
    await updateLastInteractionTime(chatId);
  });

  bot.onText(/\/cancel/, async (msg) => {
    const chatId = msg.chat.id;

    if (awaitingContactInfo[chatId]) {
      awaitingContactInfo[chatId].canceled = true;  // Устанавливаем флаг отмены
      await bot.sendMessage(chatId, "Дію скасовано. Якщо хочете почати знову, натисніть 'Запис на безкоштовне пробне'.");
    }
    await updateLastInteractionTime(chatId);
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === '/cancel') {
      delete awaitingContactInfo[chatId];
      await bot.sendMessage(chatId, "Дію скасовано");
      return;
    }

    if (msg.text === '🏫 Про школу' || msg.text === '👨‍🏫 Наші вчителі' || msg.text === '📚 Навчання' || msg.text === '📝 Перевірити свій рівень' || msg.text === '🎁 Бонус' || msg.text === "📞 Запис на безкоштовне пробне" || msg.text === '🗣️ Speaking Club' || msg.text === '💬 Розмовний челендж') {
      delete awaitingContactInfo[chatId];
      return;
    }
    // Проверяем, ожидаем ли мы данные от пользователя
    if (awaitingContactInfo[chatId]) {
      const state = awaitingContactInfo[chatId];

      // Прекращаем обработку, если действие было отменено
      if (state.canceled) {
        delete awaitingContactInfo[chatId];
        return;
      }

      if (state.step === 1) {
        // Шаг 1: Получаем имя пользователя
        const fullName = msg.text.trim();

        // Проверка, что имя не пустое
        if (!fullName) {
          await bot.sendMessage(chatId, "Будь ласка, введіть коректне ім'я.");
          return;
        }

        state.fullName = fullName;  // Сохраняем имя в состоянии
        state.step = 2;             // Переходим к следующему шагу

        // Проверяем, отменено ли действие перед отправкой следующего сообщения
        if (!state.canceled) {
          await bot.sendMessage(chatId, "Дякую! Тепер надішліть ваш номер телефону.");
        }

      } else if (state.step === 2) {
        // Шаг 2: Получаем номер телефона пользователя
        const phone = msg.text.trim();

        // Проверка, что номер телефона введен корректно
        const phoneRegex = /^[\d\+\-\(\)\s]+$/;
        if (!phoneRegex.test(phone)) {
          await bot.sendMessage(chatId, "Будь ласка, введіть коректний номер телефону.");
          return;
        }

        state.phone = phone;  // Сохраняем номер телефона

        // Проверяем, есть ли уровень пользователя
        const hasStats = levelStats[chatId] && levelStats[chatId].some(stat => stat.total > 0);
        let clientLevel = '';
        if (hasStats) {
          const lastLevelIndex = levelStats[chatId].findLastIndex(stat => stat.total > 0);
          clientLevel = lastLevelIndex > 0 && lastLevelIndex < 4
            ? levelNames[lastLevelIndex - 1]
            : lastLevelIndex === 0
              ? 'Не пройшов 1 рівень'
              : lastLevelIndex >= 4
                ? levelNames[lastLevelIndex]
                : 'Не визначено';
        }

        // Формируем данные для отправки
        const contactData = {
          full_name: hasStats ? `${state.fullName} (${clientLevel})` : state.fullName,
          phone: state.phone,
          chatId: chatId
        };

        // Отправляем подтверждение с уровнем, если он есть
        const responseMessage = hasStats
          ? `Дякую! Ми зв'яжемося з вами за наступним номером: ${state.phone}`
          : `Дякую! Ми зв'яжемося з вами за наступним номером: ${state.phone}`;

        await bot.sendMessage(chatId, responseMessage);

        // Отправляем данные в CRM и сбрасываем состояние ожидания
        sendToKeyCRM(contactData);
        delete awaitingContactInfo[chatId];
      }

      await updateLastInteractionTime(chatId);
    }
  });
}  
