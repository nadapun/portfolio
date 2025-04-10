// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight / 2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "";

// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 38, down: false};

document.addEventListener('DOMContentLoaded', () => {
  letters = prompt('Copy and paste one of your poems here.');

  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mouseout', mouseUp, false);
  canvas.addEventListener('dblclick', doubleClick, false);

  window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
});

function mouseMove(event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
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

    context.save();
    context.translate(position.x, position.y - 38);
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
