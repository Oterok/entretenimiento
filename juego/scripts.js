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
//Este es el objeto base que contiene las bases del juego.
var PirateSpaceLife = function (){
    this.y = 50;
    this.x = 50;
    this.mapa;

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

                ctx.drawImage(img, tamañoImagen, tamañoImagen, tamañoImagen, tamañoImagen);
            }
        }
    }

    PirateSpaceLife.prototype.prova = function (){
        var tamañoImagen = 25;
        var canvas = document.getElementById("espai");
        
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 425, 650);
        
        var img;
        img = document.getElementById("pared");
        img.onload = function () {
            canvas.drawImage(img, tamañoImagen, tamañoImagen);
        }
        /*
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, tamañoImagen, tamañoImagen);
        };
        img.src = "pared.jpg";

        */

    }

    PirateSpaceLife.prototype.selecccionarPixel = function (x,y){
        var img;
        if (game.mapa[x][y] == "1") {
            img = document.getElementById("lila");
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
                    game.mapa[i][z]=0;
                }else{
                    game.mapa[i][z]=1;
                }
            }
        }
    }

var game = new PirateSpaceLife();

game.generarMapaVacio();
//game.prova();
game.imprimirGame();
//game.imprimir();

/*
var app = ( function () {
    var canvas = document.getElementById( 'espai' ),
        context = canvas.getContext( '2d' ),
 
        // API
        public = {};
 
        public.loadPicture = function () {
            var imageObj = new Image();
            imageObj.src = 'pared.jpg';
         
            imageObj.onload = function () {
                context.drawImage( imageObj, 0, 0 );
            }
        };
 
        return public;
} () );




app.loadPicture();
*/