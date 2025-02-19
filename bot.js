import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { startKeyboard } from './keyboards.js';
import { packageKeyboard } from './keyboards.js';
import { isTakingTest } from './testState.js';

import { mainMenuHandler } from './handlers/menu.js';
import { schoolInfoHandler } from './handlers/schoolInfo.js';
import { studyFormatsHandler } from './handlers/studyFormats.js';
import { advantagesHandler } from './handlers/advantages.js';
import { faqHandler } from './handlers/faq.js';
import { reviewsHandler } from './handlers/reviews.js';
import { teachersHandler } from './handlers/teachers.js';
import { studyHandler } from './handlers/study.js';
import { testHandler } from './handlers/test.js';
import { contactManagerHandler } from './handlers/test.js';
import { setBotCommands } from './setBotCommands.js';
import { sendPackageInfoHandler } from './handlers/sendPackageInfoHandler.js';
import { updateLastInteractionTime } from './controllers/interactionController.js';
import { sendBonus } from './handlers/bonus.js';
import { sendOferta } from './handlers/oferta.js';


const token = '7775055144:AAGvYUB1TJNxrNg4cdWPD61YDNh8VucDyko';
const mongoUri = 'mongodb+srv://happyandwisebot:eXIjqBpLsvyxbymy@cluster0.npvxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const bot = new TelegramBot(token, { polling: true });


// Подключение к MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключено к MongoDB'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));


bot.on('message', (msg) => {
  if (msg.text === '🗣️ Speaking Club') {
    bot.sendMessage(msg.chat.id, 'Приєднуйтесь до нашого Speaking Club тут: https://t.me/Speaking_club_happyandwise');
  }
});

bot.on('message', (msg) => {
  if (msg.text === '💬 Розмовний челендж') {
    const challengeText = `РОЗМОВНИЙ ЧЕЛЕНДЖ – це англомовне ком'юніті для прокачки твоєї англійської! 🔥
  У цьому 7-денному челенджі ти:
  ✅ Щодня практикуєш англійську з носієм
  ✅ Здобуваєш впевненість у спілкуванні
  ✅ Переходиш від пасивного словника до активного
  ✅ Долаєш страх помилок
  
  Приєднуйся до челенджу тут: https://t.me/+sRa4QGV8osBkZjky`;

    bot.sendMessage(msg.chat.id, challengeText);
  }
});

let globalChatId = null;

function startHandler(bot, updateLastInteractionTime) {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    isTakingTest[chatId] = false
    const { first_name, last_name, username, phone } = msg.chat;

    // Сохраняем chatId в глобальную переменную
    globalChatId = chatId;

    // Сохраняем или обновляем данные пользователя в БД
    try {
      await UserInteraction.findOneAndUpdate(
        { chat_id: chatId }, // Уникальный идентификатор чата
        { full_name: `${first_name} ${last_name}`, phone: phone },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
    }

    // Обновляем время последнего взаимодействия
    await updateLastInteractionTime(chatId, 'start_command');

    // Отправляем приветственное сообщение пользователю
    await bot.sendMessage(chatId,
      `Привіт👋 Я бот-асистент мовної школи Happy&Wise school🦉`);

    await bot.sendMessage(chatId,
      `Заговорити англійською і розширити свої можливості - Це мудре рішення!💪🔥\nМи Щасливі, коли наші студенти починають говорити Англійською`);

    await bot.sendMessage(chatId, `Наші заняття проходять на навчальній платформі, ми використовуємо метод перевернутого уроку студенти вчать нові фрази та слова ПЕРЕД  уроком, а не після, це дає змогу тренувати нову лексику безпосередньо на уроці з викладачем)\n\nДЗ перевіряється автоматично, працювати можна з будь якого гаджету.\n\nДавайте перевіримо Ваш рівень та домовимось про пробне заняття`, startKeyboard);
    await bot.sendMessage(chatId, 'Готові розпочати тест 🤔? Це займе кілька хвилин', startKeyboard);
  });
}
// Подключение всех обработчиков для бота
setBotCommands(bot, updateLastInteractionTime);
startHandler(bot, updateLastInteractionTime);
mainMenuHandler(bot, updateLastInteractionTime);
schoolInfoHandler(bot, updateLastInteractionTime);
studyFormatsHandler(bot, updateLastInteractionTime);
advantagesHandler(bot, updateLastInteractionTime);
faqHandler(bot, updateLastInteractionTime);
reviewsHandler(bot, updateLastInteractionTime);
teachersHandler(bot, updateLastInteractionTime);
studyHandler(bot, updateLastInteractionTime);
testHandler(bot, updateLastInteractionTime);
contactManagerHandler(bot, updateLastInteractionTime);
sendPackageInfoHandler(bot, updateLastInteractionTime);
sendBonus(bot)
sendOferta(bot)

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  res.json({ message: 'Список пользователей' });
});

app.post('/api/keycrm', (req, res) => {
  console.log(req.body);

  const chatId = req.body.context.manager_comment;
  const message = 'Дякую, що пройшли курс. Якщо Ви обирали "Регулярний платіж", то пакет продовжиться автоматично. Ви також можете придбати пакети занять прямо у боті 👇';

  bot.sendMessage(chatId, message, packageKeyboard)
    .then(() => {
      console.log(`Повідомлення`);
      res.status(200).send('Повідомлення');
    })
    .catch((error) => {
      console.error('Помилка', error);
      res.status(500).send('Помилка');
    });
});

let sentOrders = new Set(); // Множина для зберігання вже надісланих повідомлень

// app.post('/api/wayforpay', (req, res) => {
//   const paymentData = req.body;

//   // Використовуємо інші дані для унікальної ідентифікації замовлення, наприклад, email або phone клієнта
//   const clientEmail = paymentData.email || 'Не вказано';
//   const transactionId = paymentData.authCode || 'Не вказано';

//   // Генеруємо унікальний ключ для надсилання повідомлення
//   const uniqueMessageKey = `${clientEmail}-${transactionId}`;

//   // Перевіряємо, чи було вже надіслано повідомлення для цього платежу
//   if (sentOrders.has(uniqueMessageKey)) {
//     console.log(`Повідомлення для цього платежу вже надіслано`);
//     return res.status(200).send('Повідомлення вже надіслано');
//   }

//   // Формуємо повідомлення про те, що оплата пройшла успішно
//   const amount = paymentData.amount || 'невідомо';  // Якщо сума не вказана
//   const message = `
//     Вітаємо! Ваша оплата на суму ${amount} UAH пройшла успішно.
//     З вами найближчим часом зв'яжеться наш менеджер для подальших інструкцій.
//   `;

//   // Використовуємо глобальну змінну для chatId
//   if (globalChatId) {
//     bot.sendMessage(globalChatId, message)
//       .then(() => {
//         console.log(`Повідомлення надіслано клієнту з chatId ${globalChatId}`);
//         sentOrders.add(uniqueMessageKey); // Додаємо унікальний ключ у множину
//         res.status(200).send('Повідомлення надіслано');
//       })
//       .catch((error) => {
//         console.error('Помилка при надсиланні повідомлення:', error);
//         res.status(500).send('Помилка при надсиланні повідомлення');
//       });
//   } else {
//     console.error('chatId не знайдено');
//     res.status(400).send('chatId не знайдено');
//   }
// });


app.listen(PORT, () => {
  console.log(`Express сервер запущен на порту ${PORT}`);
});

console.log("Telegram бот запущен и ожидает команды");
