export const ATTRS_GENERAL_VALUES = {
  upholstery_material: [
    "Велюр",
    "Жаккард",
    "Искуственная замша",
    "Искуственная кожа",
    "Искусственный мех",
    "Натуральная кожа",
    "Лен",
    "Текстиль",
    "Ткань",
    "Хлопок",
    "Шенилл",
    "Экокожа",
    "Акрил",
    "Рогожка",
    "Флок",
    "Микрофибра",
    "Гобелен",
    "Букле",
  ],
  body_material: [
    "Береза",
    "Бук",
    "ЛДСП",
    "Дерево (массив)",
    "Ламинированная ЛДСП",
    "МДФ",
    "Экомассив",
  ],
  door_material: [
    "Береза",
    "Бук",
    "ДСП",
    "Дерево (массив)",
    "Ламинированная ЛДСП",
    "МДФ",
    "Пластик",
    "Ротанг",
    "Палисандр",
    "Экомассив",
  ],
  filler_material: [
    "Пенополиуретан",
    "Пеноуретан ППУ",
    "Полиамид",
    "Полиуретан",
    "Поролон",
    "Холлофайбер",
    "Дюрафил",
    "Синтепон",
    "Латекс",
  ],
  countertop_material: [
    "Береза",
    "Бук",
    "ЛДСП",
    "Дерево (массив)",
    "Закаленное стекло",
    "Керамика",
    "Ламинированная ЛДСП",
    "МДФ",
    "Мрамор",
    "Палисандр",
    "Пластик",
    "Стекло",
    "Искусственный камень",
    "Кварцевый камень",
    "Природный камень",
  ],
  podstolya_material: [
    "Дерево (массив)",
    "Металл",
    "Нержавеющая сталь",
    "Ротанг",
    "Сталь",
    "Алюминий",
    "Ковка",
    "Хромированное",
    "Пластик",
  ],
  headboard_material: [
    "Велюр",
    "Жаккард",
    "Искуственная замша",
    "Искуственная кожа",
    "Искусственный мех",
    "Натуральная кожа",
    "Лен",
    "Текстиль",
    "Ткань",
    "Хлопок",
    "Шенилл",
    "Экокожа",
    "Акрил",
    "ЛДСП",
    "Ротанг",
    "Дерево (массив)",
    "Полиэстер",
    "Экомассив",
  ],

  folding_type: [
    "Раздвижной",
    "Раскладной",
    "Трансформер",
    "Книжка",
    "Французская раскладушка",
  ],

  purpose: [
    "Для офиса",
    "Для дачи",
    "Для дома",
    "Для сада",
    "Для школы",
    "Для улицы",
    "Для общественных мест",
    "Для бани",
    "Для сауны",
  ],

  location: [
    "Детская",
    "Гостиная",
    "Спальня",
    "Кабинет",
    "Кухня",
    "Прихожая",
    "Ванная",
    "Санузел",
    "Студия",
    "Веранда",
    "Терраса",
    "Гараж",
    "Столовая",
    "Бар",
  ],

  package_type: ["Коробка", "Пакет", "Чехол"],

  country: [
    "Беларусь",
    "Бельгия",
    "Великобритания",
    "Германия",
    "Индонозия",
    "Италия",
    "Китай",
    "Малайзия",
    "Россия",
    "Тайвань",
    "Филиппины",
    "Франция",
    "Швеция",
    "Югославия",
  ],

  door_open_type: [
    "Раздвижные в стороны",
    "Убирающиеся вверх",
    "Открывающиеся в стороны",
    "Открывающиеся влево",
    "Открывающиеся вправо",
  ],

  door_number_type: [
    "Однодверный",
    "2-х дверный",
    "3-х дверный",
    "4-х дверный",
    "5-ти дверный",
    "6-ти дверный",
  ],
}

