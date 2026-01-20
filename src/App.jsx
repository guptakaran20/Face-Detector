import './App.css'
import {useRef } from "react";
import { Header,Video,Canvas,Background } from './Components/index.js';
import useFaceDetection from './hooks/useFaceDetection';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useFaceDetection(videoRef, canvasRef);

  return (
    <>
    <Background />
    <main className="z-10 w-full max-w-4xl px-4 py-8 flex flex-col items-center gap-8">
        <Header />
        <div className="relative group w-full max-w-180 mx-auto">
            <div id="video-container" className="relative w-fit mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 ring-1 ring-white/10">
                  <Video ref={videoRef} />
                  <Canvas ref={canvasRef} />      
            </div>
        </div>
    </main>
  </>
  )
}

export default App
