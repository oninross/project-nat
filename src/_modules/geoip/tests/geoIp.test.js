'use strict';

import GeoIp from '../geoip';

describe('GeoIp View', function() {

  beforeEach(() => {
    this.geoIp = new GeoIp();
  });

  it('Should run a few assertions', () => {
    expect(this.geoIp).toBeDefined();
  });

});
