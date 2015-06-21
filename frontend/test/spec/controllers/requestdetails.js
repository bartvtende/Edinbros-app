'use strict';

describe('Controller: RequestdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var RequestdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestdetailsCtrl = $controller('RequestdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
