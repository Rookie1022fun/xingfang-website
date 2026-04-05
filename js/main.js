// =============================================
//  扬州星方宝乐涂装设备有限公司 - 网站交互脚本
// =============================================

document.addEventListener("DOMContentLoaded", function () {

  // ---- 移动端汉堡菜单 ----
  const hamburger = document.querySelector(".hamburger");
  const navMenu   = document.querySelector(".nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });
    // 点击菜单项后关闭菜单
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
      });
    });
  }

  // ---- Banner 轮播 ----
  var slides     = document.querySelectorAll(".banner-slide");
  var dots       = document.querySelectorAll(".banner-dots span");
  var slidesWrap = document.querySelector(".banner-slides");
  var current    = 0;
  var total      = slides.length;

  function goToSlide(idx) {
    if (!slidesWrap) return;
    current = (idx + total) % total;
    slidesWrap.style.transform = "translateX(-" + current * 100 + "%)";
    dots.forEach(function (d, i) { d.classList.toggle("active", i === current); });
  }

  var prevBtn = document.querySelector(".banner-prev");
  var nextBtn = document.querySelector(".banner-next");
  if (prevBtn) prevBtn.addEventListener("click", function () { goToSlide(current - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { goToSlide(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener("click", function () { goToSlide(i); }); });

  // 自动轮播 5 秒
  if (total > 0) setInterval(function () { goToSlide(current + 1); }, 5000);

  // ---- 数字滚动动画 ----
  function animateNumbers() {
    document.querySelectorAll(".count-up").forEach(function (el) {
      var target   = parseInt(el.getAttribute("data-target"), 10);
      var duration = 1800;
      var step     = Math.ceil(target / (duration / 16));
      var current  = 0;
      var timer    = setInterval(function () {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  var statsBar = document.querySelector(".stats-bar");
  if (statsBar) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateNumbers();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsBar);
  }

  // ---- 回到顶部 ----
  var backTop = document.querySelector(".back-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 400);
    });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- 联系表单提交 ----
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = contactForm.querySelector('[name="name"]').value.trim();
      var phone = contactForm.querySelector('[name="phone"]').value.trim();
      if (!name) { alert("请填写您的姓名！"); return; }
      if (!phone) { alert("请填写联系电话！"); return; }
      // 实际项目中此处对接后端接口
      alert("感谢您的咨询，" + name + "！\n我们将在24小时内与您联系，请保持电话畅通。");
      contactForm.reset();
    });
  }

  // ---- 平滑滚动（锚点） ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---- 导航高亮（当前页） ----
  var page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === page || (page === "index.html" && href === "index.html")) {
      link.classList.add("active");
    }
  });

});
