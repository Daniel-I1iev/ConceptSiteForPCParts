# PC Part Picker for Beginners

A user-friendly web application that helps beginners build their PC by selecting compatible components. Features a modern, responsive design with multiple theme options and an interactive audio visualizer.

## Recent Updates (May 2025)

- **GitHub Icon:** The AppBar now includes a GitHub icon that links directly to the developer's GitHub profile.
- **Improved Compatibility Logic:** GPU/case compatibility now only warns if the GPU is actually too long for the selected case.
- **Accurate Bottleneck Detection:** Bottleneck logic is now tier-based and more accurate for the CPUs and GPUs included in the app.
- **Save Build:** Added a "Save Build" button to save the current build to localStorage.
- **View Saved Builds:** Added a "View Saved Builds" button (always visible) that navigates to a new page listing all saved builds. Each build can be expanded to show its parts in a styled, theme-adaptive dropdown.
- **Persistent Saved Builds:** Saved builds persist across navigation and reloads using localStorage.
- **Theme-Adaptive Dropdowns:** Saved builds dropdowns adapt their background color to the current theme for a seamless look.

## Features

- Easy-to-use interface for selecting PC components
- Real-time price calculation
- Component compatibility checking (including GPU/case length and PSU wattage)
- Modern, responsive design
- Beginner-friendly component selection
- Save and view multiple PC builds (persisted in localStorage)
- Expandable, theme-adaptive dropdowns for saved builds
- Accurate, tier-based bottleneck detection for CPUs and GPUs
- Multiple theme options:
  - Light theme
  - Purple theme
  - Green theme
  - Midnight theme (dark mode with red accents)
- Interactive audio visualizer with:
  - Theme-aware visualization colors
  - Volume control
  - Play/Stop functionality
  - Responsive frequency bars
  - Smooth animations and transitions

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
  - Download from: https://nodejs.org/
- npm (v6.0.0 or higher, included with Node.js)
- Git (for cloning the repository)
  - Download from: https://git-scm.com/downloads

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pc-part-picker.git
   cd pc-part-picker
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   Note: We use `--legacy-peer-deps` to ensure compatibility with all dependencies.

3. Create a production build (optional):
   ```bash
   npm run build
   ```

### Running the Application

For development:
```bash
npm start
```
The application will open in your default browser at `http://localhost:3000`.

For production (after building):
```bash
npm install -g serve
serve -s build
```
The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Runs the app in development mode with hot reloading
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Creates an optimized production build in the `build` folder
- `npm run eject` - Ejects from Create React App (one-way operation)
- `serve -s build` - Serves the production build locally

## Troubleshooting

### Common Issues

1. **Node version mismatch**
   ```bash
   nvm install 14
   nvm use 14
   ```

2. **Port already in use**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

3. **Dependencies installation fails**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules
   rm package-lock.json
   npm install --legacy-peer-deps
   ```

## Technologies Used

- React 18
- Material-UI v5
- Create React App
- Web Audio API (for audio visualization)
- React Router v6
- Context API for state management

## Theme Customization

The application supports multiple themes that can be toggled through the theme switcher in the navigation bar:

- **Light Theme**: Clean, professional look with white background
- **Purple Theme**: Modern purple accents with enhanced contrast
- **Green Theme**: Nature-inspired green accents
- **Midnight Theme**: Dark mode with striking red accents

## Audio Visualizer

The application includes an interactive audio visualizer that:

- Responds to the current theme colors
- Provides real-time frequency visualization
- Features smooth animations and transitions
- Includes volume control with a slider
- Supports play/stop functionality
- Automatically adapts to different screen sizes

## Browser Compatibility

The application is tested and supported on:
- Google Chrome (recommended, version 88+)
- Mozilla Firefox (version 85+)
- Microsoft Edge (version 88+)
- Safari (version 14+)

For the best experience, especially with the audio visualizer, we recommend using the latest version of Google Chrome.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

