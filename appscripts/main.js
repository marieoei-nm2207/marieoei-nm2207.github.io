// div variables
let mainDiv = document.getElementById("mainDiv");
let mainText = document.getElementById("h1Text");
let content = document.getElementById("content");
let buttonContainer = document.getElementById("buttonContainer");

// button variables
let yesButton = document.createElement("button");
let noButton = document.createElement("button");
let endButton = document.createElement("button");

// game button variables
let game1 = document.createElement("button");
let game2 = document.createElement("button");
let game3 = document.createElement("button");
game1.className = "gbutton";
game2.className = "gbutton";
game3.className = "gbutton";
game1.innerHTML = "Game 1";
game2.innerHTML = "Game 2";
game3.innerHTML = "Game 3";

// home locations variables
let home1 = document.createElement("button"); // Moonlit Marshes - alert "You either got the wrong home or the wrong code!"
let home2 = document.createElement("button"); // Wailing Waterfalls - "You either got the wrong home or the wrong code!"
let home3 = document.createElement("button"); // Crystal Cavern - alert "Blob: Thanks for bringing me home! Sorry for the trouble... Hope you had fun though!"
// hints consist of: "It looks cool; 2", "Your socks probably won't get soggy; 0", "Watch your head. 7"
home1.className = "hbutton";
home2.className = "hbutton";
home3.className = "hbutton";
home1.innerHTML = "Moonlit Marshes";
home2.innerHTML = "Wailing Waterfalls";
home3.innerHTML = "Crystal Cavern";

let chooseHomeButton = document.createElement("button");

// lower text variables (click to continue)
let lowerText = document.getElementById("click2ContDiv");
let secText = document.getElementById("click2Cont");

// blob
const blob = new Image(150, 150);
/* credit to cactusturtle.itch.io for the blob */
blob.src = "https://img.itch.zone/aW1hZ2UvODE2MTk0LzQ1OTgzNDIuZ2lm/x200/vHKsMo.gif";
blob.id = "blob";
/* appendChild in relevant functions */

// blobName text input
const blobName = document.createElement("input");
blobName.type = "text";
blobName.className = "textInput";
blobName.placeholder = "Enter a name for the blob (3-8 characters)";
blobName.style.fontSize = "16px";

// note and message variables
let note = document.createElement("div");
note.className = "note";
/* note.style.display = "none"; */
let noteMessage = document.createElement("p");

function defaultNote() {
    noteMessage.className = "message";
    noteMessage.innerHTML = "A guide to home:" + "<br>" + "<br>" + "1. Complete three mini games"+ "<br>" + 
                            "2. Get clues and numbers that form a code for the location from the games" + "<br>" + 
                            "3. Choose the location that you think is the home and enter the code"
                            + "<br>" + "<br>" + "Press and hold '/' to see the guide again.";
    note.style.backgroundColor = "rgb(120, 75, 19)";
    noteMessage.style.textAlign = "left";
    noteMessage.style.fontSize = "16px";
    noteMessage.style.margin = "5%";
}


let gameState = 0;

// initial click event listener to change text
mainDiv.addEventListener('click', function(){
    if (gameState == 0) {
        mainText.innerHTML = "Is this your first time in this forest?";

        yesButton.className = "button";
        yesButton.innerHTML = "Yes";
        yesButton.onclick = function () {
            /* console.log("yesButton is clicked"); */
            yesButtonClicked();
        };
        buttonContainer.appendChild(yesButton);

        noButton.className = "button";
        noButton.innerHTML = "No";
        noButton.onclick = function () {
            noButtonClicked();
            /* console.log("noButton is clicked"); */
        };
        buttonContainer.appendChild(noButton);

        secText.remove();
    }
})

// clicking the no button
function noButtonClicked() {
    mainText.innerHTML = "Well then, this won't be much fun for you." + "<br>" + "Maybe find something better to do with your time than enter this forest again."
    mainText.style.fontSize = "36px";

    yesButton.remove();
    noButton.remove();

    endButton.className = "button";
    endButton.id = "buttonToHome";
    endButton.innerHTML = "Leave";

    endButton.addEventListener('click', function(){
        mainText.innerHTML = "Goodbye, Adventurer.";
        endButton.remove();

        let plsRef = document.createElement("p");
        plsRef.id = "click2Cont";
        plsRef.innerHTML = "Please refresh the page if you want to try again.";
        lowerText.appendChild(plsRef);

        gameState = 1;
        /* console.log("endButton is clicked"); */
    });
    buttonContainer.appendChild(endButton);
}

