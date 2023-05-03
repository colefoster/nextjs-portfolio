import { PythonShell } from 'python-shell';

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const result = await new Promise((resolve, reject) => {
      console.log("running python");
      const pyshell = new PythonShell('image_generator.py', { args: [prompt] });

      pyshell.on('message', (message) => {
        console.log("Python message:", message);
      });

      pyshell.on('error', (error) => {
        console.log("Python error:", error);
        reject(error);
      });

      pyshell.on('close', (results) => {
        if (results === 0) {
          console.log("Python script completed successfully");
        } else {
          console.log(`Python script exited with code ${results}`);
        }
      });

      pyshell.end((err, code, signal) => {
        if (err) {
          console.log("PythonShell error:", err);
          reject(err);
        } else {
          console.log("PythonShell exit code:", code);
          console.log("PythonShell exit signal:", signal);
          resolve();
        }
      });
    });

    const imageUrl = `data:image/png;base64,${result}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error.message);
    res.status(500).json({ error: error.message });
  }
}
