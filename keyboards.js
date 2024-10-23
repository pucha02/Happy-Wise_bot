// Начальная клавиатура
export const startKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: 'Почати тест' }],
      [{ text: 'Головне меню' }]
    ],
    resize_keyboard: true,
  },
};

// Главное меню
export const mainMenu = {
    reply_markup: {
      keyboard: [
        [{ text: '🏫 Про школу' }, { text: '👨‍🏫 Наші вчителі' }],
        [{ text: '📚 Навчання' }, { text: '📚 Перевірити свій рівень' }],
        [{ text: 'Бонус' }],
        [{ text: "📞 Зв'язатися із менеджером" }, { text: "Хочу навчатися" }],
      ],
      resize_keyboard: true,
    },
  };

// Меню теста
export const testMenuKeyboard = {
    reply_markup: {
      keyboard: [
        [{ text: "📞 Зв'язатися із менеджером " }, { text: 'Почати тест' }],
        [{ text: 'Головне меню' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };

