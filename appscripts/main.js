// div variables
let mainDiv = document.getElementById("mainDiv");
let intText = document.getElementById("h1Text");
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
game1.innerHTML = "U/C";
game2.innerHTML = "Game 2";
game3.innerHTML = "U/C";

// home locations variables
let home1 = document.createElement("button"); // Moonlit Marshes - alert "You either got the wrong home or the wrong code!"
let home2 = document.createElement("button"); // Wailing Waterfalls - "You either got the wrong home or the wrong code!"
let home3 = document.createElement("button"); // Crystal Cavern - alert "Blob: Thanks for bringing me home! Sorry for the trouble... Hope you had fun though!"
// hints consist of: "It looks cool.", "Your socks probably won't get soggy.", "Watch your head."

// lower text variables (click to continue)
let lowerText = document.getElementById("click2ContDiv");
let click2Cont = document.getElementById("click2Cont");

// blob
const blob = new Image(150, 150);
/* credit to cactusturtle.itch.io for the blob */
blob.src = "https://img.itch.zone/aW1hZ2UvODE2MTk0LzQ1OTgzNDIuZ2lm/x200/vHKsMo.gif";
blob.id = "blob";
/* appendChild in relevant functions */

// blobName text input
const blobName = document.createElement("input");
blobName.type = "text";
blobName.className = "blobName";
blobName.placeholder = "Enter a name for the blob (3-8 characters)";
blobName.minLength = 3; // Set minimum length to 3
blobName.maxLength = 8; // Set maximum length to 8
blobName.style.fontSize = "16px";

// note and message variables
let note = document.createElement("div");
note.className = "note";
/* note.style.display = "none"; */
let noteMessage = document.createElement("p");
noteMessage.className = "message";
noteMessage.innerHTML = "A guide to home:" + "<br>" + "<br>" + "1. Complete three mini games"+ "<br>" + 
                        "2. Get clues and numbers that form a code for the location from the games" + "<br>" + 
                        "3. Choose the location that you think is the home and enter the code"
                        + "<br>" + "<br>" + "Press and hold '/' for the guide again.";

let gameState = 0;

// initial click event listener to change text
mainDiv.addEventListener('click', function(){
    if (gameState == 0) {
        intText.innerHTML = "Is this your first time in this forest?";

        yesButton.className = "button";
        yesButton.innerHTML = "Yes";
        yesButton.onclick = function () {
            /* console.log("yesButton is clicked"); */
            yesButtonClicked();
        };
        buttonContainer.appendChild(yesButton);
        /* console.log("yesButton created"); */

        noButton.className = "button";
        noButton.innerHTML = "No";
        noButton.onclick = function () {
            noButtonClicked();
            /* console.log("noButton is clicked"); */
        };
        buttonContainer.appendChild(noButton);
        /* console.log("noButton created"); */

        click2Cont.remove();

    }
})

