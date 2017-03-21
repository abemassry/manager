import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { getObjectByLabelLazily, objectFromMapByLabel } from '~/api/util';
import { nodebalancers } from '~/api';

import { reduceErrors } from '~/errors';
import { Card } from '~/components/cards';
import { setError } from '~/actions/errors';
import { ConfigForm } from '../components/ConfigForm';

export class AddConfigPage extends Component {
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
    const { dispatch, apiNodebalancers } = this.props;
    const { nbLabel } = this.props.params;
    const nodebalancer = objectFromMapByLabel(apiNodebalancers.nodebalancers, nbLabel);
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
      await dispatch(nodebalancers.configs.post(data, nodebalancer.id));
      this.setState({ loading: false });
      dispatch(push(`/nodebalancers/${nbLabel}`));
    } catch (response) {
      // Promisify the setState call so we can await it in tests.
      await new Promise(async (resolve) => this.setState({
        loading: false,
        errors: Object.freeze(await reduceErrors(response)),
      }, resolve));
    }
  }

  render() {
    const { nbLabel } = this.props.params;
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
          <Card title="Add Configuration">
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
              submitText="Add Configuration"
            />
          </Card>
        </div>
      </div>
    );
  }
}

AddConfigPage.propTypes = {
  dispatch: PropTypes.func,
  apiNodebalancers: PropTypes.object,
  params: PropTypes.any,
  id: PropTypes.any,
  label: PropTypes.string,
};

function select(state) {
  return {
    apiNodebalancers: state.api.nodebalancers,
  };
}
export default connect(select)(AddConfigPage);
