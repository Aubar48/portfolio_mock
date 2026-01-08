// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
  AOS.init();
  initDragAndDrop();
});

// Drag and Drop functionality for Experiencia and Educacion cards
function initDragAndDrop() {
  const containers = ['experienciaContainer', 'educacionContainer'];
  
  containers.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const cards = container.querySelectorAll('.draggable-card');
    
    cards.forEach(card => {
      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragend', handleDragEnd);
      card.addEventListener('dragover', handleDragOver);
      card.addEventListener('drop', handleDrop);
      card.addEventListener('dragenter', handleDragEnter);
      card.addEventListener('dragleave', handleDragLeave);
    });
  });
}

let draggedElement = null;

function handleDragStart(e) {
  draggedElement = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  
  // Remove all drag-over classes
  document.querySelectorAll('.draggable-card').forEach(card => {
    card.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (this !== draggedElement) {
    this.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  if (draggedElement !== this) {
    // Check if both cards are in the same container
    if (draggedElement.parentNode === this.parentNode) {
      const allCards = [...this.parentNode.querySelectorAll('.draggable-card')];
      const draggedIndex = allCards.indexOf(draggedElement);
      const targetIndex = allCards.indexOf(this);
      
      if (draggedIndex < targetIndex) {
        this.parentNode.insertBefore(draggedElement, this.nextSibling);
      } else {
        this.parentNode.insertBefore(draggedElement, this);
      }
    }
  }
  
  this.classList.remove('drag-over');
  return false;
}

// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', newTheme);
}

// Scroll to Top
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
};

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Initialize AOS
AOS.init();

// Modal cv

document.querySelector('.ver-cv').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('modal-cv').style.display = 'block';
});

function cerrarModalCV() {
    document.getElementById('modal-cv').style.display = 'none';
}