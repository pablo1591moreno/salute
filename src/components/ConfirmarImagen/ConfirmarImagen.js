import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

function ObjectDetection() {
  const [model, setModel] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [imageData, setImageData] = useState(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  // Cargar el modelo COCO-SSD
  useEffect(() => {
    async function loadModel() {
      const model = await cocoSsd.load();
      setModel(model);
    }
    loadModel();
  }, []);

  // Detectar objetos cuando se carga una nueva imagen
  useEffect(() => {
    async function detectObjects() {
      if (imageLoaded && model) {
        const tensor = tf.browser.fromPixels(imageData);
        const predictions = await model.detect(tensor);
        setPredictions(predictions);
      }
    }
    detectObjects();
  }, [imageLoaded, model, imageData]);

  // Dibujar los resultados en un canvas
  useEffect(() => {
    if (predictions.length > 0 && imageData) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(imageData, 0, 0);
      ctx.font = '12px Arial';
      ctx.fillStyle = 'red';
      predictions.forEach((prediction) => {
        ctx.beginPath();
        ctx.rect(...prediction.bbox);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.stroke();
        ctx.fillText(prediction.class, prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);
      });
    }
  }, [predictions, imageData]);

  // Manejar el cambio de imagen
  function handleImageChange(event) {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImageData(img);
        setImageLoaded(true);
      };
    };
    reader.readAsDataURL(image);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} ref={inputRef} />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ObjectDetection;
