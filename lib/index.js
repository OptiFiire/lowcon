import { SingleBar, Presets } from 'cli-progress';
import ansiColors from 'ansi-colors';
import readline from 'readline';
import ora from 'ora';

let config = {
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        question: '?',
        info: 'i',
        debug: '✇',
        loading: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
        progress: {
            loaded: '█',
            unloaded: '▒'
        }
    },
    colors: {
        warning: ansiColors.yellow,
        error: ansiColors.red,
        success: ansiColors.green,
        debug: ansiColors.magenta,
        info: ansiColors.blue,
        question: '\x1b[38;5;202m',
        loading: ansiColors.cyan,
        progress: '\x1B[38;5;135m'
    },
    options: {
        info: { useBrackets: false, keepColoring: false, prefixChar: '' },
        error: { useBrackets: false, keepColoring: false, prefixChar: '' },
        debug: { useBrackets: false, keepColoring: false, prefixChar: '' },
        success: { useBrackets: false, keepColoring: false, prefixChar: '' },
        warning: { useBrackets: false, keepColoring: false, prefixChar: '' },
        question: { useBrackets: false, keepColoring: false, prefixChar: '' },
        progress: { useBrackets: false, keepColoring: false, prefixChar: '', barWidth: 10, onSuccess: '', onFail: '' },
        loading: { useBrackets: false, keepColoring: false, prefixChar: '', interval: 100, onSuccess: '', onFail: '' },
    }
};


function formatLog(type, message, options) {
    const { useBrackets = true, keepColoring = false, prefixChar = '' } = options;
    const colorType = config.colors[type];
    const symbol = config.symbols[type];
    const coloredSymbol = colorType(symbol);
    const brackets = useBrackets
        ? colorType(`[ ${ansiColors.bold(coloredSymbol)} ]`)
        : `${ansiColors.bold(coloredSymbol)} `;
    const coloredMessage = keepColoring
        ? colorType(message)
        : message;

    console.log(`${prefixChar}${brackets} ${coloredMessage}${ansiColors.reset()}`);
}


function warn(message = '', options = config.options.warning) { formatLog('warning', message, options); }
function error(message = '', options = config.options.error) { formatLog('error', message, options); }
function success(message = '', options = config.options.success) { formatLog('success', message, options); }
function info(message = '', options = config.options.info) { formatLog('info', message, options); }
function debug(message = '', options = config.options.debug) { formatLog('debug', message, options); }

function question(message = '', options = config.options.question) {

    const mergedOptions = Object.assign(config.options.question, options);

    const brackets = mergedOptions.useBrackets
        ? `${config.colors.question}[ ${ansiColors.bold(config.symbols.question)} ]${ansiColors.reset()}`
        : `${config.colors.question}${ansiColors.bold(config.symbols.question)}${ansiColors.reset()} `;
    const coloredMessage = mergedOptions.keepColoring
        ? `${config.colors.question}${message}${ansiColors.reset()}`
        : `${ansiColors.reset(message)}`;

    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`${mergedOptions.prefixChar}${brackets} ${coloredMessage}${ansiColors.reset()}`, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

function loading(message = '', options = config.options.loading) {

    const mergedOptions = Object.assign(config.options.loading, options);

    const formattedMessage = mergedOptions.keepColoring
        ? config.colors.loading(message)
        : message;

    const spinner = ora({
        text: ` ${formattedMessage}`,
        prefixText: mergedOptions.prefixChar ? mergedOptions.prefixChar : '',
        spinner: {
            interval: mergedOptions.interval,
            frames: config.symbols.loading.map(frame => mergedOptions.useBrackets
                ? `[ ${config.colors.loading.bold(frame)} ]`
                : config.colors.loading.bold(frame))
        }
    }).start();

    spinner.succeed = function (successMessage) {
        const formattedSymbol = mergedOptions.useBrackets
            ? `${config.colors.success(`[ ${ansiColors.bold(config.symbols.success)} ]`)}`
            : `${config.colors.success(ansiColors.bold(config.symbols.success))}`;

        const formattedMessage = mergedOptions.keepColoring
            ? config.colors.success(successMessage)
            : successMessage;

        this.stopAndPersist({
            symbol: formattedSymbol,
            text: ` ${formattedMessage}`,
        });
    };

    spinner.fail = function (failMessage) {
        const formattedSymbol = mergedOptions.useBrackets
            ? `${config.colors.error(`[ ${ansiColors.bold(config.symbols.error)} ]`)}`
            : `${config.colors.error(ansiColors.bold(config.symbols.error))}`;

        const formattedMessage = mergedOptions.keepColoring
            ? config.colors.error(failMessage)
            : failMessage;

        this.stopAndPersist({
            symbol: formattedSymbol,
            text: ` ${formattedMessage}`,
        });
    };

    const customMethods = {
        success: (data) => {
            const successMessage = typeof mergedOptions.onSuccess === 'function'
                ? mergedOptions.onSuccess(data)
                : mergedOptions.onSuccess || 'Success';

            spinner.succeed(successMessage);
        },
        fail: (data) => {
            const failMessage = typeof mergedOptions.onFail === 'function'
                ? mergedOptions.onFail(data)
                : mergedOptions.onFail || 'Failure';

            spinner.fail(failMessage);
        }
    };

    return customMethods;
}

function progress(message = '', percentage = 0, options = config.options.progress) {

    const mergedOptions = Object.assign(config.options.progress, options);

    const formattedMessage = mergedOptions.keepColoring
        ? config.colors.progress(message)
        : message;

    const formattedBar = mergedOptions.useBrackets
        ? `${config.colors.progress(`[ ${ansiColors.bold('{bar}')} ]  ${config.colors.progress.bold('{percentage}%')}`)}`
        : config.colors.progress.bold('{bar}')

    const bar = new SingleBar({
        format: `${mergedOptions.prefixChar}${formattedBar}  ${formattedMessage}`,
        barCompleteChar: config.symbols.progress.loaded,
        barIncompleteChar: config.symbols.progress.unloaded,
        hideCursor: true,
        barsize: mergedOptions.barWidth
    }, Presets.shades_classic);

    bar.start(100, percentage);

    bar.succeed = function (data) {
        const successMessage = typeof mergedOptions.onSuccess === 'function'
            ? mergedOptions.onSuccess(data)
            : mergedOptions.onSuccess || 'Success';

        bar.stop();

        success(successMessage, mergedOptions)
    };

    bar.fail = function (data) {
        const failMessage = typeof mergedOptions.onFail === 'function'
            ? mergedOptions.onFail(data)
            : mergedOptions.onFail || 'Failed';

        bar.stop();

        error(failMessage, mergedOptions)
    };

    return {
        update: (value) => bar.update(value),
        stop: () => bar.stop(),
        succeed: (data) => bar.succeed(data),
        fail: (data) => bar.fail(data)
    };
}

function setConfig(newConfig = {}) {
    config = Object.assign(config, newConfig);
}

export default { warn, error, success, info, question, debug, loading, progress, setConfig, ansiColors };
