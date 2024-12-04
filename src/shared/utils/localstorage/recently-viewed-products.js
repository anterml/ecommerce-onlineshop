// get/set function
export default value => {
  const now = Date.now()
  const name = "recently-viewed-products"
  const defaultData = { date: now, products: [] }
  let data

  try {
    data = JSON.parse(localStorage.getItem(name))
  } catch (e) {
    console.log(
      "An error has happened while JSON.parse recently viewed products",
      a,
    )
  }

  // create if not exists
  if (!data || typeof data !== "object" || !Array.isArray(data.products)) {
    data = defaultData
  } else {
    // clear if expired
    const passedDays = Math.floor((now - data.date) / 1000 / 60 / 60 / 24)
    if (passedDays > 30) {
      data.products = []
      data.date = now
    }
  }

  // SET
  if (value) {
    // if the product exists then refresh its info
    const productExists = data.products.find(
      product => product._id === value._id,
    )
    if (productExists) {
      data.products = data.products.map(product =>
        product._id !== value._id ? product : value,
      )
    } else data.products.unshift(value)

    data.products = data.products.slice(0, 20)
    data.date = now
    localStorage.setItem(name, JSON.stringify(data))
  }
  // GET
  else return data
}
