"use strict";

window.addEventListener(
    "scroll",
    function(){
        var sticky = document.querySelector('nav');
        sticky.classList.toggle("sticky", window.scrollY>0)
    })