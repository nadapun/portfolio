function addEasterEggs() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    const easterEggSettings = {
        '009.html': { word: 'buzzing', link: '016.html' },
        '016.html': { word: 'violence', link: '015.html' },
        '029.html': { word: 'boom', link: '014.html' }
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

    attachEggHandlers(); // Ensure that newly created eggs work too
}

function attachEggHandlers() {
    document.querySelectorAll('a.easter-egg').forEach(eggElement => {
        if (!eggElement.dataset.bound) {
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
                    window.location.href = '../spittoon-bee1.html'; // Update with your writing page URL
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
