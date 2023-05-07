import React, { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

function ObjectDetection() {
  const [model, setModel] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  async function loadModel() {
    const model = await cocoSsd.load();
    setModel(model);
  }

  async function detectObjects(event) {
    const img = event.target.files[0];
    const imgURL = URL.createObjectURL(img);
    imgRef.current.src = imgURL;

    const tensorImg = tf.browser.fromPixels(imgRef.current);
    const predictions = await model.detect(tensorImg);

    const ctx = canvasRef.current.getContext('webgl');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(imgRef.current, 0, 0);
    ctx.font = '10px Arial';
    predictions.forEach(prediction => {
      ctx.beginPath();
      ctx.rect(...prediction.bbox);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'green';
      ctx.fillStyle = 'green';
      ctx.stroke();
      ctx.fillText(prediction.class, prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);
    });
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={loadModel} />
      <br />
      <canvas ref={canvasRef} />
      <br />
      <img ref={imgRef} style={{ display: 'none' }} alt="imagen" />

    </div>
  );
}

export default ObjectDetection;
