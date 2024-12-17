const images = ["img/bar1.jpg","img/bar2.jpg","img/bar3.jpg"];
let currentImageIndex = 0;

const thumbnail = document.getElementById("thumbnail1");
thumbnail.src = images[currentImageIndex];

setInterval(() => {
    thumbnail.classList.add("hidden");
    setTimeout(() => {
        currentImageIndex = (currentImageIndex+1)%images.length;
        thumbnail.src=images[currentImageIndex];
        thumbnail.classList.remove("hidden");
    }, 600);
},3000)