import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { expectRequest } from '@/common';
import { api } from '@/data';
import { AddConfigPage } from '~/nodebalancers/nodebalancer/layouts/AddConfigPage';

const { nodebalancers } = api;

describe('nodebalancers/nodebalancer/AddConfigPage', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    dispatch.reset();
    sandbox.restore();
  });

  const dispatch = sandbox.stub();

  it('commits changes to the API', async () => {
    const props = {
      nodebalancers,
      params: {
        nbLabel: "nodebalancer-1",
      },
    };
    const page = await mount(
      <AddConfigPage
        {...props}
        dispatch={dispatch}
      />
    );
    const values = {
      check_timeout: 30,
      check_attempts: 3,
      check_interval: 0,
      protocol: 'http',
      algorithm: 'roundrobin',
      stickiness: 'none',
      check_passive: 1,
      port: 82,
      check: 'none',
    };
    await page.instance().saveChanges(values);
    console.log(dispatch.callCount);
    expect(dispatch.calledTwice).to.equal(true);
    const fn = dispatch.firstCall.args[0];
    console.log(nodebalancers.nodebalancers[0].id);
    await expectRequest(
      fn, `/nodebalancers/${nodebalancers.nodebalancers[0].id}/configs/`, {
      method: 'POST',
      body: { values },
    });
  });
});
