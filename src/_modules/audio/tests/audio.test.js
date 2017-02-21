'use strict';

import Audio from '../audio';

describe('Audio View', function() {

  beforeEach(() => {
    this.audio = new Audio();
  });

  it('Should run a few assertions', () => {
    expect(this.audio).toBeDefined();
  });

});
