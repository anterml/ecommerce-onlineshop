const dimensionText = {
  name: "Размерность",
  values: ["Большой", "Маленький"],
  filter: true,
  multi: true,
}

const doorNumber = {
  name: "Кол-во дверей",
  values: [
    "Однодверный",
    "2-х дверный",
    "3-х дверный",
    "4-х дверный",
    "5-ти дверный",
    "6-ти дверный",
  ],
  filter: true,
}

const doorOpenType = {
  name: "Тип открывания дверей",
  values: [
    "Раздвижные в стороны",
    "Убирающиеся вверх",
    "Открывающиеся в стороны",
    "Открывающиеся вправо",
  ],
  filter: true,
}

const foldingType = {
  name: "Тип раскладывания",
  values: [
    "Аккордеон",
    "Дельфин",
    "Еврокнижка",
    "Книжка",
    "Книжка 3-x позиционная",
    "Клик-кляк",
    "Раздвижной",
    "Раскладной",
    "Складной",
    "С подъемным механизмом",
    "Французская раскладушка",
  ],
  filter: true,
  multi: true,
}

const transformation = {
  name: "Трансформация",
  values: [
    "Аккордеон",
    "Дельфин",
    "Еврокнижка",
    "Книжка",
    "Книжка 3-x позиционная",
    "Клик-кляк",
    "Раздвижной",
    "Раскладной",
    "Складной",
    "Регулируемый по высоте",
    "Французская раскладушка",
  ],
  filter: true,
  multi: true,
}

const dimension = {
  name: "Габариты",
  type: "int",
  unit: "см",
  unitType: "(ДхШ)",
  tips: "200x150 или 200 150",
  filter: true,
  structure: "length width",
  multi: true,
}

const widthHeight = {
  name: "Габариты",
  type: "int",
  unit: "см",
  unitType: "(ШxВ)",
  tips: "200x150 или 200 150",
  filter: true,
  structure: "width height",
  multi: true,
}

const deepWidthHeight = {
  name: "Габариты",
  type: "int",
  unit: "см",
  unitType: "(ГхШхВ)",
  tips: "100x170x200 или 100 170 200",
  structure: "deep width height",
  filter: true,
  multi: true,
}

const lengthWidthHeight = {
  name: "Габариты",
  type: "int",
  unitType: "(ДхШхВ)",
  tips: "100x170x200 или 100 170 200",
  structure: "length width height",
  filter: true,
}

const unfoldingLengthWidthHeight = {
  ...lengthWidthHeight,
  name: "Габариты в раскладке",
  filter: false,
}

const dimensionSleepSpot = {
  name: "Спальное место",
  type: "int",
  unit: "см",
  unitType: "(ДхШ)",
  tips: "200x150 или 200 150",
  structure: "length width",
  filter: true,
  mulit: true,
}

const printView = {
  name: "Вид принта",
  values: [
    "Однотонный",
    "Цветочный",
    "Город",
    "Мультгерои",
    "Морская тематика",
    "Узоры",
    "Шелкография",
    "Ручная роспись",
    "Фрезеровка",
  ],
}

