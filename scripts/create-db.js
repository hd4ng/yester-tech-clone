const shell = require("shelljs")
const path = `src/database`
shell.cp(`${path}/db-seed.json`, `${path}/db.json`)
