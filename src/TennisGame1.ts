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
    if (this.isScoreEqual())return this.getEqualScoreResult()
    if (this.isGameWon()) return this.getWinningPlayerResult()
    if (this.isAdvantagePoint()) return this.getAdvantagePlayerResult()

    return this.getRegularScore()
  }

  private getAdvantagePlayerResult(): string {
    return 'Advantage ' + this.highestScoringPlayerName();
  }

  private isAdvantagePoint() {
    return this.isGameInEndPhase() && this.scoreDifference() === 1;
  }

  private getWinningPlayerResult(): string {
    return 'Win for ' + this.highestScoringPlayerName();
  }

  private highestScoringPlayerName(): string {
    if(this.playerTwoScore > this.playerOneScore) return this.playerTwoName
    return this.playerOneName;
  }

  private isGameWon(): boolean {
    return this.isGameInEndPhase() && this.scoreDifference() >= 2;
  }

  private scoreDifference(): number {
    return Math.abs(this.playerOneScore - this.playerTwoScore);
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
