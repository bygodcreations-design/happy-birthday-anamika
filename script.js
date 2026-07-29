const loader = document.getElementById("loader");
const slideshow =
document.getElementById("slideshow");
const hero=document.getElementById("hero");
window.addEventListener("load", () => {

    // Hide the hero until the intro finishes
    hero.style.opacity = "0";
    hero.style.visibility = "hidden";

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {

            loader.style.display = "none";

            // Now reveal the hero
            hero.style.visibility = "visible";
            hero.style.opacity = "1";

        }, 600);

    }, 2500);

});
const chapterNav = document.getElementById("chapterNav");
const chapterIndicator = document.getElementById("chapterIndicator");

let current=0;

function changeBackground(){

slideshow.style.backgroundImage =
`url('${FEATURED_PHOTOS[current]}')`;

current++;

if(current>=FEATURED_PHOTOS.length){

current=0;

}

}

changeBackground();

setInterval(changeBackground,5000);

/* ===========================
Music Engine
=========================== */

const music =
document.getElementById("bgMusic");
music.volume = 0.35;

const musicButton =
document.getElementById("musicButton");

/* ---------------------- */

let currentChapter = 1;

const chapters = [
    document.getElementById("chapter1"),
    document.getElementById("chapter2"),
    document.getElementById("chapter3"),
    document.getElementById("chapter4"),
    document.getElementById("chapter5"),
    document.getElementById("chapter6")
];
/* ---------------------- */ 

let playing = false;

musicButton.addEventListener("click",()=>{

if(playing){

music.pause();

musicButton.innerHTML="🎵";

playing=false;

}
else{

music.play();

musicButton.innerHTML="🔊";

playing=true;

}

});

const transitionScene=document.getElementById("transitionScene");

playButton.addEventListener("click",()=>{

music.play().catch(err => {
    console.log(err);
});

hero.style.transition="2s";

hero.style.transform="scale(1.15)";

hero.style.opacity="0";

setTimeout(() => {

    hero.style.display = "none";

    transitionScene.classList.add("show");

    // After 3 seconds open Chapter 1
    chapterNav.style.display = "flex";

    setTimeout(() => {

        transitionScene.classList.remove("show");

        const chapter1 = document.getElementById("chapter1");

chapter1.style.display = "flex";
currentChapter = 1;
chapterIndicator.innerHTML = "Chapter 1 / 6";

loadChapterPhoto();

setTimeout(()=>{

    chapter1.style.opacity = "1";

},100);
    },3000);

},1800);

});
/* =====================================================
CHAPTER 1 PHOTO ENGINE
===================================================== */
chapterNav.style.display = "flex";

const chapterBackground =
document.querySelector(".chapterBackground");

const photoCounter =
document.getElementById("photoCounter");

let chapterPhoto = 0;

function loadChapterPhoto(){

chapterBackground.style.opacity = "0";

setTimeout(() => {

    chapterBackground.style.backgroundImage =
    `url('${INDIVIDUAL_PHOTOS[chapterPhoto]}')`;

    chapterBackground.style.opacity = "1";

},400);

photoCounter.innerHTML =

`${String(chapterPhoto+1).padStart(2,"0")} / ${INDIVIDUAL_PHOTOS.length}`;

}

function nextChapterPhoto(){

chapterPhoto++;

if(chapterPhoto>=INDIVIDUAL_PHOTOS.length){

chapterPhoto=0;

}

loadChapterPhoto();

}

function previousChapterPhoto(){

chapterPhoto--;

if(chapterPhoto<0){

chapterPhoto=
INDIVIDUAL_PHOTOS.length-1;

}

loadChapterPhoto();

}

document
.getElementById("nextPhoto")
.addEventListener("click",nextChapterPhoto);

document
.getElementById("prevPhoto")
.addEventListener("click",previousChapterPhoto);
/* Auto Slideshow */

setInterval(()=>{

if(document.getElementById("chapter1").style.display==="flex"){

nextChapterPhoto();

}

},7000);
/* ==========================================
MOBILE SWIPE SUPPORT
========================================== */

let touchStartX = 0;
let touchEndX = 0;

