import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { SHOW_MODAL } from '~/actions/modal';
import { ReverseDNSPage } from '~/linodes/linode/networking/layouts/ReverseDNSPage';

import { testLinode } from '@/data/linodes';


describe('linodes/linode/networking/layouts/ReverseDNSPage', () => {
  const sandbox = sinon.sandbox.create();
  const dispatch = sandbox.stub();

  afterEach(() => {
    dispatch.reset();
    sandbox.restore();
  });

  it('renders ips', () => {
    const { _ips } = testLinode;
    const ips = [..._ips.ipv4.public, ..._ips.ipv6.addresses, _ips.ipv6.slaac];
    const addresses = ips.map(({ address }) => address);
    const page = mount(
      <ReverseDNSPage
        dispatch={dispatch}
        linode={testLinode}
      />
    );

    const rows = page.find('.TableRow');
    expect(rows.length).to.equal(1);
    for (let i = 1; i < rows.length; i++) {
      const row = rows.at(i);
      const columns = row.find('.Table-cell');
      expect(columns.length).to.equal(4);

      const addressIndex = addresses.indexOf(columns.at(0).text());
      expect(addressIndex).to.not.equal(-1);
      const ip = ips[addressIndex];
      expect(columns.at(1).text()).to.equal(ip.rdns);
    }
  });

  it('opens the edit modal', async () => {
    const page = mount(
      <ReverseDNSPage
        dispatch={dispatch}
        linode={testLinode}
      />
    );

    const row = page.find('.TableRow').at(0);
    const button = row.find('Button').at(1);
    button.props().onClick();
    expect(dispatch.callCount).to.equal(1);
    expect(dispatch.firstCall.args[0].type).to.equal(SHOW_MODAL);
  });
});
