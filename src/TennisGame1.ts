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
    if (this.isScoreEqual()) {
      return this.getEqualScoreResult();
    }
    else if (this.isGameInEndPhase()) {
      if (this.isAdvantagePoint()) return this.getAdvantagePlayerResult();
      else return this.getWinningPlayerResult();
    }
    else {
      return this.getRegularScore()
    }
  }

  private getAdvantagePlayerResult(): string {
    return 'Advantage ' + this.highestScoringPlayerName();
  }

  private isAdvantagePoint() {
    return (this.scoreDifference() === 1) || (this.scoreDifference() === -1);
  }

  private getWinningPlayerResult(): string {
    return 'Win for ' + this.highestScoringPlayerName();
  }

  private highestScoringPlayerName(): string {
    if(this.playerTwoScore > this.playerOneScore) return 'player2'
    return 'player1';
  }

  private isGameWon(): boolean {
    return this.scoreDifference() >= 2;
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
