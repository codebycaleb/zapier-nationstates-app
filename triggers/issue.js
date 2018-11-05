const enforceArray = require('../utils/enforceArray')

// triggers on issue with a certain tag
const triggerIssue = (z, bundle) => {
  if (!bundle.meta.standard_poll && !bundle.meta.frontend) {
    return []; // return empty array on poll for dedupe data when enabling Zap
  }
  const responsePromise = z.request({
    url: 'https://www.nationstates.net/cgi-bin/api.cgi',
    params: {
      q: 'issues',
    }
  });
  return responsePromise
    .then(response => enforceArray(response.content.ISSUES.ISSUE)
  );
};

module.exports = {
  key: 'issue',
  noun: 'Issue',

  display: {
    label: 'New Issue',
    description: 'Triggers on a new issue.',
  },

  operation: {
    inputFields: [],
    perform: triggerIssue,

    sample: { id: '24',
      TITLE: 'Budget Time: Accountants Excited',
      TEXT: 'It’s time for the government to allocate spending for the coming year, and as always, special interest groups are keen to have their say.',
      AUTHOR: 'maxtopia',
      PIC1: 'e4',
      PIC2: 'e2',
      OPTION: [
        { id: '0',
          _Data: '“The state of the education system is, in many areas, simply frightful,” says Teachers Union leader Lucy Berenstein. “And even where we are doing well, we could do better. I appeal to the authorities for a substantial boost in funding. Remember, the children are our future.”' },
        { id: '1',
          _Data: '“We won’t have a future unless we improve police numbers and rebuild the military,” says General Sayid Guterres. “Oh, it’s all well and good to have your fancy education and your nice cars, until some tinpot dictatorship decides to invade. And don’t pretend like there aren’t any of them in our region. Our number one priority has to be security.”' },
        { id: '2',
          _Data: '“Education is nice, but Health and Social Welfare are more important,” says celebrity social worker Alexei Navratilova. “This is where the people who really need government help are: the marginalized of our society. If we don’t help them, what kind of a nation are we?”' },
        { id: '3',
          _Data: '“Hey, I’ve got a crazy idea,” says noted libertarian and bird-watcher Ella Thompson. “How about the government stops taking so much tax from people? Give us a tax cut and we’ll buy the things we need ourselves. People need to be weaned off the government teat!”' } 
      ] 
    },

    outputFields: [],
  }
};
