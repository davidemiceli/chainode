'use strict';

// Requirements
import axios from 'axios';

// Configurations
import Configs from '@/src/configs';

// Services
class Blocks {

  constructor() {
    this.API_URL = `${Configs.baseurl}/api/block`;
  }

  // Propose block data
  async propose(block) {
    try {
      const data = {
        data: block
      };
      const r = await axios.post(`${this.API_URL}/propose`, data);
      return r.data;
    } catch(e) {
      throw e;
    }
  }

  // Send data to one peer
  async list(condition) {
    try {
      const r = await axios.post(`${this.API_URL}/list`, condition);
      return r.data;
    } catch(e) {
      throw e;
    }
  }

};

export const BlockServices = new Blocks();
