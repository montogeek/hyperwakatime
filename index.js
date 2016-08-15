let xhr = require('xhr');

let API_URL = 'https://wakatime.com/api/v1/heartbeats';

exports.middleware = (state) => (next) => (action) => {
  let apiKey = config.getConfig().wakatimeApiKey;

  const options = {
    time: Date.now()/1000,
    type: 'app',
    entity: 'HyperTerm',
    plugin: 'hyperwakatime'
  };

  if(action.type === 'SESSION_ADD_DATA') {
    xhr({
      url: API_URL,
      method: 'POST',
      body: JSON.stringify(options),
      headers: {
        'Authorization': `Basic ${btoa(apiKey)}`
      }
    }, (err, response) => {
      if(response.statusCode !== 201) {
        console.error(response);
      }
    })
  }
  next(action);
}
