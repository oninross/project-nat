'use strict';

import Dashboard from '../dashboard';

describe('Dashboard View', function() {

  beforeEach(() => {
    this.dashboard = new Dashboard();
  });

  it('Should run a few assertions', () => {
    expect(this.dashboard).toBeDefined();
  });

});
