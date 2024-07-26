// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "Mistah Kurtz-he dead  A penny for the Old Guy  We are the hollow men We are the stuffed men Leaning together Headpiece filled with straw. Alas! Our dried voices, when We whisper together Are quiet and meaningless As wind in dry grass Or rats' feet over broken glass In our dry cellar Shape without form, shade without colour, Paralysed force, gesture without motion Those who have crossed With direct eyes, to death's other Kingdom Remember us-if at all-not as lost Violent souls, but only As the hollow men The stuffed men Eyes I dare not meet in dreams In death's dream kingdom These do not appear: There, the eyes are Sunlight on a broken column There, is a tree swinging And voices are In the wind's singing More distant and more solemn Than a fading star. Let me be no nearer In death's dream kingdom Let me also wear Such deliberate disguises Rat's coat, crowskin, crossed staves In a field Behaving as the wind behaves No nearer - Not that final meeting In the twilight kingdom This is the dead land This is cactus land Here the stone images Are raised, here they receive The supplication of a dead man's hand Under the twinkle of a fading star. Is it like this In death's other kingdom Waking alone At the hour when we are Trembling with tenderness Lips that would kiss Form prayers to broken stone. The eyes are not here There are no eyes here In this valley of dying stars In this hollow valley This broken jaw of our lost kingdoms In this last of meeting places We grope together And avoid speech Gathered on this beach of the tumid river Sightless, unless The eyes reappear As the perpetual star Multifoliate rose Of death's twilight kingdom The hope only Of empty men. Here we go round the prickly pear Prickly pear prickly pear Here we go round the prickly pear At five o'clock in the morning. Between the idea And the reality Between the motion And the act Falls the Shadow For Thine is the Kingdom Between the conception And the creation Between the emotion And the response Falls the Shadow Life is very long Between the desire And the spasm Between the potency And the existence Between the essence And the descent Falls the Shadow For Thine is the Kingdom For Thine is Life is For Thine is the This is the way the world ends This is the way the world ends This is the way the world ends Not with a bang but a whimper. ";

// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 38, down: false}

function init() {
  canvas = document.getElementById( 'canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup',   mouseUp,   false);
  canvas.addEventListener('mouseout',  mouseUp,  false);  
  canvas.addEventListener('dblclick', doubleClick, false);
  
  window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function mouseMove ( event ){
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
 if ( mouse.down ) {
    var d = distance( position, mouse );
    var fontSize = minFontSize + d/2 +7;
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      context.font = fontSize + "px Georgia";
    
      context.save();
      context.translate( position.x, position.y -38);
      context.rotate( angle );
      context.fillText(letter,0,0);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
    
    //console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;

      }
  }     
}

function distance( pt, pt2 ){
  
  var xs = 0;
  var ys = 0;
 
  xs = pt2.x - pt.x;
  xs = xs * xs;
 
  ys = pt2.y - pt.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function mouseDown( event ){
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
  
  document.getElementById('info').style.display = 'none';
}

function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvas.width = canvas.width; 
}

function textWidth( string, size ) {
  context.font = size + "px Georgia";
  
  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }
  
 };

init();