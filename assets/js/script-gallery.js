'use strict';
const mediaItems = document.querySelectorAll('.img-g'); // ahora son img y video
const containerimage = document.querySelector('.container-img');
const imageContainer = document.querySelector('.img-show');
const videoContainer = document.querySelector('.video-show');
const copy = document.querySelector('.copy');

mediaItems.forEach(item => {
  item.addEventListener('click', () => {
    if (item.tagName === 'IMG') {
      showImage(item.getAttribute('src'), item.getAttribute('alt'));
    } else if (item.tagName === 'VIDEO') {
      const source = item.querySelector('source').getAttribute('src');
      showVideo(source, item.getAttribute('alt'));
    }
  });
});

const showImage = (srcImage, altImage) => {
  containerimage.classList.add('move');
  imageContainer.classList.add('show');
  videoContainer.classList.remove('show');
  videoContainer.pause();

  imageContainer.src = srcImage;
  copy.innerHTML = altImage;
};

const showVideo = (srcVideo, altVideo) => {
  containerimage.classList.add('move');
  videoContainer.classList.add('show');
  imageContainer.classList.remove('show');
  imageContainer.src = "";

  videoContainer.src = srcVideo;
  videoContainer.play();
  copy.innerHTML = altVideo;
};

// Cerrar lightbox
containerimage.addEventListener('click', e => {
  if (e.target.classList.contains('fa-x') || e.target === containerimage) {
    containerimage.classList.remove('move');
    imageContainer.classList.remove('show');
    videoContainer.classList.remove('show');
    videoContainer.pause();
  }
});


  