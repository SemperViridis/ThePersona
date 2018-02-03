const _ = require('lodash');

const wordCount = function (str, callback) {
  const count = {};
  const input = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  const words = input.split(' ');
  for (let j = 0; j < words.length; j += 1) {
    if (count[words[j]]) {
      count[words[j]] += 1;
    } else {
      count[words[j]] = 1;
    }
  }
  const sortedKeys = Object.keys(count).sort(function (a, b) {
    return count[b] - count[a];
  });
  const sorted = {};
  for (let k = 0; k < sortedKeys.length; k += 1) {
    sorted[sortedKeys[k]] = count[sortedKeys[k]];
  }
  if (callback) {
    callback(sorted);
  }
  return sorted;
};


const fillerWords = function (str, callback, fillers) {
  fillers = fillers || ['like', 'so', 'mean', 'order', 'basically', 'essentially', 'totally', 'completely', 'absolutely', 'literally', 'actually', 'simply', 'pretty', 'okay', 'well', 'seriously', 'guess', 'suppose', 'slighty', 'somehow', 'maybe', 'perhaps', 'definitely', 'alright'];

  const counts = wordCount(str);
  const total = _.reduce(counts, (sum, n) => {
    return sum + n;
  }, 0);
  const fillerCounts = {};

  for (let k = 0; k < fillers.length; k += 1) {
    if (counts[fillers[k]]) {
      fillerCounts[fillers[k]] = counts[fillers[k]];
    }
  }
  const output = [counts, fillerCounts, total];
  console.log(output);
  if (callback) {
    callback(output);
  }
  return fillerCounts;
};

module.exports.fillerWords = fillerWords;

module.exports.wordCount = wordCount;
