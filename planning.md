Object of the Game:
    The object of the game is to have the player guess a randomly generated code of colors within a specified amount of guesses
        - Considering starting off with 6 maximum attempts
          - If I can get that working, see if I can make it dynamic by either:
            - Adding difficulty options that increase to 10 if very easy, 8 if easy, 4 if hard, 3 if very hard
            - Allowing the player to choose the amount of guesses they would like up to a maximum of 12

Rules:
    Player must make a choice of any combination of four colors from the following options:
        -Red
        -Blue
        -Yellow
        -Green
        -White
        -Black
            Colors are allowed to repeat.

    If player makes a correct guess in the correct position, the guess accuracy indicator to the side of the guess will populate with a black dot in the corresponding position.

    If the player makes a correct guess in an incorrect position, a white dot will populate in the corresponding spot of the indicator
    
    If the a color guess is wrong altogether, nothing is populated at all

    Player wins if they guess the code within the allotted amount of guesses

    Player loses if they fail to guess the code

Logic Flow: ![Mastermind Logic Flow](image.png)

Wireframe: ![Mastermind Wireframe](image-1.png)