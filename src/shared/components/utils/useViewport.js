import React, { useState, useEffect } from "react"

const OnViewPort = elemId => {
  const [loaded, change] = useState(false)

  useEffect(() => {
    const elem = document.getElementById(elemId)
    if (elem && !loaded) {
      const scrollWindow = () => {
        const { top } = elem.getBoundingClientRect()
        if (top - window.innerHeight <= 0) {
          if (!loaded) {
            change(true)
          }
        }
      }

      // проверяем, находится ли элемент в области видимости сразу при загрузке страницы
      scrollWindow()

      window.addEventListener("scroll", scrollWindow)
      return () => window.removeEventListener("scroll", scrollWindow)
    }
  }, [loaded])

  return loaded
}

export default OnViewPort
