const colors = {
    green: '\x1b[32m',
    blue: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    gray: '\x1B[38;5;247m',
    purple: '\x1B[38;5;141m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
};

let config = {
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'i',
        debug: '✇',
        loading: ['○', '●']
    },
    colors: {
        warning: colors.yellow,
        error: colors.red,
        success: colors.green,
        debug: colors.purple,
        info: colors.blue,
        loading: colors.gray
    }
};

function outputMessage(type, message, prefixCharacter = '', colorFully = false) {
    const symbol = config.symbols[type];
    const color = config.colors[type];
    const formattedMessage = `${prefixCharacter}${color}[ ${colors.bold}${symbol}${colors.reset}${color} ]${colorFully === true ? '' : colors.reset} ${message}${colorFully === true ? colors.reset : ''}\n`;

    process.stdout.write(formattedMessage);
}

function warn(message, prefixCharacter = '', colorFully = false) {
    outputMessage('warning', message, prefixCharacter, colorFully);
}

function error(message, prefixCharacter = '', colorFully = false) {
    outputMessage('error', message, prefixCharacter, colorFully);
}

function success(message, prefixCharacter = '', colorFully = false) {
    outputMessage('success', message, prefixCharacter, colorFully);
}

function debug(message, prefixCharacter = '', colorFully = false) {
    outputMessage('debug', message, prefixCharacter, colorFully);
}

function info(message, prefixCharacter = '', colorFully = false) {
    outputMessage('info', message, prefixCharacter, colorFully);
}

let loadingInterval;

function loading(message, prefixCharacter = '', colorFully = false) {
    let index = 0;

    if (loadingInterval) {
        clearInterval(loadingInterval);
    }

    loadingInterval = setInterval(() => {
        const symbols = config.symbols.loading;
        const symbol = symbols[index % symbols.length];
        console.log(`\r${prefixCharacter}${colors.gray}[ ${colors.bold}${symbol}${colors.reset}${colors.gray} ]${colors.reset} ${message}`);
        index++;
    }, 500);
    console.log('\x1b[?25l');

    process.on('SIGINT', () => {
        stopLoading()
    });
}

function stopLoading() {
    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
        console.log('\r\x1b[K');
        console.log('\x1b[?25h');
    }
}

function setConfig(newConfig) {
    config = { ...config, ...newConfig };
}

module.exports = { warn, error, success, debug, info, loading, stopLoading, setConfig };
