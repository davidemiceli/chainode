'use strict';

// Utilities
class Utils {

  constructor() { }

  // Shortify a string if is longer than "l" length
  short_string(s, l) {
    return (s.length > l) ? s.substr(0, l-1) + '…' : s;
  }
};

export default new Utils();
