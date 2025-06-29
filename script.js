const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const darkenBtn = document.getElementById('darkenBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const themeToggleBtn = document.getElementById('themeToggleBtn');

let currentMode = 'color';
let currentColor = colorPicker.value;
let gridSize = 16;

let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

function setCurrentMode(mode) {
  currentMode = mode;
  updateActiveButton(mode);
}

function updateActiveButton(mode) {
  const buttons = {
    color: colorBtn,
    rainbow: rainbowBtn,
    eraser: eraserBtn,
    darken: darkenBtn
  };

  Object.keys(buttons).forEach(key => {
    buttons[key].classList.remove('active-mode');
  });

  buttons[mode]?.classList.add('active-mode');
}

function setCurrentColor(color) {
  currentColor = color;
}

function updateSizeValue(value) {
  sizeValue.textContent = `${value} x ${value}`;
}

function clearGrid() {
  grid.innerHTML = '';
}

function createGrid(size) {
  clearGrid();
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-square');
    cell.dataset.opacity = 0;
    cell.addEventListener('mouseover', (e) => {
      if (isMouseDown) changeColor(e);
    });
    cell.addEventListener('mousedown', changeColor);
    grid.appendChild(cell);
  }
}

function changeColor(e) {
  if (currentMode === 'rainbow') {
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fff';
  } else if (currentMode === 'darken') {
    let currentOpacity = Number(e.target.dataset.opacity) || 0;
    if (currentOpacity < 1) {
      currentOpacity += 0.1;
      e.target.dataset.opacity = currentOpacity;
      e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
    }
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}

// Event Listeners
colorPicker.addEventListener('input', (e) => {
  setCurrentColor(e.target.value);
  setCurrentMode('color');
});

colorBtn.addEventListener('click', () => setCurrentMode('color'));
rainbowBtn.addEventListener('click', () => setCurrentMode('rainbow'));
eraserBtn.addEventListener('click', () => setCurrentMode('eraser'));
darkenBtn.addEventListener('click', () => setCurrentMode('darken'));
clearBtn.addEventListener('click', () => createGrid(gridSize));

sizeSlider.addEventListener('input', (e) => {
  gridSize = e.target.value;
  updateSizeValue(gridSize);
  createGrid(gridSize);
});

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Init
window.onload = () => {
  updateSizeValue(gridSize);
  createGrid(gridSize);
  updateActiveButton(currentMode);
};