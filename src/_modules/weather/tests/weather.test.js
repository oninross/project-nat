'use strict';

import Weather from '../weather';

describe('Weather View', function() {

  beforeEach(() => {
    this.weather = new Weather();
  });

  it('Should run a few assertions', () => {
    expect(this.weather).toBeDefined();
  });

});