// click the yes button
function yesButtonClicked() {
    mainText.innerHTML = "Welcome once again." + "<br>" + "As an adventurer, you'll wander through this forest and explore.";

    yesButton.remove();
    noButton.remove();

    lowerText.appendChild(secText);

    gameState = 1;
    
    // introducing the blob
    mainDiv.addEventListener('click', function(){
        if (gameState == 1) {
            mainText.innerHTML = "Oh look!" + "<br>" + "A blob has appeared and it seems lost." + "<br>";
            secText.innerHTML = "Try clicking on the blob.";
            /* console.log("try clicking on blob"); */
            mainText.style.fontSize = "36px";
            content.appendChild(blob); 
            
            clickBlob1();
            gameState = 2;
        }
    }); 
}

// function to name the blob
function clickBlob1() {

    // when player clicks the blob, the text will change and ask them to key in a name
    blob.addEventListener('click', function(){

        if (gameState == 2) {
            gameState = 3;
            mainText.innerHTML = "Why don't you name the blob so we can stop calling it a blob?";
            secText.innerText = "Hit 'Enter' to continue.";
            /* console.log("hit enter"); */

            content.appendChild(blobName);
            content.appendChild(blob);

            // name will be printed in the innerHTML
            blobName.addEventListener("keypress", function(e) {
                if (e.keyCode === 13 && blobName.value.length >= 3 && blobName.value.length <= 8) {
                    mainText.innerHTML = blobName.value + " -- interesting name.";
                    secText.innerHTML = "Click to continue.";
                    blobName.remove();
                    clickBlob2();
                } 
            });
        } 
    });      
}

// function to change text saying there's a note
function clickBlob2() {
    blob.addEventListener('click', function(){
        if (gameState == 3) {
            gameState = 4;
            
            mainText.innerHTML = "Looks like there's a note on " + blobName.value + ".";
            secText.innerHTML = "Try clicking on " + blobName.value + ".";   

            // event listener to show the message on the note
            blob.addEventListener('click', function(){
                blob.remove();
                
                content.appendChild(note);
                note.appendChild(noteMessage);
                defaultNote();
                secText.innerHTML = "Click the note to close and continue.";
                
                note.addEventListener('click', function(){
                    noteMessage.remove();
                    note.remove();

                    clickBlob3();
                });
            });
        }
    });
}

// event listener to show the guide again
document.body.addEventListener('keydown', function(e){
    if (e.keyCode == 191) {
        content.appendChild(note);
        note.appendChild(noteMessage);
        game1.style.display = "none";
        game2.style.display = "none";
        game3.style.display = "none";
    }
});
document.body.addEventListener('keyup', function(e){
    if (e.keyCode == 191) {
        noteMessage.remove();
        note.remove();

        game1.style.display = "inline-block";
        game2.style.display = "inline-block";
        game3.style.display = "inline-block";
    }
});

// implementing the game buttons
function clickBlob3() {
    mainDiv.addEventListener('click', function(){
        if (gameState == 4) {
            gameState = 5;

            mainText.innerHTML = "I guess we have to play some games now..." + "<br>" + "(Get a pen and paper to write down the clues.)";
            secText.innerHTML = "Choose a game.";

            playGames();
            chooseHome();
        }
    });
}

function chooseHome() {
    if (game1.style.backgroundColor === "rgb(116, 140, 124)" && game2.style.backgroundColor === "rgb(116, 140, 124)" && 
    game3.style.backgroundColor === "rgb(116, 140, 124)") {
        gameState = 9;
    
        playGames();
        content.appendChild(chooseHomeButton);
        chooseHomeButton.innerHTML = "Choose Home";
        chooseHomeButton.id = "chooseHomeButton";
        mainText.innerHTML = "Time to choose " + blobName.value + "'s home.";
        secText.innerHTML = "You can play the games again if you forgot the clues.";
        document.body.style.backgroundImage = "url('./resources/forestBG.jpg')";
        document.body.style.backgroundSize = "cover";
    }
}

// function to append the game buttons
function playGames() {
    buttonContainer.appendChild(game1);
    buttonContainer.appendChild(game2);
    buttonContainer.appendChild(game3);
}

