// Nha Phuong
//Hieu ung menu doi mau khi luot xuong
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
});

//nav
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(
    "section[data-group], footer[data-group]"
  );

  // Lấy tên file
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") currentPage = "index.html";

  // 1. Đánh dấu nav-link đúng trang hiện tại
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const page = link.dataset.page;
    if (href.includes(currentPage) && sections.length === 0) {
      // Nếu KHÔNG có section (trang đơn)
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 2. Nếu có section → xử lý đổi màu theo scroll
  function updateActiveNavLinkByScroll() {
    let activeGroup = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const scroll = window.scrollY + window.innerHeight / 2;

      if (scroll >= top && scroll < top + height) {
        activeGroup = section.dataset.group;
      }
    });

    if (activeGroup !== "") {
      navLinks.forEach((link) => {
        if (link.dataset.page === activeGroup) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  // Gọi ngay để xử lý khi vừa load trang
  if (sections.length > 0) {
    updateActiveNavLinkByScroll();
    window.addEventListener("scroll", updateActiveNavLinkByScroll);
  }
});

//Giu mau active cho the a neu chuyen sang trang html cua the do
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = document.body.dataset.current;

  navLinks.forEach((link) => {
    const page = link.dataset.page;
    if (page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

//show dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("dropdown");
  const dropdownLink = dropdown.querySelector("a");
  let hideTimer;

  // Hover vào → hiển thị menu
  dropdown.addEventListener("mouseenter", () => {
    clearTimeout(hideTimer); // Hủy bỏ đếm ngược nếu vừa hover lại
    dropdown.classList.add("show");
  });

  // Rời chuột → đợi 400ms rồi ẩn menu (nếu không quay lại)
  dropdown.addEventListener("mouseleave", () => {
    hideTimer = setTimeout(() => {
      dropdown.classList.remove("show");
    }, 400); // 👈 Dino có thể chỉnh thời gian ở đây (ms)
  });

  // Click nơi khác trên trang sẽ đóng menu
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
});

// Nhiem vu 1 - (Bao Chau)

const targets = document.querySelectorAll(".info-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fly-in-visible");
      } else {
        entry.target.classList.remove("fly-in-visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

targets.forEach((target) => observer.observe(target));

const flyInSections = document.querySelectorAll(".fly-in-section");

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fly-in-visible");
      } else {
        entry.target.classList.remove("fly-in-visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

flyInSections.forEach((section) => observer2.observe(section));

//Nhiem vu 2 - Nha Phuong
document.querySelectorAll(".food-item a:first-child").forEach(function (heart) {
  heart.addEventListener("click", function (e) {
    e.preventDefault();

    const icon = heart.querySelector("i");

    // Đổi icon: viền <=> đầy
    if (icon.classList.contains("bx-heart")) {
      icon.classList.remove("bx-heart");
      icon.classList.add("bxs-heart");
    } else {
      icon.classList.remove("bxs-heart");
      icon.classList.add("bx-heart");
    }

    // Toggle class active để đổi màu và chạy animation
    heart.classList.toggle("active");

    // Xoá animation cũ để có thể click lại nhiều lần
    icon.classList.remove("pop-anim");
    void icon.offsetWidth;
    icon.classList.add("pop-anim");
  });
});

const foods = document.querySelector(".foods");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");

leftBtn.addEventListener("click", () => {
  foods.scrollBy({ left: -300, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  foods.scrollBy({ left: 300, behavior: "smooth" });
});

const flyfy = document.querySelectorAll(".boxes-food");

const observer3 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fly-in-visible");
      } else {
        entry.target.classList.remove("fly-in-visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

flyfy.forEach((section) => observer3.observe(section));

const fly = document.querySelectorAll(".cn-boxes");

const observer4 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fly-in-visible");
      } else {
        entry.target.classList.remove("fly-in-visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

fly.forEach((section) => observer4.observe(section));

// hieu ung hover gio hang

// Đảm bảo DOM đã tải đầy đủ trước khi chạy script
document.addEventListener("DOMContentLoaded", function () {
  // Logic chung của script.js (nếu có)
  // Ví dụ: slider, menu toggle, v.v.
  // ... (giữ nguyên các code hiện có của bạn trong script.js) ...

  // --- LOGIC CHO MINI-CART (HIỆN KHI HOVER) - CHỈ TRÊN TRANG INDEX.HTML ---
  const cartIconWrapper = document.querySelector(".cart-icon-wrapper");
  const miniCartDropdown = document.getElementById("mini-cart-dropdown");

  if (cartIconWrapper && miniCartDropdown) {
    // Đảm bảo mini-cart được ẩn mặc định (CSS cũng nên làm điều này)
    miniCartDropdown.style.display = "none";
    miniCartDropdown.style.opacity = "0";
    miniCartDropdown.style.transform = "translateY(10px)";
    miniCartDropdown.style.pointerEvents = "none"; // Ensure it's not interactive when hidden

    let hoverTimeout;

    cartIconWrapper.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout); // Xóa timeout ẩn nếu đang có
      // Gọi hàm từ cart.js để cập nhật nội dung mini-cart
      if (typeof updateCartCountAndMiniCart === "function") {
        updateCartCountAndMiniCart(); // Update content before showing
      }
      miniCartDropdown.style.display = "block"; // Hiển thị mini-cart
      miniCartDropdown.style.opacity = "1";
      miniCartDropdown.style.transform = "translateY(0)";
      miniCartDropdown.style.pointerEvents = "auto"; // Make it interactive when shown
    });

    cartIconWrapper.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        miniCartDropdown.style.display = "none"; // Ẩn mini-cart
        miniCartDropdown.style.opacity = "0";
        miniCartDropdown.style.transform = "translateY(10px)";
        miniCartDropdown.style.pointerEvents = "none"; // Disable interaction when hidden
      }, 300); // Thêm một chút delay để người dùng có thể di chuyển chuột vào dropdown
    });

    miniCartDropdown.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout); // Nếu di chuột vào dropdown, không ẩn
    });

    miniCartDropdown.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        miniCartDropdown.style.display = "none";
        miniCartDropdown.style.opacity = "0";
        miniCartDropdown.style.transform = "translateY(10px)";
        miniCartDropdown.style.pointerEvents = "none";
      }, 300);
    });
  }

  // Đảm bảo số lượng trên icon giỏ hàng được cập nhật khi trang tải (chỉ trên index)
  // Cần đảm bảo hàm updateCartCountAndMiniCart đã được tải từ cart.js
  if (typeof updateCartCountAndMiniCart === "function") {
    updateCartCountAndMiniCart(); // Initial update when index.html loads
  }
});
