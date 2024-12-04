import TabsElement from "./tabs-element"
import TabsControl from "./tabs-control"

export const TAB_VALUES = [
  "Основные",
  "Картинки",
  "Свойства",
  "Изменение цены полей",
]
export const TAB_CLONE_VALUES = ["Основные", "Свойства"]
const keyName = "admin-kuhnya-part-tab-index"

const getTabIndex = values => {
  if (typeof window !== "undefined") {
    const index = Number(window.localStorage.getItem(keyName))
    if (typeof index === "number" && values[index]) return index
  }
}

const setTabIndex = index => {
  if (typeof window !== "undefined") window.localStorage.setItem(keyName, index)
}

export default TabsControl(TabsElement, getTabIndex, setTabIndex)
