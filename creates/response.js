// create a particular response by name
const createResponse = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://www.nationstates.net/cgi-bin/api.cgi',
    body: {
      c: 'issue',
      issue: bundle.inputData.issue,
      option: bundle.inputData.option,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  return responsePromise
    .then(response => response.content.ISSUE)
    .then(data => {
      delete data.RANKINGS;
      return data;
    });
};

module.exports = {
  key: 'response',
  noun: 'Response',

  display: {
    label: 'Respond to Issue',
    description: 'Submits a response to an issue.',
  },

  operation: {
    inputFields: [
      {key: 'issue', type: 'integer', dynamic: 'issue.id.TITLE', required: true},
      {key: 'option', type: 'integer', choices: ['0', '1', '2', '-1'], required: true},
    ],
    perform: createResponse,

    sample: {
      "id": "testlandia",
      "ISSUE": {
        "id": "24",
        "choice": "0",
        "OK": "1",
        "DESC": "a large-scale revitalization of the education system is underway",
        "HEADLINES": {
          "HEADLINE": [
            "Small Business Applauds Level Playing Field",
            "Hospitals: Where To Find Them",
            "Neighborhood Groups Celebrate With Street Parties",
            "Military Base Converted To Well-Defended Retirement Village"
          ]
        },
        "RECLASSIFICATIONS": {
          "RECLASSIFICATION": [
            "The Testlandia Economy fell from Developing to Weak.",
          ]
        },
        "UNLOCKS": {
          "BANNER": [
            "111",
          ]
        },
      }
    },
    outputFields: []
  }
};
