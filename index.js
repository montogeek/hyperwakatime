let xhr = require('xhr');

let API_KEY = '';
let API_URL = 'https://wakatime.com/api/v1/heartbeats';

exports.onApp = app => {
  API_KEY = app.config.getConfig().wakatimeApiKey;
}

exports.middleware = (state) => (next) => (action) => {
  console.log(API_KEY);
  
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
        'Authorization': `Basic ${btoa(API_KEY)}`
      }
    }, (err, response) => {
    })
  }
  next(action);
}
