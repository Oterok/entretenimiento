
//Este funcion/evento es el encargado de detectar que botón se  presiona y las conseqüencias que tiene.
function notificaObservador(e) {                            
    if ((e.code == "KeyA") || (e.code == "ArrowLeft")) { 
        tetris.pecaActual.movimientoIzquierda();
    }else if ((e.code == "KeyS") || (e.code == "ArrowDown")) { 
        tetris.pecaActual.movimientoDown();
        tetris.puntuacio = tetris.puntuacio + 1;
    }else if ((e.code == "KeyD") || (e.code == "ArrowRight")) { 
        tetris.pecaActual.movimientotDerecha();
    }else if ((e.code == "KeyE") || (e.code == "ArrowUp")) { 
        tetris.pecaActual.rotarDerecha();
    }else if ((e.code == "KeyQ") || (e.code == "ArrowUp")) { 
        tetris.pecaActual.rotarIzquierda();
    }else if ((e.code == "KeyW") || (e.code == "ArrowUp")) { 
        alert("STOP");
    }
}                                                            
 var element = document.getElementById("all");                  
 element.addEventListener("keydown", notificaObservador);

//Objeto pieza, contiene la posicion, la forma y el color
var Peca = function (posX, posY, forma, color) //Quito la variable color porque ya esta en forma.
{
    this.posX = posX;
    this.posY = posY;
    this.forma = forma;
    this.posicio = 0; //El 0 indica la posicio inicial, servira per fer les rotacions.
    this.color = color;
};
//Este metodo comprueba la colision antes de rotar la pieza y da 'permisos' para que se pueda hacer.
Peca.prototype.comprobarColisioPecaRotacio = function () {
    var puedeRotar = true;
    for (var x = 0; x <= tetris.pecaActual.forma.length - 1; x++) {
        for (var y = 0; y <= tetris.pecaActual.forma[0].length - 1; y++) {
            if ((tetris.pecaActual.forma[x][y]) != 0 && 
                    (tetris.tablero[tetris.pecaActual.posX+x][tetris.pecaActual.posY+y] != 0)) {
                        puedeRotar = false;
            }
        }
    }
    return puedeRotar;
};
//Este metodo comprueba la colision antes de que la pieza se mueva a la derecha y da 'permisos' para que se pueda hacer.
Peca.prototype.comprobarColisioPecaMovimentDerecha = function () {
    var puedeMouresDreta = true;
    for (var x = 0; x <= tetris.pecaActual.forma.length - 1; x++) {
        for (var y = 0; y <= tetris.pecaActual.forma[0].length - 1; y++) {
            if ((tetris.pecaActual.forma[x][y]) != 0 && 
                    (tetris.tablero[tetris.pecaActual.posX+x][tetris.pecaActual.posY+y+1] != 0)) {
                        puedeMouresDreta = false;
            }
        }
    }
    return puedeMouresDreta;
};
//Este metodo comprueba la colision antes de que la pieza se mueva a la izquierda y da 'permisos' para que se pueda hacer.
Peca.prototype.comprobarColisioPecaMovimentIzquierda = function () {
    var puedeMouresIzquierda = true;
    for (var x = 0; x <= tetris.pecaActual.forma.length - 1; x++) {
        for (var y = 0; y <= tetris.pecaActual.forma[0].length - 1; y++) {
            if ((tetris.pecaActual.forma[x][y]) != 0 && 
                    (tetris.tablero[tetris.pecaActual.posX+x][tetris.pecaActual.posY+y-1] != 0)) {
                        puedeMouresIzquierda = false;
            }
        }
    }
    return puedeMouresIzquierda;
};
//Este metodo comprueba la colision antes de que la pieza se mueva hacia abajo y da 'permisos' para que se pueda hacer.
Peca.prototype.comprobarColisioPecaDown = function () {
    var puedeBajar = true;
    for (var x = 0; x <= tetris.pecaActual.forma.length - 1; x++) {
        for (var y = 0; y <= tetris.pecaActual.forma[0].length - 1; y++) {
            if ((tetris.pecaActual.forma[x][y]) != 0 && 
                    (tetris.tablero[tetris.pecaActual.posX+x+1][tetris.pecaActual.posY+y] != 0)) {
                        if(tetris.pecaActual.posX+x+1 == 1){
                            tetris.gameOver();
                        }else{
                            puedeBajar = false;
                        }  
            }
        }
    }
    return puedeBajar;
};
//Modifica la variable que permite mover la pieza a la izquierda
Peca.prototype.movimientoIzquierda = function () {
    if (tetris.pecaActual.comprobarColisioPecaMovimentIzquierda()) {
        tetris.pecaActual.posY--;
    }
};
//Modifica la variable que permite mover la pieza a la derecha
Peca.prototype.movimientotDerecha = function () {
    if (tetris.pecaActual.comprobarColisioPecaMovimentDerecha()) {
        tetris.pecaActual.posY++;
    }
};
//Modifica la variable que permite mover la pieza hacia abajo.
Peca.prototype.movimientoDown = function () {
    if (tetris.pecaActual.comprobarColisioPecaDown()) {
        tetris.pecaActual.posX++;
    } else {
        tetris.EliminarPeca();
    }
};
//Modifica la variable que permite rotar la pieza a la derecha
Peca.prototype.rotarDerecha = function () {
    if (tetris.pecaActual.posicio < 3) {
        tetris.pecaActual.posicio++;
    } else {
        tetris.pecaActual.posicio = 0;
    }
    tetris.pecaActual.actualizarForma("Derecha");
};
//Modifica la variable que permite rotar la pieza a la izquierda
Peca.prototype.rotarIzquierda = function () {
    if (tetris.pecaActual.posicio > 0) {
        tetris.pecaActual.posicio--;
    } else {
        tetris.pecaActual.posicio = 3;
    }
    tetris.pecaActual.actualizarForma("Izquierda");
};
Peca.prototype.actualizarForma = function (rotacio) {
    //Si es cuadrado 'groc', no ara falta que rote.
    if (tetris.pecaActual.color == "blau") {
        switch (tetris.pecaActual.posicio) {
            case 0:
            case 2:
                tetris.pecaActual.forma = [
                    [0, "l", 0, 0],
                    [0, "l", 0, 0],
                    [0, "l", 0, 0],
                    [0, "l", 0, 0]];
                break;
            case 1:
            case 3:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    ["l", "l", "l", "l"],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
                break;
        }
    } else if (tetris.pecaActual.color == "verd") {
        switch (tetris.pecaActual.posicio) {
            case 0:
            case 2:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    [0, "s", "s", 0],
                    ["s", "s", 0, 0],
                    [0, 0, 0, 0]];
                break;
            case 1:
            case 3:
                tetris.pecaActual.forma = [
                    [0, "s", 0, 0],
                    [0, "s", "s", 0],
                    [0, 0, "s", 0],
                    [0, 0, 0, 0]];
                break;
        }
    } else if (tetris.pecaActual.color == "roig") {
        switch (tetris.pecaActual.posicio) {
            case 0:
            case 2:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    [0, "z", "z", 0],
                    [0, 0, "z", "z"],
                    [0, 0, 0, 0]];
                break;
            case 1:
            case 3:
                tetris.pecaActual.forma = [
                    [0, 0, "z", 0],
                    [0, "z", "z", 0],
                    [0, "z", 0, 0],
                    [0, 0, 0, 0]];
                break;
        }
    } else if (tetris.pecaActual.color == "taronga") {
        switch (tetris.pecaActual.posicio) {
            case 0:
                tetris.pecaActual.forma = [
                    [0, "t", 0, 0],
                    [0, "t", 0, 0],
                    [0, "t", "t", 0],
                    [0, 0, 0, 0]];
                break;
            case 1:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    [0, 0, "t", 0],
                    ["t", "t", "t", 0],
                    [0, 0, 0, 0]];
                break;
            case 2:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    [0, "t", "t", 0],
                    [0, 0, "t", 0],
                    [0, 0, "t", 0]];
                break;
            case 3:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    ["t", "t", "t", 0],
                    ["t", 0, 0, 0],
                    [0, 0, 0, 0]];
                break;
        }
    } else if (tetris.pecaActual.color == "lila") {
        switch (tetris.pecaActual.posicio) {
            case 0:
                tetris.pecaActual.forma = [
                    [0, 0, "j", 0],
                    [0, 0, "j", 0],
                    [0, "j", "j", 0],
                    [0, 0, 0, 0]];
                break;
            case 1:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    ["j", 0, 0, 0],
                    ["j", "j", "j", 0],
                    [0, 0, 0, 0]];
                break;
            case 2:
                tetris.pecaActual.forma = [
                    [0, "j", "j", 0],
                    [0, "j", 0, 0],
                    [0, "j", 0, 0],
                    [0, 0, 0, 0]];
                break;
            case 3:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    ["j", "j", "j", 0],
                    [0, 0, "j", 0],
                    [0, 0, 0, 0]];
                break;
        }
    } else if (tetris.pecaActual.color == "morat") {
        switch (tetris.pecaActual.posicio) {
            case 0:
                tetris.pecaActual.forma = [
                    [0, 0, 0, 0],
                    ["i", "i", "i", 0],
                    [0, "i", 0, 0],
                    [0, 0, 0, 0]];
                break;
            case 1:
                tetris.pecaActual.forma = [
                    [0, "i", 0, 0],
                    ["i", "i", 0, 0],
                    [0, "i", 0, 0],
                    [0, 0, 0, 0]];
                break;
            case 2:
                tetris.pecaActual.forma = [
                    [0, "i", 0, 0],
                    ["i", "i", "i", 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
                break;
            case 3:
                tetris.pecaActual.forma = [
                    [0, "i", 0, 0],
                    [0, "i", "i", 0],
                    [0, "i", 0, 0],
                    [0, 0, 0, 0]];
                break;
        }
    }

    if(!tetris.pecaActual.comprobarColisioPecaRotacio()){
        if("Derecha" == rotacio){
            tetris.pecaActual.posicio--;
        }else if("Izquierda"== rotacio){
            tetris.pecaActual.posicio++;
        }
        tetris.pecaActual.actualizarForma(rotacio);
    }
};


//-----------------------------------------------------------------------------------------------------------------------------
//Este es el objeto que contiene las bases del juego, ya sean las variables que permiten que el juego funciona como los metodos necesarios para jugarlo.
var Tetris = function ()
{
    this.tableroLimpio = [
//       0, 1, 2 ,3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //0
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //1
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //2
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //3
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //4
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //5
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //6
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //7
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //8
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //9
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //10
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //11
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //12
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //13
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //14
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //15
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //16
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //17
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //18
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //19
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //20
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //21
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //22
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //23
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //24
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  //25
    ];
    this.tablero = this.tableroLimpio;

    this.puntuacio = 0;
    this.puntuacioMax = 0;
    this.pecaActual;
    this.pecaSeguent;
    this.contador = ["i"], ["j"], ["l"], ["o"], ["s"], ["t"], ["z"];
    this.contadorTotal = 1;
    this.contador["i"] = 0;
    this.contador["j"] = 0;
    this.contador["l"] = 0;
    this.contador["o"] = 0;
    this.contador["s"] = 0;
    this.contador["t"] = 0;
    this.contador["z"] = 0;
    this.nivell = 1;
    this.velocitat = 1000;
};
//El metodo gameOver, muestra un alert de fin de juego, y reinicia la variables del juego para volver a ajugar.
Tetris.prototype.gameOver = function ()
{
    tetris.tablero = tetris.tableroLimpio;
    tetris.nivell = 1;
    tetris.velocitat = 1000;
    tetris.contadorTotal = 0;
    tetris.contador["i"] = 0;
    tetris.contador["j"] = 0;
    tetris.contador["l"] = 0;
    tetris.contador["o"] = 0;
    tetris.contador["s"] = 0;
    tetris.contador["t"] = 0;
    tetris.contador["z"] = 0;
    if(tetris.puntuacioMax > tetris.puntuacio){
        tetris.puntuacioMax = tetris.puntuacio;
    }
    tetris.puntuacio = 0;
    alert("GAME OVER");
    tetris.Iniciar();
};
//Iniciar genera las dos piezas necesarias para jugar, y aumenta el contador de la pieza pertinete.
Tetris.prototype.Iniciar = function ()
{
    tetris.pecaActual = tetris.GeneraPecaAleatoria();
    tetris.pecaSeguent = tetris.GeneraPecaAleatoria();
    tetris.contador[tetris.pecaActual.forma[1][1]]++;
};
//EliminarPeca iguala al tablero la pieza para que se imprima la pieza de forma permantente en el tabelro.
Tetris.prototype.EliminarPeca = function () {
    for (var x = 0; x <= tetris.pecaActual.forma.length-1; x++) {
        for (var y = 0; y <= tetris.pecaActual.forma[0].length-1; y++) {
            if ((tetris.pecaActual.forma[x][y]) != 0) {
                tetris.tablero[x+tetris.pecaActual.posX][y+tetris.pecaActual.posY] = tetris.pecaActual.forma[x][y];
            }
        }
    }
    tetris.novaPecas();
};
//imprimir crida a les funcions globas per imrpimir el taulell y la informació.
Tetris.prototype.imprimir = function () {
    imprimirTetris();
    imprimirInformacio();
};
/*
 * NovesPecas iguala la siguiente pieza a la actual, genera una nueva pieza en peca seguent
 * hace la llamada para comprobar si la linea esta completa, actualizar contadores, y el nivel
 */
Tetris.prototype.novaPecas = function ()
{
    tetris.pecaActual = tetris.pecaSeguent
    tetris.pecaSeguent = tetris.GeneraPecaAleatoria();
    tetris.comprobaLlineaCompleta();
    tetris.contador[tetris.pecaActual.forma[1][1]]++;
    tetris.contadorTotal++;
    tetris.puntuacio = tetris.puntuacio + 10;
    if ((tetris.contadorTotal % 10) == 0) {
        tetris.lvelUP();
    }
};
//levelUP aumenta el nivel y la puntuacion
Tetris.prototype.levelUP = function ()
{
    tetris.level++;
    alert("LVL:"+tetris.level);
    if (tetris.level <= 9) {
        tetris.velocitat = tetris.velocitat - 100;
    }
    tetris.puntuacio = tetris.puntuacio + 20;
};
/*comprobaLlineaCompleta mira por todo el tablero si la linea esta completa,
 * En caso de que sea verdad, la elimina, actualiza la puntuación y llama a gravetatTableroDown
*/
Tetris.prototype.comprobaLlineaCompleta = function ()
{
    var lineaCompleta = 0;
    for (var x = 0; x < tetris.tablero.length - 1; x++) {
        for (var y = 0; y < tetris.tablero[0].length - 1; y++) {
            if(tetris.tablero[x][y]!=0 && tetris.tablero[x][y]!=1){
                lineaCompleta++;
            }
        }
        if(lineaCompleta >= 15){
            tetris.puntuacio = tetris.puntuacio + 100;
            for (var y = 1; y <= tetris.tablero[0].length - 2; y++) {
                tetris.tablero[x][y] = 0;
            }
            tetris.gravetatTableroDown(x-1);
        }
        lineaCompleta = 0;
    }
};
/*gravetatTableroDown repasa todo el tablero a partir de la posición de la pieza eliminada,
 * hacia arriba y si la pieza de la posición concreta puede bajar, lo ara.
 */
Tetris.prototype.gravetatTableroDown = function (VarX) {
    for (var x = VarX; x > 0 ; x--) {
        for (var y = tetris.tablero[0].length - 2; y > 0; y--) {
            tetris.tablero[x+1][y] = tetris.tablero[x][y];
            tetris.tablero[x][y] = 0;
        }
    }
};
Tetris.prototype.GeneraPecaAleatoria = function ()
{
    var peces = [
        [[
                [0, 0, 0, 0],
                [0, "o", "o", 0],
                [0, "o", "o", 0],
                [0, 0, 0, 0]], "groc"],
        [[
                [0, "l", 0, 0],
                [0, "l", 0, 0],
                [0, "l", 0, 0],
                [0, "l", 0, 0]], "blau"],
        [[
                [0, 0, 0, 0],
                [0, "s", "s", 0],
                ["s", "s", 0, 0],
                [0, 0, 0, 0]], "verd"],
        [[
                [0, 0, 0, 0],
                [0, "z", "z", 0],
                [0, 0, "z", "z"],
                [0, 0, 0, 0]], "roig"],
        [[
                [0, "t", 0, 0],
                [0, "t", 0, 0],
                [0, "t", "t", 0],
                [0, 0, 0, 0]], "taronga"],
        [[
                [0, "j", "j", 0],
                [0, "j", 0, 0],
                [0, "j", 0, 0],
                [0, 0, 0, 0]], "lila"],
        [[
                [0, 0, 0, 0],
                ["i", "i", "i", 0],
                [0, "i", 0, 0],
                [0, 0, 0, 0]], "morat"]
    ]

    var numeroAleatori = Math.round(Math.random() * 6);
    var peca = new Peca(0, Math.trunc(tetris.tablero[0].length / 2) - 2, peces[numeroAleatori][0], peces[numeroAleatori][1]);
    return peca;
};
var tetris = new Tetris();


/*
 * imprimirTetris imprime el tablero en el canvas espai. 
 * Empieza por imprimir todo tablero, despues comprueba si la posición de los for
 * esta en la pieza actual con comprobarPosicioPecaX y comprobarPosicioPecaY, 
 * despues comprueba si esta posición contiena la pieza, si es así la imprime.
 */
function imprimirTetris() {
    var tamañoImagen = 25;
    var canvas = document.getElementById("espai");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 425, 650);
    var img;
    var imprimir = "";
    for (var x = 0; x <= tetris.tablero.length - 1; x++) {
        for (var y = 0; y <= tetris.tablero[0].length - 1; y++) {
            img = impimirTablero(x,y);
            if (comprobarPosicioPecaX(x, y)) {
                if ((tetris.pecaActual.forma[x - tetris.pecaActual.posX][y - tetris.pecaActual.posY]) != 0) {
                    img = imprimirPixelColorPecaActual();
                }
            }
            ctx.drawImage(img, y * tamañoImagen, x * tamañoImagen, tamañoImagen, tamañoImagen);
        }
    }
}
/*
 * comprobarPosicioPecaX y comprobarPosicioPecaY Miran si los for de imprimirTetris
 * estan dentro de la variable forma, del objeto peca. Concretamente la pieza actual.
 */
