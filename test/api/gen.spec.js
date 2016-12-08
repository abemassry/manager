import sinon from 'sinon';
import { expect } from 'chai';
import * as gen from '../../src/api/gen';
import { testLinode } from '@/data/linodes';

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
      plural: 'linodes',
      singular: 'linode',
      localStorageCacheable: true,
      endpoint: id => `/linode/instances/${id}`,
      supports: [gen.ONE, gen.MANY, gen.PUT, gen.DELETE, gen.POST],
    });
    const state = { linodes: { testLinode }, totalPages: 1, totalResults: 1 };
    const action = { ids: [0: testLinode.id], type: 'GEN@linodes/ONE' };
    const val = {
      linodes: {
        0: {
          _polling: false,
          __updatedAt: '2016-12-08T20:42:39.811Z',
        },
        testLinode: {
          group: 'Test Group',
          label: 'Test Linode',
          ipv4: '97.107.143.99',
          ipv6: '2600:3c03::f03c:91ff:fe0a:1dbe/64',
          created: '2016-07-06T16:47:27',
          id: 1234,
          type: [
            {
              hourly_price: 1,
              id: 'linode2048.5',
              label: 'Linode 2048',
              mbits_out: 125,
              monthly_price: 1000,
              ram: 2048,
              service_type: 'linode',
              storage: 24576,
              transfer: 2000,
              vcpus: 2,
              backups_price: 250,
              _polling: false,
            },
          ],
          status: 'running',
          datacenter: {
            id: 'newark',
            label: 'Newark, NJ',
          },
          distribution: {
            id: 'linode/ubuntu15.10',
            vendor: 'Ubuntu',
            label: 'Ubuntu 15.10',
          },
          alerts: {
            cpu: {
              enabled: true,
              threshold: 90,
            },
            io: {
              enabled: true,
              threshold: 5000,
            },
            transfer_in: {
              enabled: true,
              threshold: 5,
            },
            transfer_out: {
              enabled: true,
              threshold: 5,
            },
            transfer_quota: {
              enabled: true,
              threshold: 80,
            },
          },
          backups: {
            enabled: true,
            last_backup: '2016-06-09T15:05:55',
            schedule: {
              day: 'Monday',
              window: 'W10',
            },
          },
          _polling: false,
          _backups: {
            totalPages: 1,
            pagesFetched: [0],
            totalResults: 2,
            backups: {
              54778593: {
                type: 'auto',
                id: 54778593,
                created: '2016-06-09T15:05:55',
                finished: '2016-06-09T15:06:55',
                status: 'successful',
                datacenter: {
                  label: 'Newark, NJ',
                  id: 'newark',
                },
              },
              54778596: {
                type: 'snapshot',
                id: 54778593,
                created: '2016-06-09T15:11:55',
                finished: '2016-06-09T15:12:55',
                status: 'successful',
                datacenter: {
                  label: 'Newark, NJ',
                  id: 'newark',
                },
              },
            },
          },
          _disks: {
            totalPages: 1,
            pagesFetched: [0],
            totalResults: 2,
            disks: {
              12345: {
                id: 12345,
                size: 6144,
                created: '2016-08-09T19:47:11',
                updated: '2016-08-09T19:47:11',
                filesystem: 'ext4',
                label: 'Arch Linux 2015.08 Disk',
              },
              12346: {
                id: 12346,
                size: 6144,
                created: '2016-08-09T19:47:11',
                updated: '2016-08-09T19:47:11',
                filesystem: 'swap',
                label: 'Swap Disk',
              },
            },
          },
          _configs: {
            totalPages: 1,
            pagesFetched: [0],
            totalResults: 1,
            configs: {
              12345: {
                id: 12345,
                label: 'Test config',
                comments: 'Test comments',
                kernel: {
                  id: 'linode/latest_64',
                },
                initrd: '',
                virt_mode: 'paravirt',
                run_level: 'default',
                ram_limit: 1024,
                root_device: '/dev/sda',
                root_device_ro: false,
                devtmpfs_automount: false,
                disks: {
                  sda: {
                    id: 12345,
                  },
                  sdb: {
                    id: 12346,
                  },
                  sdc: null,
                  sdd: null,
                  sde: null,
                  sdf: null,
                  sdg: null,
                  sdh: null,
                },
                helpers: {
                  disable_updatedb: true,
                  enable_distro_helper: true,
                  enable_modules_dep_helper: true,
                  enable_network_helper: true,
                },
                created: '2015-09-29 11:21:38 +0000',
                updated: '2015-09-29 11:21:38 +0000',
              },
            },
          },
        },
      },
      totalPages: 1,
      totalResults: 1,
    };
    const output = gen.ReducerGenerator.one(config, state, action);
    expect(output.linodes[0]._polling).to.equal(false);
    expect(output.linodes.testLinode).to.deep.equal(val.linodes.testLinode);
    expect(output.totalPages).to.equal(1);
    expect(output.totalResults).to.equal(1);
  });
});
