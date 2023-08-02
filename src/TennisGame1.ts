import { TennisGame } from './TennisGame';

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
    let score: string = '';
    let tempScore: number = 0;
    if (this.isScoreEqual()) {
      switch (this.playerOneScore) {
        case 0:
          score = 'Love-All';
          break;
        case 1:
          score = 'Fifteen-All';
          break;
        case 2:
          score = 'Thirty-All';
          break;
        default:
          score = 'Deuce';
          break;

      }
    }
    else if (this.isGameInEndPhase()) {
      if (this.scoreDifference() === 1) score = 'Advantage player1';
      else if (this.scoreDifference() === -1) score = 'Advantage player2';
      else if (this.scoreDifference() >= 2) score = 'Win for player1';
      else score = 'Win for player2';
    }
    else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.playerOneScore;
        else { score += '-'; tempScore = this.playerTwoScore; }
        switch (tempScore) {
          case 0:
            score += 'Love';
            break;
          case 1:
            score += 'Fifteen';
            break;
          case 2:
            score += 'Thirty';
            break;
          case 3:
            score += 'Forty';
            break;
        }
      }
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
