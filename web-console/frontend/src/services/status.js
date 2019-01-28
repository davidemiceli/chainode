'use strict';

// Requirements
import axios from 'axios';

// Configurations
import Configs from '@/src/configs';

// Services
class Status {

  constructor() {
    this.API_URL = `${Configs.baseurl}/api`;
  }

  // Propose block data
  async stats() {
    try {
      const r = await axios.get(`${this.API_URL}/stats`);
      return r.data;
    } catch(e) {
      throw e;
    }
  }

};

export const StatusServices = new Status();
