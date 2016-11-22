  
    // Vars

  

    var game = {
            words:["MEXICO", "GERMANY", "ARGENTINA", "GUATEMALA", "DJIBOUTI", "UKRAINE"],
            numGuesses:[10,10,12,12,15,11],
            wordImage:["assets/images/mexico.jpeg","assets/images/germany.jpeg","assets/images/argentina.jpeg","assets/images/guatemala.jpeg","assets/images/djibouti.jpeg" ,"assets/images/ukraine.jpeg"],
            yourWord:"",
            yourGuesses:0,
            yourImage:"",
            lettersGuessed:[],
            wins:0,
            wordInProgress:"",
            correctCounter:0,


            beginRound: function(){

              if (this.words.length >=1){  //there are more words to guess

                this.lettersGuessed= [];
                this.yourWord = "";
                this.yourGuesses=0;
                this.yourImage="";
                this.wordInProgress = "";
                this.correctCounter = 0;
                
              // randomly select a word from the word array
              // yourWord = words[Math.floor(Math.random() * words.length)];
                this.yourWord = this.words[Math.floor(Math.random() * this.words.length)];

                //put your word, its number of guesses and its image path into temp variables
                var yourWordIndex = this.words.indexOf(this.yourWord);
                this.yourGuesses=this.numGuesses[yourWordIndex];
                this.yourImage=this.wordImage[yourWordIndex];
              // once word is chosen, remove word from words array, num guesses from guesses array and image path from wordImage array
                this.words.splice(yourWordIndex, 1);
                this.numGuesses.splice(yourWordIndex,1);
                this.wordImage.splice(yourWordIndex,1);
                console.log(this.yourWord);             

              //format the display for the unguessed word  
        
                for (var i=0; i < this.yourWord.length; i++){
                  this.wordInProgress = this.wordInProgress + " _";
                } 



                document.querySelector("#guesses").innerHTML = this.yourGuesses;
                document.querySelector("#lettersGuessed").innerHTML = "";
            // display the unguessed word
                document.querySelector("#wordInProgress").innerHTML = this.wordInProgress;
              }
              else {
                console.log("Game Over");
                document.querySelector("#wordInProgress").innerHTML = "";
                document.querySelector("#lettersGuessed").innerHTML = "";
                document.querySelector("#message").innerHTML = "Game Over. Refresh to play again.";
                document.onkeyup = function(event) {}
      //exit();
              }
            } //end function

    }; //end of the object definition




      //begin code execution


        document.querySelector("#wins").innerHTML = game.wins; 
        game.beginRound();
    
        
        document.onkeyup = function(event) {
          var userInput = String.fromCharCode(event.keyCode).toUpperCase();
          if (game.lettersGuessed.indexOf(userInput)  > -1){
            console.log("You already guessed " + userInput + ". Try again.");}
          else {  
            game.lettersGuessed.push(userInput);
            game.yourGuesses = game.yourGuesses - 1;

            var lettersGuessedReformat;
            for (j=0;j<game.lettersGuessed.length;j++){
              if (j ===0){
                lettersGuessedReformat = game.lettersGuessed[j];
               }               
               else {
                lettersGuessedReformat = lettersGuessedReformat + ", " + game.lettersGuessed[j];
               }  
            }
            document.querySelector("#lettersGuessed").innerHTML = lettersGuessedReformat;
            document.querySelector("#guesses").innerHTML = game.yourGuesses;
            // console.log("User Input: " + userInput);
            // console.log("Number guesses remaining: " + guesses);
          
            for (var i = 0; i < game.yourWord.length; i++) {
              if(userInput === game.yourWord.charAt(i)) {
                game.wordInProgress = game.wordInProgress.slice(0,2*i+1) + userInput + game.wordInProgress.slice(2*i + 2, 2*game.yourWord.length);
                game.correctCounter = game.correctCounter + 1;
              } //end if
            } //end for
            document.querySelector("#wordInProgress").innerHTML = game.wordInProgress;
            // console.log(wordInProgress); debug
            if (game.correctCounter === game.yourWord.length) {
              console.log("You Won");
              game.wins = game.wins + 1;
              document.querySelector("#wins").innerHTML = game.wins; 

              var imageReveal = "assets/images/germany.jpeg";

              document.querySelector("#map").innerHTML="<img src=\"" + game.yourImage + "\">";
              document.querySelector("#tag").innerHTML=game.yourWord;
              game.beginRound();
            }          
            else if (game.yourGuesses === 0){
              console.log("You Lost")
              game.beginRound();
            }
          }//end if 

        }//end event         

