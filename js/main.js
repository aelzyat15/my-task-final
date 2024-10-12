/* ------------------------- video modal -------------------------*/

function coursePreviewVideo() {
  const coursePreviewModal = document.querySelector(".js-course-preview-modal");
  if(coursePreviewModal){
      coursePreviewModal.addEventListener("shown.bs.modal", function () {
          this.querySelector(".js-course-preview-video").play();
          this.querySelector(".js-course-preview-video").currentTime = 0;
      });

      coursePreviewModal.addEventListener("hide.bs.modal", function(){
          this.querySelector(".js-course-preview-video").pause();
      });
  }
}
coursePreviewVideo();

/* ------------------------- slider js ------------------- */

let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");
let carouselDom = document.querySelector(".carousel");
let listItemDom = document.querySelector(".carousel .list");
let thumbnailDom = document.querySelector(".carousel .thumbnail");

nextDom.onclick = function () {
  showSlider("next");
};
prevDom.onclick = function () {
  showSlider("prev");
};

let timeRunning = 500;
let timeAutoNext = 7000;
let runTimeOut;
// let runAutoRun = setTimeout(() => {
//   nextDom.click();
// }, timeAutoNext);
function showSlider(type) {
  let itemSlider = document.querySelectorAll(".carousel .list .item");
  let itemThumbnail = document.querySelectorAll(".carousel .thumbnail .item");

  if (type === "next") {
    listItemDom.appendChild(itemSlider[0]);
    thumbnailDom.appendChild(itemThumbnail[0]);
    carouselDom.classList.add("next");
  } else {
    let positionLastItem = itemSlider.length - 1;
    listItemDom.prepend(itemSlider[positionLastItem]);
    thumbnailDom.prepend(itemThumbnail[positionLastItem]);
    carouselDom.classList.add("prev");
  }

  // clearTimeout(runTimeOut);
  // runTimeOut = setTimeout(() => {
  //   carouselDom.classList.remove("next");
  //   carouselDom.classList.remove("prev");
  // }, timeRunning);
}

/* ---------------------- prosress bar ---------------- */

const steps = document.querySelectorAll(".step");
const items = document.querySelectorAll(".item");
let active = 1;

const updateProgress = () => {
  steps.forEach((step, i) => {
    if (i == active - 1) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  items.forEach((item, i) => {
    if (i == active - 1) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

nextDom.addEventListener("click", () => {
  active++;
  if (active > steps.length) {
    active = 1;
  }
  updateProgress();
});

prevDom.addEventListener("click", () => {
  active--;
  if (active < 1) {
    active = steps.length;
  }
  updateProgress();
});

/* ----------------- img progress bar ------------ */
const item = document.querySelectorAll('.carousel .list .backs');
const progressBar = document.querySelector('.img-progress-bar');
const progressTextLeft = document.querySelector('.progress-text-left');
const progressTextRight = document.querySelector('.progress-text-right');
const totalItems = item.length;

let currentIndex = 0;

function updateImgProgress() {
    const progressPercentage = ((currentIndex + 1) / totalItems) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressTextLeft.textContent = currentIndex + 1;
    progressTextRight.textContent = totalItems;
}

function showNext() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalItems;
    items[currentIndex].classList.add('active');
    updateImgProgress();
}

function showPrev() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    items[currentIndex].classList.add('active');
    updateImgProgress();
}

document.getElementById('next').addEventListener('click', showNext);
document.getElementById('prev').addEventListener('click', showPrev);

updateImgProgress();
