(function (){
    "use strict";

    console.log("Reading JS");

    const myForm = document.querySelector('form');
    const madlib = document.querySelector('#madlib');
    const formData = document.querySelectorAll('input[type=text]');
    const playOverlay = document.querySelector('#greenOverlay');

    myForm.addEventListener('submit', function(e){
        e.preventDefault();
        processFormData(formData);
        myForm.className = 'formOverlay';
        playOverlay.className = 'overlay';
        console.log(myForm.className);
    });

    function processFormData(formData){
        const emptyfields = [];
        let counter = 0;
        const words = [];

        for(const eachWord of formData){
            if(eachWord.value){
                words.push(eachWord.value);
            } else {
                emptyfields.push(counter);
            }
            counter++;
        }

        if (emptyfields.length > 0){
            showErrors(formData, emptyfields);
        } else {
            makeMadLib(words);
        }
    };

    function showErrors(formData, emptyfields){
        const errorId = formData[emptyfields[0]].id;
        //const errorText = `Please fill out field ${errorId}`;
        //madlib.innerHTML = errorText;
        document.querySelector(`#${errorId}`).focus();
    }

    function makeMadLib (words){
        const myText = `<h1>Your MadLib</h1>
        <p>
            After graduating from college where I studied <span>${words[0]}</span>, I was excited to see what post-grad life would be for me! The first thing I wanted to do was find a <span>${words[1]}</span> job. I had no idea that post-grad would be full of <span>${words[2]}</span> challenges, and <span>${words[3]}</span>. Do not even get me started on how many <span>${words[4]}</span> I saw.
        <br>
        <br>
            My day usually starts with waking up at <span>${words[5]}</span>, grabbing my coffee, and saying, <span>${words[6]}</span>! before heading out the door. My current job as a <span>${words[7]}</span> is definitely <span>${words[8]}</span>, but I am grateful because at least I no longer have to pull all-nighters.
        <br>
        <br>
            In my free time, I try to stay healthy by <span>${words[9]}</span> and eating lots of <span>${words[10]}</span>. Sometimes I still miss college, especially my favorite <span>${words[11]}</span> and the spontaneous <span>${words[12]}</span>.
        <br>
        <br>
            Recently, I realized that adulting is just a series of <span>${words[13]}</span>, but with the right <span>${words[14]}</span>, I will figure things out. Though it is an adjustment, I am so excited for this next chapter of my life!
        </p>`;
        madlib.innerHTML = myText;

        for(const eachField of formData){
            eachField.value = '';
        }
    }
})();