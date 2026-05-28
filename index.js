// var Bowser = window['Bowser']
//
var distance_between_us = new Howl({
    src: [distance_between_us],
    autoplay: false,
    loop: true,
    volume: 0
})
var waterfall = new Howl({
    src: [waterfall],
    autoplay: false,
    loop: true,
    volume: 0
})
var glowing_snow = new Howl({
    src: [glowing_snow],
    autoplay: false,
    loop: true,
    volume: 0
})
var static_noise = new Howl({
    src: [static_noise],
    autoplay: false,
    loop: true,
    volume: 0
})
var breath_noise = new Howl({
    src: [breathing],
    autoplay: true,
    loop: true,
    volume: 0
})
var error = new Howl({
    src: [error_noise],
    autoplay: false,
    loop: false,
    volume: 0.5
})
var dog_talk = new Howl({
    src: [doggytalk],
    autoplay: false,
    loop: false,
    onend: function() {
        let toby = document.getElementById("THE_DOG");
        toby.src = "othermedia/toby_fox.gif";
        toby.style.top = "50px";
        toby.style.animation = null; // sets it to nothing sommehow idk
        music.play();
        toby_clicked = false;
    },
    volume: 0.5
})

// sfx
var errsfx1 = new Howl({
    src: [errsfx1],
    autoplay: false,
    loop: false,
    volume: 0.5
})
var errsfx2 = new Howl({
    src: [errsfx2],
    autoplay: false,
    loop: false,
    volume: 0.5
})
// 

const g_clicked = localStorage.getItem("arent_ready.");

const gate_rise_element = document.getElementById("gate_rise");
let gate_removed = true;

if (g_clicked) {
    gate_rise_element.hidden = true;
    gate_rise_element.remove();
    gate_removed = true;
    // console.log("G_CLICKED = TRUE!");
} else {
    // console.log("G_CLICKED FALSE!");
}


const text_element = document.getElementById("qiinr_text"); // whatevver takes the longest to transition..?
let is_animating = false; // naturally, we dont start off animating

// text_element.addEventListener("transitionstart", function() {
//     is_animating = true;
// })

// text_element.addEventListener("transitionend", function() {
//     window.setTimeout(function() {
//         is_animating = false;
//         if (document.getElementById("main_div").classList.contains("clicked")) {
//             document.getElementById("info_box").classList.add("delay_force");
//         }
//     }, 1500) // this is in miliseconds!
// })

// text_element.addEventListener("transitioncancel", function() {
//     is_animating = false;
// })

const pulse = document.getElementById("pulse_div");
// let bg_determiner = Math.random();
let bg_determiner = 0.6;

if (bg_determiner < 1 / 3) {
    var music = waterfall;
    gate_rise_element.hidden = true;
    gate_rise_element.remove();
    gate_removed = true;
    document.body.style.setProperty("--black_recolor", "rgb(137, 251, 253)")
    document.body.style.setProperty("--white_recolor", "rgb(11, 15, 39)")
} else if (bg_determiner < 2 / 3) {
    var music = distance_between_us;
    gate_removed = false;
    document.body.style.setProperty("--black_recolor", "rgb(253, 86, 253)")
    document.body.style.setProperty("--white_recolor", "black")
} else {
    var music = glowing_snow;
    gate_rise_element.hidden = true;
    gate_rise_element.remove();
    gate_removed = true;
    document.body.style.setProperty("--black_recolor", "black")
    document.body.style.setProperty("--white_recolor", "white")
}

// handle the DOG.
let toby_clicked = false;
function toby_transition() {
    toby_clicked = !toby_clicked;

    let toby = document.getElementById("THE_DOG");

    if (toby_clicked) { // he wake
        toby.src = "othermedia/toby_dance.gif";
        toby.style.top = "5px";
        // animate him
        toby.style.animation = "toby_dance step-start 0.75s infinite"
        dog_talk.play();
        music.pause();
    } else { // he sleep
        toby.src = "othermedia/toby_fox.gif";
        toby.style.top = "77px";
        toby.style.animation = null; // sets it to nothing sommehow idk
        dog_talk.pause();
        music.play();
    }
    console.log("CLICKED THE DOG.")
    // play DOG TALK! by spellcasting when he's clicked; have toby dance around
}
// 

