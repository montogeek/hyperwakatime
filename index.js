const debounce = require('lodash.debounce')
const exec = require('child_process').exec
const command = '/usr/local/bin/wakatime --entity Terminal --entity-type app --plugin "hyper-wakatime/0.0.2" --project "<<LAST_PROJECT>>"'

function sendHearbeat() {
  exec(command, function cb(error, stdout, stderr) {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

const debounceBeat = debounce(sendHearbeat, 60000)

exports.middleware = (state) => (next) => (action) => {
  debounceBeat()
  next(action)
}