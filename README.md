# lowkey-console

![npm version](https://img.shields.io/npm/v/lowkey-console)
![npm downloads](https://img.shields.io/npm/dt/lowkey-console)
![license](https://img.shields.io/npm/l/lowkey-console)

**lowkey-console** is a minimalist logging utility for Node.js that allows you to display styled, colorful messages in the terminal. It features animated loading symbols, easy-to-read warnings, errors, success messages, and more—all without external dependencies.

## Features

- 🎨 **Custom Colors**: Customize your logs with a variety of colors.
- ⚠️ **Warning, Error, Debug, Success, Info**: Prebuilt methods for common logging scenarios.
- ⏳ **Loading Animations**: Animated loading symbols for a more dynamic console experience.
- 🖋 **Custom Prefixes**: Easily add custom prefixes to each log message.
- 🎯 **No Dependencies**: Uses ANSI escape codes—no external libraries required!

## Installation

Install `lowkey-console` via npm:

```bash
npm install lowkey-console
```

## Usage

Here’s an example of how to use the `lowkey-console` package:

```js
const { warn, error, success, info, loading, stopLoading } = require('lowkey-console');

// Basic usage
warn('Your token is outdated, please renew it!');
error('Could not connect to discord.com');
success('Downloaded the latest version of the package.');
info('Found 89 results for the query "lost socks"!');

// With custom prefix
warn('This is a warning message with a prefix', '» ');
error('An error occurred with a prefix', '» ');

// Animated loading
loading('Processing...');

setTimeout(() => {
    stopLoading();
    console.log('Loading complete!');
}, 5000);  // Stops the loader after 5 seconds
```

### Methods

- **warn(message, [prefix])**: Logs a warning message.
- **error(message, [prefix])**: Logs an error message.
- **success(message, [prefix])**: Logs a success message.
- **info(message, [prefix])**: Logs an informational message.
- **debug(message, [prefix])**: Logs a debug message.
- **loading(message, [prefix])**: Starts an animated loading indicator.
- **stopLoading()**: Stops the loading animation.

## Customization

You can easily customize the log colors and symbols by using `setConfig()` method:

```js
setConfig({
    symbols: {
        warning: '⚠',
        error: '✘',
        success: '✔',
        info: 'i',
        loading: ['○', '●']
    },
    colors: {
        warning: colors.yellow,
        error: colors.red,
        success: colors.green,
        info: colors.blue,
        loading: colors.cyan
    }
})
```

## Contribution

Feel free to open an issue or submit a pull request if you have any suggestions, bug reports, or new features you'd like to see in `lowkey-console`.

### Local Development

To develop or modify this package locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lowkey-console.git
   ```
2. Navigate to the project directory:
   ```bash
   cd lowkey-console
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Test your changes with:
   ```bash
   node test.js
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Made with ❤️ by [OptiFire](https://github.com/OptiFiire)