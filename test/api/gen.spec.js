import sinon from 'sinon';
import { expect } from 'chai';
import * as gen from '../../src/api/gen.js';


describe('api/gen', () => {
  describe('verfiyGenConfig', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
      sandbox.restore();
    });

    it('should look like a datacenter config', () => {
      const config = gen.genConfig({
        plural: 'datacenters',
        singular: 'datacenter',
        localStorageCacheable: true,
        endpoint: id => `/datacenters/${id}`,
        supports: [gen.ONE, gen.MANY],
      });
      expect(config.plural).to.equal('datacenters');
      expect(config.singular).to.equal('datacenter');
      expect(config.localStorageCacheable).to.equal(true);
      expect(config.supports).to.deep.equal(['ONE', 'MANY']);
      expect(config.parent).to.equal(undefined);
    });
  });
});
