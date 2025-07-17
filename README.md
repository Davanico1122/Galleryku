# Personal Gallery Project - Replit.md

## Overview

This is a 100% offline personal image gallery web application designed to showcase personal photos without requiring any server, API, or backend infrastructure. The application is built using vanilla HTML, CSS, and JavaScript with Tailwind CSS for styling, creating a minimalist and professional gallery experience that can be opened directly by double-clicking the index.html file.

**Latest Update (July 17, 2025)**: 
- Enhanced with fully responsive auto-height layout that preserves image aspect ratios without cropping
- Removed problematic dark mode functionality that was causing UI issues
- Upgraded to 10 high-quality placeholder images with Indonesian cultural content
- Fixed like/favorite system to prevent unwanted page refreshes when clicking heart icons
- Replaced all gradient colors with professional gray color scheme as requested
- Improved card hover effects and button styling for better user experience

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend-Only Architecture
The application follows a purely client-side architecture with no server components:

- **Single Page Application (SPA)**: Built with vanilla HTML/CSS/JavaScript
- **Static Asset Approach**: All images are stored locally in the `/images/` directory
- **CDN Dependencies**: Only uses Tailwind CSS CDN and Google Fonts for styling
- **No Build Process**: Direct execution without compilation or bundling

**Rationale**: This approach ensures 100% offline functionality and eliminates deployment complexity while maintaining full control over the gallery content.

## Key Components

### 1. Data Management (`script.js`)
- **Image Data Array**: Central data structure containing image metadata
- **Filtering System**: Real-time search and tag-based filtering
- **Sorting Logic**: Date-based sorting (newest/oldest first)

**Structure**: Each image object contains:
```javascript
{
    src: 'images/filename.jpg',
    caption: 'Description',
    tag: 'Category',
    uploadedAt: 'ISO date string'
}
```

### 2. User Interface (`index.html`)
- **Loading Screen**: Animated welcome screen with spinner
- **Gallery Grid**: Responsive Tailwind grid layout (2/3/4 columns)
- **Search Interface**: Real-time text search input
- **Filter Tags**: Dynamic category buttons
- **Lightbox Modal**: Fullscreen image viewer

### 3. Styling System (`style.css` + Tailwind)
- **Neutral Color Scheme**: Gray/white/black palette only
- **Custom Animations**: Fade-in, scale-in, and pulse effects
- **Responsive Design**: Mobile-first approach with breakpoints
- **Professional Aesthetics**: Clean, minimalist design
- **Auto-Height Layout**: Images preserve aspect ratios without cropping
- **Adaptive Grid**: Dynamic column count (1/2/3/4) based on screen size

## Data Flow

1. **Application Initialization**:
   - Loading screen displays while content loads
   - Image data array is processed
   - Dynamic filter tags are generated
   - Initial gallery grid is rendered

2. **User Interactions**:
   - Search input triggers real-time filtering
   - Tag buttons update current filter state
   - Sort dropdown reorders displayed images
   - Image clicks open lightbox modal

3. **State Management**:
   - `filteredImages` array maintains current view state
   - `currentFilter` tracks active tag filter
   - DOM manipulation updates visual elements

## External Dependencies

### Minimal External Resources
- **Tailwind CSS CDN**: For utility-first styling framework
- **Google Fonts (Inter)**: For professional typography
- **No other external dependencies**: Maintains offline functionality

**Design Decision**: Using CDNs for styling frameworks reduces file size while maintaining the core offline functionality for the gallery logic and content.

## Deployment Strategy

### Direct File Access
- **No Server Required**: Application runs directly from file system
- **Static Hosting Compatible**: Can be deployed to any static hosting service
- **Local Development**: Double-click index.html to run
- **No Build Process**: Files are ready for immediate use

### File Structure
```
/
├── index.html          # Main application file
├── script.js          # Application logic and data
├── style.css          # Custom styles and animations
└── images/            # Local image storage directory
    ├── placeholder1.jpg
    ├── placeholder2.jpg
    └── placeholder3.jpg
```

### Constraints and Restrictions
- **No Backend Technologies**: Absolutely no Node.js, Express, PHP, Python, etc.
- **No Package Managers**: No npm, yarn, or similar tools
- **No Build Tools**: No Vite, Webpack, or framework tools
- **No APIs**: No external data fetching or server communication
- **Color Restrictions**: Only neutral colors (gray, white, black, stone, zinc) - no gradients or bright colors
- **Professional Design**: Clean, minimalist aesthetic with subtle hover effects
- **Like System**: Non-intrusive favoriting without page refreshes or layout shifts

This architecture ensures maximum simplicity, reliability, and ease of use while providing a complete gallery experience that works entirely offline.
