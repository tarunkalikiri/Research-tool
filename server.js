const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const buffer = fs.readFileSync(req.file.path);
    const data = await pdf(buffer);

    fs.unlinkSync(req.file.path);

    // Demo structured output
    res.json({
      tone: "Optimistic",
      confidence: "Medium",
      key_positives: [
        "Revenue growth mentioned",
        "Market expansion discussed",
        "Strong demand signals"
      ],
      key_concerns: [
        "Cost pressures",
        "Macro uncertainty"
      ],
      forward_guidance: "Management expects moderate growth",
      capacity_trends: "Stable",
      growth_initiatives: [
        "New product launches",
        "Geographic expansion"
      ]
    });

  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
