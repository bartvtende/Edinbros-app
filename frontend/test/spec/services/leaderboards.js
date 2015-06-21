'use strict';

describe('Service: Leaderboards', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var Leaderboards;
  beforeEach(inject(function (_Leaderboards_) {
    Leaderboards = _Leaderboards_;
  }));

  it('should do something', function () {
    expect(!!Leaderboards).toBe(true);
  });

});
