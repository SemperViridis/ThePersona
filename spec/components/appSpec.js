const expect = chai.expect;

describe('app', function () {
  let element;

  // beforeEach(angular.mock.module('ui.router'));

  beforeEach(angular.mock.module('app'));

  beforeEach(angular.mock.module('templates'));

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    const scope = $rootScope.$new();
    element = angular.element('<speech></speech>');
    element = $compile(element)(scope);
    $rootScope.$digest();
  }));

  it('should render a speech element', function () {
    const speech = element.find('speech');
    expect(speech.length).to.equal(1);
  });
});
