const styleVars = window.getComputedStyle(document.body);

/**
 * Animates the fairing panels parting when scrolling down (rocket fairing separation).
 */
function animateFrameParting() {
  const scrollTrigger = {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    toggleActions: 'play none reverse none',
    scrub: true
  };

  gsap.to('.fairing-frame > .left', {
    x: '-100vw',
    scrollTrigger
  });

  gsap.to('.fairing-frame > .right', {
    x: '100vw',
    scrollTrigger
  });
}

/**
 * Animates a gear rolling left to right across the hero.
 */
function animateGear() {
  const gear = document.getElementById('animated-gear-container');
  if (!gear) return;

  const start = -gear.getBoundingClientRect().width;
  const end = window.innerWidth;
  const distance = end - start;
  const duration = distance / 80;

  gsap.set(gear, { left: start });
  gsap.to('#animated-gear-container', {
    left: end,
    repeat: -1,
    ease: 'none',
    repeatDelay: 5,
    duration
  });

  gsap.to('#gear-svg', {
    rotation: 360,
    repeat: -1,
    ease: 'none',
    duration: 4,
    transformOrigin: '50% 50%'
  });
}

/**
 * Makes gallery cards pop in from below.
 */
function imagePopIn() {
  document.querySelectorAll('.gallery').forEach(gallery => {
    const photos = gallery.querySelectorAll('.photo-tile');

    gsap.from(photos, {
      scrollTrigger: {
        trigger: gallery,
        start: 'top 80%'
      },
      y: '5vh',
      opacity: 0,
      duration: 0.5,
      ease: 'none',
      stagger: 0.2
    });
  });
}

function setupFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    const plus = item.querySelector('.faq-plus');
    if (!button || !answer || !plus) return;

    // Ensure consistent initial state even if styles are cached.
    answer.style.maxHeight = '0px';
    answer.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-expanded', 'false');
    plus.textContent = '+';
    item.dataset.open = 'false';

    button.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';

      if (isOpen) {
        item.dataset.open = 'false';
        button.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        plus.textContent = '+';
        answer.style.maxHeight = '0px';
        return;
      }

      item.dataset.open = 'true';
      button.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');
      plus.textContent = '-';
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });
  });
}

/**
 * Animation that changes the header when scrolling down.
 */
function handleHeaderChanges() {
  gsap.to('header', {
    scrollTrigger: {
      trigger: 'main',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    backgroundColor: styleVars.getPropertyValue('--c-bot-main')
  });

  const navTrigger = {
    trigger: 'main',
    start: 'center center',
    toggleActions: 'play none play reverse'
  };

  gsap.to('header', {
    scrollTrigger: navTrigger,
    color: 'white'
  });

  gsap.to('.st1', {
    scrollTrigger: navTrigger,
    fill: 'white'
  });
}

/**
 * Controls the countdown on the hero — targets first event (Freshman Kickoff).
 */
function setCountdown() {
  const target = new Date('2026-09-14T10:30:00.000-07:00').getTime();
  const countdown = document.getElementById('countdown');

  if (target < new Date().getTime()) {
    countdown.style.display = 'none';
    return;
  }

  const secToMs = 1000;
  const minToMs = secToMs * 60;
  const hourToMs = minToMs * 60;
  const dayToMs = hourToMs * 24;

  const secEle = document.getElementById('cd-sec');
  const minEle = document.getElementById('cd-min');
  const hourEle = document.getElementById('cd-hour');
  const dayEle = document.getElementById('cd-day');

  const update = () => {
    const now = new Date().getTime();
    const difference = target - now;

    secEle.textContent = Math.floor((difference / secToMs) % 60);
    minEle.textContent = Math.floor((difference / minToMs) % 60);
    hourEle.textContent = Math.floor((difference / hourToMs) % 24);
    dayEle.textContent = Math.floor(difference / dayToMs);
  };

  update();
  setInterval(update, 1000);
}

window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
  animateFrameParting();
  handleHeaderChanges();
  animateGear();
  setCountdown();
  setupFaqAccordion();
  if (window.matchMedia('(min-width: 1280px)').matches) {
    imagePopIn();
  }
  window.addEventListener('resize', () => {
    gsap.killTweensOf('#animated-gear-container');
    gsap.killTweensOf('#gear-svg');
    animateGear();
  });
});
