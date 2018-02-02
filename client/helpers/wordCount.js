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
