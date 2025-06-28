// Simple dropdown for ACH info
const achToggle = document.getElementById('ach-info-toggle');
const achContent = document.getElementById('ach-info-content');
const achCaret = document.getElementById('ach-info-caret');
if (achToggle && achContent && achCaret) {
  achToggle.addEventListener('click', () => {
    const isOpen = achContent.style.display === 'block';
    achContent.style.display = isOpen ? 'none' : 'block';
    achCaret.style.transform = isOpen ? '' : 'rotate(180deg)';
  });
} 