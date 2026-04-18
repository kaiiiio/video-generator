const { execSync } = require('child_process');
const path = require('path');

const audioFile = process.argv[2];
if (!audioFile) {
  console.error('Usage: node build.js <audio.wav>');
  process.exit(1);
}

const audioPath = path.join(__dirname, 'assets', audioFile);
const srtPath = path.join(__dirname, 'assets', audioFile.replace('.wav', '.srt'));
const baseVideoPath = path.join(__dirname, 'output', 'base.mp4');
const finalVideoPath = path.join(__dirname, 'output', 'final.mp4');

try {
  // Step A: Generate SRT
  execSync(`auto_subtitle "${audioPath}" --srt_only True --output "${srtPath}"`, { stdio: 'inherit' });

  // Step B: Render Remotion video
  execSync(`cd remotion-engine && npx remotion render TheLanguageGap "${baseVideoPath}" --props='{"audioFile":"${audioPath}"}'`, { stdio: 'inherit' });

  // Step C: Burn subtitles with FFmpeg
  execSync(`ffmpeg -i "${baseVideoPath}" -i "${audioPath}" -vf "subtitles='${srtPath}':force_style='FontName=Arial,FontSize=24,PrimaryColour=&Hffffff&,OutlineColour=&H000000&'" -c:a aac -c:v libx264 "${finalVideoPath}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}