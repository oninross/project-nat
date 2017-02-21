'use strict';

import LocalStorage from '../localstorage';

describe('LocalStorage View', function() {

  beforeEach(() => {
    this.localStorage = new LocalStorage();
  });

  it('Should run a few assertions', () => {
    expect(this.localStorage).toBeDefined();
  });

});
