import { SingleBar, Presets } from 'cli-progress';
import ansiColors from 'ansi-colors';
import ora from 'ora';

let config = {
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
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
        loading: ansiColors.cyan,
        progress: ansiColors.whiteBright
    },
    options: {
        info: { useBrackets: false, keepColoring: false, prefixChar: '' },
        error: { useBrackets: false, keepColoring: false, prefixChar: '' },
        debug: { useBrackets: false, keepColoring: false, prefixChar: '' },
        success: { useBrackets: false, keepColoring: false, prefixChar: '' },
        warning: { useBrackets: false, keepColoring: false, prefixChar: '' },
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


// Existing log functions (warn, error, success, info, debug) remain unchanged

function warn(message = '', options = config.options.warning) { formatLog('warning', message, options); }
function error(message = '', options = config.options.error) { formatLog('error', message, options); }
function success(message = '', options = config.options.success) { formatLog('success', message, options); }
function info(message = '', options = config.options.info) { formatLog('info', message, options); }
function debug(message = '', options = config.options.debug) { formatLog('debug', message, options); }


// Use ora for loading functionality

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


// Use cli-progress for progress functionality

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

export default { warn, error, success, info, debug, loading, progress, setConfig };
