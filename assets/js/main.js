/**
 * Suido Kiko Middle East LLC (SKME) — Interactive Experience
 * Inspired by Hanseatic Media Harbour (media-harbour.com)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. Sticky Header & Scroll Spy (Top Nav + Sticky Left Dot Nav)
     ======================================================================== */
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const topNavLinks = document.querySelectorAll('.top-nav__link');
  const dotNavItems = document.querySelectorAll('.dot-nav__item');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 36) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSectionId = 'home';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 220;
      if (scrollY >= top) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    topNavLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentSectionId);
    });

    dotNavItems.forEach((item) => {
      const target = item.getAttribute('data-section');
      item.classList.toggle('active', target === currentSectionId);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ========================================================================
     2. Fullscreen Overlay Menu Toggle (HMH Style)
     ======================================================================== */
  const burgerBtn = document.getElementById('burger-btn');
  const overlayMenu = document.getElementById('overlay-menu');
  const overlayLinks = document.querySelectorAll('[data-close-menu]');

  function toggleMenu(forceState) {
    const isOpen = typeof forceState === 'boolean'
      ? forceState
      : !document.body.classList.contains('menu-open');

    document.body.classList.toggle('menu-open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    overlayMenu.setAttribute('aria-hidden', String(!isOpen));
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => toggleMenu());
  }

  overlayLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMenu(false);
      closeServiceModal();
    }
  });

  /* ========================================================================
     3. Interactive Hero Convergence Canvas (Inspired by HMH Hero FX)
     ======================================================================== */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 28 : 54;

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(47, 217, 255, 0.55)';
        ctx.fill();
      }
    }

    function initParticles() {
      resizeCanvas();
      particles = Array.from({ length: particleCount }, () => new Particle());
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(91, 145, 255, ${0.18 * (1 - dist / 135)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateCanvas);
    }

    initParticles();
    animateCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  /* ========================================================================
     4. Marquee Ticker Pause/Play Control
     ======================================================================== */
  const marqueeWrapper = document.getElementById('marquee-wrapper');
  const tickerPauseBtn = document.getElementById('ticker-pause-btn');

  if (marqueeWrapper && tickerPauseBtn) {
    tickerPauseBtn.addEventListener('click', () => {
      const isPaused = marqueeWrapper.classList.toggle('paused');
      tickerPauseBtn.setAttribute('aria-pressed', String(isPaused));
      tickerPauseBtn.innerHTML = isPaused
        ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
        : '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    });
  }

  /* ========================================================================
     5. Split Accordion (Our Goals & Value Pillars)
     ======================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  function openAccordion(item) {
    const content = item.querySelector('.accordion-content');
    const trigger = item.querySelector('.accordion-trigger');
    item.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
  }

  function closeAccordion(item) {
    const content = item.querySelector('.accordion-content');
    const trigger = item.querySelector('.accordion-trigger');
    item.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '0px';
  }

  accordionItems.forEach((item, index) => {
    const trigger = item.querySelector('.accordion-trigger');
    if (index === 0) {
      openAccordion(item);
    }
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      accordionItems.forEach(closeAccordion);
      if (!isOpen) {
        openAccordion(item);
      }
    });
  });

  /* ========================================================================
     6. Service Details Modal (Deep Dive into SKME's 4 Core Services)
     ======================================================================== */
  const SERVICE_DATA = {
    stp: {
      badge: '300,000+ m³/day Installed Capacity',
      title: 'EPC for Sewage Treatment Plants (STP) & Industrial Sewage Treatment (IST)',
      image: 'assets/images/stp-hero.jpeg',
      summary: 'Since 2006, SKME has delivered high-performance municipal and industrial sewage treatment facilities across Saudi Arabia, engineered for reliability, regulatory compliance, and sustainable water management.',
      highlights: [
        'Membrane Bioreactor (MBR) & Sequencing Batch Reactor (SBR) systems',
        'Moving Bed Biofilm Reactor (MBBR) & Activated Sludge Process (ASP)',
        'End-to-end Engineering, Procurement, and Construction (EPC) delivery',
        'Over 300,000 m³/day cumulative treatment capacity across KSA'
      ],
      projects: [
        'Asir STP for NWC — 25,000 m³/day state-of-the-art municipal plant',
        'Industrial Wastewater Treatment for NFIC (LUNA), Jeddah — 1,370 m³/day combined IWWTP & BWRO',
        'Al Qatif Modular STP-MBR — 350 m³/day advanced membrane plant'
      ],
      formCheckValue: 'Sewage treatment system design and implementation.'
    },
    ro: {
      badge: '200,000+ m³/day Desalination Capacity',
      title: 'Reverse Osmosis (RO) Desalination Systems (SWRO & BWRO)',
      image: 'assets/images/ro-hero.png',
      summary: 'SKME designs and builds high-efficiency Sea Water Reverse Osmosis (SWRO) and Brackish Water Reverse Osmosis (BWRO) desalination plants backed by Japanese membrane technology from TORAY & Suido Kiko Kaisha.',
      highlights: [
        'Utility-scale Sea Water Reverse Osmosis (SWRO) desalination',
        'High-recovery Brackish Water Reverse Osmosis (BWRO) facilities',
        'Energy-optimized membrane arrays and pre-treatment engineering',
        'Over 200,000 m³/day installed desalination capacity in Saudi Arabia'
      ],
      projects: [
        'Riyadh BWRO Plant — 53,000 m³/day large-scale brackish desalination facility',
        'Al Kharj BWRO Plant for MEWA — 50,000 m³/day municipal water plant',
        'SAWACO Plant, Jeddah — 5,000 m³/day combined SWRO & BWRO facility'
      ],
      formCheckValue: 'Engineering and construction of seawater desalination plants.'
    },
    reuse: {
      badge: 'Global Water Awards Winner',
      title: 'Industrial Wastewater Treatment & Water Reuse Systems',
      image: 'assets/images/water-reuse-hero.jpeg',
      summary: 'Our custom water reuse systems maximize resource conservation by treating municipal and industrial effluent for safe, high-efficiency recycling across industrial and agricultural applications.',
      highlights: [
        'Closed-loop industrial water recycling and effluent recovery',
        'Award-winning zero-waste-oriented process engineering',
        'Integrated IWWTP + Reverse Osmosis polishing stages',
        'Recognized by Global Water Awards (2011 & 2013)'
      ],
      projects: [
        'National Food Industries Co. (LUNA) Reuse System, Jeddah — 1,370 m³/day (Global Water Award Winner)',
        'Dammam Industrial City for MODON — 5,000 m³/day combined IWWTP & BWRO plant',
        'Jeddah Sewage Lake Cleanup Project — Global Water Reuse Project of the Year'
      ],
      formCheckValue: 'Re-use and recycling of sewage wastewater'
    },
    mobile: {
      badge: '100 – 1,500 CMD Plug & Play',
      title: 'Mobile & Containerized Reverse Osmosis (RO) Systems',
      image: 'assets/images/mobile-ro-hero.png',
      summary: 'SKME’s skid-mounted and containerized RO units provide rapid, relocatable water purification for brackish (BWRO) and seawater (SWRO) sources—engineered for immediate field deployment.',
      highlights: [
        'Capacity range from 100 to 1,500 CMD (m³/day)',
        'Plug-and-Play factory-tested setup for rapid commissioning',
        'Robust, weather-resistant ISO container & skid-mounted frames',
        'Ideal for emergency response, remote sites, and industrial/municipal demand'
      ],
      projects: [
        'Rapid-deployment containerized SWRO & BWRO units across remote KSA sites',
        'Modular skid-mounted industrial water purification systems'
      ],
      formCheckValue: 'Engineering and construction of brackish water desalination plants.'
    }
  };

  const modalBackdrop = document.getElementById('service-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSummary = document.getElementById('modal-summary');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalProjects = document.getElementById('modal-projects');
  const modalRequestBtn = document.getElementById('modal-request-btn');

  function openServiceModal(key) {
    const data = SERVICE_DATA[key];
    if (!data || !modalBackdrop) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary;

    modalHighlights.innerHTML = data.highlights
      .map((item) => `<li style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;color:#14151A;font-size:0.95rem;"><span style="color:#003EA0;font-weight:700;">✓</span><span>${item}</span></li>`)
      .join('');

    modalProjects.innerHTML = data.projects
      .map((proj) => `<li style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;color:#4A5268;font-size:0.92rem;"><span style="color:#0987B8;font-weight:700;">•</span><span>${proj}</span></li>`)
      .join('');

    modalRequestBtn.onclick = () => {
      closeServiceModal();
      selectServiceInForm(data.formCheckValue);
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    modalBackdrop.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeServiceModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-service-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openServiceModal(btn.getAttribute('data-service-modal'));
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeServiceModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeServiceModal();
    });
  }

  /* ========================================================================
     7. Interactive Project Portfolio Filtering (HMH Filter Bar)
     ======================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter');
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const cardCats = card.getAttribute('data-category');
        if (cat === 'all' || cardCats.includes(cat)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ========================================================================
     8. Dual-Mode Contact & Project Request Form
     ======================================================================== */
  const formTabs = document.querySelectorAll('.form-tab');
  const projectFieldsWrap = document.getElementById('project-intake-fields');
  const contactForm = document.getElementById('skme-contact-form');
  const formStatus = document.getElementById('form-status');

  function setFormMode(mode) {
    formTabs.forEach((t) => {
      t.classList.toggle('active', t.getAttribute('data-form-mode') === mode);
    });
    if (projectFieldsWrap) {
      projectFieldsWrap.style.display = mode === 'project' ? 'block' : 'none';
    }
  }

  formTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setFormMode(tab.getAttribute('data-form-mode'));
    });
  });

  function selectServiceInForm(serviceName) {
    setFormMode('project');
    const checkboxes = document.querySelectorAll('input[name="services"]');
    checkboxes.forEach((cb) => {
      if (cb.value === serviceName) {
        cb.checked = true;
      }
    });
  }

  document.querySelectorAll('[data-open-project-form]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      setFormMode('project');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const location = formData.get('location') || 'Saudi Arabia';
      const message = formData.get('message') || '';
      const selectedServices = formData.getAll('services');

      const subject = encodeURIComponent(
        selectedServices.length > 0
          ? `SKME Project Request — ${name} (${location})`
          : `SKME Website Inquiry — ${name}`
      );

      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Project Location: ${location}`,
        selectedServices.length ? `Requested Services:\n- ${selectedServices.join('\n- ')}` : '',
        `\nMessage / Project Details:\n${message}`
      ].filter(Boolean);

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `Thank you, <strong>${name}</strong>! Your inquiry is ready. Opening your email client to send directly to <strong>info@suikime.com</strong>, or call us at <a href="tel:+966126608427" style="text-decoration:underline;font-weight:700;">+966 12 660 8427</a>.`;
      }

      window.location.href = `mailto:info@suikime.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    });
  }

  /* ========================================================================
     9. Scroll Reveal Observer & Custom Cursor Follower (HMH Style)
     ======================================================================== */
  const revealElements = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  const cursorFollower = document.getElementById('cursor-follower');
  const cursorText = document.getElementById('cursor-text');

  if (cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('[data-cursor]').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        cursorText.textContent = item.getAttribute('data-cursor');
        cursorFollower.classList.add('active');
      });
      item.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
      });
    });
  }

  /* ========================================================================
     10. SKME Live Chat Widget Toggle (Preserved from Original Website)
     ======================================================================== */
  const chatFab = document.getElementById('skme-chat-fab');
  const chatContainer = document.getElementById('skme-chat-container');

  if (chatFab && chatContainer) {
    chatFab.addEventListener('click', () => {
      let iframe = document.getElementById('liveChatIframe');
      if (iframe) {
        const isHidden = iframe.style.display === 'none';
        iframe.style.display = isHidden ? 'block' : 'none';
      } else {
        iframe = document.createElement('iframe');
        iframe.id = 'liveChatIframe';
        iframe.className = 'skme-chat-iframe';
        iframe.title = 'SKME Live Support Chat';
        iframe.src = 'https://SKME.a.gdms.cloud/liveChat?liveChatAccess=MF84NGQ4M2IwZWM0YWY0YzhjOTRiODIyYzUzNWZkMDlmNF9lYzc0ZDc0YWMxNWEmZDU5NDNmMDc0NGE3NGJlOTQzNjc5ZjcwZWE2YWNjMjk=';
        iframe.style.display = 'block';
        chatContainer.appendChild(iframe);
      }
    });
  }
});
