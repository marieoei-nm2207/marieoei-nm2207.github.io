// div variables
let mainDiv = document.getElementById("mainDiv");
let intText = document.getElementById("h1Text");
let content = document.getElementById("content");
let buttonContainer = document.getElementById("buttonContainer");

// button variables
let yesButton = document.createElement("button");
let noButton = document.createElement("button");
let theEndButton = document.createElement("button");

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
let home1 = document.createElement("button"); // alert "You either got the wrong home or the wrong code!"
let home2 = document.createElement("button"); // alert "You either got the wrong home or the wrong code!"
let home3 = document.createElement("button"); // alert "Blob: Thanks for bringing me home! Sorry for the trouble... Hope you had fun though!"

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
let noteMessage = document.createElement("p");
noteMessage.className = "message";
noteMessage.innerHTML = "A guide to home:" + "<br>" + "<br>" + "1. Complete three mini games"+ "<br>" + 
                        "2. Get clues for the code from the games" + "<br>" + "3. Choose the location that you think is the home and enter the code"
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

    theEndButton.className = "button";
    theEndButton.id = "buttonToHome";
    theEndButton.innerHTML = "Leave";
    theEndButton.onclick = function () {
        goBack();
        /* console.log("theEndButton is clicked"); */
      };
    buttonContainer.appendChild(theEndButton);
}

// creating the ending page
function goBack() {    
    changeText.removeEventListener("click", function(){
        console.log('hi');
    });
    intText.innerHTML = "Goodbye, Adventurer.";
    theEndButton.remove();

    let plsRef = document.createElement("p");
    plsRef.id = "click2Cont";
    plsRef.innerHTML = "Please refresh the page if you want to try again.";
    lowerText.appendChild(plsRef);

    gameState = 1;
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
    }
});
document.body.addEventListener('keyup', function(e){
    noteMessage.remove();
    note.remove();
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

// game 1 - tic tac toe with the forest squirrel
// onclick event listener for game1
// append image of squirrel on the left, blob on the right



// game 2 - play the keys according to the music



// game 3 - sort out the berries