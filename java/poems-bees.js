// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight / 2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;

var canvas;
var context;
var mouse = {x: 0, y: 0, down: false};
var touch = {x: 0, y: 0, down: false};
var letters = "";

document.addEventListener("DOMContentLoaded", () => {
  letters = prompt('You found all 30 eggs you weirdo... put letters, or words, or poems here!!!');

  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  drawTitle();

  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mouseout', mouseUp, false);
  canvas.addEventListener('dblclick', doubleClick, false);

  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

  window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
});

function drawTitle() {
  context.save();
  context.font = '48px Josefin Slab, serif';
  context.fillStyle = '#811f3c';
  context.textAlign = 'center';
  context.fillText('Spittoon Bees', canvas.width / 2, 60);
  context.restore();
}

function mouseMove(event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function updateBeePosition(x, y) {
  const bee = document.getElementById('bee-follow');
  if (bee) {
    bee.style.left = (x - 15) + 'px';
    bee.style.top = (y - 15) + 'px';
    bee.style.display = 'block';
  }
}

function draw() {
  if (!mouse.down) return;

  var d = distance(position, mouse);
  var fontSize = minFontSize + d / 2 + 7;
  var letter = letters[counter];
  var stepSize = textWidth(letter, fontSize);

  if (d > stepSize) {
    var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

    context.font = fontSize + "px Georgia";
    context.fillStyle = '#811f3c';

    context.save();
    context.translate(position.x + 12, position.y + 25);
    context.rotate(angle);
    context.fillText(letter, 0, 0);
    context.restore();

    counter++;
    if (counter > letters.length - 1) {
      counter = 0;
    }

    position.x += Math.cos(angle) * stepSize;
    position.y += Math.sin(angle) * stepSize;
  }
}

function handleTouchStart(e) {
  mouse.down = true;
  const touch = e.touches[0];
  position.x = touch.pageX;
  position.y = touch.pageY;
  const info = document.getElementById('info');
  if (info) info.style.display = 'none';
  e.preventDefault();
}

function handleTouchMove(e) {
  if (!mouse.down) return;
  const touch = e.touches[0];
  mouse.x = touch.pageX;
  mouse.y = touch.pageY;
  updateBeePosition(mouse.x, mouse.y);
  draw();
  e.preventDefault();
}

function handleTouchEnd(e) {
  mouse.down = false;
}

function distance(pt, pt2) {
  var xs = pt2.x - pt.x;
  var ys = pt2.y - pt.y;
  return Math.sqrt(xs * xs + ys * ys);
}

function mouseDown(event) {
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
  const info = document.getElementById('info');
  if (info) info.style.display = 'none';
}

function mouseUp(event) {
  mouse.down = false;
}

function doubleClick(event) {
  canvas.width = canvas.width;
}

function textWidth(string, size) {
  context.font = size + "px Georgia";
  return context.measureText(string).width;
}
