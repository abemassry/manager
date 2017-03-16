import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';

import { getObjectByLabelLazily } from '~/api/util';
import { nodebalancers } from '~/api';

import { reduceErrors } from '~/errors';
import { Card } from '~/components/cards';
import { setError } from '~/actions/errors';
import { ConfigForm } from '../components/ConfigForm';

export class EditConfigPage extends Component {
  static async preload({ dispatch, getState }, { nbLabel }) {
    try {
      const { id } = await dispatch(getObjectByLabelLazily('nodebalancers', nbLabel));
      await dispatch(nodebalancers.configs.all([id]));
    } catch (response) {
      // eslint-disable-next-line no-console
      console.error(response);
      dispatch(setError(response));
    }
  }

  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
    this.state = {
      loading: false,
      errors: {},
    };
  }

  async saveChanges(stateValues) {
    const { dispatch, id, label } = this.props;
    const {
      port,
      protocol,
      algorithm,
      stickiness,
      check,
      check_passive,
      check_interval,
      check_timeout,
      check_attempts,
      nodebalancerConfigId,
    } = stateValues;
    this.setState({ loading: true, errors: {} });
    const data = {
      port: parseInt(port),
      protocol,
      algorithm,
      stickiness,
      check,
      check_passive,
      check_interval: parseInt(check_interval),
      check_timeout: parseInt(check_timeout),
      check_attempts: parseInt(check_attempts),
    };
    try {
      await dispatch(nodebalancers.configs.put(data, id, nodebalancerConfigId));
      this.setState({ loading: false });
      dispatch(push(`/nodebalancers/${label}`));
    } catch (response) {
      // Promisify the setState call so we can await it in tests.
      await new Promise(async (resolve) => this.setState({
        loading: false,
        errors: Object.freeze(await reduceErrors(response)),
      }, resolve));
    }
  }

  render() {
    const { nbLabel, configId } = this.props.params;
    const { nodebalancers, id } = this.props;
    const nodebalancerConfigId = _.findKey(nodebalancers
                                           .nodebalancers[id]
                                           ._configs.configs, (o) => {
      return o.port === parseInt(configId);
    });
    const nodebalancer = nodebalancers.nodebalancers[id]._configs.configs[nodebalancerConfigId];
    if (!nodebalancer) {
      return null;
    }
    const { loading, errors } = this.state;
    return (
      <div>
        <header className="main-header main-header--border">
          <div className="container">
            <h1>
              {nbLabel}
            </h1>
          </div>
        </header>
        <div className="container">
          <Card title="Edit Configuration">
            <div>
              <h4 className="text-muted">
                Configure how your NodeBalancer listens for incoming traffic
                and connects to backend nodes. <a href="#">Learn more.</a>
              </h4>
            </div>
            <ConfigForm
              saveChanges={this.saveChanges}
              loading={loading}
              errors={errors}
              submitText="Edit Configuration"
              port={configId}
              protocol={nodebalancer.protocol}
              algorithm={nodebalancer.algorithm}
              stickiness={nodebalancer.stickiness}
              check={nodebalancer.check}
              checkPassive={nodebalancer.check_passive}
              checkInterval={nodebalancer.check_interval}
              checkTimeout={nodebalancer.check_timeout}
              checkAttempts={nodebalancer.check_attempts}
              nodebalancerConfigId={nodebalancerConfigId}
            />
          </Card>
        </div>
      </div>
    );
  }
}

EditConfigPage.propTypes = {
  dispatch: PropTypes.func,
  nodebalancers: PropTypes.object,
  params: PropTypes.any,
  id: PropTypes.any,
  label: PropTypes.string,
};

function select(state) {
  const nodebalancer = state.api.nodebalancers
    .nodebalancers[Object.keys(state.api.nodebalancers.nodebalancers)];
  return {
    nodebalancers: state.api.nodebalancers,
    id: nodebalancer.id,
    label: nodebalancer.label,
  };
}
export default connect(select)(EditConfigPage);
