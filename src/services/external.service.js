const axios = require('axios');

class ExternalService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(resource, params = {}) {
    return this.request('GET', resource, null, null, params);
  }

  async post(resource, data, params = {}) {
    return this.request('POST', resource, null, data, params);
  }

  async put(resource, id, data, params = {}) {
    return this.request('PUT', resource, id, data, params);
  }

  async patch(resource, id, data, params = {}) {
    return this.request('PATCH', resource, id, data, params);
  }

  async delete(resource, id, params = {}) {
    return this.request('DELETE', resource, id, null, params);
  }

  async request(method, resource, id = null, data = null, params = {}) {
    let url = `${this.baseURL}/${resource}`;

    if (id !== null) {
      url += `/${id}`;
    }

    const config = { params };

    console.log({ config });

    if (data) {
      config.data = data;
    }

    try {
      const response = await axios({ method, url, ...config });
      return response.data;
    } catch (error) {
      // console.error(error);
      throw new Error('Internal Server Error');
    }
  }
}

module.exports = ExternalService;
