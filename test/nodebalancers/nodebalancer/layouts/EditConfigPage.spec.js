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
    const props = {
      params: {
        nbLabel: 'nodebalancer-1',
        configId: 1,
      },
    };
    const page = await mount(
      <EditConfigPage
        {...props}
        nodebalancer={nodebalancers.nodebalancers[0]}
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
    dispatch.reset();
    await page.instance().saveChanges(values);
    expect(dispatch.callCount).to.equal(2);
    const fn = dispatch.firstCall.args[0];
    const nbId = nodebalancers.nodebalancers[0].id;
    const nbConfigId = nodebalancers.nodebalancers[0]._configs.configs[1].id;
    const testPath = `/nodebalancers/${nbId}/configs/${nbConfigId}/edit`;
    await expectRequest(
      fn, testPath,
      {
        method: 'PUT',
        body: { values },
      }
    );
    expectObjectDeepEquals(dispatch.secondCall.args[0],
                           push(`/nodebalancers/${props.params.nbLabel}`)
                          );
  });
});
