import sinon from 'sinon';
import { expect } from 'chai';
import * as gen from '../../src/api/gen';

describe('api/gen', () => {
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

  it('should generate a default state', () => {
    const config = gen.genConfig({
      plural: 'datacenters',
      singular: 'datacenter',
      localstoragecacheable: true,
      endpoint: id => `/datacenters/${id}`,
      supports: [gen.ONE, gen.MANY],
    });
    const df = gen.genDefaultState(config);
    expect(df).to.deep.equal({
      totalPages: -1,
      totalResults: -1,
      datacenters: {},
    });
  });

  it('should add meta', () => {
    const config = gen.genConfig({
      plural: 'datacenters',
      singular: 'datacenter',
      localstoragecacheable: true,
      endpoint: id => `/datacenters/${id}`,
      supports: [gen.ONE, gen.MANY],
    });
    const addMeta = gen.addMeta(config, 'ph');
    expect(addMeta).to.deep.equal({ 0: 'p', 1: 'h', _polling: false });
  });
});
