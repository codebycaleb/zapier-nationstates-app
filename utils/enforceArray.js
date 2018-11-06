module.exports = (response, z, bundle) => {
  if (Array.isArray(response)) {
    return response;
  } else if (response == undefined) {
    return [];
  }
  return [response];
}
