var turn = true; // who's turn it is.
var player1 = 12, player2 = 12;
var aiDifficulty;
var previewIds = [];
var attacked = [];
var yCoor, xCoor;
var matricsX = [-1, 1];
var matricsY = [-1, 1];
var preView;

function changeTurn() {
    turn != turn;
}

function makeMove(y, x) {
    clearPreview();
    cleanUp();
    yCoor = y;
    xCoor = x;
    getPossibleMoves(y, x);
    movePreview();
}

function checkTeam() {

}

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
        var chekerType;
        switch (checkType(y, x)) {
            case 0:
                for (var i = 0; i < 2; i++) {
                    if (isOnBoard(y + matricsY[0], x + matricsX[i])) {
                        previewIds.push([y + matricsY[0], x + matricsX[i]]);
                    } else if (isOnBoard(y + matricsY[0] * 2, x + matricsX[i] * 2)) {
                        previewIds.push([y + matricsY[0] * 2, x + matricsX[i] * 2]);
                        attacked.push([y + matricsY[0], x + matricsX[i]]);
                    }
                }
                break;
            case 1:
                for (var i = 0; i < 2; i++) {
                    if (isOnBoard(y + matricsY[1], x + matricsX[i])) {
                        previewIds.push([y + matricsY[1], x + matricsX[i]]);
                    } else if (isOnBoard(y + matricsY[1] * 2, x + matricsX[i] * 2)) {
                        previewIds.push([y + matricsY[1] * 2, x + matricsX[i] * 2]);
                        attacked.push([y + matricsY[1], x + matricsX[i]]);
                    }
                }
                break;
            case 2:
                break;
        }
    }
}

// function checkType() {
//     var divC = shortId(y, x).className.charAt(3);
//     if (divC == "w" || divC == "b" || divC == "G") {
//         return "●";
//     } else {
//         return "⍟";
//     }
// }

function actMove(y, x) { //enacts the move
    $("#c" + y + "_" + x).append("<div class=\"chkw\" onclick=\"makeMove(" + y + "," + x + ")\">●</div>");
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