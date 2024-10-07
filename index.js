const { warn, error, success, info, loading, stopLoading, colors, setConfig } = require('./lib/print');


// Including prefix character

warn('Your token is outdated, please renew it!', '» ')
error('Could not connect with discord.com', '» ')
success('Downloaded the latest version of package.', '» ')
info('Found 89 results for query "lost socks"!', '» ');

loading('Processing...');

setTimeout(() => {
    stopLoading();
    success('Loading complete!');
}, 3000);  // Stop loading after 3 seconds


// Not including prefix character

warn('Your token is outdated, please renew it!')
error('Could not connect with discord.com')
success('Downloaded the latest version of package.')
info('Found 89 results for query "lost socks"!')

loading('Processing...');


setTimeout(() => {
    stopLoading();
    success('Loading complete!');
}, 3000);  // Stop loading after 3 seconds