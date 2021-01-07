// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import { setTimeout } from 'timers';
import axios from 'axios';

export default class KeyService extends BasicService {
  private publicKey;
  private keyTimerRunning;
  private authToken;
  private tokenTimerRunning;

  private credential = {
    type: 'API',
    identification: process.env.AUTH_IDENTIFICATION,
    password: process.env.AUTH_PASSWORD,
  };

  public config() {
    return {
      headers: {
        Authorization: `Bearer ${this.token()}`,
      },
    };
  }

  private async getKey() {
    const host = process.env.AUTH_HOST;
    const received = await axios.get(host + '/key');
    this.publicKey = received.data.key;
    return this.publicKey;
  }
  private clearKey() {
    this.keyTimerRunning = false;
    this.getKey();
  }
  public async key() {
    if (this.publicKey) {
      if (!this.keyTimerRunning) {
        setTimeout(this.clearKey.bind(this), 15 * 60 * 1000);
        this.keyTimerRunning = true;
      }
      return this.publicKey;
    } else {
      return await this.getKey();
    }
  }
  private async getToken() {
    const host = process.env.AUTH_HOST;
    const received = await axios.post(host + '/signIn', this.credential);
    this.authToken = received.data.token;
    return this.authToken;
  }
  private clearToken() {
    this.tokenTimerRunning = false;
    this.getToken();
  }
  public async token() {
    if (this.authToken) {
      if (!this.tokenTimerRunning) {
        setTimeout(this.clearToken.bind(this), 15 * 24 * 60 * 60 * 1000);
        this.tokenTimerRunning = true;
      }
      return this.authToken;
    } else {
      return await this.getToken();
    }
  }
}