chooseHomeButton.addEventListener('click', function() {
    if (gameState == 9) {
        gameState = 10;
        game1.remove();
        game2.remove();
        game3.remove();
        buttonContainer.appendChild(home1);
        buttonContainer.appendChild(home2);
        buttonContainer.appendChild(home3);
        chooseHomeButton.remove();

        secText.innerHTML = "";
    }
});

// code input
const code = document.createElement("input");
code.type = "text";
code.className = "textInput";
code.id = "codeInput";
code.placeholder = "Enter the code";
code.maxLength = 3; 

home1.addEventListener('click', function(){
    gameState = 11;
    home1.remove();
    home2.remove();
    home3.remove();

    document.body.style.backgroundImage = "url('./resources/moonlitmarsh.png')";
    document.body.style.backgroundSize = "cover";

    mainText.innerHTML = "Moonlit Marsh";
    secText.innerHTML = "Hit 'Enter' to submit.";

    content.appendChild(code);

    code.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 && code.value.length === 3 && code.value === "207" && gameState == 11) {
            window.alert("You either got the wrong home or the wrong code!");
            code.remove();
            code.value = "";
            gameState = 4;
            chooseHome();
        } 
        else if (e.keyCode === 13 && code.value.length === 3 && code.value !== "207" && gameState == 11) {
            window.alert("You either got the wrong home or the wrong code!");
            code.remove();
            code.value = "";
            gameState = 4;
            chooseHome();
        }
    });
    
});

home2.addEventListener('click', function(){
    gameState = 12;
    home1.remove();
    home2.remove();
    home3.remove();

    document.body.style.backgroundImage = "url('./resources/wailingwaterfall.png')";
    document.body.style.backgroundSize = "cover";

    mainText.innerHTML = "Wailing Waterfall";
    secText.innerHTML = "Hit 'Enter' to submit.";

    content.appendChild(code);

    code.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 && code.value.length === 3 && code.value === "207" && gameState == 12) {
            window.alert("You either got the wrong home or the wrong code!");
            code.remove();
            code.value = "";
            gameState = 4;
            chooseHome();
        } 
        else if (e.keyCode === 13 && code.value.length === 3 && code.value !== "207" && gameState == 12) {
            window.alert("You either got the wrong home or the wrong code!");
            code.remove();
            code.value = "";
            gameState = 4;
            chooseHome();
        }
    });
    
});

home3.addEventListener('click', function(){
    gameState = 13;
    home1.remove();
    home2.remove();
    home3.remove();

    document.body.style.backgroundImage = "url('./resources/crystalcavern.png')";
    document.body.style.backgroundSize = "cover";

    mainText.innerHTML = "Crystal Cavern";
    secText.innerHTML = "Hit 'Enter' to submit.";

    content.appendChild(code);

    code.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 && code.value.length === 3 && code.value === "207" && gameState == 13) {
            mainText.innerHTML = blobName.value + ' says, "Thanks for bringing me home! Sorry for the trouble... Hope you had fun though!"';
            mainText.style.marginTop = "120px";
            
            secText.innerHTML = "The End." + "<br>" + "Thanks for playing!";
            secText.style.fontSize = "24px";
            secText.style.bottom = "100px"
            code.remove();
        } 
        else if (e.keyCode === 13 && code.value.length === 3 && code.value !== "207" && gameState == 13) {
            window.alert("You either got the wrong home or the wrong code!");
            code.remove();
            code.value = "";
            gameState = 4;
            chooseHome();
        }
    });
});

// ------- GAME 1 - colour match
// gamestate = 6;
const inputRed = document.getElementById("rValue");
const inputGreen = document.getElementById("gValue");
const inputBlue = document.getElementById("bValue");

let rgbText = document.getElementsByClassName("rgbText");
let rgbValues = document.getElementById("rgbValues");
let rgbBGOri = document.getElementById("rgbBGOri");
/* let rgbBGMatch = document.getElementById("rgbBGMatch"); */
let rgbBG = document.getElementById("rgbBG");

let rgbSection = document.getElementById("rgbSection");

let rSlider = document.querySelector("#rValue");
let gSlider = document.querySelector("#gValue");
let bSlider = document.querySelector("#bValue");

let submitColour = document.createElement("button");
submitColour.className = "button";
submitColour.innerHTML = "Submit";
submitColour.style.marginTop = "2%";
submitColour.style.marginBottom = "0";

let rgbSucceeded = [];

let rColour, gColour, bColour;

