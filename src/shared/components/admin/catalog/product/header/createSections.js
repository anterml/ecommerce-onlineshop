import { SECTIONS } from "utils/data/sections"

const MATERIALS = {
  massif: ["Береза", "Дерево (массив)", "Бук", "Ясень"],
  wood: [
    "Береза",
    "Дерево (массив)",
    "Бук",
    "Ясень",
    "ЛДСП",
    "МДФ",
    "Шпонированный МДФ",
    "Ламинированный МДФ",
  ],
  glass: ["Стекло", "Закаленное стекло"],
  metal: ["Металлокаркас", "Кованный металл"],
}

const S = (function () {
  return Object.keys(SECTIONS).reduce((acc, index) => {
    acc[SECTIONS[index]] = Number(index)
    return acc
  }, {})
})()

const push = (sections, name) => {
  sections.add(S[name])
}

const replaceEnding = value =>
  value.replace(/(ый|ой)$/, "ые").replace(/ий$/, "ие")

export default {
  stol(attrs) {
    const sections = new Set()
    push(sections, "Столы")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const types = [
          "Кухонный",
          "Обеденный",
          "Журнальный",
          "Письменный",
          "Компьютерный",
          "Офисный",
          "Кофейный",
          "Сервировочный",
          "Приставной",
          "Игровой",
          "Дизайнерский",
          "Детский",
          "Для руководителя", //
          "Для школьника", //
        ]
        if (types.includes(value)) {
          if (value === "Кофейный") push(sections, "Кофейные столики")
          else {
            push(sections, replaceEnding(value))
          }
        } else if (value.indexOf("Консоль") === 0)
          push(sections, "Столы-консоли")
        else if (value === "Стол-шкаф") push(sections, "Столы-шкафы")
      } else if (name === "Материал каркаса") {
        if (MATERIALS.massif.includes(value)) {
          push(sections, "Из массива")
          push(sections, "Деревянные")
        } else if (MATERIALS.wood.includes(value)) push(sections, "Деревянные")
        else if (MATERIALS.metal.includes(value))
          push(sections, "Металлические")
      } else if (
        name === "Материал столешницы" &&
        MATERIALS.glass.includes(value)
      ) {
        push(sections, "Стеклянные")
      } else if (name === "Трансформация") {
        push(sections, "Трансформеры")
        if (value === "Регулируемый по высоте")
          push(sections, "Регулируемые по высоте")
        else if (value === "Раздвижной") push(sections, replaceEnding(value))
      } else if (name === "Цвет" && value === "Белый") {
        push(sections, "Белые")
      } else if (name === "Форма") {
        if (value === "Круглый") push(sections, "Круглые")
        else if (value === "Овальный") push(sections, "Овальные")
        else if (value === "Угловой") push(sections, "Угловые")
      } else if (name === "Стиль" && value === "Лофт") {
        push(sections, value)
      } else if (name === "Размерность") {
        if (value === "Большой") push(sections, "Большие")
        else if (value === "Маленький") push(sections, "Маленькие")
      } else if (name === "Особенности") {
        const spec = [
          "С ящиками",
          "С полками",
          "С тумбой",
          "С надстройкой",
          "С подъемным механизмом",
        ]
        if (value === "Ножки на колесиках") push(sections, "На колесиках")
        else if (spec.includes(value)) push(sections, value)
      }
    }

    return [...sections]
  },

  tualetniy_stolik(attrs) {
    const sections = new Set()
    push(sections, "Столы")
    push(sections, "Туалетные столики")

    for (let { name, value } of attrs) {
      const types = ["Детский"]
      if (name === "Тип") {
        if (value === "Трельяж") push(sections, value)
        else if (types.includes(value)) {
          push(sections, replaceEnding(value))
        }
      } else if (name === "Цвет") {
        if (value === "Белый") push(sections, "Белые")
      } else if (name === "Форма") {
        if (value === "Угловой") push(sections, "Угловые")
      } else if (name === "Размерность") {
        if (value === "Маленький") push(sections, "Маленькие")
      } else if (name === "Особенности") {
        const spec = [
          "С зеркалом",
          "Без зеркала",
          "С подсведкой",
          "Откидной",
          "Узкий",
        ]

        if (spec.includes(value)) {
          if (value === "С подсведкой") push(sections, value)
          else push(sections, replaceEnding(value))
        }
      }
    }

    return [...sections]
  },

  stul(attrs) {
    const sections = new Set()
    push(sections, "Стулья")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const types = [
          "Детский",
          "Для кормления",
          "Для школьника",
          "Игровой",
          "Компьютерный",
          "Обеденный",
          "Ортопедический",
          "Письменный",
          "Растущий",
        ]
        if (types.includes(value)) push(sections, replaceEnding(value))
        else if (value === "Стул-кресло") push(sections, "Стулья-кресла")
      } else if (name === "Трансформация") {
        push(sections, "Трансформеры")
        if (value === "Регулируемый по высоте")
          push(sections, "Регулируемые по высоте")
        else push(sections, replaceEnding(value))
      } else if (name === "Материал каркаса") {
        if (MATERIALS.wood.includes(value)) push(sections, "Деревянные")
        if (MATERIALS.massif.includes(value)) push(sections, "Из массива")
        else if (MATERIALS.metal.includes(value))
          push(sections, "Металлические")
        else if (value === "Пластик") push(sections, "Пластиковые")
        else if (value === "Хром") push(sections, "Хром")
      } else if (name === "Материал обивки") {
        if (value === "Искусственная кожа" || value === "Экокожа")
          push(sections, "Экокожа")
        else if (value === "Натуральная кожа") push(sections, "Кожа")
      } else if (name === "Цвет") {
        const colors = ["Белый", "Прозрачный", "Черный"]
        if (/^(Красный|Бордовый|Коричнево-красный)$/i.test(value))
          push(sections, "Красные")
        else if (colors.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Форма") {
        if (value === "Круглый") push(sections, "Круглые")
      } else if (name === "Размещение") {
        if (value === "Гостиная") push(sections, "Для гостиной")
        else if (value === "Бар") push(sections, "Барные")
        else if (value === "Кухня") push(sections, "Для кухни")
      } else if (name === "Назначение") {
        if (value === "Для офиса") push(sections, "Офисные")
        else if (value === "Для дачи") push(sections, value)
        else if (value === "Для сада") push(sections, "Садовые")
      } else if (name === "Стиль") {
        if (value === "Классика") push(sections, value)
      } else if (name === "Особенности") {
        const spec = [
          "С подлокотниками",
          "Мягкий",
          "С деревянным сиденьем",
          "Жесткий",
        ]

        if (value === "Со спинкой" || value === "С деревянной спинкой")
          push(sections, value)
        else if (spec.includes(value)) push(sections, replaceEnding(value))
      }
    }

    return [...sections]
  },

  banketka(attrs) {
    const sections = new Set()
    push(sections, "Банкетки")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        if (value === "Кресло-банкетка") push(sections, "Кресла-банкетки")
        else if (value === "Прикроватная") push(sections, "Прикроватные")
        else if (value === "Детская") push(sections, "Детские")
        else if (value === "Мягкая") push(sections, "Мягкие")
        else if (value === "Для обуви") push(sections, value)
      } else if (name === "Цвет") {
        const colors = ["Белый", "Черный"]
        if (colors.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Стиль") {
        if (value === "Классика") push(sections, value)
      } else if (name === "Размещение") {
        if (value === "Спальня") push(sections, "Для спальни")
        else if (value === "Прихожая") push(sections, "В прихожую")
      } else if (name === "Особенности") {
        const spec = [
          "С каретной стяжкой",
          "С сиденьем",
          "С полкой",
          "С тумбой",
          "С ящиком",
          "Со спинкой",
          "Без спинки",
        ]
        if (spec.includes(value)) push(sections, value)
      }
    }

    return [...sections]
  },

  puf(attrs) {
    const sections = new Set()
    push(sections, "Пуфики")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        if (value === "Пуфик-мешок") push(sections, "Пуфики-мешки")
        else if (value === "Пуфик-кресло") push(sections, "Пуфики-кресла")
        else if (value === "Пуфик-диван") push(sections, "Пуфики-диваны")
        else if (value === "Пуфик-столик") push(sections, "Пуфики-столики")
        else if (value === "Трансформер") push(sections, "Трансформеры")
        else if (value === "Детский") push(sections, "Детские")
      } else if (name === "Цвет") {
        const colors = ["Белый"]
        if (colors.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Размещение") {
        if (value === "Спальня") push(sections, "В спальню")
        else if (value === "Прихожая") push(sections, "В прихожую")
        else if (value === "Коридор") push(sections, "В коридор")
      } else if (name === "Форма") {
        const forms = ["Круглый", "Квадратный"]
        if (forms.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Размерность") {
        if (value === "Большой") push(sections, "Большие")
      } else if (name === "Особенности") {
        push(sections, value)
      }
    }

    return [...sections]
  },

  sp_phone(attrs) {
    const sections = new Set()

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        if (value === "Смартфон") push(sections, "Защищенные смартфоны")
        else if (value === "Телефон") {
          push(sections, "Защищенные телефоны")
          push(sections, "Кнопочные")
        }
      } else if (name === "Защита") {
        if (value === "Водонепроницаемый" || value === "Противоударный")
          push(sections, replaceEnding(value))
      } else if (name === "Особенности") {
        if (value === "Встроенная рация") push(sections, "С рацией")
        else if (value === "С мощным аккумулятором")
          push(sections, "С мощным аккумулятором")
      } else if (name === "Степень защиты") {
        if (value === "IP-69K") push(sections, "IP69")
        else push(sections, value.replace("-", ""))
      }
    }

    return [...sections]
  },

  kreslo(attrs) {
    const replaceEnding = value =>
      value
        .replace(/кое$/, "кие")
        .replace(/(ый|ой|ое)$/, "ые")
        .replace(/ий$/, "ие")
    const sections = new Set()
    push(sections, "Кресла")
    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const types = [
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
          "Эргономичное",
        ]

        if (value === "Качель") push(sections, "Качели")
        else if (value === "Гамак") {
          push(sections, "Гамаки")
        } else if (value === "Папасан") {
          push(sections, "Папасаны")
        } else if (types.includes(value)) {
          push(sections, replaceEnding(value))
        }
      } else if (name === "Стиль") {
        if (value === "Классика") push(sections, "Классика")
      } else if (name === "Форма") {
        const values = ["Угловое", "Круглое"]
        if (values.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Назначение") {
        if (value === "Для дома") push(sections, value)
        else if (value === "Для сада") push(sections, "Садовые")
      } else if (name === "Конструктивные особенности") {
        const values = ["С подушкой", "С реклайнером", "На колесиках"]
        if (values.includes(value)) push(sections, value)
      } else if (name === "Материал каркаса") {
        if (value === "Хром") push(sections, value)
        else if (value === "Пластик") {
          push(sections, "Пластиковые")
        } else if (value === "Ротанг") push(sections, "Из ротанга")
        else if (MATERIALS.metal.includes(value))
          push(sections, "Металлические")
      } else if (name === "Материал обивки") {
        if (value === "Искусственная кожа" || value === "Экокожа")
          push(sections, "Экокожа")
        else if (value === "Натуральная кожа") push(sections, "Кожа")
        else if (value === "Ткань" || value === "Сетка") push(sections, value)
      } else if (name === "Размерность") {
        if (value === "Большое") push(sections, "Большие")
      } else if (name === "Цвет") {
        const colors = ["Белый", "Бежевый", "Черный", "Серый", "Коричневый"]
        if (/^(Красный|Бордовый|Коричнево-красный)$/i.test(value))
          push(sections, "Красные")
        else if (colors.includes(value)) push(sections, replaceEnding(value))
      }
    }

    return [...sections]
  },

  kreslo_kachalka(attrs) {
    const replaceEnding = value =>
      value
        .replace(/кое$/, "кие")
        .replace(/(ый|ой|ое)$/, "ые")
        .replace(/ий$/, "ие")
    const sections = new Set()
    push(sections, "Кресла-качалки")
    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const types = [
          "Глайдер",
          "Детское",
          "Для новорожденных",
          "Массажное",
          "Маятниковое",
          "Подвесное",
          "Складное",
        ]
        if (types.includes(value)) {
          push(sections, replaceEnding(value))
        }
      } else if (name === "Назначение") {
        if (value === "Для дачи") push(sections, value)
        else if (value === "Для сада") push(sections, "Садовые")
      } else if (name === "Особенности") {
        const values = ["С подножкой"]
        if (values.includes(value)) push(sections, value)
      } else if (name === "Материал каркаса") {
        if (value === "Ротанг") push(sections, "Из ротанга")
        else if (MATERIALS.metal.includes(value))
          push(sections, "Металлические")
        else if (MATERIALS.wood.includes(value)) push(sections, "Деревянные")
      } else if (name === "Материал обивки") {
        if (value === "Натуральная кожа") push(sections, "Кожа")
      }
    }

    return [...sections]
  },

  kreslo_meshok(attrs) {
    const replaceEnding = value =>
      value
        .replace(/кое$/, "кие")
        .replace(/(ый|ой|ое)$/, "ые")
        .replace(/ий$/, "ие")
    const sections = new Set()
    push(sections, "Кресла-мешки")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const types = ["Груша", "Детское", "Мяч"]
        if (types.includes(value)) {
          push(sections, replaceEnding(value))
        }
      }
    }

    return [...sections]
  },

  komod(attrs) {
    const sections = new Set()
    push(sections, "Комоды")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const values = ["Детский", "Пеленальный", "Под телевизор"]
        if (values.includes(value)) push(sections, replaceEnding(value))
      }
      if (name === "Цвет") {
        const colors = ["Белый"]
        if (colors.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Размещение") {
        if (value === "Спальня") push(sections, "В спальню")
        else if (value === "Прихожая") push(sections, "В прихожую")
        else if (value === "Гостиная") push(sections, "Для гостиной")
      } else if (name === "Форма") {
        const forms = ["Угловой"]
        if (forms.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Размерность") {
        const values = ["Узкий", "Широкий"]
        if (values.includes(value)) {
          push(sections, replaceEnding(value))
        } else if (value === "Большой") push(sections, "Большие")
      } else if (name === "Особенности") {
        const values = [
          "С зеркалом",
          "На ножках",
          "С ящиками",
          "С гладильной доской",
        ]
        if (values.includes(value)) push(sections, value)
        else if (value === "Глянцевый") push(sections, replaceEnding(value))
      } else if (name === "Материал каркаса") {
        if (MATERIALS.massif.includes(value)) push(sections, "Из массива")
        else if (value === "ЛДСП" || value === "МДФ") {
          push(sections, value)
        }
      }
    }

    return [...sections]
  },

  shkaf(attrs) {
    const sections = new Set()
    push(sections, "Шкафы")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const values = [
          "Угловой",
          "Книжный",
          "Детский",
          "Для белья",
          "Для одежды",
          "Для обуви",
          "Для посуды",
          "Винный",
          "Радиусный",
          "Створчатый",
          "Открытые",
        ]

        if (values.includes(value)) push(sections, replaceEnding(value))
        else if (value === "Шкаф-витрина") push(sections, "Шкафы-витрины")
        else if (value === "Шкаф-купе") push(sections, "Шкафы-купе")
        else if (value === "Шкаф-пенал") push(sections, "Шкафы-пеналы")
        else if (value === "Шкаф-стенка") push(sections, "Шкафы-стенки")
      } else if (name === "Особенности") {
        const values = [
          "Распашной",
          "С зеркалом",
          "Со стеклом",
          "С фотопечатью",
        ]
        if (values.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Наполнение") {
        if (value === "Полки") push(sections, "С полками")
        else if (value === "Ящики") push(sections, "С ящиками")
      } else if (name === "Цвет") {
        const colors = ["Белый"]
        if (colors.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Размещение") {
        if (value === "Прихожая") push(sections, "В прихожую")
        else if (value === "Комната") push(sections, "В комнату")
        else if (value === "Ванная") push(sections, "В ванную")
        else if (value === "Гостиная") push(sections, "Для гостиной")
        else if (value === "Спальня") push(sections, "В спальню")
        else if (value === "Коридор") push(sections, "В коридор")
        else if (value === "Кухня") push(sections, "Для кухни")
      } else if (name === "Установка") {
        const values = ["Встраеваемый", "Встроенный", "Навесной", "Напольный"]
        if (values.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Размерность") {
        const values = [
          "Узкий",
          "Одностворчатый",
          "Двухстворчатый",
          "Трехстворчатый",
          "2-дверный",
          "3-дверный",
          "4-дверный",
        ]
        if (values.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Материал дверей") {
        if (MATERIALS.glass.includes(value)) {
          push(sections, "Стеклянные")
        }
      }
    }

    return [...sections]
  },

  taburet(attrs) {
    const sections = new Set()
    push(sections, "Табуреты")

    for (let { name, value } of attrs) {
      if (name === "Тип") {
        const values = ["Лестница", "Детский", "Барный", "Винтовой"]
        if (values.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Форма") {
        if (value === "Круглый" || value === "Квадратный")
          push(sections, replaceEnding(value))
      } else if (name === "Цвет") {
        const colors = ["Белый", "Черный"]
        if (colors.includes(value)) push(sections, replaceEnding(value))
      } else if (name === "Размещение") {
        if (value === "Ванная") push(sections, "Для ванной")
        else if (value === "Кухня") push(sections, "Для кухни")
      } else if (name === "Назначение") {
        if (value === "Для сада") push(sections, "Садовые")
      } else if (name === "Материал каркаса") {
        if (value === "Пластик") {
          push(sections, "Пластиковые")
        } else if (MATERIALS.metal.includes(value))
          push(sections, "Металлические")
      }
    }

    return [...sections]
  },
}
