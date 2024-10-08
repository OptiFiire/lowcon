const { warn, error, success, debug, info, loading, stopLoading, setConfig } = require('./lib/print')

setConfig({

    // You can override the default logging icons with your own. It can even a be a word!

    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'i',
        debug: '✇',
        loading: ['○', '●'] // Array hence loading is animated.
    },

    // Keep in mind that there be used only ANSI escape characters.

    colors: {
        warning: '\x1b[33m', //
        error: '\x1b[31m',
        success: '\x1b[32m',
        debug: '\x1B[38;5;141m',
        info: '\x1b[36m',
        loading: '\x1B[38;5;247m',
    }
});

warn('This is a warning with no prefix character!', '» ', true);
error('This is an error with no prefix character!', '» ');
success('This is a success with no prefix character!', '» ');
info('This is an info message with no prefix character!', '» ');
debug('This is a debug message with no prefix character!', '» ');
loading('This is a loading message with no prefix character...', '» ');

// Simulate a loading state for 3 seconds.

setTimeout(() => {
    stopLoading();
}, 10_000);