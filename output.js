import chalk from "chalk"

function info(message) {
    console.log(
        chalk.blue(message)
    )
}

function error(message) {
    console.error(
        chalk.bgRed.white(message)
    )
}

export default {
    info,
    error
}