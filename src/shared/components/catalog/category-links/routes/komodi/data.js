import translite from "utils/translite"
import getNoIndexURLS from "../getNoIndexURLS"

const EMPTY_VALUES = []

export const RU = [
  "Современные",
  "В спальню",
  "В прихожую",
  "В гостиную",
  "Под телевизор",
  "С зеркалом",
  "Детские",
  "Пеленальные",
  "Угловые",
  "Высокие",
  "Большие",
  "Узкие",
  "Широкие",
  "Из массива",
  "ЛДСП",
  "МДФ",
  "Глянцевые",
  "На ножках",
  "С ящиками",
  //"С гладильной доской",
  "Белые",
  "Недорогие",
]

export const ENG = RU.map(v => translite(v, "-"))

export const DATA = RU.map((_, i) => ({ name: i, values: EMPTY_VALUES }))

export const NOINDEX_URLS = getNoIndexURLS(DATA, RU, ENG)
