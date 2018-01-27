var expect = chai.expect;

describe('app', function () {
  var element;

  beforeEach(module('app'));

  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    var scope = $rootScope.$new();
    element = angular.element('<app></app>');
    element = $compile(element)(scope);
    $rootScope.$digest();
  }));

  it('should render a speech element', function () {
    var speech = element.find('speech');
    expect(speech.length).to.equal(1);
  });
});