// browser detc.
const browser = bowser.getParser(window.navigator.userAgent);
let drift_container = document.getElementById("drift_container");

let browser_info_container = document.getElementById("browser_info");

let chars = ["∿", "∏", "∰", "∑", "␥", "ᓤ", "ᓬ", "ඥ", "🜒", "שּ", "㌵", "㌖", "〷"];

function random_char() {
    // return random_int(0, chars.length - 1);
    return chars[random_int(0, chars.length - 1)]
}

let weird_array = [];

function browser_display(element, text) {
    let current_str = "";
    let time = 0;
    for (let i = 0; i<text.length; i++) {
        let random_str = random_int(2, 5);
        for (let x = 0; x<random_str; x++) {
            let id = setTimeout(() => {
                    let to_add = `<span style="opacity: ${x / random_str}">${random_char()}</span>`;
                    element.innerHTML = current_str + to_add;
            }, 50 * x + time);

            weird_array.push(id);
        }
        
        let other_id = setTimeout(() => {
            current_str += text[i];
            element.innerHTML = current_str;
        }, 50 * random_str + time);
        weird_array.push(other_id);
        time += random_int(10, 50) + random_str * 50;
    }    
}

function clear_browser_timeout() {
    for (let i = 0; i<weird_array.length; i++) {
        clearTimeout(weird_array[i]);
    }

    weird_array = [];
}

const browserdisplay = document.createElement("p");
let browser_name = `Browser Name: ${browser.getBrowser()["name"]}`
browser_info_container.appendChild(browserdisplay);

const bvd = document.createElement("p");
let browser_version = `Browser Version: ${browser.getBrowser()["version"]}`
browser_info_container.appendChild(bvd);

const engd = document.createElement("p");
let engine_version = `Browser Engine: ${browser.getEngine()["name"]}, version ${browser.getEngine()["version"]}`
browser_info_container.appendChild(engd);

const osd = document.createElement("p");
let os_name = `Operating System: ${browser.getOS()["name"]}, version ${browser.getOS()["version"]}`
browser_info_container.appendChild(osd);
// 

document.getElementById("main_div").addEventListener("click", function(e) { // im assuming this is the "add part"
    // console.log("clicked " + e.target.id);
    // e = window.Event || e; causes error
    if (! is_animating) {
        if (e.target.id != "qiinr_text" && !document.getElementById("main_div").classList.contains("clicked")) {
            document.getElementById("main_div").style.top = document.getElementById("main_div").offsetTop + "px";

            is_animating = true;

            document.getElementById("main_div").classList.add("clicked"); // plays transitions via `add`

            window.setTimeout(() => {
                document.getElementById("main_div").style.top = "50%";
            }, 50);

            pulse.style.animation = "none";
            pulse.offsetHeight; // this is a hack to restart animation
            pulse.style.animation = null;
            pulse.style.animationPlayState = "running";

            if (! music.playing() && !toby_clicked) {
                music.play();
                static_noise.play();
            }

            window.setTimeout(() => {
                browser_display(browserdisplay, browser_name);
                browser_display(bvd, browser_version);
                browser_display(engd, engine_version);
                browser_display(osd, os_name);
            }, 2500);

            dog_talk.fade(0.1, 0.5, 3500);
            music.fade(0.1, 0.5, 3500);


            window.setTimeout(function() {
                is_animating = false;
                document.getElementById("info_box").classList.add("delay_force");
            }, 6300)
        }
    }
})

