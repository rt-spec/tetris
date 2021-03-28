export default class Controller{
    constructor(game, view){
        this.game = game;
        this.view = view;
        this.timerId = null;
        this.isPlayig = false;
        this.begin =true;
        this.speed  = 1000 - this.game.getState().level * 900;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.view.renderStartScreen();
        if (this.game.topOut)  {
            this.view.renderOverScreen(this.game.getState());
            clearTimeout(timerId);
        }
    }
        // move(){
        //     this.game.movePieceDown();
        //     this.view.render(this.game.getState());
            
        // }
        changeSpeed(){
            let speed = 1000 - this.game.getState().level * 900;
            speed > 0 ? speed : 100;
            return speed;
        }
        handleKeyDown(ev){
            switch (ev.code) {
            
                case "Enter" :
                if (this.game.topOut) {
                    clearTimeout(timerId);
                    this.view.renderOverScreen(this.game.getState());
                    break}

                else  if (!this.isPlayig){
                    this.isPlayig = true;
                    this.timerId = setTimeout(function move(){
                    this.game.movePieceDown();
                    let speed = 1000 - this.game.getState().level * 200;
                    speed > 0 ? speed : 100;
                    this.view.render(this.game.getState());
                    this.timerId = setTimeout(move, speed)
                }, 500)

                    }
                    else if (this.isPlayig) {
                        this.isPlayig = false;
                        clearTimeout(timerId);
                        this.view.renderPauseScreen();
                
                    }
                    
                    break;
                    case "ArrowLeft" :
                        this.game.movePieceLeft();
                        this.view.render(this.game.getState());
                        if (this.game.topOut) {
                            clearTimeout(timerId);
                            this.view.renderOverScreen(this.game.getState())}
                        break;
                    case "ArrowRight" :
                        this.game.movePieceRight();
                        this.view.render(this.game.getState());
                        if (this.game.topOut) {
                            clearTimeout(timerId);
                            this.view.renderOverScreen(this.game.getState())}
                        break;
                    case "ArrowUp" :
                        this.game.rotatePiece();
                        this.view.render(this.game.getState());
                        if (this.game.topOut) {
                            clearTimeout(timerId);
                            this.view.renderOverScreen(this.game.getState())}
                        break;
                    case "ArrowDown" :
                        this.game.movePieceDown();
                        this.view.render(this.game.getState());
                        if (this.game.topOut) {
                            clearTimeout(timerId);
                            this.view.renderOverScreen(this.game.getState())}
                        break;






        }
         
    }
        
                
            
        
    
        
    }
        

        
       
      