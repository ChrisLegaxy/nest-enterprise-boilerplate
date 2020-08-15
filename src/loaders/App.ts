/**
 * @file App
 *
 * @description
 *    Root for loaders
 *
 * @author       Chris Van <chrisvan.vshmr@gmail.com> | <chris.legaxy@gmail.com>
 * @copyright    CPC
 * @since        1.0.0
 * @version      1.0.0
 */

import { Express } from './Express';

export default class App {
  public static async loadServer(): Promise<void> {
    await Express.init();
  }
}
