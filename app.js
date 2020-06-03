function anim() {
  //Navigation part
  const navOpen = document.querySelector('.nav-open');
  const title = document.querySelector('.logo');
  const hamlines = document.querySelectorAll('.hamburger line');
  const ham = document.querySelector('.hamburger');
  const contact = document.querySelector('.contact');
  const social = document.querySelector('.social');
  const tl = new TimelineMax({ paused: true, reversed: true });

  tl.to(navOpen, 0.5, { y: 0 })
    .fromTo(social, 0.4, { y: 10, opacity: 0 }, { y: 0, opacity: 1 })
    .fromTo(contact, 0.4, { y: 10, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4')
    .fromTo(title, 0.5, { color: 'white' }, { color: 'black' }, '-=0.4')
    .fromTo(hamlines, 0.5, { stroke: 'white' }, { stroke: 'black' }, '-=0.5');
  function openNav() {
    tl.reversed() ? tl.play() : tl.reverse();
  }
  ham.addEventListener('click', openNav);
  const web = document.querySelector('.web');
  const pages = document.querySelectorAll('.page');
  const slides = document.querySelectorAll('.dot');
  const background = ['radial-gradient(rgb(3, 6, 169), rgb(2, 2, 33))', ' radial-gradient(rgb(18, 82, 2), rgb(2, 35, 5))', 'radial-gradient(rgb(169, 3, 110), rgb(2, 2, 33))'];

  let current = 0;//for clicking
  let scroll = 0;//for scroll 
  slides.forEach((slide, index) => {
    slide.addEventListener('click', function () {
      nextSlide(index);
      changeDot(this);
      scroll = index;
    })
  });
  //changes to next pageby click
  function nextSlide(index) {
    const currentPage = pages[current];
    const nextPage = pages[index];
    const nextLeftPhoto = nextPage.querySelector('.mod .model-left');
    const currentLeftPhoto = currentPage.querySelector('.mod .model-left');
    const currentRightPhoto = currentPage.querySelector('.mod .model-right');
    const nextRightPhoto = nextPage.querySelector('.mod .model-right');
    const currentText = currentPage.querySelector('.portfolio');
    const nextText = nextPage.querySelector('.portfolio');
    const t = new TimelineMax({
      onStart: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvent = 'none';
        })
      }
      , onComplete: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvent = 'all';
        })
      }
    })
    t.fromTo(currentLeftPhoto, 0.3, { y: '0%' }, { y: '-100%' })
      .fromTo(currentRightPhoto, 0.3, { y: '0' }, { y: '-100%' }, '-=0.3')
      .fromTo(currentText, 0.33, { opacity: 1, }, { opacity: 0 })
      .fromTo(currentPage, 0.33, { opacity: 1, pointerEvents: 'all' }, { opacity: 0, pointerEvents: 'none' }, '-=0.2')
      .fromTo(nextText, 0.33, { opacity: 0, }, { opacity: 1 }, '-=0.1')
      .fromTo(nextPage, 0.33, { opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'all' }, '-=0.1')
      .fromTo(nextLeftPhoto, 0.3, { y: ' 0%', }, { y: '-10%' }, '-=0.3')
      .fromTo(nextRightPhoto, 0.3, { y: '0%' }, { y: '10%' }, '-=0.3')
      .set(nextLeftPhoto, { clearProps: 'all' })
      .set(nextRightPhoto, { clearProps: 'all' });
    web.style.background = background[index];
    current = index;

  }
  //changes to nextpage by scrolling
  document.addEventListener('wheel', throttle(scrollChange, 1500));
  function scrollChange(e) {

    if (e.deltaY > 0) {
      scroll += 1;
    }
    else {
      scroll -= 1;
    }
    if (scroll > slides.length - 1) {
      scroll = 0;
    }
    switchDot(scroll)
    nextSlide(scroll);
  }


  function changeDot(dot) {
    slides.forEach((d) => { d.classList.remove('active') });
    dot.classList.add('active');
  }

  function switchDot(index) {
    const activedot = document.querySelectorAll('.dot')[index];
    slides.forEach((d) => { d.classList.remove('active') });
    activedot.classList.add('active');
  }

}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}



anim();
