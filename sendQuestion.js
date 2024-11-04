export const sendQuestion = async (chatId, questions, currentQuestion, bot) => {
  const questionNumber = currentQuestion[chatId] + 1;
  const questionData = questions[currentQuestion[chatId]];

  // Генерация текста вопроса с номером
  const questionText = `*Питання ${questionNumber}*\n${questionData.question}`;

  // Формирование вариантов ответа в виде кнопок, расположенных в столбик
  const options = questionData.options.map(option => [{ text: option }]);

  await bot.sendMessage(chatId, questionText, {
    parse_mode: 'Markdown',
    reply_markup: {
      keyboard: [...options, [{ text: 'Вийти з тесту' }]],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
};