"use strict";

function revealFunction(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i<reveals.length; i++){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint=0;
        if(window.innerWidth<768) {
            revealpoint = -350;}
        else if(window.innerWidth<1280){
            revealpoint = -300;
        }
        else {
            revealpoint = 10;
        }
        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}

var reveals = document.querySelectorAll('.reveal');

console.log(reveals[0].getBoundingClientRect().top);
console.log(window.innerHeight)

revealFunction();

window.addEventListener('scroll', revealFunction);
