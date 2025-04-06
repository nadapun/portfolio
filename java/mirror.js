document.addEventListener("DOMContentLoaded", function () {
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
  
    let poemLines = [];
    let showingClear = false;
  
    function mirrorWord(word) {
      return word.split('').reverse().map(c => mirrorMap[c] || c).join('');
    }
  
    function wrapWords(line, className) {
      return line.split(' ').map((word, i) => {
        const delay = i * 100;
        return `<span class="${className}" style="transition-delay: ${delay}ms">${word}</span>`;
      }).join(' ');
    }
  
    // Function to load the poem input, clean it, and split it by width
    function loadPoem() {
      const input = document.getElementById("poem-input");
      if (!input) return;
  
      // Grabbing the user input
      const userPoem = input.value.trim();
      poemLines = userPoem.split('\n').map(line => {
        return { text: line, splitType: 'none' };
      });
  
      renderPoems(); // Render the poem after loading
      showingClear = false;
      document.getElementById("poem").scrollIntoView({ behavior: 'smooth' });
    }
  
    // Render poems on both sides (confused and clear)
    function renderPoems() {
      const confusedDiv = document.getElementById("confused");
      const clearDiv = document.getElementById("clear");
  
      confusedDiv.innerHTML = poemLines.map(line => {
        const mirroredWords = line.text.split(' ').map(mirrorWord).reverse().join(' ');
        return `<p class="line">${wrapWords(mirroredWords, 'word')}</p>`;
      }).join('');
  
      clearDiv.innerHTML = poemLines.map(line => {
        return `<p class="line">${wrapWords(line.text, 'clear-word')}</p>`;
      }).join('');
    }
  
    // Toggle function for displaying mirrored vs clear poems
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
  
    // Attach the event listener for toggling the poem
    document.getElementById("confused").addEventListener("click", togglePoem);
    document.getElementById("clear").addEventListener("click", togglePoem);
  
    // Render poems initially (without user input)
    renderPoems();
  });
  