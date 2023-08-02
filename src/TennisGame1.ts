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
    if (this.isScoreEqual()) {
      return this.getEqualScoreResult();
    }
    else if (this.isGameInEndPhase()) {
      if (this.scoreDifference() === 1) score = 'Advantage player1';
      else if (this.scoreDifference() === -1) score = 'Advantage player2';
      else if (this.scoreDifference() >= 2) score = 'Win for player1';
      else score = 'Win for player2';
    }
    else {
      return this.getRegularScore()
    }
    return score;
  }

  private scoreDifference(): number {
    return this.playerOneScore - this.playerTwoScore;
  }

  private getRegularScore(): string {
    return ScoreNames[this.playerOneScore] + '-' + ScoreNames[this.playerTwoScore];
  }

  private getEqualScoreResult(): string {
    if(this.playerOneScore >= 3) return 'Deuce';
    return ScoreNames[this.playerOneScore] + '-All'
  }

  private isGameInEndPhase(): boolean {
    return this.playerOneScore >= 4 || this.playerTwoScore >= 4;
  }

  private isScoreEqual(): boolean {
    return this.playerOneScore === this.playerTwoScore;
  }
}
