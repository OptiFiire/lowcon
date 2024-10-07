const colors = {
    orange: '\x1b[38;5;202m',
    green: '\x1b[32m',
    limeGreen: '\x1B[38;5;190m',
    lightBlue: '\x1B[38;5;51m',
    lime: '\x1B[38;5;82m',
    gold: '\x1B[38;5;220m',
    blue: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    darkGreen: '\x1B[38;5;70m',
    gray: '\x1B[38;5;232m',
    lightGray: '\x1B[38;5;247m',
    lightPurple: '\x1B[38;5;135m',
    purple: '\x1B[38;5;141m',
    red: '\x1B[38;5;196m',
    lightRed: '\x1b[31m',
    yellow: '\x1b[33m',
    magenta: '\x1B[38;5;201m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

let config = {
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'i',
        loading: ['○', '●']
    },
    colors: {
        warning: colors.yellow,
        error: colors.red,
        success: colors.green,
        info: colors.blue,
        loading: colors.lightGray
    }
};

function outputMessage(type, message, prefixCharacter = '') {
    const symbol = config.symbols[type];
    const color = config.colors[type];
    const formattedMessage = `${prefixCharacter}${color}[ ${colors.bold}${symbol}${colors.reset}${color} ]${colors.reset} ${message}`;

    process.stdout.write(formattedMessage);
}

function warn(message, prefixCharacter = '') {
    outputMessage('warning', message, prefixCharacter);
}

function error(message, prefixCharacter = '') {
    outputMessage('error', message, prefixCharacter);
}

function success(message, prefixCharacter = '') {
    outputMessage('success', message, prefixCharacter);
}

function info(message, prefixCharacter = '') {
    outputMessage('info', message, prefixCharacter);
}

let loadingInterval;

function loading(message, prefixCharacter = '', symbols = config.symbols.loading) {
    let index = 0;
    loadingInterval = setInterval(() => {
        const symbol = symbols[index % symbols.length];
        process.stdout.write(`\r${prefixCharacter}${colors.lightGray}[ ${colors.bold}${symbol}${colors.reset}${colors.lightGray} ]${colors.reset} ${message}`);
        index++;
    }, 500);
    process.stdout.write('\x1b[?25l');
}


function stopLoading() {
    clearInterval(loadingInterval);
    process.stdout.write('\x1b[?25h');
    console.log();
}


function setConfig(newConfig) {
    config = { ...config, ...newConfig };
}

function stopLoading() {
    process.stdout.write('\x1b[?25h');
    console.log();
}

module.exports = { warn, error, success, info, loading, stopLoading, setConfig };
