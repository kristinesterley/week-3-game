  
    // Vars
    var words = ["MEXICO", "GERMANY", "ARGENTINA", "GUATEMALA", "DJIBOUTI", "UKRAINE"];
    var wins = 0;


    function initializeRoundVars(){
      guesses = 10;
      lettersGuessed= [];
      yourWord = "";
      wordInProgress = "";
      correctCounter = 0;
    }

    function initializeBuildWord() {
      // console.log("Your word length:" + yourWord.length); debug
      for (var i=0; i < yourWord.length; i++){
        wordInProgress = wordInProgress + " _";
      } //end for
    } // end function

    function newWord() {
      if (words.length >=1){  //there are more words to guess
        initializeRoundVars(); 
        document.querySelector("#guesses").innerHTML = guesses;
        document.querySelector("#lettersGuessed").innerHTML = "";
      // randomly select a word from the word array
        yourWord = words[Math.floor(Math.random() * words.length)];
        var yourWordIndex = words.indexOf(yourWord);
      // one word is chosen remove word from words array
        words.splice(yourWordIndex, 1);
        console.log(yourWord);
      //format the display for the unguessed word  
        initializeBuildWord();
      // display the unguessed word
        document.querySelector("#wordInProgress").innerHTML = wordInProgress;
    }
    else {
      console.log("Game Over");
      //exit();
    }


    } // end function

        document.querySelector("#wins").innerHTML = wins; 
        newWord();
    
        
        document.onkeyup = function(event) {
          var userInput = String.fromCharCode(event.keyCode).toUpperCase();
          if (lettersGuessed.indexOf(userInput)  > -1){
            console.log("You already guessed " + userInput + ". Try again.");}
          else {  
            lettersGuessed.push(userInput);
            guesses = guesses - 1;
            var lettersGuessedReformat;
            for (j=0;j<lettersGuessed.length;j++){
              if (j ===0){
                lettersGuessedReformat = lettersGuessed[j];
               }               
               else {
                lettersGuessedReformat = lettersGuessedReformat + ", " + lettersGuessed[j];
               }  
            }
            document.querySelector("#lettersGuessed").innerHTML = lettersGuessedReformat;
            document.querySelector("#guesses").innerHTML = guesses;
            // console.log("User Input: " + userInput);
            // console.log("Number guesses remaining: " + guesses);
          
            for (var i = 0; i < yourWord.length; i++) {
              if(userInput === yourWord.charAt(i)) {
                wordInProgress = wordInProgress.slice(0,2*i+1) + userInput + wordInProgress.slice(2*i + 2, 2*yourWord.length);
                correctCounter = correctCounter + 1;
              } //end if
            } //end for
            document.querySelector("#wordInProgress").innerHTML = wordInProgress;
            // console.log(wordInProgress); debug
            if (correctCounter === yourWord.length) {
              console.log("You Won");
              wins = wins + 1;
              document.querySelector("#wins").innerHTML = wins; 
              // li.innerHTML = "<img src=\"" + imageReveal + "\">";
              var imageReveal = "assets/images/germany.jpeg";

              document.querySelector("#map").innerHTML="<img src=\"" + imageReveal + "\">";
              console.log(yourWord);
              document.querySelector("#tag").innerHTML=yourWord;
              newWord();
            }          
            else if (guesses === 0){
              console.log("You Lost")
              newWord();
            }
          }//end if 

        }//end event         


