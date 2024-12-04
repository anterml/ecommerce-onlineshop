export default (text = "") => {
  let newText = text

  const customLinks = getCustomLinks(text)
  if (customLinks) {
    const linkReplacer = getReplacerLink(text, customLinks)
    newText = replaceCustomLinks(newText, linkReplacer)
    // remove custom links like "[1]: /someurl"
    newText = newText.replace(/\[[^\]]+\]\:[^\n]+\n*/g, "")
  }

  newText = newText
    .replace(
      /\[([^\]]+)\]\(([^\)"\s]+)(?:\s*"([^"]+)")*\s*\)/g,
      '<a href="$2" title="$3">$1</a>',
    )
    .replace(/\/\/\*\*([^\*]+)\*\*\/\//g, "<em><strong>$1</strong></em>")
    .replace(/\*\*([^\*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\/\/([^\/]+)\/\//g, "<em>$1</em>")
    .trim()
    .replace(/\n/g, "<br />")

  return newText
}

function getCustomLinks(text) {
  const links = text.match(/\[[^\]]+\]\:[^\n]+/g)
  if (links) {
    return links.reduce((acc, v) => {
      const [name, url, title] = v.substr(1).split(/\]\:\s*|\s+\"/g)

      acc[name] = {
        url,
        title: typeof title === "string" ? title.replace(/[\"\']/g, "") : "",
      }

      return acc
    }, {})
  }
}

function getReplacerLink(str, customLinks) {
  const buff = {}
  const myRe = /\[([^\]]+)\]\[([^\]]+)\]/g
  let res
  while ((res = myRe.exec(str))) {
    const link = customLinks[res[2]]
    if (res.length === 3 && link) {
      buff[res[0]] = `<a href="${link.url}" title="${link.title}">${res[1]}</a>`
    }
  }

  return buff
}

function replaceCustomLinks(text, linkReplacer) {
  Object.keys(linkReplacer).forEach(name => {
    text = text.replace(name, linkReplacer[name])
  })

  return text
}
