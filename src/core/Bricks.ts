import {Constants} from './Constants'
import Game from "./Game";
export class Brick{
      private constants: Constants;
      private game: Game;
      private id: number;
      private layout: any;

      constructor(id: number, game: Game, constants: Constants) {
            this.id = id;
            this.constants = constants;
            this.game = game;
            this.layout = this.constants.getBrickLayout()[id];
      }
}