function text_click() {
    if (! is_animating) {
        is_animating = true;
        document.getElementById("info_box").classList.remove("delay_force");

        document.getElementById("info_rise").classList.remove("text_hover");
        document.getElementById("art_rise").classList.remove("text_hover");
        document.getElementById("friends_rise").classList.remove("text_hover");
        gate_rise_element.classList.remove("text_hover");      

        document.getElementById("main_div").classList.remove("clicked"); // reverses transitions via `remove`

        // music
        dog_talk.fade(0.5, 0.1, 2500);
        music.fade(0.5, 0.1, 2500);
        // 

        browser_info_container.style.opacity = 0;

        window.setTimeout(() => {
            browserdisplay.innerHTML = "";
            bvd.innerHTML = "";
            engd.innerHTML = "";
            osd.innerHTML = "";
            browser_info_container.style.opacity = 1;
            clear_browser_timeout();
        }, 600);

        window.setTimeout (() => {
            pulse.style.animation = "none";
            pulse.offsetHeight; // this is a hack to restart animation
            pulse.style.animation = null;
            pulse.style.animationPlayState = "running";
        }, 2000)

        window.setTimeout(function() {
            is_animating = false;
            document.getElementById("info_box").classList.add("delay_force");
        }, 4200)
    }
}

let is_info_transitioning = false;

const info_rise_element = document.getElementById("info_rise");
const art_rise_element = document.getElementById("art_rise");
const friends_rise_element = document.getElementById("friends_rise");

const my_art_rise = document.getElementById("my_art_rise");
const chars_rise = document.getElementById("chars_rise");
const music_rise = document.getElementById("music_rise");
const projects_rise = document.getElementById("projects_rise");

const my_art_box = document.getElementById("my_art");
const my_chars_box = document.getElementById("my_chars");
const fav_songs_box = document.getElementById("fav_songs")
const projects_box = document.getElementById("projects");

const default_box_el = document.getElementById("website_info");
const info_box_el = document.getElementById("info");
const art_box_el = document.getElementById("art");
const friends_box_el = document.getElementById("friends");

document.getElementById("info_tab_box").addEventListener("click", function (ev) {

    // console.log("info click")
    var element = ev.target.parentElement.parentElement;

    // var el_child = ev.target;

    if (is_info_transitioning) return;
    if (ev.target.nodeName != "U") return;

    for (
        const el of [
            info_rise_element,
            art_rise_element,
            friends_rise_element,
            gate_rise_element,

            my_art_rise,
            chars_rise,
            music_rise,
            projects_rise
        ]
    ) {
        if (el == element && !el.classList.contains("clicked")) {
            el.classList.add("clicked");
        } else {
            el.classList.remove("clicked");
        }
    }
    if (element.id == "dont_click") {
        
        info_rise_element.classList.add("clicked");
    };
    for (
        const el of [
            default_box_el,
            info_box_el,
            art_box_el,
            friends_box_el,

            my_art_box,
            my_chars_box,
            fav_songs_box,
            projects_box
        ]
    ) {
        el.classList.add("hidden");
    }

    if (info_rise_element.classList.contains("clicked")) {
        info_box_el.classList.remove("hidden");
    } else if (art_rise_element.classList.contains("clicked")) {
        art_box_el.classList.remove("hidden");
    } else if (friends_rise_element.classList.contains("clicked")) {
        friends_box_el.classList.remove("hidden");

    } else if (my_art_rise.classList.contains("clicked")) {
        my_art_box.classList.remove("hidden");
    } else if (chars_rise.classList.contains("clicked")) {
        my_chars_box.classList.remove("hidden");

    } else if (music_rise.classList.contains("clicked")) {
        fav_songs_box.classList.remove("hidden");
    } else if (projects_rise.classList.contains("clicked")) {
        projects_box.classList.remove("hidden");

    } else {
        default_box_el.classList.remove("hidden");
    }
});

// begin functions for the bg
function get_random_coords() {
    let in_width = window.innerWidth;
    let in_height = window.innerHeight;
    return {x: Math.random() * in_width, y: Math.random() * in_height}
}

function random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // this is stolen tbh but its used globally so ill keep it for now



// the qiinr info transform
let did_transition = false;
function etc_to_q_transform() {
    let etc_info = document.getElementById("etc_info");
    let qiinr_info = document.getElementById("qiinr_info");
    if (!did_transition) {
        did_transition = true;
        etc_info.style.transform = "translate(-150%, 0)"
        etc_info.style.opacity = "0";

        qiinr_info.style.transform = "translate(0, 0)";
        qiinr_info.style.opacity = "1";
    } else {
        did_transition = false;
        etc_info.style.transform = ""
        etc_info.style.opacity = "1";

        qiinr_info.style.transform = "";
        qiinr_info.style.opacity = "0";
    }
}

