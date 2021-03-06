import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setError } from '~/actions/errors';
import { tokens } from '~/api';

import AuthorizedApplication from '../components/AuthorizedApplication';

export class AuthorizedApplicationsPage extends Component {
  static async preload({ dispatch }) {
    try {
      await dispatch(tokens.all());
    } catch (response) {
      // eslint-disable-next-line no-console
      console.error(response);
      dispatch(setError(response));
    }
  }

  render() {
    const { dispatch } = this.props;
    const clients = Object.values(this.props.tokens.tokens).filter(
      token => token.type === 'client_token');

    return (
      <div className="row">
        {clients.map(client =>
          <div className="col-lg-6" key={client.id}>
            <AuthorizedApplication
              label={client.client.label}
              scopes={client.scopes}
              id={client.client.id}
              expires={client.expiry}
              dispatch={dispatch}
            />
          </div>
         )}
      </div>
    );
  }
}

AuthorizedApplicationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tokens: PropTypes.object.isRequired,
};

function select(state) {
  return {
    tokens: state.api.tokens,
  };
}

export default connect(select)(AuthorizedApplicationsPage);
