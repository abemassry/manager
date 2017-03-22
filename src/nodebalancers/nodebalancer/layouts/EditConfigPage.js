import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';

import { getObjectByLabelLazily, objectFromMapByLabel } from '~/api/util';
import { nodebalancers } from '~/api';

import { reduceErrors } from '~/errors';
import { Card } from '~/components/cards';
import { setError } from '~/actions/errors';
import { setSource } from '~/actions/source';
import { setTitle } from '~/actions/title';
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

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setSource(__filename));

    dispatch(setTitle('Nodebalancers'));
  }

  async saveChanges(stateValues) {
    const { dispatch, apiNodebalancers } = this.props;
    const { nbLabel, configId } = this.props.params;
    const nodebalancer = objectFromMapByLabel(apiNodebalancers.nodebalancers, nbLabel);
    const nodebalancerConfigId = _.findKey(nodebalancer._configs.configs, (o) => {
      return o.port === parseInt(configId);
    });
    const {
      port,
      protocol,
      algorithm,
      stickiness,
      check,
      check_passive,
      checkInterval,
      checkTimeout,
      checkAttempts,
    } = stateValues;
    this.setState({ loading: true, errors: {} });
    const data = {
      port: parseInt(port),
      protocol,
      algorithm,
      stickiness,
      check,
      check_passive,
      check_interval: parseInt(checkInterval),
      check_timeout: parseInt(checkTimeout),
      check_attempts: parseInt(checkAttempts),
    };
    try {
      await dispatch(nodebalancers.configs.put(data, nodebalancer.id, nodebalancerConfigId));
      this.setState({ loading: false });
      dispatch(push(`/nodebalancers/${nbLabel}`));
    } catch (response) {
      const errors = await reduceErrors(response);
      this.setState({ errors, loading: false });
    }
  }

  render() {
    const { nbLabel, configId } = this.props.params;
    const { apiNodebalancers } = this.props;
    const nodebalancer = objectFromMapByLabel(apiNodebalancers.nodebalancers, nbLabel);
    if (!nodebalancer) {
      return null;
    }
    const nodebalancerConfigId = _.findKey(nodebalancer._configs.configs, (o) => {
      return o.port === parseInt(configId);
    });
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
              <p>
                Configure how your NodeBalancer listens for incoming traffic
                and connects to backend nodes. <a href="#">Learn more.</a>
              </p>
            </div>
            <ConfigForm
              saveChanges={this.saveChanges}
              loading={loading}
              errors={errors}
              submitText="Edit Configuration"
              port={parseInt(configId)}
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
  apiNodebalancers: PropTypes.object,
  params: PropTypes.any,
  configId: PropTypes.any,
  nbLabel: PropTypes.string,
};

function select(state) {
  return {
    apiNodebalancers: state.api.nodebalancers,
  };
}
export default connect(select)(EditConfigPage);
