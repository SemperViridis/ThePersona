const synaptic = require('synaptic');
const Neuron = synaptic.Neuron,
      Layer = synaptic.Layer,
      Network = synaptic.Network,
      Trainer = synaptic.Trainer,
      Architect = synaptic.Architect;

function Perceptron(input, hidden, output) {
  let inputLayer = new Layer(input);
  let hiddenLayer = new Layer(hidden);
  let outputLayer = new Layer(output);

  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);

  this.set({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });
}

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;