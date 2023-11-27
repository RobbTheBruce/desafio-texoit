export interface MaxMinWinInterval {
  min: {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }[];
  max: {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }[];
}
