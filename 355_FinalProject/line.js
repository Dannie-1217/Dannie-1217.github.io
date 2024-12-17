const images2 = ["img/line1.jpg","img/line2.jpg","img/line3.jpg","img/line4.jpg"];
let currentImageIndex2 = 0;

const thumbnail2 = document.getElementById("thumbnail2");
thumbnail2.src = images2[currentImageIndex];

setInterval(() => {
    thumbnail2.classList.add("hidden");
    setTimeout(() => {
        currentImageIndex2 = (currentImageIndex2+1)%images2.length;
        thumbnail2.src=images2[currentImageIndex2];
        thumbnail2.classList.remove("hidden");
    }, 600);
},3000)