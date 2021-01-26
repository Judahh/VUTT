// file deepcode ignore no-any: any needed
import { BasicService } from '@backapirest/next';
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
    key: process.env.AUTH_PASSWORD,
  };

  async config() {
    return {
      headers: {
        authorization: `Bearer ${await this.token()}`,
      },
    };
  }

  private async getKey() {
    const host = process.env.AUTH_HOST;
    const received = await axios.get(host + '/key', await this.config());
    this.publicKey = received.data.key;
    return this.publicKey;
  }
  private refreshKey() {
    this.keyTimerRunning = false;
    this.getKey();
  }
  async key() {
    if (this.publicKey) {
      if (!this.keyTimerRunning) {
        setTimeout(this.refreshKey.bind(this), 15 * 60 * 1000);
        this.keyTimerRunning = true;
      }
      return this.publicKey;
    } else {
      return this.getKey();
    }
  }
  private async getToken() {
    const host = process.env.AUTH_HOST;
    const received = await axios.post(host + '/signIn', this.credential);
    this.authToken = received.data.token;
    return this.authToken;
  }
  private refreshToken() {
    this.tokenTimerRunning = false;
    this.getToken();
  }
  async token() {
    if (this.authToken) {
      if (!this.tokenTimerRunning) {
        setTimeout(this.refreshToken.bind(this), 15 * 24 * 60 * 60 * 1000);
        this.tokenTimerRunning = true;
      }
      return this.authToken;
    } else {
      return this.getToken();
    }
  }
}
