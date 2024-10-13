# Lowcon

![NPM Version](https://img.shields.io/npm/v/lowkey-console)
![NPM Downloads](https://img.shields.io/npm/dt/lowkey-console)
![License](https://img.shields.io/npm/l/lowkey-console)

**Lowcon** (as known as *lowkey-console*) is a minimalist, highly customizable logging utility for Node.js that enhances your console output with styled, colorful messages. It features animated loading symbols, progress bars, customizable log prefixes, and supports various logging levels. All while using no external dependencies.

## Features

- 🎨 **Customizable Colors**: Define and customize the colors of your logs with ANSI escape codes.
- ⚠️ **Built-in Log Types**: Predefined methods for warnings, errors, debug, success, and info messages.
- ⏳ **Animated Loading Symbols**: Add animated loading indicators to your terminal output.
- 📊 **Progress Bars**: Create progress bars to track any ongoing process.
- 🖋 **Customizable Prefixes**: Easily add and customize prefix characters for each log.
- 🎯 **No External Dependencies**: Lightweight, using only native Node.js functionalities and ANSI codes.

## Preview

Here’s a preview of lowcon in action:

![Lowcon Preview](./lowcon-preview.png)

## Installation

Install Lowcon via npm:

```bash
npm install lowkey-console
```

## Usage

Here’s an example of how to use **Lowcon** in your Node.js project:

```js
const { warn, error, success, debug, info, loading, progress, stopLoading } = require('lowkey-console')

// Simulate warn, error, success, info and debug state.

warn('This is a warning.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
error('This is an error.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
success('This is a success.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
info('This is an info message.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
debug('This is a debug message.', { useBrackets: false, keepColoring: false, prefixCharacter: '»  ' });
```

### Log Methods

- **warn(message, options)**: Logs a warning message.
- **error(message, options)**: Logs an error message.
- **success(message, options)**: Logs a success message.
- **info(message, options)**: Logs an informational message.
- **debug(message, options)**: Logs a debug message.

### Animated Loading

Create animated loading indicators with custom symbols:

```js
const loadingSession = loading('This is a loading message.',
    {
        useBrackets: false,
        prefixCharacter: '»  ',
        intervalSpeed: 500,
        onFinish: 'This is a loaded message.'

        // You can pass a function instead of a string to onFinish property :
        // onFinish: () => { console.log('Download complete!'); }
    });

setTimeout(() => stopLoading(loadingSession), 5000);
```

### Progress Bar

Track progress dynamically:

```js
let progressValue = 0;

const interval = setInterval(() => {
    progress('Downloading...', progressValue, {
        useBrackets: false,
        barWidth: 10,
        prefixCharacter: '»  ',
        onFinish: 'Download complete!'

        // You can pass a function instead of a string to onFinish property :
        // onFinish: () => { console.log('Download complete!'); }
    });

    progressValue += 5;

    if (progressValue > 100) clearInterval(interval);
}, 100);
```

**⚠️ NOTE : I DO NOT RECOMMEND USING PROGRESS AND LOADING STATE AT THE SAME TIME, AS IT MIGHT CAUSE A VISUAL GLITCH ON YOUR CONSOLE.**

## Customization

You can easily customize the log colors and symbols by using the `setConfig()` method. Here’s an example of overriding the defaults:

```js
setConfig({
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'i',
        debug: '✇',
        loading: ['○', '●'],
        progress: {

            // Symbols is the same, but not the colors.

            loaded: '━',
            unloaded: '━'
        }
    },
    colors: {
        warning: '\x1b[33m',
        error: '\x1b[31m',
        success: '\x1b[32m',
        debug: '\x1B[38;5;141m',
        info: '\x1b[36m',
        loading: '\x1b[38;5;227m',
        progress: {
            brackets: '\x1b[37m',
            loaded: '\x1b[38;5;123m',
            unloaded:   '\x1b[36m',
        }
    }
});
```

### Configuration Options
- **symbols**: Customize symbols for different log types (e.g., `warning`, `error`, `success`, `info`, `debug`, `loading`, `progress`).
- **colors**: Customize colors for each log type. The progress bar can have separate colors for the loaded and unloaded sections.
- **useBrackets**: Specify whether to wrap symbols with brackets (default: `true`).
- **prefixCharacter**: Add custom prefix characters before each log message.
- **keepColoring**: Retain color throughout the message (default: `false`).
- **intervalSpeed**: Control the speed of loading animations (default: `500ms`).
- **onFinish**: Specify a message or callback to execute after loading or progress completion.

## Methods

- **warn(message, options)**: Logs a warning message.
- **error(message, options)**: Logs an error message.
- **success(message, options)**: Logs a success message.
- **info(message, options)**: Logs an informational message.
- **debug(message, options)**: Logs a debug message.
- **loading(message, options)**: Starts an animated loading indicator.
- **progress(message, percentage, options)**: Shows a progress bar.
- **stopLoading(sessionId)**: Stops the specified loading animation.

## Contribution

We welcome contributions! If you have suggestions, bug reports, or want to add new features, feel free to open an issue or submit a pull request.

## Local Development

To develop or modify **Lowcon** locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/OptiFiire/lowcon.git
   ```
2. Navigate to the project directory:
   ```bash
   cd lowcon
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Test your changes:
   ```bash
   node test.js
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Made with ❤️ by [OptiFire](https://github.com/OptiFiire)