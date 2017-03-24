import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { push } from 'react-router-redux';

import { expectRequest, expectObjectDeepEquals } from '@/common';
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
    const nbLabel = 'nodebalancer-1';
    const id = 82;
    const nodebalancer = nodebalancers.nodebalancers[0];
    const config = nodebalancer._configs.configs[1];

    const page = await mount(
      <EditConfigPage
        id={id}
        nbLabel={nbLabel}
        nodebalancer={nodebalancer}
        config={config}
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
    dispatch.reset();
    await page.instance().saveChanges(values);
    expect(dispatch.callCount).to.equal(2);
    const fn = dispatch.firstCall.args[0];
    const nbId = nodebalancer.id;
    const nbConfigId = config.id;
    const testPath = `/nodebalancers/${nbId}/configs/${nbConfigId}`;
    await expectRequest(
      fn, testPath,
    );
    expectObjectDeepEquals(dispatch.secondCall.args[0],
                           push(`/nodebalancers/${nbLabel}`)
                          );
  });
});
