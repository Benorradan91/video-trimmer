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
- **Unit tests for main components**

## Getting Started

### Prerequisites

- Node.js 
- npm

### Installation

[Click to copy: `npm install`](#)
```bash
npm install
```

### Running the App

[Click to copy: `npm run dev`](#)
```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Running Tests

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for unit tests.

[Click to copy: `npm test`](#)
```bash
npm test
```

Or, if you use yarn:

[Click to copy: `yarn test`](#)
```bash
yarn test
```

Test files are located in `src/components/tests/` (e.g. `src/components/tests/Timeline.test.jsx`, `src/components/tests/TrimBar.test.jsx`).

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
- `src/components/tests/Timeline.test.jsx`, `src/components/tests/TrimBar.test.jsx` - Unit tests

## Notes

- The app does not actually export or save the trimmed video, but provides a visual and interactive trimming experience.
- You can replace the video file in the `public` folder or change the source in `VideoPlayer.jsx`.
- If the requested video file does not exist, the default video will be used.

## Deploying to GitHub

To push your project to GitHub:

1. [Create a new repository on GitHub](https://github.com/new).
2. Open a terminal in your project folder.
3. If you see `fatal: not a git repository`, run:

   ```bash
   git init
   ```

4. Add all files:

   ```bash
   git add .
   ```

5. Commit your changes:

   ```bash
   git commit -m "Initial commit"
   ```

6. **Add your GitHub repository as a remote:**

   ```bash
   git remote add origin https://github.com/Benorradan91/video-trimmer.git
   ```

7. Push to GitHub:

   ```bash
   git push -u origin master
   ```

   If you use `main` as your default branch, use:

   ```bash
   git push -u origin main
   ```

Now your project is on GitHub!


