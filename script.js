document.addEventListener('DOMContentLoaded', function() {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const viewerImage = document.querySelector('.viewer img');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      const imagePath = this.getAttribute('data-src');
      viewerImage.src = imagePath;
    });
  });
});
