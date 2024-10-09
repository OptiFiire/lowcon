const { warn, error, success, debug, info, loading, progress, stopLoading, setConfig } = require('./lib/print')

setConfig({

    // You can override the default logging icons with your own. It can even a be a word!

    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'i',
        debug: '✇',
        loading: ['○', '●'],
        progress: ['━', '━']
    },

    // Keep in mind that there be used only ANSI escape characters.

    colors: {
        warning: '\x1b[33m',            // yellow
        error: '\x1b[31m',              // red
        success: '\x1b[32m',            // green
        progress: '\x1b[32m',           // green
        debug: '\x1B[38;5;141m',        // purple
        info: '\x1b[36m',               // blue
        loading: '\x1B[38;5;247m',      // gray
    }
});

warn('This is a warning!',
    {
        useBrackets: false,
        keepColoring: false,
        prefixCharacter: '» '
    });

error('This is an error!',
    {
        useBrackets: false,
        keepColoring: false,
        prefixCharacter: '» '
    });

success('This is a success!',
    {
        useBrackets: false,
        keepColoring: false,
        prefixCharacter: '» '
    });

info('This is an info message!',
    {
        useBrackets: false,
        keepColoring: false,
        prefixCharacter: '» '
    });

debug('This is a debug message!',
    {
        useBrackets: false,
        keepColoring: false,
        prefixCharacter: '» '
    });

// const loadingSession = loading('This is a loading message!',
//     {
//         useBrackets: false,
//         keepColoring: false,
//         prefixCharacter: '» ',
//         intervalSpeed: 500              // Interval speed for animation.
//     });

// setTimeout(() => stopLoading(loadingSession), 5000);    // Simulate a loading state for 3 seconds.

let progressValue = 0;

const interval = setInterval(() => {
    progress('Downloading...', progressValue, {
        useBrackets: true,
        barWidth: 10,
    });
    progressValue += 1;

    if (progressValue > 100) {
        clearInterval(interval);
        success('Download complete!');
    }
}, 100); // Simulate a progress state.