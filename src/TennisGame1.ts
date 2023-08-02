import { TennisGame } from './TennisGame';

enum TennisScoreNames {
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
    if(this.isScoreEqual()) return this.getEqualScoreResult();
    if(this.isGameWon()) return this.getWinningScoreResult();
    if(this.isAdvantagePoint()) return this.getAdvantagePointScoreResult();

    return this.getRegularScoreResult();
  }

  private getEqualScoreResult(): string {
    if (this.playerOneScore >= 3) return 'Deuce';
    return TennisScoreNames[this.playerOneScore] + '-All';
  }

  private getWinningScoreResult(): string {
    return 'Win for ' + this.highestScoringPlayerName();
  }

  private isGameWon() {
    return this.isGameInEndPhase() && this.scoreDifference() >= 2;
  }

  private isAdvantagePoint() {
    return this.isGameInEndPhase() && this.scoreDifference() === 1;
  }

  private getAdvantagePointScoreResult(): string {
    return 'Advantage ' + this.highestScoringPlayerName();
  }

  private highestScoringPlayerName() {
    if(this.playerTwoScore > this.playerOneScore) return this.playerTwoName;
    return this.playerOneName;
  }

  private getRegularScoreResult(score: string = '') {
    let tempScore: number = 0;
    for (let i = 1; i < 3; i++) {
      if (i === 1) tempScore = this.playerOneScore;
      else { score += '-'; tempScore = this.playerTwoScore; }
      score += TennisScoreNames[tempScore];
    }
    return score;
  }

  private scoreDifference(): number {
    return Math.abs(this.playerOneScore - this.playerTwoScore);
  }

  private isGameInEndPhase() {
    return this.playerOneScore >= 4 || this.playerTwoScore >= 4;
  }

  private isScoreEqual() {
    return this.playerOneScore === this.playerTwoScore;
  }
}