const chapter1 = document.getElementById("chapter1");

chapter1.addEventListener("touchstart",(e)=>{

touchStartX = e.changedTouches[0].screenX;

});

chapter1.addEventListener("touchend",(e)=>{

touchEndX = e.changedTouches[0].screenX;

if(touchEndX < touchStartX-50){

nextChapterPhoto();

}

if(touchEndX > touchStartX+50){

previousChapterPhoto();

}

});
/* ==========================================
KEYBOARD SUPPORT
========================================== */

document.addEventListener("keydown",(e)=>{

if(document.getElementById("chapter1").style.display!=="flex") return;

if(e.key==="ArrowRight"){

nextChapterPhoto();

}

if(e.key==="ArrowLeft"){

previousChapterPhoto();

}

});
/* ==========================================
CONTINUE STORY
========================================== */

const continueStory =
document.getElementById("continueStory");

continueStory.onclick=function(){

    goToChapter(2);

}
/* =====================================================
CHAPTER 2 PHOTO ENGINE
===================================================== */

chapterNav.style.display = "flex";

const chapter2Background =
document.getElementById("chapter2Background");

const coupleCounter =
document.getElementById("coupleCounter");

let couplePhoto = 0;

function loadCouplePhoto(){

chapter2Background.style.opacity="0";

setTimeout(()=>{

chapter2Background.style.backgroundImage=
`url('${COUPLE_PHOTOS[couplePhoto]}')`;

chapter2Background.style.opacity="1";

coupleCounter.innerHTML=
`${String(couplePhoto+1).padStart(2,"0")} / ${COUPLE_PHOTOS.length}`;
document.getElementById("coupleCaption").innerHTML =
COUPLE_CAPTIONS[couplePhoto];

},400);

}

function nextCouplePhoto(){

couplePhoto++;

if(couplePhoto>=COUPLE_PHOTOS.length){

couplePhoto=0;

}

loadCouplePhoto();

}

function previousCouplePhoto(){

couplePhoto--;

if(couplePhoto<0){

couplePhoto=
COUPLE_PHOTOS.length-1;

}

loadCouplePhoto();

}

document
.getElementById("nextCouple")
.addEventListener("click",nextCouplePhoto);

document
.getElementById("prevCouple")
.addEventListener("click",previousCouplePhoto);

setInterval(()=>{

if(document.getElementById("chapter2").style.display==="flex"){

nextCouplePhoto();

}

},7000);
/* ==========================================
FAMILY GALLERY
========================================== */

const familyGallery =
document.getElementById("familyGallery");

function buildFamilyGallery(){

familyGallery.innerHTML="";

FAMILY_PHOTOS.forEach(photo=>{

const card = document.createElement("div");

card.className = "polaroid";

const img = document.createElement("img");

img.src = photo;

img.className = "memoryPhoto";
img.onclick = function(){

    currentViewerIndex = FAMILY_PHOTOS.indexOf(photo);

    viewerImage.src = FAMILY_PHOTOS[currentViewerIndex];

    viewer.classList.add("show");

}


const caption = document.createElement("div");

caption.className = "polaroidCaption";

caption.innerHTML = "Memories ❤️";

card.appendChild(img);

card.appendChild(caption);

familyGallery.appendChild(card);

});

}
/* ==========================================
CONTINUE TO CHAPTER 3
========================================== */
chapterNav.style.display = "flex";
const continueJourney =
document.getElementById("continueJourney");

continueJourney.onclick = function(){

    goToChapter(3);

}
/* ==========================================
PHOTO VIEWER
========================================== */

const viewer =
document.getElementById("photoViewer");

const viewerImage =
document.getElementById("viewerImage");

const closeViewer =
document.getElementById("closeViewer");