// clicking the no button
function noButtonClicked() {
    intText.innerHTML = "Well then, this won't be much fun for you." + "<br>" + "Maybe find something better to do with your time than enter this forest again."
    intText.style.fontSize = "36px";

    yesButton.remove();
    noButton.remove();

    endButton.className = "button";
    endButton.id = "buttonToHome";
    endButton.innerHTML = "Leave";

    endButton.addEventListener('click', function(){
        intText.innerHTML = "Goodbye, Adventurer.";
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
    intText.innerHTML = "Welcome once again." + "<br>" + "As an adventurer, you'll wander through this forest and explore.";

    yesButton.remove();
    noButton.remove();

    lowerText.appendChild(click2Cont);

    gameState = 1;
    
    // introducing the blob
    mainDiv.addEventListener('click', function(){
        if (gameState == 1) {
            intText.innerHTML = "Oh look!" + "<br>" + "A blob has appeared and it seems lost." + "<br>";
            click2Cont.innerHTML = "Try clicking on the blob.";
            console.log("try clicking on blob");
            intText.style.fontSize = "36px";
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
            intText.innerHTML = "Why don't you name the blob so we can stop calling it a blob?";
            click2Cont.innerText = "Hit 'Enter' to continue.";
            console.log("hit enter");

            content.appendChild(blobName);
            content.appendChild(blob);

            // name will be printed in the innerHTML
            blobName.addEventListener("keypress", function(e) {
                if (e.keyCode === 13 && blobName.value.length >= 3 && blobName.value.length <= 8) {
                    intText.innerHTML = blobName.value + " -- interesting name.";
                    click2Cont.innerHTML = "Click to continue.";
                    blobName.remove();
                } 
                clickBlob2();
            }); 
        }   
    });      
}

// function to change text saying there's a note
function clickBlob2() {
    blob.addEventListener('click', function(){
        if (gameState == 3) {
            gameState = 4;
            
            intText.innerHTML = "Looks like there's a note on " + blobName.value + ".";
            click2Cont.innerHTML = "Try clicking on " + blobName.value + ".";   

            // event listener to show the message on the note
            blob.addEventListener('click', function(){
                blob.remove();
                
                content.appendChild(note);
                note.appendChild(noteMessage);
                /* note.style.display = "flex"; */
                click2Cont.innerHTML = "Click the note to close and continue.";
                
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
        /* note.style.display = "flex"; */
    }
});
document.body.addEventListener('keyup', function(e){
    if (e.keyCode == 191) {
        noteMessage.remove();
        note.remove();
    }
});

// implementing the game buttons
function clickBlob3() {
    mainDiv.addEventListener('click', function(){
        if (gameState == 4) {
            gameState = 5;

            intText.innerHTML = "I guess we have to play some games now...";
            click2Cont.innerHTML = "Choose a game.";

            playGames();

        }
    });
}

// function to append the game buttons
function playGames() {
    buttonContainer.appendChild(game1);
    buttonContainer.appendChild(game2);
    buttonContainer.appendChild(game3);
}

// ------- GAME 1 - tic tac toe with the forest squirrel
// onclick event listener for game1
// append image of squirrel on the left, blob on the right
// gamestate = 6;


// ------- GAME 2 - play the keys according to the music
let mainPiano = document.getElementById("mainPiano");
mainPiano.style.display = "none";
let listen = document.createElement("button");
    listen.className = "button";
    listen.id = "lisbutton";
    listen.innerHTML = "Listen";

// creating the function for game 2 whereby clicking the button will produce piano keys
game2.addEventListener('click', function(){
    gameState = 7;

    content.appendChild(listen);
    listen.style.marginBottom = "-30px";
    mainPiano.style.marginBottom = "0";
    mainPiano.style.display = "block"; 
    content.appendChild(mainPiano);

    game1.remove();
    game2.remove();
    game3.remove();

    intText.innerHTML = "Click on 'Listen' to listen to a short tune." + "<br>" + "Imitate the tune correctly to get a clue and a part of the code.",
    intText.style.fontSize = "18px";
    click2Cont.innerHTML = "If you press 5 keys wrongly, there will be a reset.";
       
    listen.addEventListener('click', function() {
        listenToTune();
    });

    keyTune();
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
        if (gameState == 7) { 
            
            playNote(e);
            
            // store the key code in the userKeys array
            userKeys.push(e.keyCode);
                        
            // compare the user's key presses to the correct sequence
            if (userKeys.length === pianoAudio.length && userKeys.every((value, index) => value === pianoAudio[index])) {           
                
                mainPiano.style.display = "none";
                listen.remove();

                intText.innerHTML = "Here's your clue and number.";
                intText.style.fontSize = "36px";
                click2Cont.innerHTML = "Click to continue.";
                
                clue2();

            } else if (userKeys.length === pianoAudio.length && userKeys.some((value, index) => value !== pianoAudio[index])) {
                // if the user's key presses do not match the correct sequence, reset the userKeys array
                window.alert("Try again.");
                userKeys = [];
            }
        }
    });
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

        console.log("clue 2 printed");

        gameState = 4;
        clickBlob3();

        game2.style.backgroundColor = "rgb(116, 140, 124)";
        game2.style.color = "white";
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

// ------- GAME 3 - collect/sort out the berries
// have a timer event, maybe 25 seconds; player has to either sort or collect 20 berries within the timing
// when timer runs out and the game is uncompleted, reset
// Fruit Catch Game: https://www.youtube.com/watch?v=sDlrNT0myIo, https://www.youtube.com/watch?v=UdSVPgNkOyU
let startGame3 = document.createElement("button");
startGame3.className = "button";
startGame3.id = "g3StartButton";
startGame3.innerHTML = "Start";

let score = 0;

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = mainDiv.offsetWidth; // gets the width of mainDiv
canvas.height = mainDiv.offsetHeight; // gets the height of mainDiv

const berries = []; // creating multiple berries, setting to an empty array
const basket = [];

game3.addEventListener('click', function(){
    gameState = 8;

    game1.remove();
    game2.remove();
    game3.remove();

    intText.innerHTML = blobName.value + " is hungry." + "<br>" + "Catch some berries for him but be sure to avoid the poisonous ones (Hint: They look a little dull).";
    click2Cont.innerHTML = "Collect 30 berries in 25 seconds." + "<br>" + "If time runs out before your succeed, there will be a reset."
                            + "Move your cursor to move the basket to collect the berries.";
    click2Cont.style.marginBottom = "260px";
    content.appendChild(startGame3);

    startGame3.addEventListener('click', function(){
        startGame3.remove();
        intText.innerHTML = "";
        click2Cont.innerHTML = "";

        let scoreText = document.createElement("p");
        mainDiv.appendChild(scoreText);
        scoreText.id = "scoreText";
        scoreText.innerHTML = score;
    });
    
});

const berryImgs = [
    "http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/26169d5a5745ad9.png", // red berry http://pixelartmaker.com/art/26169d5a5745ad9
    "http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d78af06eea21b17.png", // blueberry http://pixelartmaker.com/art/d78af06eea21b17
    "http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/7ded3a2e20e36f6.png", // orange raspberry http://pixelartmaker.com/art/7ded3a2e20e36f6
    "http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/eb71bf72598896e.png" // poison berry http://pixelartmaker.com/art/eb71bf72598896e
]

class Berry {
    // position handler of the berry and its physical appearance
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.image = new Image(60, 60);
        this.image.src = berryImgs[Math.floor(Math.random() * berryImgs.length)]; // to randomly select an image source from the array

        // adding the animation of the berries
        this.yVel = 3; // velocity of the y-positioning (up/down)
    }
    
    // making the berries
    draw() {
        c.beginPath();
        c.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
        c.closePath();
    }

    // managing the movements
    update() {
        this.draw();
        this.y += this.yVel;
    }
}

const basketImg = new Image(120, 120);
basketImg.src = "http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/09bbb262de794bb.png"; //http://pixelartmaker.com/art/09bbb262de794bb

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

basket.push(new Basket(canvas.width/2 - 120/2, canvas.height - 100 - 30, 120, 100)); // setting the width and height of the basket

// setting interval between each berry falling to 2 seconds
setInterval(() => {
    let berryXPos = Math.random() * ((canvas.width-60)-60)+60; // to stop the berries from animating at the edge of the screen
    berries.push(new Berry(berryXPos, -10, 30));

}, 500);

// getting the berry to animate falling down
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height); // making it look like the berry is falling rather than stretching out

    berries.forEach((berry, index) => {
        berry.update();

        // getting the berry to disappear upon hitting the end of the canvas/screen
        if (berry.y + berry.radius > canvas.height) {
            setTimeout(function(){
                berries.splice(index, 1);
            }, 0);
            console.log("over");
        }

        // when berry hits the basket, the score increases
        // calculating distance between the center of the berry and the center of the basket using pythagorean theorem;
        // if dist < (berry radius + half the width of the basket), remove berry from berries array and increase the score by 1
        const dx = berry.x - (basket[0].x + basket[0].width/2);
        const dy = berry.y - (basket[0].y + basket[0].height/2);
        const distance = Math.sqrt(dx*dx + dy*dy); 
        if (distance < berry.radius + basket[0].width/2) {
            berries.splice(index, 1);
            score++;
            console.log(score);
        }
    })

    basket.forEach((bskt) => {
        bskt.update();
    })
}
animate();

document.addEventListener('mousemove', function(e){
    let x = e.clientX - canvas.offsetLeft; // subtract canvas offset to get relative position
    basket[0].x = x - basket[0].width - 50; // update x-position of the center of the basket
});


// when all games have been played, show the options for home
// check whether all games have been played using .style.backgroundColor = "rgb(116, 140, 124)"