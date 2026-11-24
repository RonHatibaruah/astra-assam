#!/usr/bin/env node

/**
 * Autonomous Gemini Pro Image Generation Bot using Chrome DevTools Protocol & Puppeteer
 * Authenticated via Google Pro Account: sumanzfilms@gmail.com
 *
 * Usage:
 *   node scripts/chrome_gemini_bot.js
 *   node scripts/chrome_gemini_bot.js --id=arch
 *   node scripts/chrome_gemini_bot.js --filename=infographic_system_architecture.png
 *   node scripts/chrome_gemini_bot.js --force
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('/Users/kalyan/Downloads/2026/Sep2026/Data Centers and Way Head/node_modules/puppeteer-core');

const BASE_DIR = path.resolve(__dirname, '..');
const PROMPTS_FILE = path.join(BASE_DIR, 'scripts', 'image_prompts.json');
const ASSETS_DIR = path.join(BASE_DIR, 'public', 'assets');

// Parse CLI Arguments
const args = process.argv.slice(2);
let port = 9222;
let filterId = null;
let filterFilename = null;
let forceOverwrite = false;

args.forEach(arg => {
  if (arg.startsWith('--port=')) {
    port = parseInt(arg.replace('--port=', '').trim(), 10);
  } else if (arg.startsWith('--id=')) {
    filterId = arg.replace('--id=', '').trim();
  } else if (arg.startsWith('--filename=')) {
    filterFilename = arg.replace('--filename=', '').trim();
  } else if (arg === '--force') {
    forceOverwrite = true;
  }
});

if (!fs.existsSync(PROMPTS_FILE)) {
  console.error(`❌ Error: Prompts file not found at ${PROMPTS_FILE}`);
  process.exit(1);
}

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const allPrompts = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
const queue = allPrompts.filter(item => {
  if (filterId && item.id !== filterId) return false;
  if (filterFilename && item.filename !== filterFilename) return false;
  const targetPath = path.join(ASSETS_DIR, item.filename);
  if (fs.existsSync(targetPath) && !forceOverwrite) {
    // If it exists but is under 50KB (placeholder/old), allow overwrite
    const stats = fs.statSync(targetPath);
    if (stats.size > 200 * 1024) return false;
  }
  return true;
});

console.log('\n=============================================================');
console.log('🤖 ASTRA-ASSAM GEMINI PRO IMAGEN 3 AUTOMATION BOT (CDP)');
console.log('=============================================================');
console.log(`🔌 Target Chrome Port      : ${port}`);
console.log(`📁 Target Assets Directory : ${ASSETS_DIR}`);
console.log(`📋 Total Prompts to Run    : ${queue.length} of ${allPrompts.length}`);
if (filterId) console.log(`🔍 Filter ID               : ${filterId}`);
if (filterFilename) console.log(`🔍 Filter Filename         : ${filterFilename}`);
console.log('=============================================================\n');

if (queue.length === 0) {
  console.log('✨ All images in queue already exist! Use --force to regenerate.\n');
  process.exit(0);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  let browser;
  try {
    console.log(`⏳ Connecting to Chrome on http://127.0.0.1:${port}...`);
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${port}`,
      defaultViewport: null
    });
    console.log(`✅ Connected successfully to Google Chrome!`);
  } catch (err) {
    console.error(`\n❌ Could not connect to Google Chrome on port ${port}: ${err.message}`);
    process.exit(1);
  }

  const pages = await browser.pages();
  let geminiPage = pages.find(p => p.url().includes('gemini.google.com'));

  if (!geminiPage) {
    console.log(`🌐 Opening a new tab navigating to https://gemini.google.com/app...`);
    geminiPage = await browser.newPage();
    await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
  } else {
    console.log(`🌐 Found active Gemini tab: ${geminiPage.url()}`);
    await geminiPage.bringToFront();
  }

  // Verify account
  const accountInfo = await geminiPage.evaluate(() => {
    const avatar = document.querySelector('img[alt*="Google Account"], a[aria-label*="Google Account"], button[aria-label*="Google Account"]');
    return avatar ? (avatar.getAttribute('aria-label') || avatar.getAttribute('alt')) : 'Unknown';
  });
  console.log(`👤 Active Google Account: ${accountInfo}`);

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const targetFile = path.join(ASSETS_DIR, item.filename);

    console.log(`\n-------------------------------------------------------------`);
    console.log(`[${i + 1}/${queue.length}] 🎨 Generating: ${item.title}`);
    console.log(`   📄 Output File : public/assets/${item.filename}`);
    console.log(`   🏷️ Section     : ${item.section}`);
    console.log(`-------------------------------------------------------------`);

    let promptSent = false;
    let attempts = 0;

    while (attempts < 2 && !promptSent) {
      attempts++;
      try {
        // Start fresh chat
        console.log(`   🔄 Opening fresh conversation...`);
        const clickedNewChat = await geminiPage.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => 
            (b.getAttribute('aria-label') && b.getAttribute('aria-label').toLowerCase().includes('new chat')) ||
            (b.innerText && b.innerText.toLowerCase().includes('new chat'))
          );
          if (btn) {
            btn.click();
            return true;
          }
          return false;
        });

        if (!clickedNewChat) {
          await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
        }
        await sleep(3000);

        // Wait for editor
        await geminiPage.waitForSelector('div.ql-editor', { timeout: 15000 });

        // Record existing images in DOM
        const existingImageUrls = await geminiPage.evaluate(() => {
          return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
        });

        // Focus & Insert text using execCommand (safe for TrustedHTML)
        await geminiPage.click('div.ql-editor');
        await sleep(500);

        const promptText = `Generate a high-impact 16:9 widescreen technological framework infographic: ${item.prompt}`;
        
        await geminiPage.evaluate((text) => {
          const editor = document.querySelector('div.ql-editor');
          if (editor) {
            editor.focus();
            document.execCommand('selectAll', false, null);
            document.execCommand('delete', false, null);
            document.execCommand('insertText', false, text);
          }
        }, promptText);

        await sleep(1500);

        // Click Send button
        const clickedSend = await geminiPage.evaluate(() => {
          const btn = document.querySelector('button[aria-label="Send message"]');
          if (btn && !btn.disabled) {
            btn.click();
            return true;
          }
          return false;
        });

        if (!clickedSend) {
          await geminiPage.keyboard.press('Enter');
        }

        console.log(`   📤 Prompt submitted. Waiting for Gemini Imagen 3 generation...`);
        promptSent = true;

        // Poll for newly generated image in DOM
        let imageBuffer = null;
        let waitAttempts = 0;

        while (!imageBuffer && waitAttempts < 40) {
          await sleep(3000);
          waitAttempts++;

          const newImageData = await geminiPage.evaluate((existingUrls) => {
            const allImages = Array.from(document.querySelectorAll('img'));
            const candidates = allImages.filter(img => 
              img.src && 
              !existingUrls.includes(img.src) &&
              (img.src.includes('googleusercontent.com') || img.src.startsWith('blob:') || img.src.startsWith('data:image')) &&
              img.naturalWidth > 350
            );

            if (candidates.length > 0) {
              const latest = candidates[candidates.length - 1];
              try {
                const canvas = document.createElement('canvas');
                canvas.width = latest.naturalWidth;
                canvas.height = latest.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(latest, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                return {
                  width: latest.naturalWidth,
                  height: latest.naturalHeight,
                  base64: dataUrl.split(',')[1]
                };
              } catch (e) {
                return null;
              }
            }
            return null;
          }, existingImageUrls);

          if (newImageData && newImageData.base64) {
            console.log(`   🖼️ Image detected in chat (${newImageData.width}x${newImageData.height})! Extracting full-resolution PNG...`);
            imageBuffer = Buffer.from(newImageData.base64, 'base64');
          } else {
            process.stdout.write('.');
          }
        }
        console.log('');

        if (imageBuffer) {
          fs.writeFileSync(targetFile, imageBuffer);
          const stats = fs.statSync(targetFile);
          console.log(`   ✅ Successfully saved: public/assets/${item.filename} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          successCount++;
        } else {
          console.error(`   ⚠️ Timed out waiting for ${item.filename} (120s). Skipping to next...`);
          failureCount++;
        }

      } catch (err) {
        console.error(`   ⚠️ Error during processing: ${err.message}`);
        if (attempts >= 2) failureCount++;
      }
    }

    // Cooling down between prompts
    if (i < queue.length - 1) {
      console.log(`   ⏳ Cooling down for 6 seconds before next image...`);
      await sleep(6000);
    }
  }

  console.log('\n=============================================================');
  console.log(`🎉 GENERATION BATCH COMPLETE: ${successCount} Succeeded, ${failureCount} Failed`);
  console.log('=============================================================\n');

  await browser.disconnect();
}

main().catch(err => {
  console.error('Fatal bot error:', err);
  process.exit(1);
});
