const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
});

// Nhiem vu 1

const targets = document.querySelectorAll('.info-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fly-in-visible');
    } else {
      entry.target.classList.remove('fly-in-visible'); // <- để reset lại hiệu ứng
    }
  });
}, {
  threshold: 0.1
});

targets.forEach(target => observer.observe(target));


const flyInSections = document.querySelectorAll('.fly-in-section');

const observer2 = new IntersectionObserver(entries => { // Đổi tên thành observer2
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fly-in-visible');
    } else {
      entry.target.classList.remove('fly-in-visible');
    }
  });
}, {
  threshold: 0.1
});

flyInSections.forEach(section => observer2.observe(section));;

