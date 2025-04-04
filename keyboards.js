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

export const mainMenu = {
  reply_markup: {
    keyboard: [
      [{ text: '🏫 Про школу' }, { text: '👨‍🏫 Наші вчителі' }],
      [{ text: '📚 Навчання' }, { text: '📝 Перевірити свій рівень' }],
      [{ text: '🎁 Бонус' }, { text: "📞 Запис на безкоштовне пробне" }],
      [{ text: '🗣️ Speaking Club', url: 'https://t.me/Speaking_club_happyandwise' }, { text: '💬 Розмовний челендж', url: 'https://t.me/+sRa4QGV8osBkZjky' }],
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
      [{ text: "📞 Запис на безкоштовне пробне" }, { text: '📝 Почати тест' }],
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
      [{ text: 'Катерина' }, { text: 'Олег' }, { text: 'Лоліта' }],
      [{ text: 'Владислава' }, { text: 'Mike' }, { text: 'Ліза' }],
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
      [{ text: 'Парні. 8 занять' }, { text: 'Групові. 8 занять' }],
      // [{ text: 'Групові. 12 занять' }, { text: 'Парні. 12 занять' }],
      [{ text: 'Підготовка до НМТ Групові' }, { text: 'Індивідуальні. 8 занять' }],
      // [{ text: 'Індивідуальні. 12 занять' }, { text: 'Індивідуальні. 24 заняття' }],
      [{ text: 'Індивідуальні заняття з носієм. 8 занять' }, { text: 'Пакет Business English. 8 занять' }],
      [{ text: "Договір оферти" }],
      [{ text: "🏠 Головне меню" }],
    ],
    resize_keyboard: true,
  },
}