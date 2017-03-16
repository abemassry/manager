import React, { Component, PropTypes } from 'react';
import { renderDatacenterStyle } from '~/linodes/components/Linode';
import { Form,
  FormGroup,
  FormGroupError,
  Input,
  Select,
  Checkbox,
} from '~/components/form';
import { ErrorSummary } from '~/errors';
import { SubmitButton } from '~/components/form';

export class ConfigForm extends Component {
  constructor(props) {
    super(props);
    this.renderDatacenterStyle = renderDatacenterStyle.bind(this);
    this.state = {
      saving: false,
      port: props.port,
      protocol: props.protocol,
      algorithm: props.algorithm,
      stickiness: props.stickiness,
      check: props.check,
      checkPassive: props.checkPassive,
      checkInterval: props.checkInterval,
      checkTimeout: props.checkTimeout,
      checkAttempts: props.checkAttempts,
    };
  }

  render() {
    const { saveChanges, loading, errors, submitText, nodebalancerConfigId } = this.props;
    const {
      port,
      protocol,
      algorithm,
      stickiness,
      check,
      checkPassive,
      checkInterval,
      checkTimeout,
      checkAttempts,
    } = this.state;
    return (
      <Form
        onSubmit={async () => {
          const values = { nodebalancerConfigId, ...this.state };
          await saveChanges(values);
        }}
      >
        <FormGroup errors={errors} name="port" className="row">
          <label className="col-sm-2 col-form-label">Port</label>
          <div className="col-sm-6">
            <Input
              id="config-port"
              placeholder="0"
              value={port}
              onChange={e => this.setState({ port: e.target.value })}
            />
            <FormGroupError errors={errors} name="port" />
          </div>
        </FormGroup>
        <FormGroup errors={errors} name="protocol" className="row">
          <label className="col-sm-2 col-form-label">Protocol</label>
          <div className="col-sm-6">
            <Select
              id="config-protocol"
              value={protocol}
              disabled={loading}
              onChange={e => this.setState({ protocol: e.target.value })}
            >
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="tcp">TCP</option>
            </Select>
          </div>
          <FormGroupError errors={errors} name="protocol" />
        </FormGroup>
        <FormGroup errors={errors} name="algorithm" className="row">
          <label className="col-sm-2 col-form-label">Algorithm</label>
          <div className="col-sm-6">
            <Select
              id="config-algorithm"
              value={algorithm}
              disabled={loading}
              onChange={e => this.setState({ algorithm: e.target.value })}
            >
              <option value="roundrobin">Round Robin</option>
              <option value="leastconn">Least Connections</option>
              <option value="source">Source IP</option>
            </Select>
            <div className="text-muted">
              Configure how initial client connections are allocated acress backend nodes.
            </div>
          </div>
          <FormGroupError errors={errors} name="algorithm" />
        </FormGroup>
        <FormGroup errors={errors} name="stickiness" className="row">
          <label className="col-sm-2 col-form-label">Session Stickiness</label>
          <div className="col-sm-6">
            <Select
              id="config-stickiness"
              value={stickiness}
              disabled={loading}
              onChange={e => this.setState({ stickiness: e.target.value })}
            >
              <option value="none">Table</option>
              <option value="http_cookie">HTTP Cookie</option>
              <option value="none">None</option>
            </Select>
            <div className="text-muted">
              Enable subsequent requests from the same client to be routed to the same backend node.
            </div>
          </div>
          <FormGroupError errors={errors} name="stickiness" />
        </FormGroup>
        <h3 className="sub-header">Active Health Check</h3>
        <FormGroup errors={errors} name="check" className="row">
          <label className="col-sm-2 col-form-label">Health check type</label>
          <div className="col-sm-6">
            <Select
              id="config-check"
              value={check}
              disabled={loading}
              onChange={e => this.setState({ check: e.target.value })}
            >
              <option value="connection">TCP Connection</option>
              <option value="http">HTTP Valid Status</option>
              <option value="http_body">HTTP Body Regex</option>
            </Select>
            <div className="text-muted">
              Active health checks proactively check the health of back-end nodes.
            </div>
          </div>
          <FormGroupError errors={errors} name="check" />
        </FormGroup>
        <FormGroup errors={errors} name="check_interval" className="row">
          <label className="col-sm-2 col-form-label">Interval</label>
          <div className="col-sm-6">
            <Input
              id="config-check_interval"
              placeholder="0"
              value={checkInterval}
              onChange={e => this.setState({ checkInterval: e.target.value })}
            />
            <span className="text-muted">seconds</span>
            <FormGroupError errors={errors} name="check_interval" />
          </div>
        </FormGroup>
        <FormGroup errors={errors} name="check_timeout" className="row">
          <label className="col-sm-2 col-form-label">Timeout</label>
          <div className="col-sm-6">
            <Input
              id="config-check_timeout"
              placeholder="0"
              value={checkTimeout}
              onChange={e => this.setState({ checkTimeout: e.target.value })}
            />
            <span className="text-muted">seconds</span>
            <FormGroupError errors={errors} name="check_timeout" />
          </div>
        </FormGroup>
        <FormGroup errors={errors} name="check_attempts" className="row">
          <label className="col-sm-2 col-form-label">Attempts</label>
          <div className="col-sm-6">
            <Input
              id="config-check_attempts"
              placeholder="0"
              value={checkAttempts}
              onChange={e => this.setState({ checkAttempts: e.target.value })}
            />
            <div className="text-muted">
              Take this node out of rotation after this number of failed health checks
            </div>
            <FormGroupError errors={errors} name="check_attempts" />
          </div>
        </FormGroup>
        <h3 className="sub-header">Passive Checks</h3>
        <FormGroup errors={errors} name="check_passive" className="row">
          <label className="col-sm-2 col-form-label">Enabled</label>
          <div className="col-sm-6">
            <Checkbox
              id="config-check_passive"
              checked={!!checkPassive}
              onChange={() => this.setState({ checkPassive: !checkPassive })}
            />
            <div className="text-muted">
              Enable passive checks based on observed communication with backend nodes.
            </div>
          </div>
          <FormGroupError errors={errors} name="check_passive" />
        </FormGroup>
        <ErrorSummary errors={errors} />
        <div className="row">
          <div className="offset-sm-2 col-sm-10">
            <SubmitButton>{submitText}</SubmitButton>
          </div>
        </div>
      </Form>
    );
  }
}

ConfigForm.propTypes = {
  saveChanges: PropTypes.func,
  nodebalancers: PropTypes.any,
  loading: PropTypes.any,
  errors: PropTypes.any,
  port: PropTypes.number,
  protocol: PropTypes.string,
  algorithm: PropTypes.string,
  stickiness: PropTypes.string,
  check: PropTypes.string,
  checkPassive: PropTypes.bool,
  checkInterval: PropTypes.number,
  checkTimeout: PropTypes.number,
  checkAttempts: PropTypes.number,
  submitText: PropTypes.string,
  nodebalancerConfigId: PropTypes.any,
};

ConfigForm.defaultProps = {
  port: 80,
  protocol: 'http',
  algorithm: 'roundrobin',
  stickiness: 'table',
  check: 'connection',
  checkPassive: true,
  checkInterval: 5,
  checkTimeout: 3,
  checkAttempts: 2,
};
