import {Constants} from './Constants'
import Game from "./Game";
import { Board } from './Board';
export class Brick{
      private game: Game;
      private board: Board;
      private constants: Constants;
  
      id: number;
      layout: any;
      activeIndex: number;
      colPos: number;
      rowPos: number;
    
      constructor(id: number, game: Game) {
            this.id = id;
            this.game = game;
            this.constants = new Constants();
            this.board = new Board(this.game)
            this.layout = this.constants.getBrickLayout()[id];
            this.activeIndex = 0;
            this.colPos = 3;
            this.rowPos = 3;
      }

      draw() {
            for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                    if (this.layout[this.activeIndex][row][col] !== this.constants.WHITE_COLOR_ID) {
                        this.board.drawCell(col + this.colPos, row + this.rowPos, this.constants.COLOR_MAPPING[this.id]);
                    }
                }
            }
        }
}