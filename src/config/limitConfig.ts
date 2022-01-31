import { default as limit } from '../config/limit.json';

const limitConfig = {
  windowMs: process.env.LIMIT_WINDOW_MS
    ? +process.env.LIMIT_WINDOW_MS
    : limit.windowMs,
  max: process.env.LIMIT_MAX ? +process.env.LIMIT_MAX : limit.max,
  keyGenerator: function (req) {
    return req.headers['x-real-ip'];
  },
};
export { limitConfig };
