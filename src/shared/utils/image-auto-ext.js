export default image => {
  let [name, ext] = image.trim().split(".")
  ext = /^(png|jpeg|jpg)$/i.test(ext) ? ext.toLowerCase() : "jpg"

  return name + "." + ext
}
