"use strict";

const value_container = document.getElementById("value-container");

function showValue(event){
    const value = event.target.getAttribute("data-value");
    value_container.innerHTML = value;
    value_container.style.visibility = "visible";
    value_container.style.left = event.pageX + "px";
    value_container.style.top = event.pageY - 30 + "px";
}

function hideValue(){
    value_container.style.visibility = "hidden";
}

const bars = document.querySelectorAll(".bar");
    bars.forEach(bar=>{
    bar.addEventListener("mouseover",showValue);
    bar.addEventListener("mousemove",showValue);
    bar.addEventListener("mouseout",hideValue);
});