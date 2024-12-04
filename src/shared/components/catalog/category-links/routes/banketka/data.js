import translite from "utils/translite"
import getNoIndexURLS from "../getNoIndexURLS"

const EMPTY_VALUES = []

export const RU = [
  "В прихожую",
  "С сиденьем", //
  "С ящиком", //
  "С полкой", //
  "С тумбой", //
  "С каретной стяжкой", //
  "Со спинкой", //
  "Без спинки", //
  "Для спальни",
  "Для обуви", //
  "Прикроватные", //
  "Детские", //
  "Мягкие", //
  "Кресла-банкетки", //
  "Классические",
  "Белые",
  "Черные",
  "Недорогие",
]

export const ENG = RU.map(v => translite(v, "-"))

export const DATA = RU.map((_, i) => ({ name: i, values: EMPTY_VALUES }))

export const NOINDEX_URLS = getNoIndexURLS(DATA, RU, ENG)
