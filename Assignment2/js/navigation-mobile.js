"use-strict"

const hamburger = document.querySelector('.hamburger-icon');

const mobile = document.querySelector('.mobile-menu');

const logo =document.querySelector('.logo');

const menu_elements=document.querySelectorAll('.mobile-menu-element');



hamburger.addEventListener(
    'click', function(){
        mobile.classList.toggle('active');
    }
)


for(let element of menu_elements){
    element.addEventListener(
        'click',function(){
            mobile.classList.remove('active');
        }
    )
}


window.addEventListener(
    'resize',function(){
        if(window.innerWidth>768){
            mobile.className='mobile-menu';
        }
    })

