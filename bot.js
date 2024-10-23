import TelegramBot from 'node-telegram-bot-api';
import { mainMenu, startKeyboard, testMenuKeyboard } from './keyboards.js';
import {sendToKeyCRM} from './sendToKeyCRM.js';

const token = '8093162300:AAERaFyiqaWZn_mkAwtyYtd9epPHNvSFX0s';
const bot = new TelegramBot(token, { polling: true });

function setBotCommands() {
    const botCommands = [
      { command: '/start', description: 'Перезапустити бота' },
    ];
  
    bot.setMyCommands(botCommands).then(() => {
      console.log('Команди встановлено');
    }).catch((error) => {
      console.error('Помилка', error);
    });
  }
  
  setBotCommands();

const questions = [
  {
    question: 'What is the correct form of the verb in the sentence: "He _____ to the store every day."',
    options: ['go', 'goes', 'going'],
    answer: 'goes'
  },
  {
    question: 'Choose the correct article: "She is _____ engineer."',
    options: ['a', 'an', 'the'],
    answer: 'an'
  },
  {
    question: 'Which word is a synonym of "happy"?',
    options: ['sad', 'joyful', 'angry'],
    answer: 'joyful'
  }
];

let currentQuestion = {};
let isTakingTest = {};
let countTrueAnswers = {};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, 'Привіт! Я бот-асистент школи Happy&Wise. Радий допомогти вам на шляху до вивчення англійської мови!');
  await bot.sendMessage(chatId, "Ми розробили спеціальну методику для визначення вашого рівня володіння англійською, щоб підібрати найкращий план навчання для вас. Наступним кроком пропоную пройти невеликий тест, після якого ви зможете залишити свої контакти, і ми зв'яжемося з вами для обговорення результатів та подальших кроків.");
  await bot.sendMessage(chatId, 'Готові розпочати тест?', startKeyboard);
});

bot.onText(/Головне меню/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Обирайте кнопками, що цікавить👇', mainMenu);
});

bot.onText(/Перевірити свій рівень/, async (msg) => {
    const chatId = msg.chat.id;
  
    await bot.sendMessage(chatId, 'Обирайте кнопками, що цікавить👇', testMenuKeyboard);
});

bot.onText(/Почати тест/, async (msg) => {
  const chatId = msg.chat.id;
  isTakingTest[chatId] = true;
  currentQuestion[chatId] = 0;
  countTrueAnswers[chatId] = 0;

  await bot.sendMessage(chatId, 'Починаємо тест з англійської! Для виходу з тесту натисніть кнопку "Вийти з тесту".');
  sendQuestion(chatId);
});

const sendQuestion = async (chatId) => {
  const questionData = questions[currentQuestion[chatId]];
  const options = questionData.options.map(option => ({ text: option }));

  await bot.sendMessage(chatId, questionData.question, {
    reply_markup: {
      keyboard: [options, [{ text: 'Вийти з тесту' }]],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
};

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
        countTrueAnswers[chatId]++
    } else {
        currentQuestion[chatId]++;
    }

    // Переход к следующему вопросу или завершение теста
    if (currentQuestion[chatId] < questions.length) {
      sendQuestion(chatId);
    } else {
      await bot.sendMessage(chatId, `Тест завершено! Кількість правильних відповідей ${Object.values(countTrueAnswers)}. Дякую за участь!`, testMenuKeyboard);
      isTakingTest[chatId] = false;
    }
  }
});

bot.onText(/📞 Зв'язатися із менеджером /, (msg) => {
  bot.sendMessage(msg.chat.id, "Будь ласка, надішліть ваше ім'я та контактний номер телефону.");

  bot.once('message', (contactMsg) => {
    const contactInfo = contactMsg.text.split(',');

    if (contactInfo.length < 2) {
      bot.sendMessage(contactMsg.chat.id, "Будь ласка, введіть дані у форматі: Ім'я, Телефон.");
      return;
    }

    const fullName = contactInfo[0].trim();
    const phone = contactInfo[1].trim();

    const contactData = {
      full_name: fullName,
      phone: phone,
    };

    bot.sendMessage(contactMsg.chat.id, `Дякую! Ми зв'яжемося з вами за наступним номером: ${phone}`);

    sendToKeyCRM(contactData);
  });
});
