import translite from "utils/translite"
import getNoIndexURLS from "../getNoIndexURLS"
const EMPTY_VALUES = []

export const RU = [
  "Противоударные",
  "Водонепроницаемые",
  "С мощным аккумулятором",
  "IP69",
  "IP68",
  "IP67",
  "IP54",
  "С рацией",
  "Недорогие",
]

export const ENG = RU.map(v => translite(v, "-"))

export const DATA = RU.map((_, i) => ({ name: i, values: EMPTY_VALUES }))

export const NOINDEX_URLS = getNoIndexURLS(DATA, RU, ENG)
