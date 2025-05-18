# React Video Trimmer

This project is a React-based video trimmer application built with Vite.  
It allows you to load a video, preview it, and visually select a trim range using a draggable timeline with video thumbnails.

## Features

- Custom video player with play/pause and volume controls
- Visual timeline with generated video thumbnails
- Draggable trim bar to select start and end points for trimming
- Timeline seeking only within the selected trim range
- Responsive and modern UI
- **Choose video file via URL parameter**

## Getting Started

### Prerequisites

- Node.js 
- npm

### Installation

[![Run npm install](https://img.shields.io/badge/Run-npm%20install-blue?logo=npm)](javascript:copy('npm install'))
```bash
npm install
```

### Running the App

[![Run npm run dev](https://img.shields.io/badge/Run-npm%20run%20dev-blue?logo=npm)](javascript:copy('npm run dev'))
```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. The app loads a sample video (`puppy.mp4` by default).
2. **To use a different video file, add a `video` parameter to the URL:**  
   Example:  
   [`http://localhost:5173/?video=my_video.mp4`](http://localhost:5173/?video=my_video.mp4)
   - The file should be placed in the `public` folder or be accessible by the browser.
   - If the file does not exist, the default video will be used.
3. Use the play button to preview the video.
4. Drag the green trim handles on the timeline to select the desired start and end points.
5. You can seek within the selected trim range by clicking on the timeline.
6. The timeline displays thumbnails for easy navigation.

## How to choose the video file

- To select a specific video file, add a `video` parameter to the URL as shown above.
- For example, if you want to use a file called `myfile.mp4` that is in the `public` folder, open:  
  [`http://localhost:5173/?video=myfile.mp4`](http://localhost:5173/?video=myfile.mp4)
- If the file does not exist, the default video will be loaded.

## Project Structure

- `src/components/VideoPlayer.jsx` - Main video player component
- `src/components/Timeline.jsx` - Timeline with thumbnails and trim bar
- `src/components/TrimBar.jsx` - Draggable trim bar handles
- `src/styles/VideoPlayer.css`, `src/styles/Timeline.css` - Styling

## Notes

- The app does not actually export or save the trimmed video, but provides a visual and interactive trimming experience.
- You can replace the video file in the `public` folder or change the source in `VideoPlayer.jsx`.
- If the requested video file does not exist, the default video will be used.



