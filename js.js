document.addEventListener("DOMContentLoaded", () => {
  const MOBILE_BP = 768; // style.css의 모바일 기준(max-width: 768px)과 동일

  /* ========================================
    1. HEADER SCROLL
  ======================================== */
  const header = document.querySelector("#header");

  const headerScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", headerScroll);
  headerScroll();

  /* ========================================
    2. GNB MEGA MENU
  ======================================== */
  const gnbItems = document.querySelectorAll(".gnb_list > li");
  const headerMenu = document.querySelector(".header_menu");
  const menuContents = document.querySelectorAll(".menu_inner > div");
  let menuTimer;

  const openMenu = (index) => {
    if (!headerMenu) return;
    clearTimeout(menuTimer);
    headerMenu.classList.add("active");
    menuContents.forEach((menu, i) => {
      menu.classList.toggle("active", i === index);
    });
  };

  const closeMenu = () => {
    menuTimer = setTimeout(() => {
      headerMenu?.classList.remove("active");
      menuContents.forEach((menu) => menu.classList.remove("active"));
    }, 150);
  };

  gnbItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > MOBILE_BP) openMenu(index);
    });
    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > MOBILE_BP) closeMenu();
    });
  });

  headerMenu?.addEventListener("mouseenter", () => clearTimeout(menuTimer));
  headerMenu?.addEventListener("mouseleave", closeMenu);

  /* ========================================
    3. MOBILE MENU
  ======================================== */
  const menuBtn = document.querySelector(".menu_btn");
  const gnb = document.querySelector(".gnb");

  if (menuBtn && gnb) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      gnb.classList.toggle("active");
    });

    gnb.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        gnb.classList.remove("active");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_BP) {
        menuBtn.classList.remove("active");
        gnb.classList.remove("active");
      }
    });
  }

  /* ========================================
    4. HEADER POPUP
  ======================================== */
  const utilBtns = document.querySelectorAll(".header_util .util_btn");
  const popupIds = ["search_popup", "mypage_popup", "cart_popup"];
  const popups = popupIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const closeAllPopups = () => {
    popups.forEach((popup) => popup.classList.remove("active"));
  };

  utilBtns.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const targetPopup = popups[index];
      if (!targetPopup) return;
      const isOpen = targetPopup.classList.contains("active");
      closeAllPopups();
      if (!isOpen) targetPopup.classList.add("active");
    });
  });

  document.querySelectorAll(".popup_close").forEach((btn) => {
    btn.addEventListener("click", closeAllPopups);
  });

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".header_popup") &&
      !event.target.closest(".header_util")
    ) {
      closeAllPopups();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllPopups();
      headerMenu?.classList.remove("active");
    }
  });

  /* ========================================
    5. SWIPER INITIALIZATION
    베스트 랭킹과 타임딜은 화살표 클래스(.product_prev / .product_next)가
    같아서, 각 섹션 안의 버튼만 직접 지정한다.
  ======================================== */
  if (typeof Swiper !== "undefined") {
    const mainVisual = document.querySelector(".main_visual_slider");
    if (mainVisual) {
      new Swiper(mainVisual, {
        slidesPerView: 1,
        loop: true,
        speed: 800,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          prevEl: ".visual_prev",
          nextEl: ".visual_next"
        },
        pagination: {
          el: ".visual_pagination",
          clickable: true
        }
      });
    }

    const promotionSlider = document.querySelector(".promotion_slider");
    if (promotionSlider) {
      new Swiper(promotionSlider, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        loop: true,
        speed: 800,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        navigation: {
          prevEl: ".promotion_prev",
          nextEl: ".promotion_next"
        },
        pagination: {
          el: ".promotion_pagination",
          clickable: true
        },
        observer: true,
        observeParents: true
      });
    }

    const productSlider = document.querySelector(".products .product_slider");
    if (productSlider) {
      new Swiper(productSlider, {
        slidesPerView: 1.2,
        spaceBetween: 14,
        speed: 700,
        grabCursor: true,
        watchOverflow: true,
        navigation: {
          prevEl: document.querySelector(".products .product_prev"),
          nextEl: document.querySelector(".products .product_next")
        },
        pagination: {
          el: ".product_pagination",
          type: "progressbar"
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 22 }
        }
      });
    }

    const benefitSlider = document.querySelector(".benefit_slider");
    if (benefitSlider) {
      new Swiper(benefitSlider, {
        slidesPerView: 4,
        spaceBetween: 24,
        speed: 600,
        watchOverflow: true,
        navigation: {
          prevEl: ".benefit_prev",
          nextEl: ".benefit_next"
        },
        pagination: {
          el: ".benefit_pagination",
          type: "progressbar"
        },
        breakpoints: {
          0: { slidesPerView: 1.5, spaceBetween: 15 },
          480: { slidesPerView: 2, spaceBetween: 18 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 24 }
        }
      });
    }

    const timeDealSlider = document.querySelector(".time_deal_slider");
    if (timeDealSlider) {
      new Swiper(timeDealSlider, {
        slidesPerView: 2,
        spaceBetween: 24,
        speed: 600,
        grabCursor: true,
        watchOverflow: true,
        navigation: {
          prevEl: document.querySelector(".time_deal .product_prev"),
          nextEl: document.querySelector(".time_deal .product_next")
        },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 16 },
          601: { slidesPerView: 2, spaceBetween: 20 },
          1200: { slidesPerView: 2, spaceBetween: 24 }
        }
      });
    }
  }

  /* ========================================
    6. SCROLL DOWN / TOP BUTTON
  ======================================== */
  const scrollDown = document.querySelector(".scroll_down");
  const quickMenu = document.querySelector("#quick_menu");

  scrollDown?.addEventListener("click", (event) => {
    event.preventDefault();
    quickMenu?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelector(".top_btn")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ========================================
    7. CATEGORY / PURCHASE-SUBSCRIPTION BUTTONS
    각 그룹은 독립적으로 동작하며 초기값은 첫 번째 버튼
  ======================================== */
  document.querySelectorAll(".category_first, .category_nav").forEach((group) => {
    const buttons = group.querySelectorAll(".category_btn");
    buttons.forEach((button, index) => {
      button.classList.toggle("active", index === 0);
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });

  document.querySelectorAll(".product_card").forEach((card) => {
    const buyBtn = card.querySelector(".buy_btn");
    const subBtn = card.querySelector(".subscribe_btn");
    if (!buyBtn) return;

    buyBtn.classList.add("active");
    subBtn?.classList.remove("active");
    card.classList.remove("sub_active");

    buyBtn.addEventListener("click", (event) => {
      event.preventDefault();
      buyBtn.classList.add("active");
      subBtn?.classList.remove("active");
      card.classList.remove("sub_active");
    });

    subBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      subBtn.classList.add("active");
      buyBtn.classList.remove("active");
      card.classList.add("sub_active");
    });
  });
});