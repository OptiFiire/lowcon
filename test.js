import lowcon from './lib/index.js';


// Simulate warn, error, success, info and debug state.

lowcon.warn('This is a warning.', { useBrackets: false, keepColoring: false, prefixChar: '»  ' });
lowcon.error('This is an error.', { useBrackets: false, keepColoring: false, prefixChar: '»  ' });
lowcon.success('This is a success.', { useBrackets: false, keepColoring: false, prefixChar: '»  ' });
lowcon.info('This is an info.', { useBrackets: false, keepColoring: false, prefixChar: '»  ' });
lowcon.debug('This is a debug.', { useBrackets: false, keepColoring: false, prefixChar: '»  ' });


// Simulate a loading state.

const loadingSession = lowcon.loading('This is a loading message...',
    {
        useBrackets: false,
        keepColoring: false,
        prefixChar: '» ',
        onSuccess: (data) => `This is a successfully loaded message with status : ${data.code}`,
    })

setTimeout(() => loadingSession.success({ code: 204 }), 5000);


// Simulate a progress state. NOTE : NOT RECOMMENDED TO USE ALONG WITH LOADING STATE AT THE SAME INSTANCE.

// let progressValue = 0;

// const progressSession = lowcon.progress('Downloading...', progressValue, {
//     useBrackets: false,
//     keepColoring: false,
//     barWidth: 10,
//     prefixChar: '»  ',
//     onSuccess: (data) => `This is a successful progress message with status : ${data.code}`,
//     onFail: (data) => `This is an failed progress message with status : ${data.code}`
// });

// const timer = setInterval(function () {
//     progressValue++
//     progressSession.update(progressValue)

//     if (progressValue >= 100) {
//         clearInterval(timer);
//         progressSession.succeed({ code: 200 });
//     }
// }, 50);