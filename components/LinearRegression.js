import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const LinearRegression = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    trainModel().then((trainedModel) => {
      setModel(trainedModel);
    });
  }, []);

  const trainModel = async () => {
    const xs = tf.tensor1d([1, 2, 3, 4]);
    const ys = tf.tensor1d([2, 4, 6, 8]);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    await model.fit(xs, ys, { epochs: 250 });

    return model;
  };

  const predict = () => {
    if (!model) return;

    const input = tf.tensor1d([5]);
    const output = model.predict(input);

    setPrediction(output.dataSync()[0]);
  };

  return (
    <div>
      <h1>Simple Linear Regression with TensorFlow.js</h1>
      <button onClick={predict}>Predict for input 5</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default LinearRegression;
