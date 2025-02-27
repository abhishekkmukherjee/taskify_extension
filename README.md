# Taskify - Chrome Extension

Taskify is a beautiful and intuitive task management extension for Chrome that helps you stay organized and productive.

![Taskify Logo](./icons/icon128.png)

## Features

### Tasks Management
- **Add new tasks** quickly and efficiently
- **Mark tasks as complete** with a satisfying animation
- **Star important tasks** to prioritize your work
- **Filter tasks** by different tabs:
  - Today
  - All
  - Important

### Theme Support
- **Light theme** (default) for clean, bright interface
- **Dark theme** with carefully selected color scheme for reduced eye strain
- Theme preference is automatically saved between sessions

### User Experience
- **Clean, responsive UI** that adapts to your workflow
- **Empty state displays** when no tasks match your current filter
- **Smooth animations** when adding or removing tasks
- **Intuitive interactions** for a seamless experience

## Extension Structure

```
taskify/
│
├── manifest.json       # Extension configuration
├── popup.html          # Main HTML structure
├── styles.css          # CSS styling with dark theme support
├── popup.js            # JavaScript logic for all functionality
│
└── icons/              # Extension icons
    ├── icon16.png      # 16x16 icon for extension menu
    ├── icon48.png      # 48x48 icon for Chrome Web Store
    └── icon128.png     # 128x128 icon for installation and stores
```

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. Taskify will appear in your Chrome toolbar

## Usage

1. Click the Taskify icon in your Chrome toolbar to open the extension
2. Add new tasks using the input field at the top
3. Click on a task to mark it as complete
4. Use the star icon to mark tasks as important
5. Switch between tabs to filter your tasks
6. Toggle between light and dark themes using the theme switch

## Demo

[Add your demo video or screenshots here]

## Development

### Local Storage
- All tasks are saved to Chrome's local storage
- Theme preference is also preserved between sessions
- Data structure is optimized for performance and reliability

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to help improve Taskify.

## License

[Add your license information here]