function generateRandomColour() {
    rColour = Math.floor(Math.random()*255); 
    gColour = Math.floor(Math.random()*255); 
    bColour = Math.floor(Math.random()*255); 
    rgbBGOri.style.backgroundColor = "rgb("+rColour+","+gColour+","+bColour+")";
    console.log("rgb("+rColour+","+gColour+","+bColour+")");
}

game1.addEventListener('click', function(){
    gameState = 6;

    game1.remove();
    game2.remove();
    game3.remove();

    if (chooseHomeButton) {
        chooseHomeButton.remove();
    }

    mainText.innerHTML = "Match the colour of the box on the right to the one on the left 3 times.";
    mainText.style.fontSize = "20px";
    secText.innerHTML = "Move the sliders to change the colour.";

    content.appendChild(rgbSection);
    rgbSection.style.display = "flex";
    content.appendChild(submitColour);

    generateRandomColour();
})

function rgbSlider() {
    rgbBG.style.backgroundColor = "rgb("+rSlider.value+","+gSlider.value+","+bSlider.value+")";
    rgbValues.innerHTML = "RGB (" + rSlider.value+", "+gSlider.value+", "+bSlider.value+")";
}

submitColour.addEventListener('click', function(){
    if (Math.abs(rSlider.value - rColour) <= 10 &&
        Math.abs(gSlider.value - gColour) <= 10 &&
        Math.abs(bSlider.value - bColour) <= 10){
            window.alert("Good job! " + "(" + (2-rgbSucceeded.length) + " more)");
            rgbSuccess();
            generateRandomColour();
            rgbBG.style.backgroundColor = "rgb(0,0,0)";
    }
    else {
        alert("Try again!");
    }
});

function rgbSuccess() {
    /* console.log("rgb success"); */
    rgbSucceeded.push("rgbSuccess");

    rSlider.value = 0;
    gSlider.value = 0;
    bSlider.value = 0;
    rgbValues.innerHTML = "RGB (" + rSlider.value+", "+gSlider.value+", "+bSlider.value+")";

    if (rgbSucceeded.length == 3) {
        rgbSection.style.display = "none";
        submitColour.remove();
        rgbSucceeded = [];
        rgbBG.style.backgroundColor = "rgb(0,0,0)";

        mainText.innerHTML = "Here's your clue and number.";
        mainText.style.fontSize = "36px";
        secText.innerHTML = "Click on the note to continue.";

        clue1();
    }
}

function clue1() {
    content.appendChild(note);
    note.appendChild(noteMessage);
    note.style.backgroundColor = "rgb(51, 102, 14)";
    note.style.color = "rgb(130, 95, 0)";
    noteMessage.innerHTML = "watch your head." + "<br>" + "<br>" + "7";
    noteMessage.style.textAlign = "center";
    noteMessage.style.fontSize = "24px";
    noteMessage.style.margin = "auto";

    /* console.log("clue 1 printed"); */

    closeClue1();
}

function closeClue1() {
    note.addEventListener('click', function(){
        gameState = 4;
        clickBlob3();
        game1.style.backgroundColor = "rgb(116, 140, 124)";
        game1.style.color = "white";
        defaultNote();
    });
}


// ------- GAME 2 - play the keys according to the music
let game2Over;
let mainPiano = document.getElementById("mainPiano");
/* mainPiano.style.display = "none"; */
let listen = document.createElement("button");
    listen.className = "button";
    listen.id = "lisbutton";
    listen.innerHTML = "Listen";

// creating the function for game 2 whereby clicking the button will produce piano keys
game2.addEventListener('click', function(){    
    gameState = 7;
    game2Over = false;

    content.appendChild(listen);
    listen.style.marginBottom = "-30px";
    mainPiano.style.marginBottom = "0";
    mainPiano.style.display = "block"; 
    content.appendChild(mainPiano);

    game1.remove();
    game2.remove();
    game3.remove();

    if (chooseHomeButton) {
        chooseHomeButton.remove();
    }

    mainText.innerHTML = "Click on 'Listen' to listen to a short tune." + "<br>" + "Imitate the tune correctly to get a clue and a part of the code.",
    mainText.style.fontSize = "18px";
    secText.innerHTML = "If you press 5 keys wrongly, there will be a reset." + "<br>" 
                        + "If you need to hear the keyboard, refer to <a href='https://carolinegabriel.com/demo/js-keyboard/' target='_blank'>this link</a>.";
       
    listen.addEventListener('click', function() {
        listenToTune();
    });

    if (game2Over == false) {
        keyTune();
    }
    else if (game2Over == true) {
        game2Over = false;
        keyTune();
    }
});

