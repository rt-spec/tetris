//import Game from "./game";

export default class View {
    static colors = {
        '1' : 'cyan',
        '2' : 'blue',
        '3' : 'orange',
        '4' : 'yellow',
        '5' : 'green',
        '6' : 'purple',
        '7' : 'red'   
        }

    constructor(element, width, heigth, rows, columns ) {
        this.element = element;
        this.width = width;
        this.heigth = heigth;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.heigth;
        this.context = this.canvas.getContext('2d');
        this.playFieldBorderWidth = 4;
        this.playFieldX = this.playFieldBorderWidth;
        this.playFieldY = this.playFieldBorderWidth;
        this.playFieldWidth = this.width * 2 / 3;
        this.playFieldHeight = this.heigth;
        this.playFieldInnerWidth = this.playFieldWidth - this.playFieldBorderWidth * 2;
        this.playFieldInnerHeight = this.playFieldHeight - this.playFieldBorderWidth * 2;

        this.panelX = this.playFieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.heigth = heigth;


        this.blockWidth = this.playFieldInnerWidth/ columns;
        this.blockHeigth = this.playFieldInnerHeight/ rows;
        this.element.appendChild(this.canvas);
    }

    render(state) {
        this.context.clearRect(0, 0, this.width, this.heigth);
        this.renderPlayField(state);
        this.renderPanel(state);
    }

    renderStartScreen(){
        this.context.fillStyle = 'white';
        this.context.font = '44px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Start', this.width / 2, this.heigth / 2);
    }

    renderPauseScreen(){
        this.context.fillStyle ="rgba(0,0,0,0.5)";
        // this.context.fillStyle = 'black';
        // this.context.globalAlpha = 0.5;
        this.context.fillRect(0, 0, this.width, this.heigth )
        this.context.fillStyle = 'white';
        this.context.font = '44px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Continue', this.width / 2, this.heigth / 2);
    }

    renderOverScreen({score}){
        this.context.clearRect(0, 0, this.width, this.heigth);
        this.context.fillStyle ="rgba(0,0,0,0.5)";
        //this.context.globalAlpha = 0.5;
        this.context.fillRect(0, 0, this.width, this.heigth )
        this.context.fillStyle = 'white';
        this.context.font = '44px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Game OVER', this.width / 2, this.heigth / 2 - 48);
        this.context.fillText('Score : ' + score, this.width / 2, this.heigth / 2);
    }

    renderPlayField({playField}){
        for (let y = 0; y < playField.length; y++){
            const line = playField[y];
            for (let x = 0; x < line.length; x++){
                    const block = line[x];

                    if (block){
                       this.renderBlock(
                           this.playFieldX + (x * this.blockWidth),
                           this.playFieldY + (y * this.blockHeigth), 
                           this.blockWidth, 
                           this.blockHeigth, 
                           View.colors[block]
                           ); 
                    }

            }   
        }
        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playFieldBorderWidth;
        this.context.strokeRect(0, 0 , this.playFieldWidth, this.playFieldHeight)
    }
    
    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '24px "Press Start 2P"';
        this.context.fillText('Score : ' + score , this.panelX , this.panelY + 0);
        this.context.fillText('Level : ' + level , this.panelX , this.panelY + 44);
        this.context.fillText('Lines : ' + lines , this.panelX , this.panelY + 88);
        this.context.fillText('Next : ', this.panelX , this.panelY + 132);
        for (let y = 0; y < nextPiece.blocks.length; y++){
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];
                if (block){
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * 0.5),
                        this.panelY + 160 + (y * this.blockHeigth * 0.5),
                        this.blockWidth * 0.5,
                        this.blockHeigth * 0.5,
                        View.colors[block]

                    )
                }
            }
        }

    }
    
    renderBlock(x , y, width, heigth, color){
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillRect(x, y, width, heigth);
        this.context.strokeRect(x, y, width, heigth);

    }
    
}