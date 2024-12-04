import translite from "utils/translite"
import getNoIndexURLS from "../getNoIndexURLS"

const EMPTY_VALUES = []

export const RU = [
  "В прихожую",
  "В спальню",
  "В коридор", //
  "Пуфики-мешки", //
  "Пуфики-кресла", //
  "Пуфики-диваны", //
  "С ящиками", //
  "Детские", //
  "Большие", //
  "Круглые", //
  "Квадратные", //
  "Белые",
  "Недорогие",
]

export const ENG = RU.map(v => translite(v, "-"))

export const DATA = RU.map((_, i) => ({ name: i, values: EMPTY_VALUES }))

export const NOINDEX_URLS = getNoIndexURLS(DATA, RU, ENG)
