  
    // Vars and Functions


    function displayWinInfo(countryName, flagImage, numWins, soundString) {

              document.querySelector("#tag").innerHTML=countryName;
              document.querySelector("#map").innerHTML=flagImage;
              document.querySelector("#wins").innerHTML = numWins; 

              document.querySelector("#myAudio").innerHTML=soundString;
              var plyr = ""; 
              plyr=document.getElementById("myAudio");
              plyr.load();
              plyr.play();
    }
    function updateRoundDisplay(userPrompt, guessesLeft, lettersDone, wordPart ){
                document.querySelector("#message").innerHTML = userPrompt;     
                document.querySelector("#guesses").innerHTML = guessesLeft;
                document.querySelector("#lettersGuessed").innerHTML = lettersDone;
                document.querySelector("#wordInProgress").innerHTML = wordPart;
    }

    var game = {
            words:[ "MEXICO", 
                    "GERMANY", 
                    "ARGENTINA", 
                    "GUATEMALA", 
                    "DJIBOUTI", 
                    "UKRAINE"],
            numGuesses:[10,
                        10,
                        12,
                        12,
                        15,
                        11],
            wordImage:["assets/images/mexico.jpeg",
                      "assets/images/germany.jpeg",
                      "assets/images/argentina.jpeg",
                      "assets/images/guatemala.jpeg",
                      "assets/images/djibouti.jpeg" ,
                      "assets/images/ukraine.jpeg"],
            wordAnthem:["http://www.lengua.com/anthems/Mexico.mp3",
                        "assets/sound/germany.mp3",
                        "http://www.lengua.com/anthems/Argentina.mp3",
                        "http://www.lengua.com/anthems/Guatemala.mp3",
                        "http://www.lengua.com/anthems/Djibouti.mp3",
                        "http://www.lengua.com/anthems/Ukraine.mp3"],
            yourWord:"",
            yourGuesses:0,
            yourImage:"",
            yourAnthem:"",
            lettersGuessed:[],
            wins:0,
            losses:0,
            wordInProgress:"",
            correctCounter:0,


            beginRound: function(){

              if (this.words.length >=1){  //there are more words to guess

              //initialize the variables for this round
                this.lettersGuessed= [];
                this.yourWord = "";
                this.yourGuesses=0;
                this.yourImage="";
                this.yourAnthem="";
                this.wordInProgress = "";
                this.correctCounter = 0;
    
    
                
              // randomly select a word from the word array
                this.yourWord = this.words[Math.floor(Math.random() * this.words.length)];

                //put your word, its number of guesses and its image path and the anthem source string into temp variables
                var yourWordIndex = this.words.indexOf(this.yourWord);
                this.yourGuesses=this.numGuesses[yourWordIndex];
                this.yourImage=this.wordImage[yourWordIndex];
                this.yourAnthem=this.wordAnthem[yourWordIndex];
              // once word is chosen, remove word from words array, num guesses from guesses array and image path and the anthem source from wordImage array
                this.words.splice(yourWordIndex, 1);
                this.numGuesses.splice(yourWordIndex,1);
                this.wordImage.splice(yourWordIndex,1); 
                this.wordAnthem.splice(yourWordIndex,1);          

              //format the display for the unguessed word      
                for (var i=0; i < this.yourWord.length; i++){
                  this.wordInProgress = this.wordInProgress + " _";
                } 
            // clear the display from the last round and display new word in progress
                updateRoundDisplay("Press any key to start!", this.yourGuesses,"",this.wordInProgress);

              }
              else {      //no more words to guess so game over - clear display and end the keystroke code
                updateRoundDisplay("Game Over. Refresh to play again.","","","");
                document.onkeyup = function(event) {}
              }
            } //end function beginRound

    }; //end of the object definition

      //begin code execution
        document.querySelector("#wins").innerHTML = game.wins; 
        document.querySelector("#losses").innerHTML = game.losses;
        game.beginRound();
    
        
        document.onkeyup = function(event) {
          // get user key stroke - letter guessed
          var userInput = String.fromCharCode(event.keyCode).toUpperCase();
          // if already guessed, let user know,  else process the new guessed letter
          if (game.lettersGuessed.indexOf(userInput)  > -1){
            document.querySelector("#message").innerHTML = "You already guessed " + userInput + ". Try again."; 
            }
          else {  //this is a new letter guessed
            // put letter into the letter guessed arrary and decrease guesses by one
            game.lettersGuessed.push(userInput);
            game.yourGuesses = game.yourGuesses - 1;
            // format the letters guessed display variable
            var lettersGuessedReformat;
            for (j=0;j<game.lettersGuessed.length;j++){
              if (j ===0){
                lettersGuessedReformat = game.lettersGuessed[j];
               }               
               else {
                lettersGuessedReformat = lettersGuessedReformat + ", " + game.lettersGuessed[j];
               }  
            }
            // format the word in progress display variable and keep track of number of letters correctly guessed         
            for (var i = 0; i < game.yourWord.length; i++) {
              if(userInput === game.yourWord.charAt(i)) {
                game.wordInProgress = game.wordInProgress.slice(0,2*i+1) + userInput + game.wordInProgress.slice(2*i + 2, 2*game.yourWord.length);
                game.correctCounter = game.correctCounter + 1;
              } //end if
            } //end for
            //display the updated letters guessed and the updated number of guesses and updated word in progress
            updateRoundDisplay("",game.yourGuesses,lettersGuessedReformat,game.wordInProgress);

            // if user has guessed all of the letters in the word, then increment the wins, display the winning word and flag image and begin another round, else if user has run out of guesses, increment losses and begin another round. if neither of those, code will then process the next key stroke which is the next letter guess
            if (game.correctCounter === game.yourWord.length) {
              game.wins = game.wins + 1;
 
              var imgString = "<img src=\"" + game.yourImage + "\">"
              var anthemString = "<source src=\"" + game.yourAnthem + "\" type=\"audio/mp3\">";
 
              displayWinInfo(game.yourWord,imgString,game.wins,anthemString);
              
              game.beginRound();
            }          
            else if (game.yourGuesses === 0){
              game.losses++;
              document.querySelector("#losses").innerHTML = game.losses;
              game.beginRound();
            }
          }//end if 

        }//end event         

