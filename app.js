
// canvas要素の取得
const canvas = document.getElementById('canvas');

// コンテキストの取得
const ctx = canvas.getContext('2d');

// 画面サイズの取得
const width = window.innerWidth;
const height = window.innerHeight;

// canvasサイズの指定
canvas.width = width;
canvas.height = height;

// パラメータの設定
const wave = {
  y: height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
};

let increment = wave.frequency;

// アニメーションの描画
function animate() {
  // 背景の描画
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // 波の描画
  ctx.beginPath();
  ctx.moveTo(0, wave.y);
  for (let i = 0; i < width; i++) {
    ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude);
  }
  ctx.strokeStyle = '#000000';
  ctx.stroke();

  // 波の動きを設定
  increment += wave.frequency;

  requestAnimationFrame(animate);
}

animate();

