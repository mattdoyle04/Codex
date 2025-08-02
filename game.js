const WORD = 'APPLE';
const TOTAL_LETTERS = 15;
const REMOVAL_INTERVAL = 3000; // ms

const container = document.getElementById('letter-container');

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createLetter(char) {
  const span = document.createElement('span');
  span.className = 'letter';
  span.textContent = char;
  span.style.left = randomInRange(0, 90) + '%';
  span.style.top = randomInRange(0, 90) + '%';
  span.style.setProperty('--dx', `${randomInRange(-50, 50)}px`);
  span.style.setProperty('--dy', `${randomInRange(-50, 50)}px`);
  span.style.setProperty('--dur', `${randomInRange(4, 8)}s`);
  return span;
}

// Prepare letters
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const extras = [];
const available = alphabet.filter(ch => !WORD.includes(ch));
while (extras.length < TOTAL_LETTERS - WORD.length) {
  const idx = Math.floor(Math.random() * available.length);
  extras.push(available.splice(idx, 1)[0]);
}

const allLetters = [
  ...WORD.split('').map(ch => ({ ch, extra: false })),
  ...extras.map(ch => ({ ch, extra: true }))
];

// Shuffle letters for display
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffle(allLetters);

const extraElems = [];
allLetters.forEach(obj => {
  const el = createLetter(obj.ch);
  container.appendChild(el);
  if (obj.extra) extraElems.push(el);
});

// Remove extraneous letters over time
shuffle(extraElems);
let removalIndex = 0;
const interval = setInterval(() => {
  if (removalIndex < extraElems.length) {
    extraElems[removalIndex].remove();
    removalIndex++;
  } else {
    clearInterval(interval);
  }
}, REMOVAL_INTERVAL);
