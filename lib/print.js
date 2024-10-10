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
        loading: ['○', '●'],
        progress: {
            loaded: '-',
            unloaded: '-'
        }
    },
    colors: {
        warning: colors.yellow,
        error: colors.red,
        success: colors.green,
        debug: colors.purple,
        info: colors.blue,
        loading: colors.gray,
        progress: {
            bars: colors.purple,
            loaded: colors.green,
            unloaded: colors.red
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
    const {
        useBrackets = true,
        keepColoring = false,
        prefixCharacter = '',
        intervalSpeed = 500,
    } = options;
    const sessionId = Date.now();
    let symbolIndex = 0;

    const interval = setInterval(() => {

        const symbols = config.symbols.loading
        const brackets = useBrackets ? `${config.colors.loading}[ ${colors.bold}${symbols}${colors.reset}${config.colors.loading} ]` : `${colors.bold}${symbols[symbolIndex % symbols.length]}${colors.reset} `;
        const coloredMessage = keepColoring ? `${config.colors.loading}${message}${colors.reset}` : `${colors.reset}${message}${colors.reset}`;

        process.stdout.write(`\r${prefixCharacter} ${brackets} ${coloredMessage}${colors.reset}`);
        symbolIndex++;
    }, intervalSpeed);

    process.on('SIGINT', () => {
        stopLoading(sessionId)
    });

    loadingSessions.push({ sessionId, interval });
    return sessionId;
}

function progress(message, percentage, options = {}) {
    const { useBrackets = true, barWidth = 20, prefixCharacter = '' } = options; // Customize width
    const completedLength = Math.round(barWidth * (percentage / 100));
    const bar = `${`${config.colors.progress.unloaded}${config.symbols.progress.loaded}`.repeat(completedLength)}${`${config.colors.progress.unloaded}${config.symbols.progress.unloaded}`.repeat(barWidth - completedLength)}`;
    const progressBracketColor = config.colors.progress.bars
    const progressMessage = useBrackets
        ? `${progressBracketColor}[ ${bar} ${progressBracketColor}] ${percentage}% ${colors.reset} ${message}`
        : `${progressBracketColor}${bar}  ${percentage}% ${colors.reset} ${message}`;

    process.stdout.write(`\r${prefixCharacter}${progressMessage}`);

    if (percentage >= 100) {
        process.stdout.write('\n');
    }
}


function stopLoading(sessionId) {
    const session = loadingSessions.find(s => s.sessionId === sessionId);
    if (session) {
        clearInterval(session.interval);
        loadingSessions = loadingSessions.filter(s => s.sessionId !== sessionId);
        process.stdout.write('\x1b[?25h');
        process.stdout.write('\n');
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
