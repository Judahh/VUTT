// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import { setTimeout } from 'timers';
import axios from 'axios';

export default class KeyService extends BasicService {
  private publicKey;
  private timerRunning;

  private async getKey() {
    const host = process.env.AUTH_HOST;
    const received = await axios.get(host + '/key');
    this.publicKey = received.data.key;
    return this.publicKey;
  }
  private clearKey() {
    this.timerRunning = false;
    this.getKey();
  }
  public async key() {
    if (this.publicKey) {
      if (!this.timerRunning) {
        setTimeout(this.clearKey.bind(this), 15 * 60 * 1000);
        this.timerRunning = true;
      }
      return this.publicKey;
    } else {
      return await this.getKey();
    }
  }
}
