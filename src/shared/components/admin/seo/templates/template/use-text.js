import React, { useState, useEffect } from "react"

const useText = (text, selectedId, save) => {
  const [value, set] = useState(text)
  const changeText = e => set(e.target.value)
  const saveText = () => save(selectedId, "text", value)

  useEffect(() => {
    set(text)
  }, [selectedId])

  return [value, changeText, saveText]
}

export default useText
