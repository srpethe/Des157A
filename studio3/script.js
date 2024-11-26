(function(){
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const rules = document.querySelector('#rules');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const body = document.querySelector("body");
    const playArea = document.querySelector('#playArea');
    const gameStartAudio = new Audio('audio/startSound.mp3');
    const gameWinAudio = new Audio('audio/winningSound.mp3');

    const gameData = {
        dice: ['images/1die.png', 'images/2die.png', 'images/3die.png', 'images/4die.png', 'images/5die.png', 'images/6die.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){
        body.className = "rulesView";
        gameControl.innerHTML = '';
        rules.className = 'on';
        playArea.className = 'on';

        setUpRules();

        setUpForm();

        gameStartAudio.play();

        console.log("set up the turn");
    });

    function setUpRules(){
        console.log('rules was entered');
        rules.innerHTML = `<h1>Game of PIG</h1>
        <p>There are two players. The player whose turn it is rolls the dice. The total of the roll is added to the current player's score, unless either die comes up as a 'one'. If this happens, this player's turn is over, and it is the other player’s turn.</p>
        <p>After each roll, the current player can either roll again, (assuming a 'one' was not rolled) or if the current player feels that luck is running thin, they can pass to the other player. The first player to get 30 points or higher wins.</p>
        <p>Oh, and if you roll two 'ones' (snake eyes), your current score gets zeroed out. So don’t do that.</p>
        <button id='quitting' class='ruleButtons'>I want out</button>`;

        document.querySelector('#quitting').addEventListener("click", function(){
            location.reload();
        });
    };

    function setUpForm(){

        actionArea.innerHTML = "<h1>Let's Set Up</h1>";

        // Create the form element
        const form = document.createElement("form");

        // Create input fields
        const player1NameLabel = document.createElement("label");
        player1NameLabel.setAttribute("for", "player1name");
        player1NameLabel.textContent = "Player One, Enter Your Name:";
        const player1NameInput = document.createElement("input");
        player1NameInput.setAttribute("type", "text");
        player1NameInput.setAttribute("id", "player1name");
        player1NameInput.setAttribute("name", "player1name");
        player1NameInput.setAttribute("placeholder", "Enter your name");
        player1NameInput.required = true;

        const player2NameLabel = document.createElement("label");
        player2NameLabel.setAttribute("for", "player2name");
        player2NameLabel.textContent = "Player Two, Enter Your Name:";
        const player2NameInput = document.createElement("input");
        player2NameInput.setAttribute("type", "text");
        player2NameInput.setAttribute("id", "player2name");
        player2NameInput.setAttribute("name", "player2name");
        player2NameInput.setAttribute("placeholder", "Enter your name");
        player2NameInput.required = true;

        // Create a submit button
        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("id", "playing");
        submitButton.textContent = "Let's Play";

        // Append elements to the form
        form.appendChild(player1NameLabel);
        form.appendChild(player1NameInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(player2NameLabel);
        form.appendChild(player2NameInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(submitButton);

        // Append the form to the container
        actionArea.appendChild(form);


        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from reloading the page
            
            // Save the names for further game logic if needed
            gameData.players[0] = player1NameInput.value.trim();
            gameData.players[1] = player2NameInput.value.trim();

            console.log(gameData.players[0] + gameData.players[1]);

            gameData.index = Math.round(Math.random());
            console.log(gameData.index);
            setUpTurn();
        });
    };

    function setUpTurn(){
        actionArea.innerHTML = '';
        actionArea.innerHTML = `<p> ${gameData.players[gameData.index]}, roll the dice </p>
        <button id="roll"> Roll the dice</button>`;
        document.querySelector('#roll').addEventListener("click", function(){
            throwDice();
        });
    };

    function throwDice(){
        gameData.roll1 = (Math.floor(Math.random()*6)) + 1;
        gameData.roll2 = (Math.floor(Math.random()*6)) + 1;

        if (gameData.roll1 === 1 && gameData.roll2 === 1) {
            // Display special images for snake eyes
            actionArea.innerHTML = `<p>Oh snap! You rolled snake eyes!</p>`;
            actionArea.innerHTML += `<img class="dice" src="images/snake.png" alt="Snake Eye 1">
                                     <img class="dice" src="images/snake.png" alt="Snake Eye 2">`;
    
            gameData.score[gameData.index] = 0; // Reset score
            gameData.index = gameData.index ? 0 : 1; // Switch players
            setTimeout(setUpTurn, 4000); // Wait before switching turn
        } else {
            // Display regular dice images
            actionArea.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
            actionArea.innerHTML += `<img class="dice" src="${gameData.dice[gameData.roll1 - 1]}" alt="Die 1">
                                     <img class="dice" src="${gameData.dice[gameData.roll2 - 1]}" alt="Die 2">`;
    
            gameData.rollSum = gameData.roll1 + gameData.roll2;
    
            // Handle other cases (e.g., rolling one "1" or no "1"s)
            if (gameData.roll1 === 1 || gameData.roll2 === 1) {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                actionArea.innerHTML += `<p>Sorry, one of your rolls was a 1. Switching to ${gameData.players[gameData.index]}</p>`;
                setTimeout(setUpTurn, 4000);
            } else {
                gameData.score[gameData.index] += gameData.rollSum;
                actionArea.innerHTML += `<button id='rollagain'>Roll Again</button> or 
                                          <button id='pass'>Pass</button>`;
                document.querySelector('#rollagain').addEventListener('click', setUpTurn);
                document.querySelector('#pass').addEventListener('click', function() {
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    setUpTurn();
                });
            }
        }
        checkWinningCondition();
    };

    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd){
            gameWinAudio.play();
            score.innerHTML = `<p>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!!! </p>
            <button id='restart' class='ruleButtons'>Start a new game?</button>`;
            actionArea.innerHTML = '';

            document.querySelector('#restart').addEventListener("click", function(){
                location.reload();
            });
        } else {
            score.innerHTML = `<p>The score is currently <strong> ${gameData.players[0]}: ${gameData.score[0]} </strong> and 
                                <strong> ${gameData.players[1]}: ${gameData.score[1]} </strong> </p>`;
        }
    };
})();