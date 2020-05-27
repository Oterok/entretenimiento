//---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------Llamada a funciones y variables globales---------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

//Objeto nave, contiene la posicion, la forma y el color
var Nave = function (posX, posY, forma, color) //Quito la variable color porque ya esta en forma.
{
    this.posX = posX;
    this.posY = posY;
    this.forma = forma;
    this.posicio = 0; //El 0 indica la posicio inicial, servira para realizar las rotaciones.
    this.color = color;
    this.direccion = direccion;
};

//-----------------------------------------------------------------------------------------------------------------------------
//Este es el objeto base que contiene las bases del juego/mapa.
var PirateSpaceLife = function (){
    this.y = 6;
    this.x = 12;
    this.mapa;
    this.canvas = document.getElementById("espai");
    this.ctx;
    this.tamañoPixel = 25;
};

//---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------Funciones de pirateSpaceLife---------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

    //Esta funcion ara visible el mapa en el html.
    PirateSpaceLife.prototype.imprimir = function (){
        document.write("</br>");
        for(var i=0;i<game.y;i++){
            for(var z=0;z<game.x;z++){
                document.write(game.mapa[i][z]);
                document.write("&nbsp");
            }
            document.write("</br>");
        }
    }

    PirateSpaceLife.prototype.imprimirGame = function (){
        var tamañoImagen = 25;
        var canvas = document.getElementById("espai");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 425, 650);
        var img;
        for (var x = 0; x <= game.mapa.length - 1; x++) {
            for (var y = 0; y <= game.mapa[0].length - 1; y++) {
                img = game.selecccionarPixel(x,y);
                ctx.drawImage(img, y*tamañoImagen, x*tamañoImagen, tamañoImagen, tamañoImagen);
            }
        }
    }

    PirateSpaceLife.prototype.imprimirGame1 = function (){
        game.canvas.style.width = (game.tamañoPixel*game.x)+"px";
        game.canvas.style.height = (game.tamañoPixel*game.y)+"px";
        //alert("W:"+game.canvas.clientWidth+" - H:"+game.canvas.clientHeight);
        game.ctx = game.canvas.getContext("2d");
        game.ctx.clearRect(0, 0, (game.tamañoPixel*game.x), (game.tamañoPixel*game.y));
        var img;
        for (var x = 0; x <= game.mapa.length - 1; x++) {
            for (var y = 0; y <= game.mapa[0].length - 1; y++) {
                img = game.selecccionarPixel(x,y);
                game.ctx.drawImage(img, //indicamos el pixel o imagen a colocar.
                    y*game.tamañoPixel, //indicamos la posición en la y (altura/height).
                    x*game.tamañoPixel, //indicamos la posición en la x (ancho/width).
                    game.tamañoPixel, //indicamos la altura del pixel.
                    game.tamañoPixel); //indicamos el ancho del pixel.
            }
        }
    }

    PirateSpaceLife.prototype.selecccionarPixel = function (x,y){
        var img;
        if (game.mapa[x][y] == "1") {
            img = document.getElementById("fondo");
        }else{
            img = document.getElementById("pared");
        }
        return img;
    }

    //Esta función vacia el mapa delimitando los bordes con un 0 y el resto con 1
    PirateSpaceLife.prototype.generarMapaVacio = function (){
        game.mapa = new Array(game.y);
        for(var i=0;i<game.y;i++){
            game.mapa[i] = new Array(game.x);
            for(var z=0;z<game.x;z++){
                if(i==0 || z==0 || i==(game.y-1) || z ==(game.x-1)){
                    game.mapa[i][z]="0";
                }else{
                    game.mapa[i][z]="1";
                }
            }
        }
    }

var game = new PirateSpaceLife();

game.generarMapaVacio();
//game.imprimirGame();
game.imprimirGame1();
game.imprimir();
