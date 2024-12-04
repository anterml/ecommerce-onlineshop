export default text =>
  text && typeof text === "string"
    ? text
        .replace(/\*\*|\/\//g, "")
        .replace(/\[([^\]]+)\](?:\[[^\]]+\]|\([^\)]+\))/g, "$1")
        .replace(/\[[^\]]+\]\:[^\n]+\n*/g, "")
        .trim()
        .replace(/\n+/g, " ")
    : ""
