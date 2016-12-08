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
      localStorageCacheable: true,
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
      localStorageCacheable: true,
      endpoint: id => `/datacenters/${id}`,
      supports: [gen.ONE, gen.MANY],
    });
    const addMeta = gen.addMeta(config, 'ph');
    expect(addMeta[0]).to.equal('p');
    expect(addMeta[1]).to.equal('h');
    expect(addMeta._polling).to.equal(false);
  });

  it('should run invalidate', () => {
    const config = gen.genConfig({
      plural: 'datacenters',
      singular: 'datacenter',
      localStorageCacheable: true,
      endpoint: id => `/datacenters/${id}`,
      supports: [gen.ONE, gen.MANY],
    });
    const state = { placeholder: 'placeholder' };
    const action = { ids: [], partial: true, type: 'GEN@linodes/INVALIDATE' };
    const invalid = gen.ReducerGenerator.invalidate(config, state, action);
    expect(invalid.placeholder).to.equal('placeholder');
    expect(invalid.invalid).to.equal(true);
  });

  it('should run one', () => {
    const config = gen.genConfig({
      plural: 'datacenters',
      singular: 'datacenter',
      localStorageCacheable: true,
      endpoint: id => `/datacenters/${id}`,
      supports: [gen.ONE, gen.MANY],
    });
    const state = { placeholder: 'placeholder' };
    const action = { ids: [], partial: false, type: 'GEN@linodes/ONE' };
    console.log(gen.ReducerGenerator.one(config, state, action));
    expect(true).to.equal(false);
  });
});