closeViewer.addEventListener("click",()=>{

viewer.classList.remove("show");
let currentViewerIndex = 0;

});
closeViewer.onclick = function(){

    viewer.classList.remove("show");

}
document.getElementById("viewerPrev").onclick = function(){

    currentViewerIndex--;

    if(currentViewerIndex < 0){

        currentViewerIndex = FAMILY_PHOTOS.length - 1;

    }

    viewerImage.src = FAMILY_PHOTOS[currentViewerIndex];

}
document.getElementById("viewerNext").onclick = function(){

    currentViewerIndex++;

    if(currentViewerIndex >= FAMILY_PHOTOS.length){

        currentViewerIndex = 0;

    }

    viewerImage.src = FAMILY_PHOTOS[currentViewerIndex];

}
/* ==========================================
CHAPTER NAVIGATION ENGINE
========================================== */

const chapterPrev = document.getElementById("chapterPrev");
const chapterNext = document.getElementById("chapterNext");

function goToChapter(number){
    // Lower background music only during Chapter 5
if(number === 5){
    music.volume = 0.09;   // Chapter 5 (people speaking)
}else{
    music.volume = 0.35;   // All other chapters
}

    if(number < 1) return;

    if(number > chapters.length) return;

    // Hide all chapters
chapters.forEach(chapter=>{

    chapter.style.display = "none";
    chapter.style.opacity = "0";

});

/* Pause every video except background music */
document.querySelectorAll("video").forEach(video => {

    video.pause();

    video.currentTime = 0;

});

    currentChapter = number;

    const activeChapter = chapters[currentChapter-1];

    activeChapter.style.display="flex";

    setTimeout(()=>{

        activeChapter.style.opacity="1";

    },50);

    // Load chapter content

   if(currentChapter===1){

    loadChapterPhoto();

}

if(currentChapter===2){

    loadCouplePhoto();

}

if(currentChapter===3){

    buildFamilyGallery();

}

if(currentChapter===4){

    buildWeddingGallery();

    setTimeout(()=>{

        const featured = document.getElementById("featuredVideo");

        if(featured){

            featured.play().catch(()=>{});

        }

    },300);

}

if(number === 5){
    document.body.style.overflow = "hidden";
}else{
    document.body.style.overflow = "hidden";
}

    chapterIndicator.innerHTML=`Chapter ${currentChapter} / 6`;

    chapterPrev.style.opacity=currentChapter===1?".4":"1";

    chapterNext.style.opacity = "1";

if(currentChapter === chapters.length){

    chapterNext.innerHTML = "↻ Restart";

}else{

    chapterNext.innerHTML = "Next ▶";

}
}

/* ==========================================
BOTTOM NAVIGATION
========================================== */

chapterPrev.onclick=function(){

    if(currentChapter>1){

        goToChapter(currentChapter-1);

    }

}

chapterNext.onclick = function(){

    if(currentChapter < chapters.length){

        goToChapter(currentChapter + 1);

    }else{

        // Restart from Chapter 1
        goToChapter(1);

        // Scroll to top
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        // Optional: restart background music
        // music.currentTime = 0;

    }

}
/* ==========================================
CHAPTER 4
========================================== */

const quotes=[

"Every frame tells our story.",

"You are still my favorite view.",

"Love lives in little moments.",

"Our forever started long before today.",

"I'd choose you in every lifetime.",

"Home has always been you.",

"Forever begins every time I look at you."

];

let quoteIndex=0;

function buildWeddingGallery(){

    const featured=document.getElementById("featuredVideo");

    featured.src=WEDDING_VIDEOS[0].file;

    const strip=document.getElementById("movieStrip");

    strip.innerHTML="";

    WEDDING_VIDEOS.slice(1).forEach(video=>{

        const card=document.createElement("div");

        card.className="movieThumb";

        card.innerHTML=`

        <video
        src="${video.file}"
        autoplay
        muted
        loop
        playsinline></video>

        `;

        card.onclick=function(){

            featured.style.opacity=0;

            setTimeout(()=>{

                featured.src=video.file;

                featured.play();

                featured.style.opacity=1;

            },350);

        }

        strip.appendChild(card);

    });

}
setInterval(()=>{

    quoteIndex++;

    if(quoteIndex>=quotes.length){

        quoteIndex=0;

    }

    const quote =
    document.getElementById("movieQuote");

    quote.style.opacity=0;

    quote.style.transform="translateY(25px)";

    setTimeout(()=>{

        quote.innerHTML=quotes[quoteIndex];

        quote.style.opacity=1;

        quote.style.transform="translateY(0)";

    },500);

},7000);
/*=========================================
CHAPTER 5
=========================================*/

