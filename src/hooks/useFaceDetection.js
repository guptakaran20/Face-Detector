import { useEffect,useRef } from "react";
import * as faceapi from "face-api.js";

function useFaceDetection(videoRef, canvasRef) {
    const MODEL_URL = import.meta.env.BASE_URL + "models/";

    
    const isDetectingRef = useRef(false);
useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const start = async () => {
      await Promise.all([
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]);
      const run = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = run;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        runDetection();
      };
    }

    const runDetection = async () => {
        if (isDetectingRef.current) return;   
  isDetectingRef.current = true;
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const rect = video.getBoundingClientRect();
      const size = {
        width: rect.width,
        height: rect.height,
      };
      canvas.width = rect.width;
      canvas.height = rect.height;
      faceapi.matchDimensions(canvas, size);

      const facedetect = async () => {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
        const resizedResults = faceapi.resizeResults(detections, size)
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedResults)
        faceapi.draw.drawFaceExpressions(canvas, resizedResults, 0.05);
        requestAnimationFrame(facedetect);
        console.log(detections);
        resizedResults.forEach(result => {
          const { age, detection,gender } = result;
          const box = detection.box;
          const text = `${Math.round(age)} yrs ${gender}`;
          const drawText = new faceapi.draw.DrawTextField(
            [text],
            box.bottomRight
          );
          drawText.draw(canvas);
        });

      };
      facedetect();
    }
    start();
 return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, [videoRef, canvasRef]
  );}

export default useFaceDetection;
