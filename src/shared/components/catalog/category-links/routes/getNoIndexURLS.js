export default (DATA, RU, ENG, lang) => {
  const LANG = lang === "ru" ? RU : ENG
  const buff = []
  const top = DATA.map(d => d.name)
  for (let { name, values } of DATA) {
    for (let index of values) {
      if (
        index > name &&
        top.includes(index) &&
        DATA[index].values.includes(name)
      ) {
        buff.push(LANG[name] + "_" + LANG[index])
        break
      }
    }
  }

  return buff
}