// creating an array of the keys i want played for the tune
const pianoAudio = [72, 79, 85, 83, 69];

// function to play the short tune
function listenToTune() {
    
    let delay = 0;
  
    pianoAudio.forEach((key) => { // key as a variable to represent the keycode number aka the numbers in pianoAudio array
        setTimeout(() => {
            // keyboardEvent to simulate keys being pressed
            const event = new KeyboardEvent('keydown', { keyCode: key }); // keyCode property represents whether a specific key is pressed or released
            // calling playNote() so the keys are played and audio can be heard
            playNote(event);
        }, delay);
      
        // sets the delay time between each key played
        delay += 500; 
    });
}

// declaring an empty array to store the user's key presses
let userKeys = [];

function keyTune() {
    window.addEventListener('keydown', function(e){
        if (gameState == 7 && game2Over == false) { 
            e.stopImmediatePropagation(); // stops the keydown from being fired twice
            playNote(e);
            
            // store the key code in the userKeys array
            userKeys.push(e.keyCode);
                        
            // compare the user's key presses to the correct sequence
            if (userKeys.length === pianoAudio.length && userKeys.every((value, index) => value === pianoAudio[index])) {           
                
                mainPiano.style.display = "none";
                listen.remove();

                mainText.innerHTML = "Here's your clue and number.";
                mainText.style.fontSize = "36px";
                secText.innerHTML = "Click on the note to continue.";
                game2Over = true;
                userKeys = [];
                
                clue2();

            } else if (userKeys.length === pianoAudio.length && userKeys.some((value, index) => value !== pianoAudio[index])) {
                // if the user's key presses do not match the correct sequence, reset the userKeys array
                window.alert("Try again.");
                userKeys = [];
            }
        }
    });
}

function playNote(e){
    console.log("playNote is triggered! e.keyCode is "+ e.keyCode);
  
    //keycode is a number eg 65. but what are the ids of the audio elements in index.html like?
    let pianoKey = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  
    //use getAttribute() to get the attribute of an HTML element, e.g. the note which is being played.
    if (pianoKey != null) {
        let audio = new Audio(pianoKey.getAttribute("src"));  
        
        audio.currentTime=0;
        audio.play();
    }  
}

function clue2() {
    // if the user's key presses match the correct sequence, show the clue and number 
    content.appendChild(note);
    note.appendChild(noteMessage);
    note.style.backgroundColor = "rgb(51, 102, 14)";
    note.style.color = "rgb(130, 95, 0)";
    noteMessage.innerHTML = "It looks cool;" + "<br>" + "<br>" + "2";
    noteMessage.style.textAlign = "center";
    noteMessage.style.fontSize = "24px";
    noteMessage.style.margin = "auto";

    /* console.log("clue 2 printed"); */

    closeClue2();
}

function closeClue2() {
    note.addEventListener('click', function(){
        gameState = 4;
        clickBlob3();
        game2.style.backgroundColor = "rgb(116, 140, 124)";
        game2.style.color = "white";
        defaultNote();
    })
}

// ------- GAME 3 - collect/sort out the berries
// have a timer event, maybe 20 seconds; player has to collect 25 berries within the timing
// when timer runs out and the game is uncompleted, reset
// Fruit Catch Game: https://www.youtube.com/watch?v=sDlrNT0myIo, https://www.youtube.com/watch?v=UdSVPgNkOyU
let startGame3 = document.createElement("button");
startGame3.className = "button";
startGame3.id = "g3StartButton";
startGame3.innerHTML = "Start";

// timer for timeout - needed in order to clear it
let timer = document.createElement("p");
let timeLeft = 20;

// keeping track of score
let score = 0;

let game3Over = false;

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d"); // context of canvas
canvas.width = mainDiv.offsetWidth; // gets the width of mainDiv
canvas.height = mainDiv.offsetHeight; // gets the height of mainDiv
const canvasBack = document.getElementById("canvasBack");
const ctxBack = canvasBack.getContext("2d");
canvasBack.width = mainDiv.offsetWidth;
canvasBack.height = mainDiv.offsetHeight;

let berries = []; // creating multiple berries, setting to an empty array
let basket = [];

