import translite from "utils/translite"
import getNoIndexURLS from "../getNoIndexURLS"

export const RU = []

const EMPTY_VALUES = []

export const DATA = RU.map((_, i) => ({ name: i, values: EMPTY_VALUES }))
export const ENG = RU.map(v => translite(v, "-"))
export const NOINDEX_URLS = getNoIndexURLS(DATA, RU, ENG)