// audio visualizer
let video_player = document.getElementById("video_player")
function video_handler(ending_subtract) {
    let video = document.getElementById("music_video");

    video_player.style.opacity = 1;
    video.play();
    let stored_volume = music.volume();
    for (let i = 0; i<1; i += 0.0025) { // ts makeshift volume increaser
        setTimeout(() => {
            video.volume = i;
            let bg_vol = (1 - video.volume) * stored_volume;
            music.volume(bg_vol);
        }, 3000 * i);
    }
    // video end pos - 3 = ending criteria
    // setinterval check; if video position is around this area then begin fadeout + clearInterval
    let video_duration = video.duration;
    let time_to_end = video_duration - ending_subtract;
    let loop_check;
    loop_check = setInterval(() => {
        if (video.currentTime > time_to_end) {
            clearInterval(loop_check); 
            // visual + audio fadeout
            video_player.style.opacity = 0;
            
            for (let i = 1; i>0; i -= 0.0025) {
                setTimeout(() => {
                    video.volume = i;
                    let bg_vol = (1 - video.volume) * stored_volume;
                    music.volume(bg_vol);
                }, 3000 * (1 - i));
            }
        }
        console.log(video.currentTime);
    }, 250);
}
// 



let clickedthedamnbutton = false; // bro :sob:

function you_cannot() {
    if (clickedthedamnbutton) {return}
    let mr = Math.random();
    if (mr <= 0.1) {
        gate_rise_element.textContent = "T??_????_?"
    } else if (mr <= 0.2) {
        gate_rise_element.textContent = "?H?_????_?"
    } else if (mr <= 0.3) {
        gate_rise_element.textContent = "??E_????_?"
    } else if (mr <= 0.4) {
        gate_rise_element.textContent = "???_G???_?"
    } else if (mr <= 0.5) {
        gate_rise_element.textContent = "???_?A??_?"
    } else if (mr <= 0.6) {
        gate_rise_element.textContent = "???_??T?_?"
    } else if (mr <= 0.7) {
        gate_rise_element.textContent = "???_???E_?"
    } else {
        gate_rise_element.textContent = "???_????_!"
    }
}

setInterval(you_cannot, 250)

let random_error_names = ["YOU_CAN_NOT.", "THEY_MUST_STAY_HIDDEN.", "YOU_ARENT_READY.", "THE_GATE_MUST_REMAIN_CLOSED."]
// gate open, ENTER (not all caps required). hey stop looking at my commments nerd.

let warning = 0;

function checkIfAlertDisabled(alter_text)
{
   var startTime = new Date().getTime();
   alert(alter_text);
   var endTime = new Date().getTime();

   return ( endTime - startTime ) < 5; 
}

function site_refurbish() {
    if (warning == 0) {
        if(checkIfAlertDisabled("You aren't ready.")) {
            window.location.replace("BYPASSER.html");
        }
        warning += 1;
    } else if (warning == 1) {
        if(checkIfAlertDisabled("Quit trying that.")) {
            window.location.replace("BYPASSER.html");
        }
        warning += 1;
    } else if (warning == 2) {
        if(checkIfAlertDisabled("It won't work.")) {
            window.location.replace("BYPASSER.html");
        }
        warning += 1;
    } else if (warning == 3) {
        if(checkIfAlertDisabled("Fine then.")) {
            window.location.replace("BYPASSER.html");
        }
        localStorage.setItem("arent_ready.", "truetruetrue");
        window.location.replace("are_you_sure.html");
    }
}

let animDuration = 5;

// detect if tabbed in
let tabbed_in = true;
document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState == "visible") {
        tabbed_in = true;
        for (let i = 0; i<1; i += 0.0025) {
            setTimeout(() => {
                music.rate(i);
            }, 1500 * i);
    }
    } else {
        tabbed_in = false;
        for (let i = 1; i>0; i -= 0.0025) {
            setTimeout(() => {
                music.rate(i);
            }, 1500 * (1 - i));
        }
    }
})

