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