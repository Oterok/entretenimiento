//---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------Llamada a funciones y variables globales---------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

//Objeto nave, contiene la posicion, la forma y el color
var Nave = function (posX, posY, forma, color) //Quito la variable color porque ya esta en forma.
{
    this.posX = posX;
    this.posY = posY;
    this.forma = forma;
    this.posicio = 0; //El 0 indica la posicio inicial, servira per fer les rotacions.
    this.color = color;
};

//-----------------------------------------------------------------------------------------------------------------------------
//Este es el objeto base que contiene las bases del juego.
var PirateSpaceLife = function (){
    this.y = 20;
    this.x = 20;
    this.mapa;

};

//---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------Funciones de pirateSpaceLife---------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

    //Esta funcion ara visible el mapa en el html.
    PirateSpaceLife.prototype.imprimir = function (){
        for(var i=0;i<game.y;i++){
            if(i==0){
                document.getElementById('mapa').innerHTML= game.mapa[i][z];
            }else{
                for(var z=0;z<game.x;z++){
                    document.getElementById('mapa').innerHTML='-'+game.mapa[i][z];
                }
            }
        }
    
        document.getElementById('mapa').innerHTML='-'+game.mapa;
        document.write("Y:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+game.mapa[3][5]);
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
game.imprimir();

