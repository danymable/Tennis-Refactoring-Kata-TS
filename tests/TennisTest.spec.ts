import * as fs from 'fs';
import * as path from 'path';
import { TennisGame, TennisGame1 } from '../src';

function getAllScores(): Array<[number, number, string]> {
  const testCases = path.resolve(__dirname, 'scores.json');
  const scoreData = fs.readFileSync(testCases).toString();
  const scores = JSON.parse(scoreData);
  return JSON.parse(JSON.stringify(scores));
}

const scores: Array<[number, number, string]> = getAllScores();

function checkScore(game: TennisGame, player1Score: number, player2Score: number, expectedScore: string): void {
  const highestScore: number = Math.max(player1Score, player2Score);
  for (let i = 0; i < highestScore; i++) {
    if (i < player1Score) {
      game.wonPoint('player1');
    }
    if (i < player2Score) {
      game.wonPoint('player2');
    }
  }
  expect(game.getScore()).toEqual(expectedScore);
}

function winGame(game: TennisGame, playerOneName: string) {
  for (let points = 0; points < 4; points++) {
    game.wonPoint(playerOneName);
  }
}



describe('TennisGame', () => {
  describe('reports the correct score', () => {
    scores.forEach(([player1Score, player2Score, expectedScore]) => {
      it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, () => {
        checkScore(new TennisGame1('player1', 'player2'), player1Score, player2Score, expectedScore);
      });
    });
  });
  describe('accepting name inputs', () => {
    let game: TennisGame
    const playerOneName:string = 'player one name'
    const playerTwoName:string = 'player two name'

    it("when player one wins, returns player one's name", ()=>{
      game = new TennisGame1(playerOneName, playerTwoName)
      const expectedScore:string = 'Win for ' + playerOneName
      winGame(game, playerOneName);

      expect(game.getScore()).toEqual(expectedScore);
    });

    it("when player two wins, returns player two's name", ()=>{
      game = new TennisGame1(playerOneName, playerTwoName)
      const expectedScore:string = 'Win for ' + playerTwoName
      winGame(game, playerTwoName);

      expect(game.getScore()).toEqual(expectedScore);
    });
  })
});

