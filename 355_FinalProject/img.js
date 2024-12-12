const images = ["img/bar.jpg","img/bar2.jpg"];
let currentImageIndex = 0;

const thumbnail = document.getElementById("thumbnail1");

setInterval(() => {
    thumbnail.classList.add("hidden");
    setTimeout(() => {
        currentImageIndex = (currentImageIndex+1)%images.length;
        thumbnail.src=images[currentImageIndex];
        thumbnail.classList.remove("hidden");
    }, 600);
},3000)