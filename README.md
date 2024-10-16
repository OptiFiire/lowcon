# Lowcon

![NPM Version](https://img.shields.io/npm/v/lowkey-console)
![NPM Downloads](https://img.shields.io/npm/dt/lowkey-console)
![License](https://img.shields.io/npm/l/lowkey-console)

**Lowcon** (also known as *lowkey-console*) is a minimalist, highly customizable logging utility for Node.js that enhances your console output with styled, colorful messages. It features animated loading indicators, progress bars, customizable log prefixes, and supports various logging levels. All while leveraging external libraries like `ora` and `cli-progress`.

## Support
- Project on [GitHub](https://github.com/OptiFiire/lowcon).
- By following the creator [OptiFire](https://github.com/OptiFiire/).

## Features

- 🎨 **Customizable Colors**: Define and personalize log colors using ANSI escape codes for better visual clarity.
- ⚠️ **Built-in Log Types**: Convenient methods for warnings, errors, debug, success, and info logs.
- ⏳ **Animated Loading Symbols**: Add dynamic loading indicators with a range of symbols.
- 📊 **Progress Bars**: Create interactive progress bars to track tasks or download progress.
- 🖋 **Customizable Prefixes**: Effortlessly add and tweak prefix characters for each log type.
- 🎯 **External Dependency Support**: Integrated with `ora` for loading indicators and `cli-progress` for progress bars.

## Preview

Here’s a preview of **Lowcon** in action:

![Lowcon Preview](./lowcon-preview.png)

## Installation

Install **Lowcon** via npm:

```bash
npm install lowkey-console
```

## Usage

Here’s an example of how to use **Lowcon** in your Node.js project:

```js
const { warn, error, success, debug, info, loading, progress } = require('lowkey-console');

// Log examples
warn('This is a warning.', { useBrackets: false, keepColoring: false, prefixChar: '»  ' });
error('This is an error.', { useBrackets: true, keepColoring: true });
success('This is a success message.');
info('This is an informational message.', { prefixChar: '* ' });
debug('Debugging is active.');
```

### Log Methods

- **warn(message, options)**: Logs a warning message.
- **error(message, options)**: Logs an error message.
- **success(message, options)**: Logs a success message.
- **info(message, options)**: Logs an informational message.
- **debug(message, options)**: Logs a debug message.

### Animated Loading

Create dynamic loading indicators:

```js
const loader = loading('Loading data...', {
    useBrackets: false,
    prefixChar: '»  ',
    interval: 100,
    onSuccess: 'Load complete!',
    onFail: 'Loading failed!'
});

// Simulate a process
setTimeout(() => loader.success(), 3000);
```

### Progress Bar

Track the progress of an ongoing task:

```js
let progressValue = 0;

const progressBar = progress('Downloading...', 0, {
    useBrackets: true,
    barWidth: 10,
    prefixChar: '»  ',
    onSuccess: 'Download complete!',
    onFail: 'Download failed.'
});

const interval = setInterval(() => {
    progressValue += 5;
    progressBar.update(progressValue);
    
    if (progressValue >= 100) {
        clearInterval(interval);
        progressBar.succeed();
    }
}, 100);
```

### Customization

You can easily modify log colors, symbols, and other settings with `setConfig()`:

```js
const { setConfig } = require('lowkey-console');

setConfig({
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'ℹ',
        debug: '✇',
        loading: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
        progress: {
            loaded: '█',
            unloaded: '▒'
        }
    },
    colors: {
        warning: '\x1b[33m',
        error: '\x1b[31m',
        success: '\x1b[32m',
        info: '\x1b[36m',
        debug: '\x1b[35m',
        loading: '\x1b[34m',
        progress: '\x1b[37m'
    }
});
```

### Configuration Options

- **symbols**: Customize the symbols for different log types (`warning`, `error`, `success`, etc.).
- **colors**: Define the colors for logs, loading animations, and progress bars.
- **useBrackets**: Choose whether to wrap symbols with brackets (default: `true`).
- **prefixChar**: Set custom prefix characters for logs.
- **keepColoring**: Retain colors throughout the entire message (default: `false`).
- **interval**: Set the speed for the loading animation (default: `100ms`).
- **onSuccess / onFail**: Set custom messages or callback functions to execute after loading or progress completion.

### Methods

- **warn(message, options)**: Logs a warning message.
- **error(message, options)**: Logs an error message.
- **success(message, options)**: Logs a success message.
- **info(message, options)**: Logs an informational message.
- **debug(message, options)**: Logs a debug message.
- **loading(message, options)**: Starts an animated loading indicator.
- **progress(message, percentage, options)**: Displays a progress bar.

### Contributions

We welcome contributions! If you have suggestions, bug reports, or feature requests, feel free to open an issue or submit a pull request.

### Local Development

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
4. Run your tests and start making contributions!