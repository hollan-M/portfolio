"use strict";
var Valley_Of_Fools = new Howl({
    src: [valley_of_fools],
    autoplay: true,
    loop: true,
    volume: 0
});
function getRandomCoords() {
    let inWidth = window.innerWidth;
    let inHeight = window.innerHeight;
    // console.log(Math.random() * in_width);
    return { x: Math.random() * inWidth, y: Math.random() * inHeight };
}
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let should_mute = false;
// document elements
let confirmationBox = document.getElementById("confirm");
let confirmElement = document.getElementById("CHECKMARK");
let denyElement = document.getElementById("XMARK");
let welcomeTextElement = document.getElementById("welcomeText");
let headerElement = document.getElementById("header");
let mainElement = document.getElementById("main");
//
setTimeout(() => {
    confirmationBox.style.animation = "confirmStart 1.75s cubic-bezier(0.37, 0, 0.63, 1) forwards";
}, 500);
confirmElement.addEventListener("click", () => {
    should_mute = true;
    confirmationBox.style.animation = "confirmationEnd 1.5s cubic-bezier(0.7, 0, 0.84, 0) forwards";
    startUp();
});
denyElement.addEventListener("click", () => {
    Valley_Of_Fools.play();
    Valley_Of_Fools.fade(0.1, 0.5, 3500);
    confirmationBox.style.animation = "confirmationEnd 1.5s cubic-bezier(0.7, 0, 0.84, 0) forwards";
    startUp();
});
function startUp() {
    setTimeout(() => {
        welcomeTextElement.style.animation = "welcomeText 0.75s cubic-bezier(0.45, 0, 0.55, 1) forwards";
        setTimeout(() => {
            headerElement.style.animation = "header 0.75s cubic-bezier(0.45, 0, 0.55, 1) forwards";
            setTimeout(() => {
                mainElement.style.animation = "main 0.75s cubic-bezier(0.45, 0, 0.55, 1) forwards";
            }, 1000);
        }, 1000);
    }, 1500);
} // THIS IS LACED  !!!!!!!!
// header click & corresponding info display
// ty jac for helping with this 
const headerElements = {
    landing: document.getElementById("landing"),
    statement: document.getElementById("statement"),
    galleries: document.getElementById("galleries"),
    links: document.getElementById("links"),
    extra: document.getElementById("extra")
};
const buttons = {
    landing: {
        enter: () => {
            headerElements.landing.style.animation = "Click 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards";
            document.getElementById("landingMain").style.opacity = "1";
        },
        leave: () => {
            headerElements.landing.style.animation = "unset";
            document.getElementById("landingMain").style.opacity = "0";
        }
    },
    statement: {
        enter: () => {
            headerElements.statement.style.animation = "Click 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards";
            document.getElementById("statementMain").style.opacity = "1";
        },
        leave: () => {
            headerElements.statement.style.animation = "unset";
            document.getElementById("statementMain").style.opacity = "0";
        }
    },
    galleries: {
        enter: () => {
            headerElements.galleries.style.animation = "Click 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards";
            document.getElementById("galleriesMain").style.opacity = "1";
        },
        leave: () => {
            headerElements.galleries.style.animation = "unset";
            document.getElementById("galleriesMain").style.opacity = "0";
        }
    },
    links: {
        enter: () => {
            headerElements.links.style.animation = "Click 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards";
            document.getElementById("linksMain").style.opacity = "1";
        },
        leave: () => {
            headerElements.links.style.animation = "unset";
            document.getElementById("linksMain").style.opacity = "0";
        }
    },
    extra: {
        enter: () => {
            headerElements.extra.style.animation = "Click 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards";
            document.getElementById("extraMain").style.opacity = "1";
        },
        leave: () => {
            headerElements.extra.style.animation = "unset";
            document.getElementById("extraMain").style.opacity = "0";
        }
    }
};
let lastButton = null;
function onClick(button) {
    lastButton?.leave(); // Shorthand for if (lastButton) lastButton.leave();
    button.enter();
    lastButton = button;
}
for (const index in headerElements) {
    const button = buttons[index];
    const element = headerElements[index];
    if (!button)
        continue;
    element.addEventListener("click", () => onClick(button));
    // You can also access the HTML element through headerElements[index]
}
// my shit attempt:
// const headerElements = {
//   landing: document.getElementById("landing"),
//   statement: document.getElementById("statement"),
//   galleries: document.getElementById("galleries"),
//   links: document.getElementById("links"),
//   extra: document.getElementById("extra")
// }
// let lastClicked = null;
// const clickArray = {
//   landing: {
//     enter: () => {
//     },
//     leave: () => {
//     }
//   },
// }
// for (const el of Object.values(headerElements) as HTMLDivElement[]) {
//   el?.addEventListener("click", (element) => {
//     // PROCESS: make sure you aren't clicking the exact same thing, handle leave of the lastClick element, handle Enter of the new element 
//     const target = element.target;
//     let leaving = lastClicked; // null by default
//     if (!leaving) {
//       console.log("entering the element");
//     }
//     // clickArray[target] -> function -> situational..howwww ugh
//   })
// }
// :[
// loops
let driftContainer = document.getElementById("driftcontainer");
function createDrifter() {
    let start = getRandomCoords();
    let end = getRandomCoords();
    const createdDrifter = document.createElement("p");
    createdDrifter.classList.add("drifter");
    createdDrifter.style.setProperty('--start-x', `${start.x}px`); // set start and end coords
    createdDrifter.style.setProperty('--start-y', `${start.y}px`);
    createdDrifter.style.setProperty('--end-x', `${end.x}px`);
    createdDrifter.style.setProperty('--end-y', `${end.y}px`);
    createdDrifter.innerHTML = "✧"; // set a random character
    let randomScale = randomInt(5, 15);
    createdDrifter.style.setProperty('font-size', `${randomScale.toString()}px`);
    createdDrifter.addEventListener("animationend", (element) => {
        const target = element.target;
        target.remove(); // when animation ends, remote itself
    });
    driftContainer.appendChild(createdDrifter); // add the new drifter to the container
    //   console.log("X:", start.x, "\nY:", start.y);
}
setInterval(createDrifter, 100);
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    return false;
});