export const ATTRS_VALUES = {
  /* - Кресла, Стулья, Табуреты - */

  "kreslo": {
    location: ["Детская", "Гостиная", "Кабинет", "Столовая", "Спальня"],
    purpose: [
      "Для офиса",
      "Для дачи",
      "Для дома",
      "Для сада",
      "Для улицы",
      "Для школы",
      "Для общественных мест",
    ],
    type: [
      "Компьютерное",
      "Компьютерное детское",
      "Детское",
      "Офисное",
      "Складное",
      "Вращающееся",
      "Геймерское",
    ],
    design_feature: ["Регулировка по высоте"],
  },

  // кресло-мешок
  "kreslo_meshok": {},

  // кресло-качалка
  "kreslo_kachalka": {},

  "banketka": {
    design_feature: ["Регулировка по высоте"],
  },

  // пуф
  "puf": {},

  // табурет
  "taburet": {},

  "stul": {
    design_feature: ["Потайной ящик", "Регилировка по высоте"],
  },

  "stol": {
    type: [
      "Компьютерный",
      "Журнальный",
      "Обеденный",
      "Кухонный",
      "Кофейный",
      "Чайный",
      "Письменный",
      "Офисный",
      "Придиванный",
      "Приставной",
      "Туалетный",
      "Стойка ресепшн",
      "Пеленальный",
      "Для переговоров",
      "Для ноутбука",
      "Под телефон",
      "Сервировочный",
      "Бюро",
      "Консоль",
    ],
    specificity: [
      "Полка для клавиатуры",
      "Ножки на колесиках",
      "Стопоры колес",
      "Регилировка по высоте",
    ],
    form: [
      "Прямоугольный",
      "Квадратный",
      "Круглый",
      "Овальный",
      "Полукруг",
      "Угловой",
    ],
  },

  /* - Кровати, диваны, кушетки ... - */

  "krovat": {
    location: ["Спальня", "Кабинет"],
    appearance: ["Подъёмная кровать", "Двухярусная"],
    headboard_location: ["Сверху"],
    lattice: ["Металлическая", "Без решетки"],
  },

  "krovat_cherdak": {
    location: ["Спальня", "Кабинет"],
  },

  "raskladushka": {
    purpose: ["Для дома", "Для дачи", "Для офиса"],
  },

  "tahta": {
    form: ["Угловая"],
    back_form: ["Овальная", "Зеркальная"],
  },

  "detskaya_krovat": {
    appearance: ["Двухярусная"],
  },

  "kushetka": {},

  "divan_krovat": {
    spot_number: ["2-x местный", "3-х местный"],
    form: ["Угловой"],
  },

  "divan": {
    spot_number: ["2-x местный", "3-х местный"],
    form: ["Угловой"],
  },

  "sofa": {
    location: ["Спальня", "Гостиная", "Детская", "Столовая"],
    purpose: ["Для дома", "Для дачи", "Для офиса"],
    spot_number: ["2-x местная", "3-х местная"],
    form: ["Угловой"],
  },

  /* - Шкафы - */
  "shkaf": {
    type: [
      "Книжный",
      "Мобильный",
      "Комбинированный",
      "Многофункциональный",
      "Детский",
      "Для белья",
      "Для одежды",
      "Для обуви",
      "Платяной",
      "Шкаф-бюро",
      "Шкаф-витрина",
    ],
    form: ["Угловой"],
    installing: ["Настенный", "Напольный", "Навесной"],
  },

  "etajerka": {
    form: ["Угловая"],
    specificity: ["На колесиках"],
    installing: ["Настенная", "Напольная", "Навесная"],
  },

  "komod": {
    purpose: ["Для дома", "Для дачи", "Для офиса"],
    specificity: ["Выдвижная внутренняя секция", "На колесиках"],
    print_view: [
      "Однотонный",
      "Цветочный",
      "Город",
      "Мультгерои",
      "Морская тематика",
      "Узоры",
    ],
  },

  // Стеллаж
  "stelaj": {
    form: ["Угловой"],
  },

  // Антресоль
  "mezzanine": {},

  "bufet": {},

  // Трюмо
  "tualetniy_stolik": {},

  "polka": {
    type: ["Для книг", "Для обуви", "Для ванной комнаты", "Для туалета"],
    form: ["Угловая", "Прямая"],
    installing: ["Настенная", "Напольная", "Подвесная"],
  },

  "smartwatch": {},

  "sp-phone": {
    type: ["Смартфон", "Телефон"],
  },
}