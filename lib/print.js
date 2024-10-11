const colors = {
    green: '\x1b[32m',
    blue: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    gray: '\x1B[38;5;247m',
    purple: '\x1B[38;5;141m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    white: '\x1b[37m',
    lightYellow: '\x1b[38;5;227m',
    orange: '\x1b[38;5;214m',
    magenta: '\x1b[38;5;201m',
    cyan: '\x1b[38;5;123m',
    brightBlue: '\x1b[38;5;39m',
    turquoise: '\x1b[38;5;80m',
    darkBlue: '\x1b[38;5;26m',
    brightGreen: '\x1b[38;5;46m',
    darkRed: '\x1b[38;5;160m'
};

let config = {
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'i',
        debug: '✇',
        loading: ['○', '●'],
        progress: {
            loaded: '━',
            unloaded: '━'
        }
    },
    colors: {
        warning: colors.yellow,
        error: colors.red,
        success: colors.green,
        debug: colors.purple,
        info: colors.blue,
        loading: colors.lightYellow,
        progress: {
            brackets: colors.white,
            loaded: colors.cyan,
            unloaded: colors.blue
        }
    }
};

function formatLog(type, message, options = {}) {
    const { useBrackets = true, keepColoring = false, prefixCharacter = '' } = options;
    const colorType = config.colors[type] || colors.white;
    const symbol = config.symbols[type] || '';
    const brackets = useBrackets ? `${colorType}[ ${colors.bold}${symbol}${colors.reset}${colorType} ]` : `${colors.bold}${colorType}${symbol}${colors.reset} `;
    const coloredMessage = keepColoring ? `${colorType}${message}${colors.reset}` : `${colors.reset}${message}${colors.reset}`;

    return `${prefixCharacter}${brackets} ${coloredMessage}`;
}

function warn(message, options) {
    console.log(formatLog('warning', message, options));
}

function error(message, options) {
    console.log(formatLog('error', message, options));
}

function success(message, options) {
    console.log(formatLog('success', message, options));
}

function info(message, options) {
    console.log(formatLog('info', message, options));
}

function debug(message, options) {
    console.log(formatLog('debug', message, options));
}

let loadingSessions = [];

function loading(message, options = {}) {
    const { useBrackets = true, keepColoring = false, prefixCharacter = '', intervalSpeed = 500, onFinish = null } = options;
    const sessionId = Date.now();
    let symbolIndex = 0;
    const symbols = config.symbols.loading;

    const interval = setInterval(() => {
        const brackets = useBrackets
            ? `${config.colors.loading}[ ${colors.bold}${symbols[symbolIndex % symbols.length]}${colors.reset}${config.colors.loading} ]`
            : `${colors.bold}${symbols[symbolIndex % symbols.length]}${colors.reset} `;

        const coloredMessage = keepColoring
            ? `${config.colors.loading}${message}${colors.reset}`
            : `${colors.reset}${message}${colors.reset}`;

        process.stdout.write(`\r${prefixCharacter}${brackets} ${coloredMessage}${colors.reset}`);
        symbolIndex++;
    }, intervalSpeed);

    loadingSessions.push({ sessionId, interval, options });
    return sessionId;
}

function stopLoading(sessionId) {
    const session = loadingSessions.find(s => s.sessionId === sessionId);
    if (session) {
        clearInterval(session.interval);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);

        if (session.options.onFinish) {
            success(session.options.onFinish, session.options);
        }

        loadingSessions = loadingSessions.filter(s => s.sessionId !== sessionId);
    }
}

function progress(message, percentage, options = {}) {
    const { useBrackets = true, barWidth = 20, prefixCharacter = '', onFinish = null } = options;
    const completedLength = Math.round(barWidth * (percentage / 100));
    const bar = `${`${config.colors.progress.loaded}${config.symbols.progress.loaded}`.repeat(completedLength)}${`${config.colors.progress.unloaded}${config.symbols.progress.unloaded}`.repeat(barWidth - completedLength)}${colors.reset}`;
    const progressBracketColor = config.colors.progress.brackets;

    const progressMessage = useBrackets
        ? `${progressBracketColor}[ ${bar} ${progressBracketColor}]  ${percentage}% ${colors.reset} ${message}`
        : `${progressBracketColor}${bar}  ${percentage}% ${colors.reset} ${message}`;

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`\r${prefixCharacter}${progressMessage}`);

    if (percentage >= 100) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);

        if (typeof onFinish === 'string') {
            const finishMessage = useBrackets
                ? `${progressBracketColor}[ ${bar} ${progressBracketColor}]  ${percentage}% ${colors.reset} ${onFinish}`
                : `${progressBracketColor}${bar}  ${percentage}% ${colors.reset} ${onFinish}`;
            console.log(`${prefixCharacter}${finishMessage}`);
        } else if (typeof onFinish === 'function') {
            onFinish();
        }
    }

    if (options.intervalId) {
        clearInterval(options.intervalId);
    }
}

function deepMerge(target, source) {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key]) {
                deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

function setConfig(newConfig) {
    config = deepMerge(config, newConfig);
}


module.exports = { warn, error, success, info, debug, loading, progress, stopLoading, setConfig };
