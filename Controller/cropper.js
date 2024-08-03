const path = require("path");
const sharp = require("sharp");



const cropperLogic = (req, res) => {
  try {
    const { filename } = req.params;
    const { width, height, x, y } = req.query;

    const imagePath = path.join(__dirname,"..","upload", filename);
    sharp(imagePath)
      .extract({
        left: parseInt(x),
        top: parseInt(y),
        width: parseInt(width),
        height: parseInt(height),
      })
      .toBuffer((err, transformedBuffer) => {
        if (err) {
          console.error("Error transforming image:", err);
          return res.status(500).send("Error transforming image.");
        }
        res.set("Content-Type", "image/jpeg");
        res.send(transformedBuffer);
      });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request.");
  }
};

module.exports = { cropperLogic };
