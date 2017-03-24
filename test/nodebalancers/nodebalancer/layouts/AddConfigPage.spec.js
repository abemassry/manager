import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { push } from 'react-router-redux';

import { expectRequest, expectObjectDeepEquals } from '@/common';
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
        nodebalancer={nodebalancers.nodebalancers[0]}
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
    dispatch.reset();
    await page.instance().saveChanges(values);
    expect(dispatch.callCount).to.equal(2);
    const fn = dispatch.firstCall.args[0];
    console.log('dispatch from acps', dispatch);
    await expectRequest(
      fn, `/nodebalancers/${nodebalancers.nodebalancers[0].id}/configs/`,
      {
        method: 'POST',
        body: { values },
      }
    );
    expectObjectDeepEquals(dispatch.secondCall.args[0],
                                     push(`/nodebalancers/${props.params.nbLabel}/configs/`)
                          );
  });
});

