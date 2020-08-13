import { Express } from './Express';

export default class App {
  public static async loadServer(): Promise<void> {
    await Express.init();
  }
}
