class URLFactory {
    static createInstanceURL(activityID) {
      return `http://localhost:3000/simulation/${activityID}`;
    }
  }
  
  module.exports = URLFactory;
  