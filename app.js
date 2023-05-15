// canvas要素の取得
const canvas = document.getElementById('canvas');
const mouse = {
    x: null,
    y: null
  };

// 現在の日時を取得
const currentDate = new Date();

// 日時を表示する要素を取得
const dateElement = document.getElementById('date');

// 日時を表示するテキストを作成
const dateText = `現在の日時は${currentDate.toLocaleString()}です。`;

// 日時を表示する要素にテキストを設定
dateElement.textContent = dateText;

// コンテキストの取得
const ctx = canvas.getContext('2d');
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  
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
function drawCircle() {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = circleColor;
    ctx.fill();
  }

  // クリックイベントの追加
let circleColor = '#ff0000';
canvas.addEventListener('click', function() {
  circleColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
});



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
  drawCircle();
  // 波の動きを設定
  increment += wave.frequency;

  requestAnimationFrame(animate);
}

animate();  