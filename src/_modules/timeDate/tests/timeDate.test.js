'use strict';

import TimeDate from '../timedate';

describe('TimeDate View', function() {

  beforeEach(() => {
    this.timeDate = new TimeDate();
  });

  it('Should run a few assertions', () => {
    expect(this.timeDate).toBeDefined();
  });

});
