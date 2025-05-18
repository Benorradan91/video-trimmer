/**
 * Extracts thumbnails from a video element using canvas.
 * @param {HTMLVideoElement} video - The video element (must have src loaded).
 * @param {number} count - Number of thumbnails to extract.
 * @returns {Promise<string[]>} Array of base64 image URLs.
 */
export async function extractThumbnails(video, count) {
  // Wait for video to be loaded and ready
  if (video.readyState < 2) {
    await new Promise(resolve => {
      const onLoaded = () => {
        video.removeEventListener('loadeddata', onLoaded);
        resolve();
      };
      video.addEventListener('loadeddata', onLoaded);
    });
  }

  const duration = video.duration;
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 90;
  const ctx = canvas.getContext('2d');
  const thumbnails = [];

  for (let i = 0; i < count; i++) {
    const time = (i / (count - 1)) * duration;
    await new Promise(resolve => {
      const onSeeked = () => {
        // Wait for frame to be ready
        if (video.readyState < 2) {
          setTimeout(onSeeked, 20);
          return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        thumbnails.push(canvas.toDataURL("image/jpeg", 0.7));
        video.removeEventListener('seeked', onSeeked);
        resolve();
      };
      video.addEventListener('seeked', onSeeked);
      video.currentTime = time;
    });
  }

  return thumbnails;
}