function comprobarPosicioPecaX(x, y) {
    var bool = false;
    if (tetris.pecaActual.posX == x) {
        bool = comprobarPosicioPecaY(y);
    } else if ((tetris.pecaActual.posX + 1) == x) {
        bool = comprobarPosicioPecaY(y);
    } else if ((tetris.pecaActual.posX + 2) == x) {
        bool = comprobarPosicioPecaY(y);
    } else if ((tetris.pecaActual.posX + 3) == x) {
        bool = comprobarPosicioPecaY(y);
    }
    return bool;
}

function comprobarPosicioPecaY(y) {
    var bool = false;
    if (tetris.pecaActual.posY == y) {
        bool = true;
    } else if ((tetris.pecaActual.posY + 1) == y) {
        bool = true;
    } else if ((tetris.pecaActual.posY + 2) == y) {
        bool = true;
    } else if ((tetris.pecaActual.posY + 3) == y) {
        bool = true;
    }
    return bool;
}

//
function imprimirInformacio() {
    document.getElementById("puntuacioMax").innerHTML  = "Maxima puntuació: "+tetris.puntuacioMax;
    document.getElementById("puntuacio").innerHTML  = "Puntuació: "+tetris.puntuacio;
    document.getElementById("nivell").innerHTML  = "Nivell: "+tetris.nivell;
    document.getElementById("pecasTotals").innerHTML  = "Peçes totals: "+tetris.contadorTotal;
    document.getElementById("velocitat").innerHTML  = "Velocitat: "+tetris.velocitat;
    document.getElementById("i").innerHTML  = "Morat (i): " + tetris.contador["i"];
    document.getElementById("j").innerHTML  = "Lila (j): "+tetris.contador["j"];
    document.getElementById("l").innerHTML  = "Blau (l): "+tetris.contador["l"];
    document.getElementById("o").innerHTML  = "Groc (o): "+tetris.contador["o"];
    document.getElementById("s").innerHTML  = "Verd (s): "+tetris.contador["s"];
    document.getElementById("t").innerHTML  = "Taronga (t): "+tetris.contador["t"];
    document.getElementById("z").innerHTML  = "Roig (z): "+tetris.contador["z"];
    
    var tamañoImagen = 25;
    var canvas = document.getElementById("seguent");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 100, 100);
    var img;

    for (var x = 0; x <= tetris.pecaSeguent.forma.length - 1; x++) {
        for (var y = 0; y <= tetris.pecaSeguent.forma[0].length - 1; y++) {
            if ((tetris.pecaSeguent.forma[x][y]) != 0) {
                img = imprimirPixelColorPecaSeguent();

            } else {
                img = document.getElementById("fondo");
            }
            ctx.drawImage(img, y * tamañoImagen, x * tamañoImagen, tamañoImagen, tamañoImagen);
        }
    }
}
//Comprubea que imagen imprimir del tablero.
function impimirTablero(x,y) {
    var img;
    if (tetris.tablero[x][y] == "o") {
        img = document.getElementById("amarillo");
    } else if (tetris.tablero[x][y] == "l") {
        img = document.getElementById("azul");
    } else if (tetris.tablero[x][y] == "s") {
        img = document.getElementById("verde");
    } else if (tetris.tablero[x][y] == "z") {
        img = document.getElementById("red");
    } else if (tetris.tablero[x][y] == "t") {
        img = document.getElementById("naranga");
    } else if (tetris.tablero[x][y] == "j") {
        img = document.getElementById("lila");
    } else if (tetris.tablero[x][y] == "i") {
        img = document.getElementById("morado");
    }else if (tetris.tablero[x][y] == 1) {
        img = document.getElementById("pared");
    }else{
        img = document.getElementById("fondo");
    }
    return img;
}
//Comprubea que imagen imprimir del form, de la pecaactual.
function imprimirPixelColorPecaActual() {
    var img;
    if (tetris.pecaActual.color == "groc") {
        img = document.getElementById("amarillo");
    } else if (tetris.pecaActual.color == "blau") {
        img = document.getElementById("azul");
    } else if (tetris.pecaActual.color == "verd") {
        img = document.getElementById("verde");
    } else if (tetris.pecaActual.color == "roig") {
        img = document.getElementById("red");
    } else if (tetris.pecaActual.color == "taronga") {
        img = document.getElementById("naranga");
    } else if (tetris.pecaActual.color == "lila") {
        img = document.getElementById("lila");
    } else if (tetris.pecaActual.color == "morat") {
        img = document.getElementById("morado");
    }
    return img;
}
//Comprubea que imagen imprimir de la peca seguent.
function imprimirPixelColorPecaSeguent() {
    var img;
    if (tetris.pecaSeguent.color == "groc") {
        img = document.getElementById("amarillo");
    } else if (tetris.pecaSeguent.color == "blau") {
        img = document.getElementById("azul");
    } else if (tetris.pecaSeguent.color == "verd") {
        img = document.getElementById("verde");
    } else if (tetris.pecaSeguent.color == "roig") {
        img = document.getElementById("red");
    } else if (tetris.pecaSeguent.color == "taronga") {
        img = document.getElementById("naranga");
    } else if (tetris.pecaSeguent.color == "lila") {
        img = document.getElementById("lila");
    } else if (tetris.pecaSeguent.color == "morat") {
        img = document.getElementById("morado");
    }
    return img;
}
tetris.Iniciar();
window.setInterval(tetris.pecaActual.movimientoDown, tetris.velocitat);
window.setInterval(tetris.imprimir, 50);