game3.addEventListener("click", function () {
	gameState = 8;

	game1.remove();
	game2.remove();
	game3.remove();

    if (chooseHomeButton) {
        chooseHomeButton.remove();
    }
    if (game3Over == true) {
        game3Over = false;
    }
    if (gameState != 8) {
        gameState = 8;
    }

	playBerriesIntro();
});

function playBerriesIntro() {
    gameState = 8.1;

	mainText.innerHTML = blobName.value + " is hungry." + "<br>" + "Catch some berries for him but be sure to avoid the poisonous ones." + "<br>" + "(Hint: The poisonous ones are a little darker)";
	secText.innerHTML = "Collect 25 berries in 20 seconds." + "<br>" + "If time runs out before you succeed, there will be a reset." + "<br>" + "Move the basket, by moving your cursor, to collect the berries.";
	secText.style.marginBottom = "180px";
	secText.style.marginLeft = "5%";
	secText.style.marginRight = "5%";
	mainText.style.color = "rgb(7, 65, 30)";
	mainText.style.textShadow = "-1px 0 5px #ffffff85, 0 1px 5px #ffffff85, 1px 0 5px #ffffff85"
	mainText.style.margin = "5%";
	content.appendChild(startGame3);

	playBerries();
}

function playBerries() {
  startGame3.addEventListener("click", function () {
    if (gameState == 8.1) {
    gameState = 8.2;

    startGame3.remove();
    mainText.innerHTML = "";
    secText.innerHTML = "";

    const basketImg = new Image(120, 120);
    basketImg.src =
      "http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/09bbb262de794bb.png"; //http://pixelartmaker.com/art/09bbb262de794bb

    class Basket {
		constructor(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}

		draw() {
			c.drawImage(basketImg, this.x, this.y, this.width, this.height);
		}

		update() {
			this.draw();
		}
    }

    basket.push(
      	new Basket(canvas.width / 2 - 120 / 2, canvas.height - 100 - 30, 120, 100) // setting the width and height of the basket
    ); 
    /* if (basket.length > 1) {
        basket.pop(); // stops the basket from being pushed twice, ensuring there is only one basket printed
    } */

    document.addEventListener("mousemove", function (e) {
      	if (gameState === 8.1 || gameState === 8.2) {
        	let x = e.clientX - canvas.offsetLeft; // subtract canvas offset to get relative position
    	    basket[0].x = x - basket[0].width - 100; // update x-position of the center of the basket
      	}
    });

    const berryImgs = [
		"http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/26169d5a5745ad9.png", // red berry http://pixelartmaker.com/art/26169d5a5745ad9
		"http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d78af06eea21b17.png", // blueberry http://pixelartmaker.com/art/d78af06eea21b17
		"http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/7ded3a2e20e36f6.png", // orange raspberry http://pixelartmaker.com/art/7ded3a2e20e36f6
		"http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/eb71bf72598896e.png", // poison berry http://pixelartmaker.com/art/eb71bf72598896e
    ];

    class Berry {
      	// position handler of the berry and its physical appearance
		constructor(x, y, radius) {
			this.x = x;
			this.y = y;
			this.radius = radius;

			this.image = new Image(60, 60);
			this.image.src =
			berryImgs[Math.floor(Math.random() * berryImgs.length)]; // to randomly select an image source from the array
			// adding the animation of the berries
			this.yVel = 3; // velocity of the y-positioning (up/down)
		}

		// making the berries
		draw() {
			c.beginPath();
			c.drawImage(
			this.image,
			this.x - this.radius,
			this.y - this.radius,
			this.radius * 2,
			this.radius * 2
			);
			c.closePath();
		}

		// managing the movements
		update() {
			this.draw();
			this.y += this.yVel;
		}
    }

    // setting interval between each berry falling to 1/2 second
    const berryInterval = setInterval(() => {
		let berryXPos = Math.random() * (canvas.width - 60 - 60) + 60; // to stop the berries from animating at the edge of the screen
		berries.push(new Berry(berryXPos, -10, 30));
    }, 400);

    // getting the berry to animate falling down
    function animate() {
        if (game3Over == false && !document.getElementById("g3StartButton"))
			requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height); // making it look like the berry is falling rather than stretching out
		
		// print score and timer to the canvas when button is removed from screen 
        if (game3Over == false && !document.getElementById("g3StartButton")){
			c.font = "bold 36px Arial";
			c.fillStyle = "hsla(144, 81%, 14%, 0.7)";
			c.textAlign = "center";
			c.fillText("Berries caught: " + score, canvasBack.width/2, canvasBack.height/2);
			c.fillText(timeLeft + " seconds remaining", canvasBack.width/2, canvasBack.height/2 + 46);
		}

		berries.forEach((berry, index) => {
			berry.update();

			// getting the berry to disappear upon hitting the end of the canvas/screen
			if (berry.y + berry.radius > canvas.height) {
				setTimeout(function () {
					berries.splice(index, 1);
				}, 0);
				/* console.log("over"); */
			}

			// when berry hits the basket, the score increases
			// calculating distance between the center of the berry and the center of the basket using pythagorean theorem;
			// if dist < (berry radius + half the width of the basket), remove berry from berries array and increase the score by 1
			const dx = berry.x - (basket[0].x + basket[0].width / 2);
			const dy = berry.y - (basket[0].y + basket[0].height / 2);
			const distance = Math.sqrt(dx * dx + dy * dy);

			// check for collision with basket
			if (distance < berry.radius + basket[0].width / 2 && distance < berry.radius + basket[0].height / 2) {

				// increment the score and remove the berry
				score++;
				berries.splice(index, 1);
				index--;

				if (score === 25 && timeLeft >= 0) {
					game3Over = true;
					clearInterval(timeInterval);
                    clearInterval(berryInterval);
					success();
					/* console.log("success() triggered"); */
				}

				if (berry.image.src === berryImgs[3]) {
					// reset the game if the player collects a poison berry
					score--;
					game3Over = true;
					clearInterval(timeInterval);
					clearInterval(berryInterval);
					window.alert("Oops, you collected a poison berry! Try again.");
					resetBerries();
				}
			}
      });

      basket.forEach((bskt) => {
        	bskt.update();
      });
    }
    animate();

    // update timer every second
    const timeInterval = setInterval(() => {
        timeLeft--; // update timer display
        /* console.log("timeLeft: " + timeLeft);
        console.log("timeInterval: " + timeInterval); */
        
        if (timeLeft <= 0) { // check if the time limit has been reached
			clearInterval(timeInterval); // stop the timer
			clearInterval(berryInterval);
			window.alert("Time's up! Try again.");
			game3Over = true;
			resetBerries();
        }
    }, 1000);

    function resetBerries() {
		if (game3Over == true) {
			gameState = 8.1;
            game3Over = false;

			timeLeft = 20;
			basket = [];
			berries = [];
			score = 0;

			/* console.log("resetBerries() triggered"); */

			playBerriesIntro();
		}
    }

    function success() {
		if (game3Over == true) {
            gameState = 8;

            timeLeft = 20;
			berries = [];
			basket = [];
			score = 0;

			mainText.innerHTML = "Here's your clue and number.";
			mainText.style.fontSize = "36px";
			secText.innerHTML = "Click on the note to continue.";
			secText.style.margin = "auto";

			clue3();
		}
	}
}
});
}

