const { warn, error, success, debug, info, loading, progress, stopLoading } = require('./lib/print')

// Simulate warn, error, success, info and debug state.

warn('This is a warning.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
error('This is an error.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
success('This is a success.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
info('This is an info message.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
debug('This is a debug message.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });

// Simulate a progress state.

let progressValue = 0;

const interval = setInterval(() => {
    progress('Downloading...', progressValue, {
        useBrackets: false,
        barWidth: 10,
        prefixCharacter: '»  ',
        onFinish: 'Download complete!'
    });
    progressValue += 5;

    if (progressValue > 100) clearInterval(interval);
}, 100);

// Simulate a loading state.

const loadingSession = loading('This is a loading message.',
    {
        useBrackets: false,
        keepColoring: false,
        prefixCharacter: '»  ',
        intervalSpeed: 500,
        onFinish: 'This is a loaded message.'
    });

setTimeout(() => stopLoading(loadingSession), 5000);

// NOTE : I DO NOT RECOMMEND USING PROGRESS AND LOADING STATE AT THE SAME TIME, AS IT MIGHT CAUSE SEVERE VISUAL GLITCH ON YOUR CONSOLE.