import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { expectRequest } from '@/common';
import { api } from '@/data';
import { EditConfigPage } from '~/nodebalancers/nodebalancer/layouts/EditConfigPage';

const { nodebalancers } = api;

describe('nodebalancers/nodebalancer/EditConfigPage', () => {
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
        configId: 81,
      },
    };
    const page = await mount(
      <EditConfigPage
        {...props}
        apiNodebalancers={nodebalancers}
        dispatch={dispatch}
      />
    );
    const values = {
      checkTimeout: 30,
      checkAttempts: 3,
      checkInterval: 0,
      protocol: 'http',
      algorithm: 'roundrobin',
      stickiness: 'none',
      check_passive: 1,
      port: 82,
      check: 'none',

    };
    await page.instance().saveChanges(values);
    expect(dispatch.calledTwice).to.equal(true);
    const fn = dispatch.firstCall.args[0];
    console.log(nodebalancers.nodebalancers[0]._configs.configs[0]);
    await expectRequest(
      fn, `/nodebalancers/${nodebalancers.nodebalancers[0].id}/configs/${nodebalancers.nodebalancers[0]._configs.configs[1].id}`,
      undefined, undefined, {
        method: 'PUT',
        body: { values },
      }
    );
  });
});
