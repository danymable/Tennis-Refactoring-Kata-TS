import { TennisGame } from './TennisGame';

enum ScoreNames {
  Love,
  Fifteen,
  Thirty,
  Forty
}

export class TennisGame1 implements TennisGame {
  private playerOneScore: number = 0;
  private playerTwoScore: number = 0;
  private playerOneName: string;
  private playerTwoName: string;


  constructor(playerOneName: string, playerTwoName: string) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.playerOneName)
      this.playerOneScore += 1;
    else
      this.playerTwoScore += 1;
  }

  getScore(): string {
    let score: string = '';
    let tempScore: number = 0;
    if (this.isScoreEqual()) {
      return this.getEqualScoreResult();
    }
    else if (this.isGameInEndPhase()) {
      const minusResult: number = this.playerOneScore - this.playerTwoScore;
      if (minusResult === 1) score = 'Advantage player1';
      else if (minusResult === -1) score = 'Advantage player2';
      else if (minusResult >= 2) score = 'Win for player1';
      else score = 'Win for player2';
    }
    else {
      for (let playerNumber = 1; playerNumber < 3; playerNumber++) {
        if (playerNumber === 1) tempScore = this.playerOneScore;
        else { score += '-'; tempScore = this.playerTwoScore; }
        switch (tempScore) {
          case 0:
            score += ScoreNames[0];
            break;
          case 1:
            score += ScoreNames[1];
            break;
          case 2:
            score += ScoreNames[2];
            break;
          case 3:
            score += ScoreNames[3];
            break;
        }
      }
    }
    return score;
  }

  private getEqualScoreResult() {
    if(this.playerOneScore >= 3) return 'Deuce';
    return ScoreNames[this.playerOneScore] + '-All'
  }

  private isGameInEndPhase() {
    return this.playerOneScore >= 4 || this.playerTwoScore >= 4;
  }

  private isScoreEqual() {
    return this.playerOneScore === this.playerTwoScore;
  }
}
