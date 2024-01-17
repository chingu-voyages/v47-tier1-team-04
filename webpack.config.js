const path = require("path")

module.exports = {
    entry: "./sources/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public")
    }
}