function clue3() { 

    content.appendChild(note);
    note.appendChild(noteMessage);
    note.style.backgroundColor = "rgb(51, 102, 14)";
    note.style.color = "rgb(130, 95, 0)";
    noteMessage.innerHTML = "your socks probably won't get soggy;" + "<br>" + "<br>" + "0";
    noteMessage.style.textAlign = "center";
    noteMessage.style.fontSize = "24px";
    noteMessage.style.marginLeft = "8%";
    noteMessage.style.marginRight = "8%";

    /* console.log("clue 3 printed"); */

    closeClue3();
    
}        
function closeClue3() {
    note.addEventListener('click', function(){
        gameState = 4;
        clickBlob3();
        game3.style.backgroundColor = "rgb(116, 140, 124)";
        game3.style.color = "white";
        defaultNote();
    })
}


// starting and pausing the music
let bgmPlaying = false;
let bgmState = 0;

mainDiv.addEventListener('click', function() {
    if (bgmState==0) {
        bgmState = 1;
        document.getElementById("bgm").play();
        bgmPlaying = true;
    }
})

document.getElementById("bgmDiv").addEventListener('click', function(){
    /* console.log("bgmDiv clicked"); */
    if (bgmState==1) {
        if (bgmPlaying == false) {
            bgm.play();
            bgmPlaying = true;
            /* console.log("bgm playing"); */
        }
        else {
            bgm.pause();
            bgmPlaying = false;
            /* console.log("bgm paused"); */
        }
    }
});