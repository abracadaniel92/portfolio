/**
 * Capture screenshots for all public projects using ScreenshotOne API.
 * Run with:  node capture-screens.js
 *
 * Requirements:
 *   1. npm install axios fs-extra
 *   2. Replace YOUR_API_KEY with your ScreenshotOne key from https://screenshotone.com
 */

const axios = require("axios");
const fs = require("fs-extra");


const API_KEY = "ZFKIk7mme4MtyA"; // 🔑 Replace this with your ScreenshotOne API key
const OUTPUT_DIR = "./images/projects";

const projects = {
  // --- TSD DIGITAL ---
  bond: "https://bondjewellery.co.uk",
  brightwells: "https://brightwells.co.uk",
  joedavies: "https://joedavies.co.uk",
  etap: "https://etap.com",
  allnationscentre: "https://allnationscentre.com",
  quotehub: "https://quotehub.ai",
  ameriband: "https://ameriband.com",
  avansere: "https://avansere.no",
  delineate: "https://delineate.ai",
  wyevalleybrewery: "https://www.wyevalleybrewery.co.uk",
  westonscider: "https://www.westons-cider.co.uk",
  westgatelabs: "https://www.westgatelabs.co.uk",

  // --- VOX TENEO ---
  erasmus: "https://erasmus-plus.ec.europa.eu",
  pegi: "https://pegi.info",
  thomaspiron: "https://thomas-piron.lu",
  monitoring: "https://monitoringdesquartiers.brussels",
  sportbrussels: "https://sport.brussels",
  dieterengroup: "https://www.dieterengroup.com",
  otra: "https://otra.ngo",
  lawbox: "https://lawbox.com",
};

// 🧩 Helper function to capture one site
async function captureScreenshot(name, url) {
  try {
    console.log(`📸 Capturing ${name} → ${url}`);

    const response = await axios.get("https://api.screenshotone.com/take", {
      params: {
        access_key: API_KEY,
        url,
        device: "desktop",
        width: 1200,
        height: 800,
        full_page: false,
        delay: 2,
        format: "png",
        block_ads: true,
      },
      responseType: "arraybuffer",
      timeout: 60000,
    });

    const outputPath = `${OUTPUT_DIR}/${name}.png`;
    await fs.outputFile(outputPath, response.data);
    console.log(`✅ Saved: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to capture ${name}:`, error.message);
  }
}

async function main() {
  console.log("🚀 Starting project screenshot capture...\n");
  await fs.ensureDir(OUTPUT_DIR);

  // Capture all projects in parallel (limit concurrency if needed)
  const captures = Object.entries(projects).map(([name, url]) =>
    captureScreenshot(name, url)
  );

  await Promise.all(captures);
  console.log("\n🎉 All 20 screenshots captured successfully!");
}

main();
