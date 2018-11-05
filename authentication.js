const test = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://www.nationstates.net/cgi-bin/api.cgi',
    params: {
      q: 'ping'
    },
    headers: {
      'X-Password': bundle.authData.password,
    },
  });
  return responsePromise.then(response => {
    /*
    z.console.log('autologin: ' + response.headers['autologin']);
    z.console.log('x-autologin: ' + response.headers['x-autologin']);
    z.console.log('pin: ' + response.headers['pin: ']);
    z.console.log('x-pin: : ' + response.headers['x-pin: ']);
    */
    if (response.headers._headers['x-autologin']) {
      response.content['autoLogin'] = response.headers._headers['x-autologin'][0];
    }
    if (response.headers._headers['x-pin']) {
      response.content['pin'] = response.headers._headers['x-pin'][0];
    }
    return response.content;
  });
};

const label = '{{id}}';

module.exports = {
  type: 'session',
  fields: [
    {key: 'nation', required: true},
    {key: 'password', required: true, type: 'password'},
    {key: 'autoLogin', required: false, computed: true},
    {key: 'pin', required: false, computed: true},
  ],
  test: test,
  sessionConfig: {
    perform: test,
  },
  connectionLabel: label,
}