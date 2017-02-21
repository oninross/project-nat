'use strict';

import Preloader from '../preloader';

describe('Preloader View', function() {

  beforeEach(() => {
    this.preloader = new Preloader();
  });

  it('Should run a few assertions', () => {
    expect(this.preloader).toBeDefined();
  });

});
