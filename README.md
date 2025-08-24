# Screener Quarterly Scoring Calculator

A Chrome browser extension that calculates quarterly performance scores for companies listed on [Screener.in](https://www.screener.in) based on financial metrics and ratios.

## Features

- **Quarterly Score Calculation**: Automatically calculates performance scores based on quarterly financial data
- **Financial Metrics Analysis**: Evaluates key financial ratios and metrics for comprehensive scoring
- **Real-time Data**: Works with live data from Screener.in company pages
- **User-friendly Interface**: Clean and intuitive scoring display integrated into the Screener.in website

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing this extension
5. The extension will be installed and ready to use

### Method 2: Chrome Web Store (When Published)

1. Visit the Chrome Web Store (link will be provided when published)
2. Click "Add to Chrome"
3. Confirm the installation

## Usage

1. Navigate to any company page on [Screener.in](https://www.screener.in/company/)
2. The extension will automatically activate and display quarterly scoring information
3. View calculated scores and financial metrics in the integrated interface

## How It Works

The extension:
- Injects a content script into Screener.in company pages
- Extracts financial data from the page
- Applies scoring algorithms to calculate quarterly performance scores
- Displays results in an intuitive format alongside existing company information

## Technical Details

- **Manifest Version**: 3 (Latest Chrome extension standard)
- **Permissions**: 
  - `scripting`: For dynamic script injection
  - `activeTab`: For accessing current tab content
- **Content Scripts**: Automatically runs on company pages
- **CSS Styling**: Custom styling for the scoring interface

## File Structure

```
screener/
├── manifest.json      # Extension configuration
├── content.js         # Main content script logic
├── style.css          # Custom styling
└── README.md          # This file
```

## Development

To modify or enhance the extension:

1. Edit the relevant files (`content.js`, `style.css`)
2. Reload the extension in Chrome's extension manager
3. Refresh the Screener.in page to see changes

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the quarterly scoring calculator.

## License

[Add your license information here]

## Support

For questions or support, please [create an issue](link-to-issues) in this repository.
