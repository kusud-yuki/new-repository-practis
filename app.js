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
const changeBgButton = document.getElementById('change-bg');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

changeBgButton.addEventListener('click', function() {
  document.body.style.backgroundColor = getRandomColor();
});

const submitTextButton = document.getElementById('submit-text');
const menuText = document.getElementById('menu-text');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');
const backButton = document.getElementById('back-button');
const amplitudeSlider = document.getElementById('amplitude-slider');


let texts = [];

backButton.addEventListener('click', function() {
  window.history.back();
});

amplitudeSlider.addEventListener('input', function() {
  wave.amplitude = this.value;
});

submitTextButton.addEventListener('click', function() {
  texts.unshift(menuText.value); 
  menuText.value = ''; 

  if (texts.length > 3) {
    texts.pop(); 
  }

  
  text1.textContent = texts[0] || '';
  text2.textContent = texts[1] || '';
  text3.textContent = texts[2] || '';
});
menuText.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) { 
    texts.unshift(menuText.value); 
    menuText.value = ''; 

    if (texts.length > 3) {
      texts.pop(); 
    }

    text1.textContent = texts[0] || '';
    text2.textContent = texts[1] || '';
    text3.textContent = texts[2] || '';
  }
});



let increment = wave.frequency;
function drawCircle() {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = circleColor;
    ctx.fill();
  }
// テキストの設定
let textContent = 'Hello, World!';
function drawText() {
  ctx.font = '24px sans-serif';
  ctx.fillStyle = '#000000';
  ctx.fillText(textContent, mouse.x + 30, mouse.y + 30);
}
// 四角形の設定
let squareSize = 100;
function drawSquare() {
  ctx.fillStyle = '#00FF00';
  ctx.fillRect(
    (canvas.width - squareSize) / 2,
    (canvas.height - squareSize) / 2,
    squareSize,
    squareSize
  );
}
window.clearCanvas = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

  // クリックイベントの追加
let circleColor = '#ff0000';
let clickCount = 0;

canvas.addEventListener('click', function() {
  circleColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  clickCount++;
  textContent = `Clicked: ${clickCount} times`;
  squareSize = Math.floor(Math.random() * 150) + 50;

});
// グラデーション円の設定
function drawGradientCircle() {
  const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 20);
  gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function changeAmplitude() {
  wave.amplitude = Math.floor(Math.random() * 150) + 50;
}
let isAnimating = true;
// アニメーションの描画
function animate() {
  if (!isAnimating) return;
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

  drawGradientCircle();

  drawText();

  drawSquare();

  requestAnimationFrame(animate);
}

animate();
  