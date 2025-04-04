const mirrorMap = {
    'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ǝ', 'f': 'f', 'g': 'g', 'h': 'h',
    'i': 'i', 'j': 'j', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q',
    'q': 'p', 'r': 'r', 's': 'ꙅ', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
    'y': 'y', 'z': 'z', 'A': 'A', 'B': '𐐒', 'C': 'Ↄ', 'D': '◖', 'E': 'Ǝ', 'F': 'F',
    'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J', 'K': '⋊', 'L': '⅃', 'M': 'M', 'N': 'И',
    'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'Я', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V',
    'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Ƹ', '(': ')', ')': '(', '[': ']', ']': '[',
    '{': '}', '}': '{', '<': '>', '>': '<', '/': '\\', '\\': '/', '-': '-', '_': '_',
    '.': '.', ',': ',', ':': ':', ';': ';', '!': '!', '?': '?', "'": "'", '"': '"',
    '`': '`', ' ': ' '
  };
  
  let poemLines = [
    "Open the gate",
    "Let the sky spill in",
    "Hands like thresholds",
    "Light splits the ground",
    "Everything is waiting"
  ];
  
  function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    return ctx.measureText(text).width;
  }
  
  function preprocessLinesByWidth(lines, font = '16px Arial', containerWidth = 600) {
    const processedLines = [];
    lines.forEach(line => {
      const words = line.split(' ');
      let currentLine = '';
      let currentLineWidth = 0;
      
      words.forEach(word => {
        const wordWidth = getTextWidth(word, font);
        if (currentLineWidth + wordWidth <= containerWidth) {
          currentLine += (currentLine ? ' ' : '') + word;
          currentLineWidth += wordWidth;
        } else {
          processedLines.push(currentLine); // Add the current line to the result
          currentLine = word; // Start a new line with the current word
          currentLineWidth = wordWidth; // Reset width to the current word's width
        }
      });
    
      // Push the last line (if any)
      if (currentLine) {
        processedLines.push(currentLine);
      }
    });
    return processedLines;
  }
  
  function mirrorWord(word) {
    return word.split('').reverse().map(c => mirrorMap[c] || c).join('');
  }
  
  function wrapWords(line, className) {
    return line.split(' ').map((word, i) => {
      const delay = i * 100;
      return `<span class="${className}" style="transition-delay: ${delay}ms">${word}</span>`;
    }).join(' ');
  }
  
  function renderPoems() {
    const confusedDiv = document.getElementById("confused");
    const clearDiv = document.getElementById("clear");
  
    // Render mirrored version: mirror each word's characters but keep word order intact
    confusedDiv.innerHTML = poemLines.map(line => {
      // Mirror the characters of each word but preserve the word order
      const mirroredWords = line
        .split(' ') // Split the line into words
        .map(word => mirrorWord(word)) // Mirror the characters in each word
        .join(' '); // Join the mirrored words back into a full line
  
      return `<p class="line">${wrapWords(mirroredWords, 'word')}</p>`;
    }).join('');
  
    // Normal version (unchanged)
    clearDiv.innerHTML = poemLines.map(line => {
      return `<p class="line">${wrapWords(line, 'clear-word')}</p>`;
    }).join('');
  }
  
  
  function loadPoem() {
    const input = document.getElementById("poem-input").value;
    const lines = input.trim().split(/\n+/);
  
    // Get the container width (poem div) dynamically
    const containerWidth = document.getElementById('poem').offsetWidth; // Get the width of the poem container
  
    // Preprocess lines based on width
    const processedLines = preprocessLinesByWidth(lines, '16px Arial', containerWidth);
  
    // Update poemLines with processed lines
    poemLines = processedLines;
    
    // Re-render the poem with new lines
    renderPoems();
    showingClear = false;
  
    // Scroll to the poem container
    document.getElementById("poem").scrollIntoView({ behavior: 'smooth' });
  }
  
  let showingClear = false;
  
  function togglePoem() {
    const mirroredWords = document.querySelectorAll('.word');
    const clearWords = document.querySelectorAll('.clear-word');
  
    if (!showingClear) {
      mirroredWords.forEach((el, i) => {
        setTimeout(() => el.classList.add('move-left'), i * 80);
      });
      clearWords.forEach((el, i) => {
        setTimeout(() => el.classList.add('fade-in'), i * 80);
      });
    } else {
      mirroredWords.forEach((el, i) => {
        setTimeout(() => el.classList.remove('move-left'), i * 80);
      });
      clearWords.forEach((el, i) => {
        setTimeout(() => el.classList.remove('fade-in'), i * 80);
      });
    }
  
    showingClear = !showingClear;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    renderPoems();
    document.getElementById("confused").addEventListener("click", togglePoem);
    document.getElementById("clear").addEventListener("click", togglePoem);
  });
  