export const getFullDate = date => {
  if (!date) return ""

  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  })

  return formatter.format(new Date(date)).replace(" г.", "")
}
