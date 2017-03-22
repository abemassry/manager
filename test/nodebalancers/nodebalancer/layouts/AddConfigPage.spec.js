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
  const dispatch = sandbox.stub();

  afterEach(() => {
    dispatch.reset();
    sandbox.restore();
  });

  it('commits changes to the API', async () => {
    const props = {
      params: {
        nbLabel: 'nodebalancer-1',
      },
    };
    const page = await mount(
      <AddConfigPage
        {...props}
        apiNodebalancers={nodebalancers}
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
    expect(dispatch.callCount).to.equal(4);
    const fn = dispatch.thirdCall.args[0];
    await expectRequest(
      fn, `/nodebalancers/${nodebalancers.nodebalancers[0].id}/configs/`,
      undefined, undefined, {
        method: 'POST',
        body: { values },
      }
    );
  });
});
