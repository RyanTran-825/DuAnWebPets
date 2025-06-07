//Hieu ung menu doi mau khi luot xuong (Nha Phuong)
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
});
