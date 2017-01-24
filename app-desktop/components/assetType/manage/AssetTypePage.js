var React = require('react');
var merge = require('deepmerge');
var validate = require("validate.js");
var TsHorizontalFormGroup = require('../../shared/form-components/TsHorizontalFormGroup');
var TsForm = require('../../shared/form-components/TsForm');
var TextArea = require('../../shared/form-components/TextArea');
var AssetTypeStore = require('../../../../app-core/stores/AssetTypeStore').default;
import {Button, Form, Col, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {addAssetType} from '../../../../app-core/actions/assetTypes';

const validationRules = {
  name: {
    presence: true
  },
  code: {
    presence: true
  }
};

var AssetTypePage = React.createClass({
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      name: null,
      code: null,
      fields: [{}]
    }
  },
  handleChange(event){
    var state = merge({}, this.state);
    state[event.target.name] = event.target.value;
    this.setState(state);
  },
  handleSubmit(isValid) {
    event.preventDefault();
    if(isValid){
      const { name, code, fields } = this.state;
      this.context.executeAction(addAssetType, {name, code, fields});
    }
  },
  render(){
    return (
      <div>
        <h1>Create Asset Type</h1>
        <hr/>
        <TsForm model={this.state} onSubmit={this.handleSubmit} validationRules={validationRules}>

          <TsHorizontalFormGroup
            labelClass={ControlLabel}
            label="Name"
            controlId="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Asset type name">
          </TsHorizontalFormGroup>

          <TsHorizontalFormGroup
            labelClass={ControlLabel}
            label="Code"
            controlId="code"
            type="text"
            value={this.state.code}
            onChange={this.handleChange}
            placeholder="Asset code name">
          </TsHorizontalFormGroup>

          <TextArea
            label="Fields"
            name="fields"
            value=""
            placeholder="Asset fields">
          </TextArea>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Save
              </Button>
            </Col>
          </FormGroup>
        </TsForm>
        <label>{this.props.message}</label>
      </div>
    )
  }
});

AssetTypePage = connectToStores(
  AssetTypePage,
  [AssetTypeStore],
  function(context, props) {
    return {
      message: context.getStore(AssetTypeStore).getAll().message
    }
  }
);

export default AssetTypePage;
