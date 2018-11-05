const ResponseCreate = require('./creates/response');
const IssueTrigger = require('./triggers/issue');
const authentication = require('./authentication');

const xml = require('pixl-xml');

const addApiKeyToHeader = (request, z, bundle) => {
  request.body = request.body || {};
  request.params = request.params || {};
  request.headers = request.headers || {};
  if (bundle.authData.nation) {
    if (request.method == "GET") {
      request.params['nation'] = bundle.authData.nation;
    } else {
      request.body = request.body + "&nation=" + bundle.authData.nation;
    }
  }
  if (bundle.authData.autoLogin) {
    delete request.headers['X-Password'];
    request.headers['X-Autologin'] = bundle.authData.autoLogin;
  }
  if (bundle.authData.pin) {
    delete request.headers['X-Password'];
    request.headers['X-Pin'] = bundle.authData.pin;
  }
  return request;
};

const mustBe200 = (response, z, bundle) => {
  if (response.status !== 200) {
    throw new Error(require('cheerio').load(response.content)('h1').text());
  }
  return response;
};

const parseXML = (response, z, bundle) => {
  response.content = xml.parse(response.content);
  return response;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,
  
  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    addApiKeyToHeader,
  ],

  afterResponse: [
    mustBe200,
    parseXML,
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [IssueTrigger.key]: IssueTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [ResponseCreate.key]: ResponseCreate,
  }
};

// Finally, export the app.
module.exports = App;
