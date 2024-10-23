export const sendQuestion = async (chatId, questions, currentQuestion, bot) => {
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