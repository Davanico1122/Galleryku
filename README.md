# Galeri Pribadi Dava - Personal Gallery

## Overview

This is a fully client-side personal image gallery web application built with vanilla HTML, CSS, and JavaScript. The application showcases personal photos in a modern, minimalist design inspired by Unsplash, featuring a clean gray color scheme with elegant animations and responsive layouts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend-Only Architecture
The application follows a purely client-side Single Page Application (SPA) pattern with no backend dependencies:

- **Static HTML Structure**: Single `index.html` file with semantic markup
- **Vanilla JavaScript**: No frameworks, direct DOM manipulation for interactions
- **CSS-First Styling**: Tailwind CSS via CDN with custom CSS animations
- **Local Asset Storage**: All images stored in `/img/` directory
- **No Build Process**: Direct browser execution without compilation

**Rationale**: This architecture ensures 100% offline functionality, zero deployment complexity, and complete control over gallery content. The choice eliminates server costs and maintenance while providing instant loading.

## Key Components

### 1. Data Layer (`script.js`)
- **Static Image Data**: JavaScript array containing image metadata
- **Image Schema**: Each image includes src, caption, tag, uploadedAt, dimensions, and orientation
- **Filter/Search Logic**: Real-time filtering by caption, tags, and date
- **Sorting System**: Date-based sorting (newest/oldest first)

**Design Decision**: Using a static array instead of JSON files allows for immediate data availability without HTTP requests, supporting true offline functionality.

### 2. User Interface (`index.html`)
- **Loading Screen**: Animated welcome screen with spinner and fade transitions
- **Header Section**: Title, description, and control panels
- **Gallery Grid**: Responsive Tailwind columns layout (1-4 columns based on screen size)
- **Lightbox Modal**: Full-screen image preview with navigation
- **Filter Controls**: Category buttons, search input, and sort dropdown

**Architecture Choice**: Using Tailwind's responsive column system instead of CSS Grid provides better masonry-style layouts that preserve image aspect ratios.

### 3. Styling System (`style.css`)
- **Custom Animations**: Fade-in, scale-in, slide-up, and pulse effects
- **Smooth Interactions**: CSS transitions for hover states and modal overlays
- **Custom Scrollbar**: Styled scrollbars matching the gray theme
- **Responsive Typography**: Inter font family for modern readability

## Data Flow

### Image Rendering Process
1. **Initialization**: Load image data array on page load
2. **Filtering**: Apply active filters (category, search, favorites)
3. **Sorting**: Apply selected sort order (newest/oldest)
4. **Rendering**: Generate DOM elements for filtered images
5. **Layout**: Apply responsive column layout with aspect ratio preservation

### User Interactions
1. **Search**: Real-time filtering as user types
2. **Category Filter**: Toggle category buttons to filter by tags
3. **Favorites**: Click heart icons to add/remove from favorites
4. **Lightbox**: Click images to open full-screen preview
5. **Sort**: Change order via dropdown selection

## External Dependencies

### CDN Resources
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Google Fonts**: Inter font family for typography
- **No JavaScript Libraries**: Pure vanilla JS implementation

**Dependency Strategy**: Minimal external dependencies with CDN fallbacks ensure fast loading while maintaining offline capability after initial load.

## Deployment Strategy

### Static Hosting Approach
- **File Structure**: Flat directory structure with `/img/` subfolder
- **No Server Required**: Can be served from any static host or local file system
- **Direct Browser Access**: `file://` protocol support for local development
- **CDN Dependencies**: Only external requirement is internet access for initial CSS/font loading

### Production Considerations
- **Image Optimization**: Images should be optimized for web (JPEG/PNG compression)
- **Browser Compatibility**: Modern browser features used (CSS Grid, Flexbox, ES6)
- **Performance**: Lazy loading not implemented due to small gallery size assumption
- **SEO**: Basic meta tags included, but SPA nature limits SEO benefits

**Deployment Rationale**: The static-only approach allows deployment to any web server, GitHub Pages, Netlify, or even local file sharing without configuration overhead.

## Development Notes

### Current Implementation Status
- **Core Features**: Gallery grid, filtering, search, and lightbox are functional
- **Incomplete Files**: `script.js` appears truncated in the repository
- **Asset Requirements**: Requires actual image files in `/img/` directory
- **Browser Testing**: Designed for modern browsers with CSS Grid support

### Future Enhancement Opportunities
- **Progressive Web App**: Service worker for true offline capability
- **Image Lazy Loading**: For larger galleries with many images
- **Touch Gestures**: Swipe navigation for mobile lightbox
- **Keyboard Navigation**: Arrow key support for lightbox navigation
- **Export Features**: Download or share functionality for images