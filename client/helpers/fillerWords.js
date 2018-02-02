let wordCount = function (str) {
  //split the string into a space delimited array
  //then loop through the array counting the frequency of each word in an object
  //return the count Object
  let count = {};
  let words = str.split(' ');
  for (var j = 0; j < words.length; j++) {
    if (count[words[j]]) {
      count[words[j]]++
    } else {
      count[words[j]] = 1;
    }
  }
  return count;
}


var fillerWords = function (str, fillerWords) {
  //create an array with the filler words you would like to check for
  //split the string into an array using the space delimitor
  //count the frequency of each filler word in the input string, put the counts in an object
  //return the object

   fillerWords = fillerWords || ['like', 'so', 'mean', 'know', 'order', 'basically', 'essentially', 'totally', 'completely', 'absolutely', 'literally', 'actually', 'simply', 'pretty', 'kind']

  let counts = wordCount(str);
  let fillerCounts = {};

  for (let k = 0; k < fillerWords.length; k++) {
    if (counts[fillerWords[k]]) {
      fillerCounts[fillerWords[k]] = counts[fillerWords[k]];
    }
  }
  return fillerCounts;
}
