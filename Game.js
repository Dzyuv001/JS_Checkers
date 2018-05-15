var turn = true; // who's turn it is.
var player1 = 12, player2 = 12; // used to check if player has removed the enemy checkers
var aiDifficulty; // Ai dificulty level 
var previewIds = []; // stores the possible momvent locations
var attacked = []; // stores the elments on the baord that will be attacked and removed 
var yCoor, xCoor; //stores the current x and y of selected checker
var checkClass = "";// stores the class of selected checker 
var matricsX = [-1, 1]; // movment matreis for the x axis 
var matricsY = [-1, 1]; // movment matreis for the y axis 

function changeTurn() { //
    turn = !turn;
}

function makeMove(y, x) {
    clearPreview();
    cleanUp();
    yCoor = y;
    xCoor = x;
    checkClass = $("#c" + y + "_" + x).children().attr("class");
    getPossibleMoves(y, x);
    movePreview();
}

// function checkTeam() {

// }

function checkTeam(y, x) {
    if (((shortId(y, x).find(".chkw").length !== 0 || shortId(y, x).find(".chkW").length !== 0) && turn) ||
        ((shortId(y, x).find(".chkb").length !== 0 || shortId(y, x).find(".chkB").length !== 0) && !turn)) {
        return true;
    } else {
        return false;
    }
}

function checkType(y, x) {
    if (shortId(y, x).find(".chkw").length !== 0) {
        return 0;
    } else if (shortId(y, x).find(".chkb").length !== 0) {
        return 1;
    } else if (shortId(y, x).find(".chkB").length !== 0 || shortId(y, x).find(".chkW").length !== 0) {
        return 2;
    }
}

function getPossibleMoves(y, x) { //used to create an array of possible moves 
    if (checkTeam(y, x)) {
        var chekerType = checkType(y, x);
        if (chekerType < 2) {
            for (var i = 0; i < 2; i++) {
                if (isOnBoard(y + matricsY[chekerType], x + matricsX[i])) {
                    previewIds.push([y + matricsY[chekerType], x + matricsX[i]]);
                } else if (isOnBoard(y + matricsY[chekerType] * 2, x + matricsX[i] * 2)) {
                    previewIds.push([y + matricsY[chekerType] * 2, x + matricsX[i] * 2]);
                    attacked.push([y + matricsY[chekerType], x + matricsX[i]]);
                }
            }
        } else {
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < chekerType; j++) {
                    if (isOnBoard(y + matricsY[i], x + matricsX[j])) {
                        previewIds.push([y + matricsY[i], x + matricsX[j]]);
                    } else if (isOnBoard(y + matricsY[i] * 2, x + matricsX[j] * 2)) {
                        previewIds.push([y + matricsY[i] * 2, x + matricsX[j] * 2]);
                        attacked.push([y + matricsY[i], x + matricsX[j]]);
                    }
                }
            }
        }
    }
}

// function checkType(y,x) {
//     var divC = shortId(y, x).className.charAt(3);
//     if (divC == "w" || divC == "b" || divC == "G") {
//         return "●";
//     } else {
//         return "⍟";
//     }
// }

function actMove(y, x) { //enacts the move
    $("#c" + y + "_" + x).append("<div class=" + checkClass + " onclick=\"makeMove(" + y + "," + x + ")\">●</div>");
    cleanUp();
    $("#c" + yCoor + "_" + xCoor).empty();
    clearPreview();
    attack();
    changeTurn();
}

function cleanUp() { //removes preview moves
    $(".chkG").remove();
}

function clearPreview() {//clear the preview array 
    previewIds = [];
}

function movePreview() {// draw the preview move locations
    for (var i = 0; i < previewIds.length; i++) {
        $("#c" + previewIds[i][0] + "_" + previewIds[i][1]).append("<div class=\"chkG\" onclick=\"actMove(" + previewIds[i][0] + "," + previewIds[i][1] + ")\">●</div>");
    }
}

function isOnBoard(preY, preX) { // used to check if a move will be on the board
    if (-1 < preX && preX < 7 || -1 < preY && preY < 7) {
        return isCoordClear(preY, preX);
    }
    return false;
}

function isCoordClear(y, x) {// heck if the coordiante on the baord is clear
    if (shortId(y, x).find(".chkB").length == 0) {
        return true;
    } else {
        return false;
    }
}

function attack() { // will be used to remove enemy checkers and increment the players score
    for (var i = 0; i <= attacked.length - 1; i++) {
        $("#c" + attacked[i][0] + "_" + attacked[i][1]).empty();
        player2--;
    }
}

function shortId(y, x) { //used to clea-up element id location 
    return $("#c" + y + "_" + x);
}

function upgrade(y, x) { //will upgrade a regular cheker
    var id = shortId(y, x);
    var divClass = id.className.charAt(3);
    if (divClass === divClass.toUpperCase()) {
        if (-1 < preX && preX < 7 || y == 0) {
            id.removeClass(id.className).addClass(id.className.substring(0, 2) + divClass.toUpperCase);
        }
    }
}