//Hieu ung menu doi mau khi luot xuong (Nha Phuong)
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
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