export const bodyMaterial = {
  name: "Материал каркаса",
  values: [
    "Алюминий",
    "Береза",
    "Бук",
    "Дерево (массив)",
    "Кованный металл",
    "ЛДСП",
    "Ламинированный МДФ",
    "Литьевой мрамор",
    "МДФ",
    "Меламин",
    "Металлокаркас",
    "Ротанг",
    "Фанера",
    "Пластик",
    "Шпонированный МДФ",
    "Экомассив",
    "Хром",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

export const facadeMaterial = {
  name: "Материал фасада",
  values: [
    "Алюминий",
    "Береза",
    "Бук",
    "Дерево (массив)",
    "ЛДСП",
    "Ламинированный МДФ",
    "МДФ",
    "Металлокаркас",
    "Стекло",
    "Шпонированный МДФ",
    "Экомассив",
    "Хром",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

export const bagetaMaterial = {
  name: "Материал багета",
  values: [
    "Дерево (массив)",
    "ЛДСП",
    "Ламинированный МДФ",
    "Литьевой мрамор",
    "МДФ",
    "Пенополеуретан",
    "Пластик",
    "Шпонированный МДФ",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

export const headMaterial = {
  name: "Материал изголовья",
  values: [
    "Акрил",
    "Велюр",
    "Дерево (массив)",
    "Жаккард",
    "Искусственный мех",
    "Искусственная замша",
    "Искусственная кожа",
    "Кованный металл",
    "ЛДСП",
    "Ламинированный МДФ",
    "Лен",
    "МДФ",
    "Натуральная кожа",
    "Полиэстер",
    "ППУ",
    "Ротанг",
    "Текстиль",
    "Ткань",
    "Хлопок",
    "Шенилл",
    "Шпонированный МДФ",
    "Экокожа",
    "Экомассив",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

export const upholsteryMaterial = {
  name: "Материал обивки",
  values: [
    "Акрил",
    "Букле",
    "Велюр",
    "Гобелен",
    "Жаккард",
    "Искусственный мех",
    "Искусственная замша",
    "Искусственная кожа",
    "Лен",
    "Микрофибра",
    "Натуральная кожа",
    "Полиэстер",
    "Рогожка",
    "Сетка",
    "Текстиль",
    "Ткань",
    "Ткань сетка",
    "Флок",
    "Хлопок",
    "Шенилл",
    "Экокожа",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

export const doorMaterial = {
  name: "Материал дверей",
  values: [
    "Береза",
    "Бук",
    "ДСП",
    "Дерево (массив)",
    "Ламинированный МДФ",
    "МДФ",
    "Палисандр",
    "Пластик",
    "Ротанг",
    "Стекло",
    "Шпонированный МДФ",
    "Экомассив",
    "Хром",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

export const countertopMaterial = {
  name: "Материал столешницы",
  values: [
    "Береза",
    "Бук",
    "Дерево (массив)",
    "Закаленное стекло",
    "Искусственный камень",
    "Кварцевый камень",
    "Керамика",
    "ЛДСП",
    "Ламинированный МДФ",
    "Литьевой мрамор",
    "МДФ",
    "Меламин",
    "Мрамор",
    "Палисандр",
    "Пластик",
    "Природный камень",
    "Стекло",
    "Шпонированный МДФ",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

export const fillerMaterial = {
  name: "Материал наполнителя",
  values: [
    "Дюрафил",
    "Латекс",
    "Пенополиуретан",
    "Полиамид",
    "Полиуретан",
    "Поролон",
    "Синтепон",
    "Холлофайбер",
  ],
  filter: true,
  multi: true,
}

export const podstolyaMaterial = {
  name: "Материал подстолья",
  values: [
    "Алюминий",
    "Дерево (массив)",
    "Ковка",
    "Металл",
    "Нержавеющая сталь",
    "Пластик",
    "Ротанг",
    "Сталь",
    "Хромированное",
    "Ясень",
  ],
  filter: true,
  multi: true,
}

const sleepWidth = {
  name: "Ширина спального места",
  type: "int",
  filter: true,
  multi: true,
}

const sleepLength = {
  name: "Длина спального места",
  type: "int",
  filter: true,
}

const maxLoad = {
  name: "Макс. нагрузка",
  type: "int",
}

const warranty = {
  name: "Гарантия",
  type: "int",
  unit: "мес.",
}

const size2 = {
  name: "Размеры",
  filter: true,
}

const weight = {
  name: "Вес",
  type: "int",
  unit: "кг",
  filter: true,
}

const packageType = {
  name: "Упаковка",
  values: ["Коробка", "Пакет", "Чехол"],
}

const appearance = {
  name: "Внешний вид",
  filter: true,
}

const form = {
  name: "Форма",
  values: [
    "Прямоугольный",
    "Квадратный",
    "Круглый",
    "Овальный",
    "Полукруг",
    "Угловой",
  ],
  filter: true,
}

const type = {
  name: "Тип",
  filter: true,
  multi: true,
}

const unfoldingSleepLength = {
  name: "Длина спального места в разложенном виде",
}

const unfoldingSleepWidth = {
  name: "Ширина спального места в разложенном виде",
}

const spotNumber = {
  name: "Количество мест",
}

const pillowNumber = {
  name: "Количество подушек",
}

const boxNumber = {
  name: "Количество ящиков",
}

const shelfNumber = {
  name: "Количество полок",
}

const specificity = {
  name: "Особенности",
  filter: true,
  multi: true,
}

const installing = {
  name: "Установка",
  filter: true,
}

const designFeature = {
  name: "Конструктивные особенности",
  filter: true,
  multi: true,
}

const seatHeight = {
  name: "Высота сиденья",
  unit: "см",
}

const seatWidth = {
  name: "Ширина сиденья",
  unit: "см",
}

const seatDeep = {
  name: "Глубина сиденья",
  unit: "см",
}

const seatMaxHeight = {
  name: "Макс. высота сиденья",
  unit: "см",
}

const seatMinHeight = {
  name: "Мин. высота сиденья",
  unit: "см",
}

const armrestHeight = {
  name: "Высота подлокотника",
  unit: "см",
}

const backrestHeight = {
  name: "Высота спинки",
  unit: "см",
}

const backrestWidth = {
  name: "Ширина спинки",
  unit: "см",
}

const brand = {
  name: "Бренд",
  filter: true,
  values: [
    "Compass",
    "ELEWOOD",
    "Elite Gift",
    "FORT",
    "FURNI TURNI",
    "MOBI",
    "Pointex",
    "SMT group",
    "TetChair",
    "Аванти",
    "Аврора",
    "Альтима",
    "Амадей",
    "Аристократ",
    "Асгард",
    "Благо-мебель",
    "БоссаНова",
    "Вернисаж",
    "ВМК-Шале",
    "Гамма-мебель",
    "Дана",
    "Диа-мебель",
    "ДревПром",
    "Дубодел",
    "ДЭФО",
    "Империя-мебель",
    "КМК",
    "Кавелио",
    "Карпентер",
    "Лавр",
    "Луи Дюпон",
    "Мери-мебель",
    "МЭРДЭС",
    "Мик Мебель",
    "МК Меридиан",
    "Натур Мебель",
    "Неман Мебель",
    "НИЖЕГОРОДМЕБЕЛЬ и К",
    "Сокол",
    "Стелла",
    "Сурская мебель",
    "ТехКомПро",
    "ТЕРМИНАЛ",
    "ТамбовМебель",
    "Топ-мебель",
    "Устье",
    "Шинуа",
    "Эвита",
    "Эдэм",
    "Эра",
    "Юг-мебель",
    "Юнел",
    "Юта",
    "Ярцево",
  ],
}

const kuhni_module_property_list = [
  {
    name: "Свойства",
    values: [
      "Полка",
      "Ящик",
      "Сушилка для посуды",
      "Лоток для кухонных принадлежностей",
      "Ручки",
      "Фасад",
      "Столешница",
      "Стеновая панель",
      "Плинтус угловой",
      "Заглушки",
      "Цоколь",
      "Кромка для плинтуса",
      "Профиль кухонный",
      "Мойка",
      "Подсветка",
    ],
  },
]

export const GENERAL_ATTRS = {
  furniture: [
    {
      name: "Назначение",
      values: [
        "Для бани",
        "Для дачи",
        "Для дома",
        "Для общественных мест",
        "Для офиса",
        "Для сада",
        "Для сауны",
        "Для школы",
        "Для улицы",
        "Для детского сада",
      ],
      filter: true,
      multi: true,
    },
    {
      name: "Размещение",
      values: [
        "Бар",
        "Ванная",
        "Веранда",
        "Гараж",
        "Гостиная",
        "Детская",
        "Кабинет",
        "Комната",
        "Коридор",
        "Кухня",
        "Прихожая",
        "Санузел",
        "Спальня",
        "Столовая",
        "Студия",
        "Терраса",
      ],
      filter: true,
      multi: true,
    },
    {
      name: "Стиль",
      values: [
        "Авангард",
        "Ампир",
        "Барокко",
        "Венский",
        "Готика",
        "Кантри",
        "Классика",
        "Лофт",
        "Минимализм",
        "Модерн",
        "Неоклассика",
        "Прованс",
        "Скандинавский",
        "Хай-тек",
      ],
      filter: true,
      multi: true,
    },
    {
      name: "Страна производитель",
      values: [
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
      filter: true,
    },
    brand,
    weight,
    warranty,
  ],

  electronics: [
    brand,
    {
      name: "Вес (гр.)",
      type: "int",
      filter: true,
    },
    warranty,
  ],

  modul_kuhni: [],
}

export const ATTRS = {
  krovat: [
    bodyMaterial,
    headMaterial,
    {
      ...type,
      values: [
        "Полуторная",
        "Односпальная",
        "Двухспальная",
        "Двухъярусная",
        "Детская",
        "Для девочек",
        "Для подростков",
        "Для взрослых",
        "Диван-кровать", // ?
        "Трансформер",
        "Кровать-машинка",
        "Ортопедические",
        "От года",
        "От 3 лет",
        "Угловая",
        /*
          "Кровати-диваны", // уже есть категория отдельная
          "Кровати-столы",
          "Кровати-машины",
          "Кровати-домики",
          "Кровати-дельфины",
          */
      ],
    },
    {
      ...transformation,
      values: ["Выдвижная", "3 в 1", "Подъемная", "Откидная"],
    },
    {
      name: "Основание",
      values: [
        "Без основания",
        "Ортопедическое основание",
        "С подъемным механизмом",
        "Мебельный щит",
      ],
      filter: true,
    },
    {
      ...specificity,
      values: [
        "С ящиками",
        "С бортиками",
        "С матрасом",
        "С мягкой спинкой",
        "С мягким изголовьем",
        "С изголовьем",
        "С диваном",
        "Со столом",
        "С рабочей зоной",
      ],
    },
    {
      name: "Кол-во уровней положения основания",
    },
    {
      ...dimensionText,
      values: ["Малогабаритная"],
    },

    lengthWidthHeight,
    dimensionSleepSpot,
    maxLoad,
  ],

  stol: [
    form,
    {
      ...type,
      values: [
        "Бюро",
        "Детский",
        "Дизайнерский",
        "Для ноутбука",
        "Для переговоров",
        "Для руководителя",
        "Для школьника",
        "Журнальный",
        "Игровой",
        "Компьютерный",
        "Консоль",
        "Консольный",
        "Кофейный",
        "Кухонный",
        "Обеденный",
        "Офисный",
        "Пеленальный",
        "Придиванный",
        "Приставной",
        "Письменный",
        "Под телефон",
        "Стойка ресепшн",
        "Стол-шкаф",
        "Сервировочный",
        "Чайный",
      ],
    },
    transformation,
    {
      ...specificity,
      values: [
        "Ножки на колесиках",
        "С ящиками",
        "С полками",
        "С тумбой",
        "С надстройкой",
      ],
    },
    {
      name: "Кол-во ножек",
      type: "int",
    },
    countertopMaterial,
    podstolyaMaterial,
    bodyMaterial,
    dimensionText,
    lengthWidthHeight,
    unfoldingLengthWidthHeight,
  ],

  krovat_cherdak: [bodyMaterial, dimension, sleepWidth, sleepLength],

  raskladushka: [bodyMaterial, lengthWidthHeight],

  tahta: [
    {
      name: "Внешний вид",
      values: ["Двухъярусная"],
      filter: true,
    },

    {
      ...form,
      values: ["Угловая"],
    },

    {
      name: "Форма спинки",
      values: ["Овальная", "Зеркальная"],
    },

    lengthWidthHeight,
  ],

  detskaya_krovat: [
    {
      name: "Тип",
      values: ["Детская кровать", "Кровать-чердак", "Двухъярусная"],
      filter: true,
    },
    lengthWidthHeight,
    dimensionSleepSpot,
  ],

  kushetka: [
    upholsteryMaterial,
    bodyMaterial,
    lengthWidthHeight,
    unfoldingSleepLength,
    unfoldingSleepWidth,
  ],

  divan_krovat: [
    upholsteryMaterial,
    bodyMaterial,
    fillerMaterial,
    pillowNumber,
    boxNumber,
    {
      ...spotNumber,
      values: ["2-x местный", "3-х местный"],
    },
    {
      ...form,
      values: ["Угловой"],
    },
    foldingType,
    lengthWidthHeight,
    unfoldingSleepLength,
    unfoldingSleepWidth,
  ],

  divan: [
    upholsteryMaterial,
    bodyMaterial,
    fillerMaterial,
    pillowNumber,
    boxNumber,
    {
      ...spotNumber,
      values: ["2-x местный", "3-х местный"],
    },
    {
      ...form,
      values: ["Угловой"],
    },
    foldingType,
    lengthWidthHeight,
    unfoldingSleepLength,
    unfoldingSleepWidth,
  ],

  sofa: [
    bodyMaterial,
    upholsteryMaterial,
    fillerMaterial,
    foldingType,
    {
      ...spotNumber,
      values: ["2-x местная", "3-х местная"],
    },
    {
      ...form,
      values: ["Угловая"],
    },
    lengthWidthHeight,
    unfoldingSleepLength,
    unfoldingSleepWidth,
  ],

  etajerka: [
    bodyMaterial,
    packageType,
    shelfNumber,
    {
      ...form,
      values: ["Угловая"],
    },
    {
      ...specificity,
      values: ["На колесиках"],
    },
    {
      ...installing,
      values: ["Настенная", "Напольная", "Навесная"],
    },
    lengthWidthHeight,
  ],

  komod: [
    {
      ...type,
      values: ["Детский", "Пеленальный", "Под телевизор"],
    },
    bodyMaterial,
    facadeMaterial,
    boxNumber,
    shelfNumber,
    packageType,
    {
      ...form,
      values: ["Угловой"],
    },
    {
      ...dimensionText,
      values: dimensionText.values.concat(["Узкий", "Широкий"]),
    },
    {
      ...specificity,
      values: [
        "Выдвижная внутренняя секция",
        "На колесиках",
        "С зеркалом",
        "Глянцевый",
        "На ножках",
        "С ящиками",
        "С гладильной доской",
      ],
      multi: true,
    },
    printView,
    lengthWidthHeight,
  ],

  shkaf: [
    {
      name: "Наполнение",
      values: ["Полки", "Штанги", "Ящики"],
      multi: true,
      filter: true,
    },
    {
      ...type,
      values: [
        "Угловой",
        "Книжный",
        "Мобильный",
        "Комбинированный",
        "Многофункциональный",
        "Детский",
        "Для белья",
        "Для одежды",
        "Для обуви",
        "Для посуды",
        "Платяной",
        "Шкаф-бюро",
        "Шкаф-витрина",
        "Шкаф-купе",
        "Шкаф-пенал",
        "Шкаф-стенка",
        "Винный",
        "Радиусный",
        "Створчатый",
        "Открытые",
      ],
    },
    {
      ...installing,
      values: [
        "Антресоль",
        "Встраеваемый",
        "Встроенный",
        "Навесной",
        "Напольный",
      ],
      multi: true,
    },
    {
      ...specificity,
      values: ["Распашной", "С зеркалом", "Со стеклом", "С фотопечатью"],
    },
    {
      ...dimensionText,
      values: dimensionText.values.concat([
        "Узкий",
        "Широкий",
        "Одностворчатый",
        "Двухстворчатый",
        "Трехстворчатый",
        "2-дверный",
        "3-дверный",
        "4-дверный",
      ]),
      multi: true,
    },
    doorOpenType,
    packageType,
    bodyMaterial,
    doorMaterial,
    lengthWidthHeight,
  ],

  stelaj: [
    {
      ...form,
      values: ["Угловой"],
    },
    bodyMaterial,
    lengthWidthHeight,
  ],

  bufet: [
    bodyMaterial,
    shelfNumber,
    boxNumber,
    {
      ...specificity,
      values: ["С зеркалом"],
      filter: false,
    },
    lengthWidthHeight,
  ],

  tualetniy_stolik: [
    bodyMaterial,
    {
      name: "Ориентация",
      values: ["Правая", "Левая"],
      multi: true,
      filter: true,
    },
    {
      ...type,
      values: ["Однотумбовый", "Двухтумбовый", "Трельяж", "Детский"],
    },
    {
      name: "Тип фасада",
      values: ["Ящики", "Дверцы"],
      multi: true,
      filter: true,
    },
    {
      ...specificity,
      values: [
        "Без зеркала",
        "С зеркалом",
        "С подсветкой",
        "Откидной",
        "Узкий",
      ],
    },
    dimensionText,
    lengthWidthHeight,
  ],

  polka: [
    {
      ...type,
      values: [
        "Для книг",
        "Для обуви",
        "Для ванной комнаты",
        "Для туалета",
        "Универсальная",
      ],
    },
    {
      ...form,
      values: ["Угловая", "Прямая"],
    },
    {
      ...installing,
      values: ["Настенная", "Напольная", "Подвесная"],
    },
    shelfNumber,
    bodyMaterial,
    lengthWidthHeight,
  ],

  stul: [
    {
      ...type,
      values: [
        "Детский",
        "Для кормления",
        "Для школьника",
        "Игровой",
        "Компьютерный",
        "Обеденный",
        "Ортопедический",
        "Письменный",
        "Растущий",
        "Стул-кресло",
      ],
    },
    {
      ...transformation,
      values: ["Складной", "Регулируемый по высоте"],
    },
    form,
    bodyMaterial,
    upholsteryMaterial,
    fillerMaterial,
    {
      ...specificity,
      values: [
        "С подлокотниками",
        "Мягкий",
        "Со спинкой",
        "С деревянным сиденьем",
        "С деревянной спинкой",
        "Жесткий",
      ],
    },
    lengthWidthHeight,
    maxLoad,
    seatHeight,
    seatWidth,
    seatDeep,
    seatMaxHeight,
    seatMinHeight,
    armrestHeight,
    backrestHeight,
    backrestWidth,
  ],

  taburet: [
    {
      ...type,
      values: ["Лестница", "Детский", "Барный", "Винтовой"],
    },
    bodyMaterial,
    form,
    lengthWidthHeight,
  ],

  kreslo: [
    bodyMaterial,
    upholsteryMaterial,
    {
      ...type,
      values: [
        "Вращающееся",
        "Гамак",
        "Геймерское",
        "Детское",
        "Для руководителя",
        "Игровое",
        "Качель",
        "Кокон",
        "Компьютерное",
        "Ортопедическое",
        "Офисное",
        "Папасан",
        "Плетеное",
        "Подвесное",
        "Раскладное",
        "Складное",
        "Эргономичное",
      ],
    },
    {
      ...designFeature,
      values: [
        "На колесиках",
        "Регулировка по высоте",
        "С подушкой",
        "С реклайнером",
      ],
    },
    {
      ...form,
      values: ["Круглое", "Угловое"],
    },
    {
      ...dimensionText,
      values: ["Большое"],
    },
    lengthWidthHeight,
    maxLoad,
    seatHeight,
    seatWidth,
    seatDeep,
    seatMaxHeight,
    seatMinHeight,
    armrestHeight,
    backrestHeight,
    backrestWidth,
  ],

  kreslo_meshok: [
    bodyMaterial,
    lengthWidthHeight,
    {
      ...type,
      values: ["Груша", "Детское", "Мяч"],
    },
    {
      ...size2,
      values: ["L", "XL", "XXL"],
      multi: true,
    },
  ],

  kreslo_kachalka: [
    {
      ...type,
      values: [
        "Глайдер",
        "Детское",
        "Для новорожденных",
        "Массажное",
        "Маятниковое",
        "Подвесное",
        "Складное",
      ],
    },
    {
      ...specificity,
      values: ["С подножкой"],
    },
    bodyMaterial,
    upholsteryMaterial,
    maxLoad,
    lengthWidthHeight,
  ],

  banketka: [
    {
      ...type,
      values: [
        "Детская",
        "Для обуви",
        "Кресло-банкетка",
        "Мягкая",
        "Прикроватная",
      ],
    },
    {
      ...specificity,
      values: [
        "С каретной стяжкой",
        "С сиденьем",
        "С полкой",
        "С тумбой",
        "С ящиком",
        "Со спинкой",
        "Без спинки",
        "Регулировка по высоте",
      ],
    },
    lengthWidthHeight,
    seatHeight,
    seatWidth,
    seatDeep,
    seatMaxHeight,
    seatMinHeight,
  ],

  puf: [
    {
      ...type,
      values: [
        "Пуфик-мешок",
        "Пуфик-кресло",
        "Пуфик-диван",
        "Пуфик-столик",
        "Трансформер",
        "Детский",
      ],
    },
    {
      ...specificity,
      values: ["С ящиками", "Со спинкой"],
    },
    form,
    dimensionText,
    bodyMaterial,
    upholsteryMaterial,
    packageType,
    lengthWidthHeight,
  ],

  zerkalo: [
    {
      ...type,
      values: ["Настенное", "Напольное", "Навесное"],
    },
    {
      ...form,
      values: ["Круглое", "Прямоугольное", "Овальное"],
    },
    {
      name: "Материал багета",
      values: ["Пластик", "Металл", "Дерево", "Полиуретан"],
      multi: true,
      filter: true,
    },
    widthHeight,
  ],

  tumba: [
    bodyMaterial,
    doorMaterial,
    facadeMaterial,
    boxNumber,
    shelfNumber,
    packageType,
    {
      ...type,
      values: [
        "Сундук",
        "Прикроватная",
        "Подкатная",
        "Тумба",
        "Тумба под телефон",
        "Тумба под раковину",
        "ТВ тумба",
        "Обувница",
        "Угловая",
      ],
    },
    {
      ...specificity,
      values: ["Выдвижная внутренняя секция", "На колесиках"],
    },
    printView,
    lengthWidthHeight,
  ],

  vitrina: [
    bodyMaterial,
    facadeMaterial,
    shelfNumber,
    boxNumber,
    {
      ...specificity,
      values: ["С зеркалом"],
      filter: false,
    },
    lengthWidthHeight,
  ],

  stenka: [
    bodyMaterial,
    facadeMaterial,
    shelfNumber,
    boxNumber,
    {
      ...specificity,
      values: ["С зеркалом"],
      filter: false,
    },
    lengthWidthHeight,
  ],

  veshalka: [
    bodyMaterial,
    upholsteryMaterial,
    {
      ...type,
      values: [
        "Гардеробная",
        "Костюмная",
        "Напольная",
        "Настенная",
        "Групповая",
      ],
    },
    lengthWidthHeight,
  ],

  prihojaya: [
    {
      name: "Наполнение",
      values: ["Полки", "Штанги", "Ящики"],
      multi: true,
    },
    {
      ...type,
      values: ["Угловая", "Напольная", "Настенная"],
    },
    packageType,
    bodyMaterial,
    lengthWidthHeight,
    {
      ...specificity,
      values: ["Распашная", "С зеркалом"],
    },
  ],

  winniy_shkaf: [
    bodyMaterial,
    facadeMaterial,
    shelfNumber,
    boxNumber,
    {
      ...specificity,
      filter: false,
      values: ["С зеркалом"],
    },
    lengthWidthHeight,
  ],

  podstavka: [
    {
      ...form,
      values: [
        "Прямоугольная",
        "Квадратная",
        "Круглая",
        "Овальная",
        "Полукруг",
        "Угловая",
      ],
    },
    {
      ...type,
      values: ["Приставная", "Отдельностоящая", "Цветочница"],
    },
    {
      name: "Особенности",
      values: ["Ножки на колесиках"],
      multi: true,
    },
    {
      name: "Кол-во ножек",
      type: "int",
    },
    countertopMaterial,
    bodyMaterial,
    lengthWidthHeight,
  ],

  sp_phone: [
    {
      name: "Тип",
      values: ["Смартфон", "Телефон"],
      filter: true,
      multi: false,
    },
    {
      ...bodyMaterial,
      filter: false,
    },
    {
      name: "Встроенная память",
      filter: true,
      type: "int",
    },
    {
      name: "Оперативная память (Гб)",
      filter: true,
      type: "int",
    },
    {
      name: "Кол-во ядер процессора",
      filter: true,
      type: "int",
    },
    {
      name: "Кол-во SIM",
      type: "int",
      filter: true,
    },
    {
      name: "Диагональ экрана",
      filter: true,
      multi: true,
      values: [],
      type: "int",
    },
    {
      name: "Камера (Мп)",
      type: "int",
      filter: true,
    },
    {
      name: "Слот для карты памяти",
      filter: true,
      values: [
        "microSD до 256Gb",
        "microSD до 128Gb",
        "microSD до 64Gb",
        "microSD до 32Gb",
        "microSD до 16Gb",
      ],
    },
    {
      name: "Разрешение экрана",
      tips: "480x800",
    },
    {
      name: "Габариты (ВxШxТ)",
      tips: "159x83x16",
    },
    {
      name: "Ёмкость аккумулятора (мАч)",
      filter: true,
      type: "int",
    },
    {
      name: "Защита",
      values: ["Водонепроницаемый", "Противоударный"],
      filter: true,
      multi: true,
    },
    {
      name: "Степень защиты",
      values: ["IP-69K", "IP-68", "IP-67", "IP-54"],
      filter: true,
      multi: true,
    },
    {
      name: "Тип аккумулятора",
      values: ["Li-ion", "Li-pon"],
    },
    {
      name: "Особенности",
      values: [
        "Встроенная рация",
        "Фонарик",
        "Зарядка от USB",
        "Беспроводная зарядка",
        "Сканер отпечатка пальца",
        "Двойная тыловая камера",
        "Поддержка 4G (LTE)",
        "С мощным аккумулятором",
        "FM-радио",
        "NFC",
      ],
      filter: true,
      multi: true,
    },
  ],

  kuhnya: [],
}
