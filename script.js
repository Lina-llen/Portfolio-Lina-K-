const btn = document.querySelector('.btn');
btn.addEventListener('mouseover', () => {
  document.body.style.backgroundColor = '#120C25';
});
btn.addEventListener('mouseout', () => {
  document.body.style.backgroundColor = '#0C0C1D';
});
