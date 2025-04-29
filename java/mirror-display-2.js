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
        { text: "I miss the bees", colors: [null, null, null, "green"] },
        { text: "bees, A TIMe forgotten", colors: ["green", "green", "green", null] },
        { text: "have we done evil to destroy", colors: [null, null, null, "green", null, null] },
        { text: "", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "habitats, insects, arachnids - vanished", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "", colors: [] },
        { text: "bees A needed piece", colors: ["green", "green", null, null] },
        { text: "man's progress having won", colors: [null, null, null, "green"] },
        { text: "a world gone mad", colors: [null, null, null, "green"] },
        { text: "I'm in no mood for excuses", colors: [null, null, null, "green", null, null] },
        { text: "", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "habitats, insects, arachnids - vanished", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "", colors: [] },
        { text: "bees, a TIMe to reclaim", colors: ["green", "green", "green", null, null] },
        { text: "end the mad rush", colors: [null, null, "green", null] },
        { text: "end the dismissive mood", colors: [null, null, null, "green"] },
        { text: "we must plant a seed", colors: [null, null, null, null, "green"] },
        { text: "", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "habitats, insects, arachnids - vanished", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "", colors: [] },
        { text: "I WAS once positive", colors: ["green", "green", null, null] },
        { text: "A world shattered - like a mirror", colors: ["green", null, null, null, null, null, null] },
        { text: "wen are we?", colors: ["green", null, null] },
        { text: "wen are we?", colors: [null, "green", null] },
        { text: "", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "habitats, insects, arachnids - vanished", colors: [] },
        { text: "dew on no web", colors: ["green", "green", "green", "green"] },
        { text: "", colors: [] },
        { text: "return to the bees", colors: [null, null, null, "green"] },
        { text: "bees a mood", colors: ["green", "green", "green"] },
        { text: "bees ARE TIMe", colors: ["green", "green", "green"] },
        { text: "seed, a giver of TIMe", colors: ["green", null, null, null, "green"] },
        { text: "", colors: [] },
        { text: "are we evil", colors: [null, null, "green"] },
        { text: "have we won", colors: [null, null, "green"] },
        { text: "", colors: [] },
    ];

    function mirrorWord(word) {
        return word.split('').reverse().map(c => mirrorMap[c] || c).join('');
    }

    function wrapWords(line, className, colors = []) {
        return line.split(' ').map((word, i) => {
            const delay = i * 100;
            const colorStyle = colors[i] ? `color: ${colors[i]};` : '';
            return `<span class="${className}" style="transition-delay: ${delay}ms; ${colorStyle}">${word}</span>`;
        }).join(' ');
    }

    function renderPoems() {
        const confusedDiv = document.getElementById("confused");
        const clearDiv = document.getElementById("clear");

        confusedDiv.innerHTML = poemLines.map(lineObj => {
            const words = lineObj.text.split(' ');
            const mirroredWords = words.map(mirrorWord).reverse().join(' ');
            const mirroredColors = (lineObj.colors || []).slice().reverse();
            return `<p class="line">${wrapWords(mirroredWords, 'word', mirroredColors)}</p>`;
        }).join('');

        clearDiv.innerHTML = poemLines.map(lineObj => {
            return `<p class="line">${wrapWords(lineObj.text, 'clear-word', lineObj.colors || [])}</p>`;
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
