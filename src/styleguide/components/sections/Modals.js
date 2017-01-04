import React, { Component } from 'react';

import Section from '~/styleguide/components/Section';
import ModalShell from '~/layouts/ModalShell';
import CancelButton from '~/components/form/CancelButton';

export default class Modals extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <Section name="modals" title="Modals">
        This is an example of a
        <br />
        <a onClick={() => this.setState({ open: true })} className="btn btn-default">
          Confirm modal
        </a>
        <ModalShell
          title="Modal example"
          open={this.state.open}
          close={() => { this.setState({ open: false }); }}
        >
          <div>
            <p>
              Content goes here
            </p>
            <div className="modal-footer">
              <CancelButton onClick={() => { this.setState({ open: false }); }} />
              <button
                className="btn btn-default"
                onClick={() => { this.setState({ open: false }); }}
              >
                OK
              </button>
            </div>
          </div>
        </ModalShell>
        <br />
        <br />
        This is an example of a
        <br />
        <a onClick={() => this.setState({ open: true })} className="btn btn-default">
          General modal
        </a>
        <ModalShell
          title="Modal example"
          open={this.state.open}
          close={() => { this.setState({ open: false }); }}
        >
          <div>
            <p>
              Content goes here
            </p>
            <div className="ConfigSelectModal-configs">
              <div key="1" className="radio">
                <label>
                  <input
                    type="checkbox"
                    name="config1"
                    value="Item 1"
                  />
                  <span>Item 1</span>
                </label>
              </div>
              <div key="2" className="radio">
                <label>
                  <input
                    type="checkbox"
                    name="config2"
                    value="Item 2"
                  />
                  <span>Item 2</span>
                </label>
              </div>
              <div key="3" className="radio">
                <label>
                  <input
                    type="checkbox"
                    name="config3"
                    value="Item 3"
                  />
                  <span>Item 3</span>
                </label>
              </div>
              <div key="4" className="radio">
                <label>
                  <input
                    type="checkbox"
                    name="config4"
                    value="Item 4"
                  />
                  <span>Item 4</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <CancelButton onClick={() => { this.setState({ open: false }); }} />
              <button
                className="btn btn-default"
                onClick={() => { this.setState({ open: false }); }}
              >
                Change
              </button>
            </div>
          </div>
        </ModalShell>
        <br />
        You can have form elements or other elements inside a general modal.
      </Section>
    );
  }
}

Modals.propTypes = {
};
