// Carousels: dot generation, prev/next scroll, active-dot sync
document.querySelectorAll('.carousel').forEach(function (carousel) {
  var track = carousel.querySelector('.carousel-track');
  var slides = Array.prototype.slice.call(track.children);
  var dotsWrap = carousel.querySelector('.carousel-dots');
  var prevBtn = carousel.querySelector('.carousel-prev');
  var nextBtn = carousel.querySelector('.carousel-next');

  slides.forEach(function (slide, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () {
      track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    });
    dotsWrap.appendChild(dot);
  });

  var dots = Array.prototype.slice.call(dotsWrap.children);

  function updateActive() {
    var idx = Math.round(track.scrollLeft / track.clientWidth);
    dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
  }

  var ticking = false;
  track.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { updateActive(); ticking = false; });
      ticking = true;
    }
  });

  if (prevBtn) prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });
});

// Before/after compare sliders
document.querySelectorAll('.compare').forEach(function (compare) {
  var range = compare.querySelector('.compare-range');
  if (!range) return;
  range.addEventListener('input', function () {
    compare.style.setProperty('--pos', range.value + '%');
  });
});
