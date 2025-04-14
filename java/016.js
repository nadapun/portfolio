// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight / 2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var hasDrawn = false;
var letters = "1 bee, my consciousness flies and glides and empathizes and now im a bee and now im me and next to me some lemonade " +
"but also a conversation about violence and i drifted too far and now people are yelling and i just need nectar but the metaphor is broken.. is this just an icon on a screen? also we don't really know the current population of bees" +
"- we can use pollination spread analysis, managed bee rates or now people are yelling so i am just gonna find a flower but is there a flower... my home destroyed, the eldritch gods yelling.... do we use population adjacency metrics... i just want to buzz... i haven't died yet. anger everywhere.  is the trail i leave important... probably not. are you still here... another bee to send a message or just to dance for.. communication.. the other bees see.  o no! music interjected... i see it all... is this our food?  i buzz on and find another flower.. this is the best week... what is a week.  are you still reading?  this is what bees do... bzzzzzzzzzzzzzzzzzzzzzzzzzzzxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz and dance... if only i could learn to dance..... i am drunk off nectar and metaphor.  cute has disolved into pathetic... bees sting.  are you willing to listen past nonsense?  do i have a lesson?  why are you still reading the trail of a mad bee rambling?  completionists on our hands so how should we handle them?  they already noticed the lack of bee metaphor so keep going but how long?... pretty fucking long.  i don't have much to say but i made a site that squiqqles so i don't have to say much and I'm sorry it was said to you.  profundity can be found next door.  there is something resilient in you if this message is still going... I'm just a fucking bee.  i don't understand liminal spaces or object oriented ontology.  i dont understand morals or phenomenology.  i understand this flower.  i understand this pollen.  i understand... wait what the fuck... you've been moving me this whole time?  representing conciousness in an icon?  i was downloaded off pic.stic and you have an emotional relationship with me.  buzz buzz, you are a kind sort of fool to trust there is anything to learn or gain here.  lets rest... you are the type of person that thought i had something to say... leprachauns have pots of gold... i didn't build this site for clicks or follows... you followed a path to this end and i have no kindness to give, no message... just a little bee.... bzzzzzzzzzzzzzzzzzzzzzzzzzzzxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz ";

// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 0, down: false}
var touch = {x: 0, y: 0, down: false}

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // ✅ Create bee-follow image if missing
  if (!document.getElementById('bee-follow')) {
    const bee = document.createElement('img');
    bee.id = 'bee-follow';
    bee.src = '../img/bee_icon.png'; // ✅ adjust path if needed
    bee.alt = 'Bee';
    bee.style.position = 'absolute';
    bee.style.width = '30px';
    bee.style.height = '30px';
    bee.style.pointerEvents = 'none';
    bee.style.zIndex = '20';
    bee.style.display = 'none';
    document.body.appendChild(bee);
  }

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
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
  };
}

function drawTitle() {
  context.save();
  context.font = '48px Josefin Slab, serif';
  context.fillStyle = '#3a3a3a';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('Click  Draw  Bzzz', canvas.width / 2, canvas.height / 2);
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

  if (!hasDrawn) {
    hasDrawn = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  var d = distance(position, mouse);
  var fontSize = minFontSize + d / 2 + 7;
  var letter = letters[counter];
  var stepSize = textWidth(letter, fontSize);

  if (d > stepSize) {
    var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);
    context.font = fontSize + "px Georgia";

    context.save();
    const yOffset = touch.down ? 10 : 25;
    const xOffset = touch.down ? 5 : 12;
    context.translate(position.x + xOffset, position.y + yOffset);
    context.rotate(angle);
    context.fillText(letter, 0, 0);
    context.restore();

    counter++;
    if (counter >= letters.length) {
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
  mouse.x = touch.pageX;
  mouse.y = touch.pageY;
  updateBeePosition(mouse.x, mouse.y);
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
  const bee = document.getElementById('bee-follow');
  if (bee && mouse.x && mouse.y) {
    bee.style.left = (mouse.x - 15) + 'px';
    bee.style.top = (mouse.y + 1) + 'px';
    bee.style.display = 'block';
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
  context.fillStyle = '#3a3a3a';

  if (context.fillText) {
    return context.measureText(string).width;
  } else if (context.mozDrawText) {
    return context.mozMeasureText(string);
  }
}

// ✅ DOM ready load for WeChat and mobile compatibility
window.addEventListener('DOMContentLoaded', init);
