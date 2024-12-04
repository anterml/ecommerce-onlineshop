import translite from "utils/translite"
import getNoIndexURLS from "../getNoIndexURLS"

export const RU = []
export const ENG = RU.map(v => translite(v, "-"))
export const DATA = []
export const NOINDEX_URLS = getNoIndexURLS(DATA, RU, ENG)
