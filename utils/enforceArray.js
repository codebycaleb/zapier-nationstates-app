module.exports = (response, z, bundle) => {
  if (Array.isArray(response)) {
    return response;
  }
  return [response];
}
