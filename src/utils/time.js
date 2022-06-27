export const time = {
  toTimeFormat: (seconds) => {
    let timeLeft = {
      days: Math.floor(seconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor((seconds / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((seconds / 1000 / 60) % 60),
      seconds: Math.floor((seconds / 1000) % 60),
    };
    return timeLeft;
  },
  toString: (date_sample) => {
    let d;
    if (date_sample) {
      d = new Date(date_sample);
    } else {
      d = new Date();
    }
    return d.toString();
  },
};
