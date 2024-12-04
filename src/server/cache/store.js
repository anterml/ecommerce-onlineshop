const cache = () => {
  let data = {}

  return (name, value) => {
    if (value) data[name] = value
    else return data[name]
  }
}

export default cache()
