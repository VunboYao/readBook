export default function styleStrToObject(styleStr: string) {
  const obj: Record<string, string> = {}

  const s = styleStr.toLocaleLowerCase().replace(/-(.)/g, function (m, g) {
    return g.toUpperCase()
  }).replace(/;\s?$/g, "").split(/:|;/g)

  for (let i = 0; i < s.length; i += 2) {
    obj[s[i].replace(/\s/g, "")] = s[i + 1].replace(/^\s+|\s+$/g, "")
  }

  return obj
}