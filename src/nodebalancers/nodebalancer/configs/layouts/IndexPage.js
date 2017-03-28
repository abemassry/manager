import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { nodebalancers } from '~/api';
import { getObjectByLabelLazily, objectFromMapByLabel } from '~/api/util';

export class IndexPage extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      errors: {},
      saving: false,
    };
  }
  render() {
    const { nbLabel, configId, nodebalancer} = this.props;
    const config = nodebalancer._configs.config[configId];
    return (
      <div>
        <header className="main-header main-header--border">
          <div className="container">
            <h1 title={config.id}>{nbLabel}:{config.port}</h1>
          </div>
        </header>
      </div>
    );
  }
}

IndexPage.propTypes = {
  nbLabel: PropTypes.string,
  configId: PropTypes.string,
};

function select(state, props) {
  const nodebalancer = objectFromMapByLabel(state.api.nodebalancers.nodebalancers, nbLabel);
  return {
    nbLabel: props.params.nbLabel,
    configId: props.params.configId,
    nodebalancer: nodebalancer,
  };
}

export default connect(select)(IndexPage);