let currentWish = 0;

const wishIntro = document.getElementById("wishIntro");
const gallery = document.getElementById("birthdayGallery");

const player = document.getElementById("birthdayPlayer");
const playerVideo = document.getElementById("birthdayVideo");
const playerName = document.getElementById("birthdayPerson");

const openSurprise =
document.getElementById("openBirthdaySurprise");

const closePlayer =
document.getElementById("closeBirthdayPlayer");

const nextWish =
document.getElementById("birthdayNext");

const prevWish =
document.getElementById("birthdayPrev");



/*==========================
BUILD GALLERY
==========================*/
function buildWishGallery(){
    

    gallery.innerHTML="";

    BIRTHDAY_WISHES.forEach((wish,index)=>{

        const card=document.createElement("div");

        card.className="wishCard";

        card.style.animationDelay=(index*0.12)+"s";

        card.innerHTML=`

        <video
    src="${wish.file}"
    muted
    preload="auto"
    playsinline
    controls
    onloadeddata="this.currentTime=0.1">
</video>

            <div class="wishName">

                ▶ ${wish.name}

            </div>

        `;

        card.onclick=function(){

            openWish(index);

        };

        gallery.appendChild(card);

    });

}



/*==========================
OPEN GALLERY
==========================*/

openSurprise.onclick=function(){

    openSurprise.disabled=true;

    openSurprise.innerHTML="Preparing your surprise... ❤️";

    setTimeout(function(){

        showBirthdayIntro();
    

    },800);
    

}



/*==========================
OPEN PLAYER
==========================*/

function openWish(index){

    currentWish=index;

   player.style.display="flex";
   window.scrollTo({
    top:0,
    behavior:"instant"
});

player.scrollTop = 0;

player.animate(

[

{

opacity:0,

transform:"scale(.94)"

},

{

opacity:1,

transform:"scale(1)"

}

],

{

duration:450,

fill:"forwards"

}

);

    loadWish();

}



/*==========================
LOAD CURRENT VIDEO
==========================*/

function loadWish(){

    const wish=BIRTHDAY_WISHES[currentWish];

    playerName.innerHTML=wish.name;

    playerVideo.src=wish.file;

    playerVideo.load();

    playerVideo.play();

}



/*==========================
CLOSE PLAYER
==========================*/

closePlayer.onclick=function(){

    playerVideo.pause();

    player.style.display="none";

}



/*==========================
NEXT
==========================*/

nextWish.onclick=function(){

    currentWish++;

    if(currentWish>=BIRTHDAY_WISHES.length){

        currentWish=0;

    }

    loadWish();

}



/*==========================
PREVIOUS
==========================*/

prevWish.onclick=function(){

    currentWish--;

    if(currentWish<0){

        currentWish=BIRTHDAY_WISHES.length-1;

    }

    loadWish();

}



/*==========================
AUTO NEXT
==========================*/

playerVideo.onended=function(){

    nextWish.click();

}



/*==========================
ESC TO CLOSE
==========================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        player.style.display="none";

        playerVideo.pause();

    }

});



/*==========================
ARROW KEYS
==========================*/

document.addEventListener("keydown",function(e){

    if(player.style.display!=="flex") return;

    if(e.key==="ArrowRight"){

        nextWish.click();

    }

    if(e.key==="ArrowLeft"){

        prevWish.click();

    }

});
let touchStart=0;

player.addEventListener(

"touchstart",

e=>{

touchStart=e.touches[0].clientX;

}

);

