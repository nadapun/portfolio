function addEasterEggs() {
  const path = window.location.pathname;
  const page = path.split("/").pop(); // Grabs '001.html', '002.html', etc.

  const easterEggSettings = {
      '001.html': { word: 'drift', link: '026.html' },
      '002.html': { word: 'spirals', link: '012.html' },
      '003.html': { word: 'shape', link: '002.html' },
      '004.html': { word: 'pain', link: '017.html' },
      '005.html': { word: 'sits', link: '023.html' },
      '006.html': { word: 'thoughtful', link: '010.html' },
      '007.html': { word: 'wishing', link: '025.html' },
      '008.html': { word: 'blankets', link: '003.html' },
      '009.html': { word: 'buzzing', link: '016.html' },
      '010.html': { word: 'niceties', link: '004.html' },
      '011.html': { word: 're-seed', link: '007.html' },
      '012.html': { word: 'next', link: '030.html' },
      '013.html': { word: 'bridge', link: '021.html' },
      '014.html': { word: 'sing', link: '006.html' },
      '015.html': { word: 'piano', link: '013.html' },
      '016.html': { word: 'violence', link: '015.html' },
      '017.html': { word: 'mirror', link: '009.html' },
      '018.html': { word: 'burnt', link: '027.html' },
      '019.html': { word: 'appreciation', link: '001.html' },
      '020.html': { word: 'tired', link: '019.html' },
      '021.html': { word: 'dance', link: '028.html' },
      '022.html': { word: 'weight', link: '024.html' },
      '023.html': { word: 'close', link: '020.html' },
      '024.html': { word: 'words', link: '011.html' },
      '025.html': { word: 'reflection', link: '029.html' },
      '026.html': { word: 'drawing', link: '018.html' },
      '027.html': { word: 'insecure', link: '008.html' },
      '028.html': { word: 'view', link: '005.html' },
      '029.html': { word: 'boom', link: '014.html' },
      '030.html': { word: 'love', link: '022.html' }
  };

  const egg = easterEggSettings[page];
  if (!egg) return;

  const regex = new RegExp(`\\b${egg.word}\\b`, 'i');

  function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          if (regex.test(node.textContent)) {
              const span = document.createElement('span');
              span.innerHTML = node.textContent.replace(
                  regex,
                  `<a href="${egg.link}" class="easter-egg">$&</a>`
              );
              node.replaceWith(span);
          }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
          node.childNodes.forEach(walk);
      }
  }

  walk(document.body);

  attachEggHandlers(); // Make sure newly created eggs work too
}

function attachEggHandlers() {
  document.querySelectorAll('a.easter-egg').forEach(eggElement => {
      if (!eggElement.dataset.bound) { // Only bind once
          eggElement.addEventListener('click', function (event) {
              event.preventDefault();

              const page = window.location.pathname.split("/").pop();
              let foundEggs = JSON.parse(localStorage.getItem('easterEggsFoundList') || '[]');

              if (!foundEggs.includes(page)) {
                  foundEggs.push(page);
                  localStorage.setItem('easterEggsFoundList', JSON.stringify(foundEggs));
              }

              // If 30 eggs are found, redirect to the writing page
              if (foundEggs.length >= 30) {
                  window.location.href = '../spittoon-bee1.html'; // Update with your correct path
                  return;
              }

              showPopup(`You have found ${foundEggs.length} of 30 eggs`);

              setTimeout(() => {
                  window.location.href = eggElement.getAttribute('href');
              }, 500);
          });
          eggElement.dataset.bound = 'true'; // Prevent double binding
      }
  });
}

function showPopup(text) {
  const popup = document.createElement('div');
  popup.className = 'easter-popup';
  popup.textContent = text;
  document.body.appendChild(popup);
  setTimeout(() => {
      popup.remove();
  }, 1500);
}

// Main runner
document.addEventListener('DOMContentLoaded', function () {
  addEasterEggs();
  attachEggHandlers(); // Also catch static manual eggs
});
