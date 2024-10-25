// Начальная клавиатура
export const startKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '📝 Почати тест' }],
      [{ text: '🏠 Головне меню' }]
    ],
    resize_keyboard: true,
  },
};

// Главное меню
export const mainMenu = {
  reply_markup: {
    keyboard: [
      [{ text: '🏫 Про школу' }, { text: '👨‍🏫 Наші вчителі' }],
      [{ text: '📚 Навчання' }, { text: '📝 Перевірити свій рівень' }],
      [{ text: '🎁 Бонус' }],
      [{ text: "📞 Зв'язатися із менеджером" }, { text: '🎓 Хочу навчатися' }],
    ],
    resize_keyboard: true,
  },
};

export const aboutSchoolMenu = {
    keyboard: [
      [{ text: '📘 Формати навчання' }, { text: '✨ Переваги навчання з нами' }],
      [{ text: '📝 Відгуки' }, { text: '❓ Часті запитання' }],
      [{ text: '🏠 Головне меню' }]
    ]
};

// Меню теста
export const testMenuKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: "📞 Зв'язатися із менеджером " }, { text: '📝 Почати тест' }],
      [{ text: '🏠 Головне меню' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

export const teachersKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: 'Ірина Азаренко' }],
      [{ text: 'Ірина Вергун' }, { text: 'Олег' }, { text: 'Лоліта' }],
      [{ text: 'Владислава' }, { text: 'Mike' }],
      [{ text: '🏠 Головне меню' }]
      
      // { text: 'Ірина' }
    //  [{text: 'Юлія'}]
    ],
    resize_keyboard: true,
  },
};


export const packageKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: 'Персональні для школярів. 8 занять' }, { text: 'Групові. 8 занять' }, { text: 'Групові. 12 занять' }],
      [{ text: 'Парні. 8 занять' }, { text: 'Парні. 12 занять' }, { text: 'Індивідуальні. 8 занять' }],
      [{ text: 'Індивідуальні. 12 занять' }, { text: 'Індивідуальні. 24 заняття' }, { text: 'Індивідуальні з Іриною. 8 занять' }],
      [{ text: 'Індивідуальні заняття з носієм' }, { text: 'Пакет Business English. 8 занять' }],
      [{ text: "🏠 Головне меню" }],
    ],
    resize_keyboard: true,
  },
}