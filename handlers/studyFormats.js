export function studyFormatsHandler(bot) {
    bot.onText(/Формати навчання/, async (msg) => {
        const chatId = msg.chat.id;
        await bot.sendMessage(
          chatId, 
          `🎓 <b>Англійська як спосіб життя</b>\n\n🌟 <b>Розмовна англійська — наш пріоритет!</b> Практика розмов у різних форматах:\n
          - 👥 <b>Групові / парні / індивідуальні заняття</b> на навчальній платформі з викладачем\n
          - 🌍 <b>Заняття з носіями мови</b>\n
          - 🗣️ <b>Speaking Club</b> — щосуботи о 10:00\n
          - 💬 <b>Розмовні челенджі</b> — щомісяця`,
          { parse_mode: 'HTML' }  // Указываем, что используем HTML
        );
      });
  }
  