player.addEventListener(

"touchend",

e=>{

let end=e.changedTouches[0].clientX;

let diff=end-touchStart;

if(diff>80){

prevWish.click();

}

if(diff<-80){

nextWish.click();

}

});
function showBirthdayIntro(){

    wishIntro.style.display="none";

    const intro=document.getElementById("birthdayIntroScreen");

    intro.innerHTML=`

        <div class="introSequence">

            <h2 class="introText">

                Every person on this page...

            </h2>

        </div>

    `;

    intro.style.display="flex";

    setTimeout(function(){

        intro.innerHTML=`

            <div class="introSequence">

                <h2 class="introText">

                    has one thing in common...

                </h2>

            </div>

        `;

    },2500);

    setTimeout(function(){

        intro.innerHTML=`

            <div class="introSequence">

                <h1 class="introFinal">

                    ❤️ Happy Birthday ❤️

                    <br>

                    <span>Anamika</span>

                </h1>

            </div>

        `;

    },5000);

    setTimeout(function(){

        intro.style.display="none";

        buildWishGallery();

gallery.style.display = "grid";

document.querySelector(".chapter6Button").style.display = "flex";

    },8500);

}
/* ==========================================
CHAPTER 6
========================================== */

const letterLines = [

"<h2>My Dearest Anamika ❤️</h2>",

"<p>If someone ever asks me what the most beautiful decision of my life was...</p>",

"<p>I will simply smile...</p>",

"<p>Because it was the day you became part of my life.</p>",

"<p>Thank you for accepting me...</p>",

"<p>Thank you for trusting me...</p>",

"<p>Thank you for laughing with me...</p>",

"<p>Thank you for making every ordinary day extraordinary.</p>",

"<p>On your birthday I celebrate the day the world received someone who would one day become my greatest blessing.</p>",

"<p>I promise to stand beside you through every happiness, every challenge, every dream and every tomorrow.</p>",

"<h2>❤️ Happy Birthday ❤️</h2>",

"<h3>Forever Yours,<br>Manoj</h3>"

];

startLetter.onclick = function(){

    startLetter.style.display = "none";

    loveLetter.style.display = "block";

    document.getElementById("chapter6").scrollTop = 0;

    loveLetter.innerHTML = "";
    const chapter6 = document.getElementById("chapter6");

chapter6.scrollTo({
    top: chapter6.scrollHeight,
    behavior: "smooth"
});

    let i = 0;

    function nextLine(){

        if(i >= letterLines.length){

    document.getElementById("birthdayCakeSection").style.display="block";

    return;

}

        const div = document.createElement("div");

        div.className = "letterLine";

        div.innerHTML = letterLines[i];

       loveLetter.appendChild(div);

/* Auto Scroll Chapter 6 */
const chapter6 = document.getElementById("chapter6");

setTimeout(() => {

    chapter6.scrollTo({
        top: chapter6.scrollHeight,
        behavior: "smooth"
    });

},100);

i++;

setTimeout(nextLine,1200);

    }

    nextLine();

};
document
.getElementById("continueFinalChapter")
.onclick = function(){

    goToChapter(6);

};
/*=================================
FINAL ENDING
=================================*/

const blowButton=document.getElementById("blowCandles");

blowButton.onclick=function(){

    // extinguish flame
    document.querySelector(".flame").style.display="none";

    // disable button
    blowButton.disabled=true;

    blowButton.innerHTML="✨ Wish Sent";

    // small delay

    setTimeout(function(){

        confetti({

            particleCount:250,

            spread:180,

            origin:{y:0.55}

        });

    },400);

    setTimeout(function(){

        document.getElementById("birthdayEnding").style.display="flex";

    },1800);

}
window.addEventListener("DOMContentLoaded", function () {

    const blowButton = document.getElementById("blowCandles");
    const flame = document.querySelector(".flame");
    const birthdayEnding = document.getElementById("birthdayEnding");
    const birthdayCake = document.getElementById("birthdayCake");

    if(!blowButton || !flame || !birthdayEnding || !birthdayCake){
        return;
    }

    birthdayEnding.style.display = "none";

    blowButton.addEventListener("click", function(){

        flame.style.opacity = "0";

        blowButton.disabled = true;
        blowButton.innerHTML = "✨ Wish Made";

        setTimeout(function(){

            birthdayCake.style.display = "none";
            blowButton.style.display = "none";

        },800);

        setTimeout(function(){

            birthdayEnding.style.display = "flex";

        },1600);

    });

});