function create_drift_element() {
    let start = get_random_coords();
    let end = get_random_coords();
    
    const created_drifter = document.createElement("p"); // element of drift
    created_drifter.innerHTML = "▉"; /// sets character
    created_drifter.classList.add("drifter"); // gives the drift element its respective class
    // set start and end coords
    created_drifter.style.setProperty("--start-x", `${start.x}px`);
    created_drifter.style.setProperty("--start-y", `${start.y}px`);
    created_drifter.style.setProperty("--end-x", `${end.x}px`);
    created_drifter.style.setProperty("--end-y", `${end.y}px`);
    created_drifter.style.setProperty("animation-duration", `${animDuration}s`);
    // 
    created_drifter.style.setProperty("font-size", random_int(5, 15) + "px");
    created_drifter.addEventListener("animationend", (e) => {
        e.target.remove(); // when animation ends, remove
    })
    
    drift_container.appendChild(created_drifter);
}

setInterval(create_drift_element, 100); // will run this function once every X milliseconds, meaning it'll create a new drifter every X milliseconds

// this sucks but whatever
// when media query matched, dont set props here, set in css; this just handles the element parenting
let is_mobile = window.matchMedia("(max-width: 600px)").matches;
const browser_info = document.getElementById("browser_info");

if (is_mobile) {
    console.log('running mobile');
    default_box_el.appendChild(browser_info);
}

// mouse - music correlation thingy

function scaleCap(inS, inE, outS, outE, val) {
  return Math.max(Math.min((val - inS) / (inE - inS), 1), 0) * (outE - outS) + outS; // credits to aro; useful for this
}

// begin the OOP :[]!

let warning_text = ["DONT_CLICK_IT",
"NO_NO_NO",
"YOU_ARENT_READY",
"IT_CANT_OPEN",
"YOU_WILL_CRASH"]

let elements = [];

for (let i = 0; i<32; i++) {
    let warning_element = document.createElement("p");
    warning_element.classList.add("warning_class");
    warning_element.innerHTML = "";
    warning_element.style.position = "absolute";

    let appear_timing = Math.random();

    let temp_object = {"element": warning_element, "appear_timing": appear_timing, "visible": false}; //functionally a part with properties; pushed to an array, like I would a table -- cool!

    document.getElementById("warnings").appendChild(warning_element); // temp for now
    let random_timing = Math.random();
    PowerGlitch.glitch(warning_element, {
        "playMode": "always",
        "optimizeSeo": true,
        "createContainers": true,
        "hideOverflow": false,
        "timing": {
            "duration": 750,
            "easing": "ease-in-out"
        },
        "glitchTimeSpan": {
            "start": random_timing,
            "end": random_timing + 0.3
        },
        "shake": {
            "velocity": 15,
            "amplitudeX": 0.35,
            "amplitudeY": 0.23
        },
        "slice": {
            "count": 6,
            "velocity": 7,
            "minHeight": 0.02,
            "maxHeight": 0.15,
            "hueRotate": true,
            "cssFilters": ""
        },
        "pulse": {
            "scale": 1
        }
    })
    elements.push(temp_object);
}

function changeSpeed (duration) {
    duration = Math.min(duration, 100000)
    animDuration = duration;
    drift_container.childNodes.forEach(function(e) {
        let b = e.getBoundingClientRect()
        let starttop = parseFloat(e.style.getPropertyValue("--start-y"));
        let endtop = parseFloat(e.style.getPropertyValue("--end-y"));
        let endleft = parseFloat(e.style.getPropertyValue("--end-x"));
        let currentPercent = (b.top - starttop) / (endtop - starttop);
        let oldDuration = parseFloat(e.style.getPropertyValue("animation-duration"));

        let newPercent = oldDuration * currentPercent / duration;
        if (newPercent > 1) {
            e.remove();
        }
        let newTop = (b.top - newPercent * endtop) / (-newPercent+1)
        let newLeft = (b.left - newPercent * endleft) / (-newPercent+1)

        e.style.setProperty("--start-x", `${newLeft}px`);
        e.style.setProperty("--start-y", `${newTop}px`);
        e.style.setProperty("animation-duration", `${duration}s`);

    })
}
