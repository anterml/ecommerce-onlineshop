export default price =>
  (price || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
