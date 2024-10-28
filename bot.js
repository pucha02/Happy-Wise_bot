import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { startHandler } from './handlers/start.js';
import { mainMenuHandler } from './handlers/menu.js';
import { schoolInfoHandler } from './handlers/schoolInfo.js';
import { studyFormatsHandler } from './handlers/studyFormats.js';
import { advantagesHandler } from './handlers/advantages.js';
import { faqHandler } from './handlers/faq.js';
import { reviewsHandler } from './handlers/reviews.js';
import { teachersHandler } from './handlers/teachers.js';
import { studyHandler } from './handlers/study.js';
import { testHandler } from './handlers/test.js';
import { contactManagerHandler } from './handlers/contactManager.js';
import { setBotCommands } from './setBotCommands.js';
import { sendPackageInfoHandler } from './handlers/sendPackageInfoHandler.js';
import { updateLastInteractionTime } from './controllers/interactionController.js';

const token = '8093162300:AAERaFyiqaWZn_mkAwtyYtd9epPHNvSFX0s';
const mongoUri = 'mongodb+srv://happyandwisebot:eXIjqBpLsvyxbymy@cluster0.npvxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const bot = new TelegramBot(token, { polling: true });

// Подключение к MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключено к MongoDB'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

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

// Настройка и запуск Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

// Пример маршрута для API
app.get('/api/users', (req, res) => {
  res.json({ message: 'Список пользователей' });
});

// Запуск Express-сервера
app.listen(PORT, () => {
  console.log(`Express сервер запущен на порту ${PORT}`);
});

console.log("Telegram бот запущен и ожидает команды");
