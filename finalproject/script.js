window.addEventListener('load', function(){
    "use strict";

    console.log("reading JS");

    const sections = document.querySelectorAll('section');
    const headerP = document.querySelector('header p');
    let sectionTops = [];
    let pageTop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;


    sections.forEach(function (eachSection){
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    })

    console.log(sectionTops);

    document.getElementById('scrollButton').addEventListener('click', function() {
        // Scroll to the next section
        const nextSection = document.getElementById('section2');
        nextSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    const backgroundMusic = document.querySelector('#backgroundMusic');
    const playMusicButton = document.querySelector('#playMusicButton');
    playMusicButton.addEventListener('click', function () {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playMusicButton.textContent = 'Pause Music'; // Update button text
            console.log("music played");
        } else {
            backgroundMusic.pause();
            playMusicButton.textContent = 'Play Music'; // Update button text
            console.log("music paused");
        }
    });

    const stonehenge = document.getElementById("stonehenge");

    stonehenge.addEventListener("click", function(){
        console.log("stonehenge clicked");

        stonehenge.classList.toggle("on");
    });

    const egyptian = document.getElementById("egyptian");

    egyptian.addEventListener("click", function(){
        console.log("egyptian clicked");

        egyptian.classList.toggle("on");
    });

    const romanBaths = document.getElementById("roman-baths");

    romanBaths.addEventListener("click", function(){
        console.log("roman-baths clicked");

        romanBaths.classList.toggle("on");
    });

    const fort = document.getElementById("fort");
    fort.addEventListener("click", function(){
        console.log("fort clicked");

        fort.classList.toggle("on");
    });

    const temple = document.getElementById("temple");
    temple.addEventListener("click", function(){
        console.log("temple clicked");

        temple.classList.toggle("on");
    });

    const globe = document.getElementById("globe");
    globe.addEventListener("click", function(){
        console.log("globe clicked");

        globe.classList.toggle("on");
    });

    const football = document.getElementById("football");
    football.addEventListener("click", function(){
        console.log("football clicked");

        football.classList.toggle("on");
    });


    window.addEventListener('scroll', function () {
        pageTop = window.scrollY;

        if (pageTop > sectionTops[counter]) {
            counter++;
        }
        else if (counter > 1 && pageTop < sectionTops[counter - 1]) {
            counter--;
        }
        if (counter != prevCounter) {

            
            const style = `bgcolor${counter}`;
            this.document.querySelector('body').className = style;
            console.log(counter);

            //need to figure out how to put all sections into an array and then call them based on counter
            for (const eachPost of sections){
                eachPost.className = 'offscreen';
            }

            let myInterval;

            if (counter != 4){
                document.getElementById('egyptian').className = 'offscreen';
                document.getElementById('roman-baths').className = 'offscreen';
            }

            if (counter === 4){
                document.getElementById('egyptian').className = 'animateEgypt';
                document.getElementById('roman-baths').className = 'animateRoman';
                console.log(document.getElementById('roman-baths').className);
            };

            if (counter != 6){
                document.getElementById('fort').className = 'offscreen';
                document.getElementById('temple').className = 'offscreen';
            }
            
            if (counter === 6){
                console.log('section 6 reached and if entered');
                document.getElementById('fort').className = 'animateFort';
                document.getElementById('temple').className = 'animateTemple';
            }
            document.querySelector(`#section${counter}`).className = `animate${counter}`;
            
            // reset the counter for the next section...
            prevCounter = counter;

        }
    });
});