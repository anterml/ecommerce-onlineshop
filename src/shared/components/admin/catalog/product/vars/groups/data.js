import {
  bodyMaterial,
  upholsteryMaterial,
  podstolyaMaterial,
  fillerMaterial,
  doorMaterial,
  countertopMaterial,
  headMaterial,
  facadeMaterial,
  bagetaMaterial,
} from "utils/data/attrs"

import COLORS from "utils/data/colors"
const COLORS_NAMES = Object.keys(COLORS).sort()

const price = {
  name: "Цена",
  engName: "price",
}

const category = {
  name: "Категория",
  engName: "category",
}

const imageUrl = {
  name: "Адрес картинки",
  engName: "imageUrl",
}

const fabric = {
  name: "Фабрика",
  engName: "fabric",
}

const bgSize = {
  name: "Отображение",
  values: ["contain", "cover", "auto"],
  engName: "backgroundSize",
}

const material = {
  name: "Материал",
  engName: "material",
  multi: true,
}

const FIELDS = {
  bodyColors: {
    name: "Цвет каркаса",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: bodyMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  upholsteryColors: {
    name: "Цвет обивки",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: upholsteryMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  podstolyaColors: {
    name: "Цвет подстолья",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: podstolyaMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  fillerColors: {
    name: "Цвет наполнителя",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: fillerMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  doorColors: {
    name: "Цвет дверей",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: doorMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  countertopColors: {
    name: "Цвет столешницы",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: countertopMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  headColors: {
    name: "Цвет изголовья",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: headMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  facadeColors: {
    name: "Цвет фасада",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: facadeMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  bagetaColors: {
    name: "Цвет багета",
    values: COLORS_NAMES,
    sfields: [
      {
        ...material,
        values: bagetaMaterial.values,
      },
      imageUrl,
    ],
    multi: true,
  },

  legColors: {
    name: "Цвет ножек",
    values: COLORS_NAMES,
    sfields: [imageUrl],
    multi: true,
  },

  printView: {
    name: "Вид принта",
    sfields: [
      {
        ...material,
        values: ["Шенилл", "Экокожа", "Кожзам", "Жаккард"],
        multi: false,
      },
      category,
      {
        ...fabric,
        values: ["Шенилл", "Экокожа", "Кожзам", "Жаккард"],
        multi: false,
      },
      bgSize,
    ],
  },

  lengthWidthHeight: {
    name: "Размеры",
    type: "dimension",
  },

  size: {
    name: "Размер",
    type: "dimension",
  },

  equipment: {
    name: "Комплектация",
    values: ["Без матраса", "С матрасом"],
  },

  sleepSpot: {
    name: "Спальные места",
    type: "dimension",
  },

  orientation: {
    name: "Ориентация",
    values: ["Левый", "Правый"],
  },

  facade: {
    name: "Фасад",
    value: ["Стекло", "Глухой"],
  },
}

export const CATEGORY_FIELDS = {
  banketka: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  bufet: [FIELDS.bodyColors, FIELDS.lengthWidthHeight, FIELDS.printView],

  veshalka: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.size, // удалить или size или lengthWidthHeight
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  winniy_shkaf: [
    FIELDS.bodyColors,
    FIELDS.facadeColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  vitrina: [
    FIELDS.bodyColors,
    FIELDS.facadeColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  detskaya_krovat: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.equipment,
    FIELDS.sleepSpot,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  divan: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.sleepSpot,
    FIELDS.orientation,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  divan_krovat: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.orientation,
    FIELDS.sleepSpot,
    FIELDS.equipment,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  zerkalo: [FIELDS.bagetaColors, FIELDS.lengthWidthHeight, FIELDS.printView],

  komod: [
    FIELDS.bodyColors,
    FIELDS.facadeColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
    // ручки
  ],

  kreslo: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.equipment,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  kreslo_kachalka: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  kreslo_meshok: [
    FIELDS.upholsteryColors,
    {
      name: "Размер",
      values: ["L", "XL", "XXL"],
    },
    FIELDS.printView,
  ],

  krovat: [
    FIELDS.bodyColors,
    FIELDS.headColors,
    FIELDS.sleepSpot,
    FIELDS.equipment,
    FIELDS.printView,
    {
      name: "Тип опоры",
      values: ["На ножках", "На колёсиках"],
    },
    {
      name: "Основание",
      values: [
        "Без основания",
        "Ортопедическое основание",
        "С подъемным механизмом",
        "Мебельный щит",
      ],
    },
  ],

  krovat_cherdak: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.sleepSpot,
    FIELDS.equipment,
    FIELDS.printView,
  ],

  kushetka: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.orientation,
    FIELDS.lengthWidthHeight,
    FIELDS.sleepSpot,
    FIELDS.printView,
  ],

  podstavka: [
    FIELDS.bodyColors,
    FIELDS.countertopColors,
    //FIELDS.countertopSize,
    FIELDS.legColors,
    FIELDS.orientation,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  polka: [
    FIELDS.bodyColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
    FIELDS.facade,
    {
      name: "Наполнение",
      values: ["Полка стекло", "Полка деревянная"],
    },
  ],

  prihojaya: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.facadeColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  puf: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  raskladushka: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  sofa: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.orientation,
    FIELDS.lengthWidthHeight,
    FIELDS.sleepSpot,
    FIELDS.printView,
  ],

  stelaj: [
    FIELDS.bodyColors,
    FIELDS.facadeColors,
    {
      name: "Цвет полок",
      values: COLORS_NAMES,
    },
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
    FIELDS.facade,
    {
      name: "Количество модулей",
    },
    {
      name: "Наполнение",
      values: ["Полка стекло", "Полка деревянная"],
    },
  ],

  stenka: [
    FIELDS.bodyColors,
    FIELDS.facadeColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  stol: [
    FIELDS.bodyColors,
    FIELDS.facadeColors,
    FIELDS.countertopColors,
    FIELDS.legColors,
    FIELDS.orientation,
    //FIELDS.countertopSize,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  stul: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  taburet: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.legColors,
    {
      name: "Цвет сиденья",
      value: COLORS_NAMES,
    },
    FIELDS.size,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  tahta: [
    FIELDS.bodyColors,
    FIELDS.upholsteryColors,
    FIELDS.sleepSpot,
    FIELDS.equipment,
    FIELDS.printView,
  ],

  tualetniy_stolik: [
    FIELDS.bodyColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  tumba: [
    FIELDS.bodyColors,
    FIELDS.doorColors,
    FIELDS.facadeColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],

  shkaf: [
    FIELDS.bodyColors,
    FIELDS.facadeColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
    {
      name: "Размерный ряд",
      values: [
        "1-дверный",
        "2-дверный",
        "3-дверный",
        "4-дверный",
        "5-дверный",
        "6-дверный",
        "7-дверный",
        "8-дверный",
        "9-дверный",
      ],
    },
    {
      name: "Зеркало",
      values: ["С зеркалом", "С зеркалами", "Без зеркала", "Без зеркал"],
    },
  ],

  etajerka: [FIELDS.bodyColors, FIELDS.lengthWidthHeight, FIELDS.printView],

  sp_phone: [
    {
      ...FIELDS.bodyColors,
      name: "Цвет",
    },
  ],

  kuhnya: [
    {
      ...FIELDS.bodyColors,
      name: "Цвет корпуса",
    },
    {
      ...FIELDS.facadeColors,
      name: "Цвет фасада",
    },
    {
      ...FIELDS.facadeColors,
      name: "Цвет фасада (верх)",
    },
    {
      ...FIELDS.facadeColors,
      name: "Цвет фасада (низ)",
    },
    {
      ...FIELDS.countertopColors,
    },
    {
      name: "Ручки",
    },
    {
      name: "Полка",
    },
    {
      name: "Ящик",
    },
    {
      name: "Сушилка для посуды",
    },
    {
      name: "Лоток для кухонных принадлежностей",
    },
    {
      name: "Фасад",
    },
    {
      name: "Столешница",
    },
    {
      name: "Стеновая панель",
    },
    {
      name: "Плинтус угловой",
    },
    {
      name: "Заглушки",
    },
    {
      name: "Цоколь",
      values: ["Торцевой", "Целиковый"],
    },
    {
      name: "Кромка для плинтуса",
    },
    {
      name: "Профиль кухонный",
      values: ["Промежуточный", "Торцевой", "Угловой"],
    },
    {
      name: "Мойка",
    },
    {
      name: "Подсветка",
    },
    FIELDS.orientation,
    FIELDS.legColors,
    FIELDS.lengthWidthHeight,
    FIELDS.printView,
  ],
}
