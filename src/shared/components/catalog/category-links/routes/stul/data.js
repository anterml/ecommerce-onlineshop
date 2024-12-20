import translite from "utils/translite"
import getNoIndexURLS from "../getNoIndexURLS"

export const RU = [
  "Для кухни",
  "Барные",
  "Деревянные",
  "Компьютерные",
  "Обеденные",
  "С подлокотниками",
  "Стулья-кресла",
  "Офисные",
  "Металлические",
  "Классические",
  "Мягкие",
  "Со спинкой",
  "Дизайнерские",
  "Современные",
  "Классика",
  "Высокие",
  "Для маленькой кухни",
  "Белые",
  "Недорогие",
  "Регулируемые",
  "Черные",
  "Красные",
  "С деревянным сиденьем",
  "Жесткие",
  "С деревянной спинкой",
  "Ортопедические",
  "Из массива",
  "Детские",
  "Для гостиной",
  "Экокожа",
  "Хром",
]

export const ENG = RU.map(v => translite(v, "-"))

export const DATA = [
  { name: 0, values: [2, 10, 1, 11, 12, 13, 4, 14, 15, 16, 17, 18] },
  { name: 1, values: [2, 8, 15, 11, 10, 19, 14, 20, 17, 21, 18] },
  { name: 2, values: [22, 10, 23, 11, 24, 5, 14, 17, 18] },
  { name: 3, values: [25, 20, 18] },
  { name: 4, values: [2, 26, 14, 27, 17, 18] },
  { name: 5, values: [10, 2, 1, 7, 14, 0, 11, 15, 17, 20, 18] },
  { name: 6, values: [5, 0, 28, 7, 3, 10, 2, 18] },
  { name: 7, values: [11, 25, 29, 8, 30, 10, 20] },
  { name: 8, values: [0, 7, 1, 11, 10, 17, 20, 18] },
  { name: 9, values: [0, 28, 1, 5, 10, 2, 17] },
]

export const NOINDEX_URLS = getNoIndexURLS(DATA, RU, ENG)
