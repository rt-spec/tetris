export default class Controller{
    constructor(game, view){
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlayig = true;
        this.begin =true;
        this.speed  = 1000 - this.game.getState().level * 900;

    //     this.intervalId = setInterval(() => {
    //         this.game.movePieceDown();
    //         //
    //         this.view.render(this.game.getState());
    //    }, 500);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.view.renderStartScreen();
        


    }
  
    changeSpeed(){
        let speed = 100 - this.game.getState().level * 900;
        speed > 0 ? speed : 100;
        return speed;
    }
    
    handleKeyDown(ev){
        switch (ev.code) {
            case "Enter" :
                if (this.topOut) {
                    clearInterval(this.intervalId);
                    this.view.renderOverScreen(d)}
                else if (this.begin) {
                    this.begin = false;
                    this.intervalId = setInterval(() => {
                    this.game.movePieceDown();
                    this.view.render(this.game.getState());
                    
               }, 1000);

                }
                else if ( this.isPlayig ) {
                    this.pause();
                }
                else {
                    this.play();
                }
                break;
            case "ArrowLeft" :
                if (!this.isPlayig || this.game.topOut) break;
                else {
                this.game.movePieceLeft();
                this.update()}
                break;
            case "ArrowUp" :
                if (!this.isPlayig || this.game.topOut) break;
                else {this.game.rotatePiece();
                this.update()}
                break;
            case "ArrowRight" :
                if (!this.isPlayig || this.game.topOut) break;
                else {this.game.movePieceRight();
                this.update()}
                break;
            case "ArrowDown" :
                if (!this.isPlayig || this.game.topOut) break;
                else {this.game.movePieceDown();
                this.update()}
                break;
                
            
        }

    }

    pause(){
        this.isPlayig = false;
        this.stopTimer();
        this.update();
    }

    play(){
        this.isPlayig = true;
        this.startTimer();
        this.update();
    }
    
    startTimer(){
        const state = this.game.getState();
        
        if( !this.intervalId){
            this.intervalId = setInterval(() => {
            this.game.movePieceDown();
            this.view.render(this.game.getState());
            if (this.game.topOut){
                clearInterval(this.intervalId);
                const d = this.game.getState().score;
                this.view.renderOverScreen(state);
                
            
            }
            console.log(this.changeSpeed())
            },  this.speed > 0 ?  this.speed : 100);
        }
        
    }

    stopTimer(){
        if( this.intervalId || this.game.topOut){
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

    }

    update(){
        const state = this.game.getState();
        if (this.game.topOut){
            this.view.renderOverScreen(state)
        } else if(!this.isPlayig){
            this.view.renderPauseScreen()
        }
        else 
        this.view.render(state);
    }

    
}