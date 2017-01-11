import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { linodes } from '~/api';
import { CancelButton, Form, SubmitButton } from '~/components/form';
import PasswordInput from '~/components/PasswordInput';
import { hideModal } from '~/actions/modal';

export class AddModal extends Component {
  constructor() {
    super();
    this.createDisk = this.createDisk.bind(this);
    this.state = {
      loading: false,
      errors: { label: [], size: [], _: [] },
      label: '',
      size: 1024,
      distro: '',
      password: '',
      filesystem: 'ext4',
    };
  }

  componentDidMount() {
    const { free } = this.props;
    this.setState({ size: free });
  }

  async createDisk() {
    const { dispatch, linode } = this.props;
    const { label, size, distro, password, filesystem } = this.state;
    this.setState({ loading: true });
    try {
      await dispatch(linodes.disks.post({
        label,
        size,
        filesystem,
        distribution: distro === '' ? null : distro,
        root_pass: password,
      }, linode.id));
      this.setState({ loading: false });
      dispatch(hideModal());
    } catch (response) {
      const json = await response.json();
      const reducer = f => (s, e) => {
        if (e.field === f) {
          return s ? [...s, e.reason] : [e.reason];
        }
        return s;
      };
      this.setState({
        loading: false,
        errors: {
          label: json.errors.reduce(reducer('label'), []),
          size: json.errors.reduce(reducer('size'), []),
          _: json.errors.reduce((s, e) =>
            ['label', 'size'].indexOf(e.field) === -1 ?
            [...s, e.reason] : [...s], []),
        },
      });
    }
  }

  render() {
    const { dispatch, free, distributions } = this.props;
    const vendors = _.sortBy(
      _.map(
        _.groupBy(Object.values(distributions.distributions), d => d.vendor),
        (v, k) => ({
          name: k,
          versions: _.orderBy(v, ['recommended', 'created'], ['desc', 'desc']),
        })
      ), vendor => vendor.name);
    const options = [<option key={''} value={''}>None</option>];
    for (let i = 0; i < vendors.length; ++i) {
      const v = vendors[i];
      if (i !== 0) {
        options.push(<option key={v.name} disabled>──────────</option>);
      }
      v.versions.forEach(d =>
        options.push(<option key={d.id} value={d.id}>{d.label}</option>));
    }
    const {
      loading,
      label,
      size,
      distro,
      filesystem,
      password,
      errors,
    } = this.state;

    const minimumStorageSize = () =>
      distributions.distributions[distro].minimum_storage_size;

    return (
      <Form
        onSubmit={() => this.createDisk()}
      >
        <FormGroup errors={errors} field="label" className="row">
          <div className="col-sm-4 label-col">
            <label htmlFor="label">Label:</label>
          </div>
          <div className="col-sm-8 content-col">
            <Input
              placeholder="Label"
              value={label}
              onChange={e => this.setState({ label: e.target.value })}
            />
          </div>
          <FormGroupError errors={errors} field="label" />
        </FormGroup>
        <div className="form-group row">
          <div className="col-sm-4 label-col">
            <label>Distribution:</label>
          </div>
          <div className="col-sm-8 content-col">
            <select
              className="form-control"
              onChange={e => this.setState({ distro: e.target.value })}
              value={distro}
            >{options}</select>
          </div>
        </div>
        {distro ?
         <FormGroup errors={errors} field="root_pass" className="row">
           <div className="col-sm-4 label-col">
             <label>Root password:</label>
           </div>
           <div className="col-sm-8 content-col">
             <PasswordInput
               onChange={p => this.setState({ password: p })}
               passwordType="offline_fast_hashing_1e10_per_second"
             />
           </div>
         </FormGroup>
            :
         <div className="form-group row">
           <div className="col-sm-4 label-col">
             <label>Filesystem:</label>
           </div>
           <div className="col-sm-8 content-col">
             <select
               className="form-control"
               onChange={e => this.setState({ filesystem: e.target.value })}
               value={filesystem}
             >
               <option value="ext3">ext3</option>
               <option value="ext4">ext4</option>
               <option value="swap">swap</option>
               <option value="raw">raw</option>
             </select>
           </div>
         </div>}
        <FormGroup errors={errors} field="size" className="row">
          <div className="col-sm-4 label-col">
            <label>Size (MB):</label>
          </div>
          <div className="col-sm-8 content-col">
            <Input
              type="number"
              min={distro ? minimumStorageSize() : 8}
              max={free}
              value={size}
              onChange={e => this.setState({ size: parseInt(e.target.value, 10) })}
            />
          </div>
          <FormGroupError errors={errors} field="size" />
        </FormGroup>
        <div className="modal-footer">
          <CancelButton
            disabled={loading}
            onClick={() => dispatch(hideModal())}
          />
          <SubmitButton
            disabled={loading}
          >Add Disk</SubmitButton>
        </div>
        <ErrorSummary errors={errors} />
      </Form>
    );
  }
}

AddModal.propTypes = {
  distributions: PropTypes.object.isRequired,
  linode: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  free: PropTypes.number.isRequired,
};
