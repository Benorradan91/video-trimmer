import './App.css'
import VideoPlayer from './components/VideoPlayer';

function App() {
  // אפשר לקבל את שם הקובץ מה-URL (query param) או משתנה סביבה
  const params = new URLSearchParams(window.location.search);
  const videoFile = params.get("video") || undefined;

  return (
    <div className="App">
      <VideoPlayer videoFile={videoFile} />
    </div>
  );
}

export default App;
