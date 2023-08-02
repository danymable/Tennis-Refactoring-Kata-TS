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
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.playerOneScore += 1;
    else
      this.playerTwoScore += 1;
  }

  getScore(): string {
    if (this.isScoreEqual()) {
      if (this.playerOneScore >= 3) return 'Deuce'
      return TennisScoreNames[this.playerOneScore] + '-All';
    }
    else if (this.isGameInEndPhase()) {
      if (this.scoreDifference() === 1) return 'Advantage player1';
      else if (this.scoreDifference() === -1) return 'Advantage player2';
      else if (this.scoreDifference() >= 2) return 'Win for player1';
      else return 'Win for player2';
    }
    return this.getRegularScoreResult();
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
    return this.playerOneScore - this.playerTwoScore;
  }

  private isGameInEndPhase() {
    return this.playerOneScore >= 4 || this.playerTwoScore >= 4;
  }

  private isScoreEqual() {
    return this.playerOneScore === this.playerTwoScore;
  }
}
