import "./styles/index.scss";

const prevButton = document.querySelector(".carousel__container-track--prev");
const nextButton = document.querySelector(".carousel__container-track--next");
const slides = document.querySelectorAll(".carousel__container-slide");
const dots = document.querySelectorAll(".dot");

let index = 0;

export function slideShow(n) {
  console.log(n);
  slides.forEach((element) => element.classList.remove("show"));
  slides[n].classList.add("show");
}

export function dotShow(n) {
  dots.forEach((element) => element.classList.remove("show"));
  console.log(dots);
  dots[n].classList.add("show");
}

function nextSlide() {
  if (index === slides.length - 1) {
    index = 0;

    slideShow(index);
    dotShow(index);
  } else {
    index += 1;

    slideShow(index);
    dotShow(index);
  }
}

function prevSlide() {
  if (index === 0) {
    index = slides.length - 1;

    slideShow(index);
    dotShow(index);
  } else {
    index -= 1;

    slideShow(index);
    dotShow(index);
  }
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);
