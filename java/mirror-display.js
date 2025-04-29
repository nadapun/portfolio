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

    let poemLines = [
        { text: "seeds are bees", splitType: "none" },
        { text: "and", splitType: "none" },
        { text: "bees are seeds", splitType: "none" },
        { text: "bees buzzing and seeds growing", splitType: "none" },
        { text: "and now where are the bees?", splitType: "none" },
        { text: "bees?!", splitType: "none" },
        { text: "bees bees bees bees", splitType: "none" },
        { text: "bees bees bees bees", splitType: "none" },
        { text: "bees bees", splitType: "none" },
        { text: "bees bees bees", splitType: "none" },
        { text: "bees bees bees bees", splitType: "none" },
        { text: "bees bees bees", splitType: "none" },
        { text: "bees bees bees bees", splitType: "none" },
        { text: "bees bees bees bees bees", splitType: "none" },
        { text: "bees bees bees bees", splitType: "none" },
        { text: "bees bees", splitType: "none" },
        { text: "bees bees bees bees", splitType: "none" },
        { text: "bees bees bees bees", splitType: "none" },
        { text: "bees?!", splitType: "none" },
        { text: "a single seed", splitType: "none" },
        { text: "we need more bees", splitType: "none" },
        { text: "plant a seed", splitType: "none" },
        { text: "feed the bees", splitType: "none" },
        { text: "seed seed seed", splitType: "none" },
        { text: "seed seed seed seed", splitType: "none" },
        { text: "seed seed seed", splitType: "none" },
        { text: "seed seed", splitType: "none" },
        { text: "seed seed seed seed seed", splitType: "none" },
        { text: "seed seed seed", splitType: "none" },
        { text: "seed seed seed seed", splitType: "none" },
        { text: "we need more seeds", splitType: "none" },
        { text: "we need more bees", splitType: "none" }
    ];

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

        confusedDiv.innerHTML = poemLines.map(lineObj => {
            const mirroredWords = lineObj.text.split(' ').map(mirrorWord).reverse().join(' ');
            return `<p class="line">${wrapWords(mirroredWords, 'word')}</p>`;
        }).join('');

        clearDiv.innerHTML = poemLines.map(lineObj => {
            return `<p class="line">${wrapWords(lineObj.text, 'clear-word')}</p>`;
        }).join('');
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

    renderPoems();

    if (typeof addEasterEggs === "function") {
        addEasterEggs();
    }
    if (typeof attachEggHandlers === "function") {
        attachEggHandlers();
    }

    document.getElementById("confused").addEventListener("click", togglePoem);
    document.getElementById("clear").addEventListener("click", togglePoem);
});
