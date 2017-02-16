import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { api } from '@/data';
import { expectRequest } from '@/common';
import EditARecord from '~/dnsmanager/components/EditARecord';

describe('dnsmanager/components/EditARecord', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  const dispatch = sandbox.stub();

  it('renders fields correctly', () => {
    const currentZone = api.dnszones.dnszones['1'];
    const currentRecord = currentZone._records.records[4];
    const page = mount(
      <EditARecord
        dispatch={dispatch}
        zone={currentZone}
        id={currentRecord.id}
        close={() => {}}
      />
    );

    const nameserver = page.find('#mailserver');
    expect(nameserver.props().value).to.equal(currentRecord.target);

    const subdomain = page.find('#subdomain');
    expect(subdomain.props().value).to.equal(currentRecord.name || currentZone.dnszone);

    const ttl = page.find('#preference');
    expect(+ttl.props().value).to.equal(currentRecord.priority);
  });

  it('submits data onsubmit and closes modal', async () => {
    const currentZone = api.dnszones.dnszones['1'];
    const currentRecord = currentZone._records.records[4];
    const close = sandbox.spy();
    const page = mount(
      <EditARecord
        dispatch={dispatch}
        zone={currentZone}
        id={currentRecord.id}
        close={close}
      />
    );

    const changeInput = (name, value) =>
      page.instance().setState({ [name]: value });

    changeInput('mailserver', 'mx1.tester1234.com');
    changeInput('subdomain', 'tester1234.com');
    changeInput('preference', 1);

    await page.find('Form').props().onSubmit();

    expect(dispatch.callCount).to.equal(1);
    expect(close.callCount).to.equal(1);

    const fn = dispatch.firstCall.args[0];
    await expectRequest(
      fn, `/dns/zones/${currentZone.id}/records/${currentRecord.id}`, undefined, undefined, {
        method: 'PUT',
        body: {
          target: 'mx1.tester1234.com',
          name: 'tester1234.com',
          priority: 1,
          type: 'A',
        },
      });
  });

  it('creates a new A record and closes the modal', async () => {
    const currentZone = api.dnszones.dnszones['1'];
    const close = sandbox.spy();
    const page = mount(
      <EditARecord
        dispatch={dispatch}
        zone={currentZone}
        close={close}
      />
    );

    const changeInput = (name, value) =>
      page.instance().setState({ [name]: value });

    changeInput('mailserver', 'mx1.tester1234.com');
    changeInput('subdomain', 'tester1234.com');
    changeInput('preference', 1);

    dispatch.reset();
    await page.find('Form').props().onSubmit();

    expect(dispatch.callCount).to.equal(1);
    expect(close.callCount).to.equal(1);

    const fn = dispatch.firstCall.args[0];
    await expectRequest(
      fn, `/dns/zones/${currentZone.id}/records/`, undefined, undefined, {
        method: 'POST',
        body: {
          target: 'mx1.tester1234.com',
          name: 'tester1234.com',
          priority: 1,
          type: 'A',
        },
      });
  });
});
