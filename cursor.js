document.addEventListener('mousemove', (e) => {
    const blob = document.querySelector('.blob');
    blob.style.left = e.clientX + 'px';
    blob.style.top = e.clientY + 'px';
  });