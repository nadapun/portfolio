document.addEventListener('DOMContentLoaded', function() {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const viewerImage = document.querySelector('.viewer img');

  thumbnails.forEach(thumbnail => {
    // Update the image in the viewer when a thumbnail is clicked
    thumbnail.addEventListener('click', function() {
      const imagePath = this.getAttribute('data-src');
      viewerImage.src = imagePath;
    });

    // For mobile devices, also add touch event handling
    thumbnail.addEventListener('touchstart', function() {
      const imagePath = this.getAttribute('data-src');
      viewerImage.src = imagePath;
    });
  });
});
