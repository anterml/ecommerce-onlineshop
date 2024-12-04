export const getImageGroupName = category => {
  switch (category) {
    case "zerkalo":
      return "Цвет багета"

    case "kreslo_meshok":
      return "Цвет обивки"

    case "sp_phone":
      return "Цвет"

    case "kuhnya":
      return "Цвет корпуса"

    default:
      return "Цвет каркаса"
  }
}
