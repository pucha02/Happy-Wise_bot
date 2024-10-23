export function setBotCommands(bot) {
    const botCommands = [
      { command: '/start', description: 'Перезапустити бота' },
    ];
  
    bot.setMyCommands(botCommands).then(() => {
      console.log('Команди встановлено');
    }).catch((error) => {
      console.error('Помилка', error);
    });
  }