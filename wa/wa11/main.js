const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const pics = ["images/kd1.jpg", "images/kd2.jpg", "images/kd3.jpg", "images/kd4.jpg", "images/kd5.jpg"];

/* Declaring the alternative text for each image file */
const alts = ["Image of Anaconda and Project 305 at Kings Dominion", "Image of Twisted Timbers at Kings Dominion", "Image of Dominator at Kings Dominion", "Image of Racer 75 at Kings Dominion", "Image of Reptilian at Kings Dominion"];

/* Looping through images */
for(let i = 0; i < 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', pics[i]);
    newImage.setAttribute('alt', alts[i]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", ()=>{
        displayedImage.setAttribute('src', pics[i]);
        displayedImage.setAttribute('alt', alts[i]);
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", ()=> {
    const button = btn.getAttribute("class");
    if(button == "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
})
