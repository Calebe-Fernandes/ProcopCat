var open = document.querySelector('.open-menu');
open.addEventListener('click', openMenu);

var close = document.querySelector('.close-menu');
close.addEventListener('click', closeMenu);

var pages = document.querySelector('.pages');
var background = document.querySelector('.header-modal-background');

function openMenu() {
  close.style.display = 'block';
  open.style.display = 'none';
  pages.style.display = 'flex';
  background.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  close.style.display = '';
  open.style.display = '';
  pages.style.display = '';
  background.style.display = '';
  document.body.style.overflow = '';
}

function handleResize() {
  if (window.innerWidth > 700) {
    close.style.display = '';
    open.style.display = '';
    pages.style.display = '';
    background.style.display = '';
    document.body.style.overflow = '';
  }
}

window.addEventListener('resize', handleResize);