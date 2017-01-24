var React = require('react');
var NavLink = require('fluxible-router').NavLink;
var connectToStores = require('fluxible-addons-react/connectToStores');
var AssetTypeStore = require('../../../app-core/stores/AssetTypeStore').default;
import { getAssetType } from '../../../app-core/actions/assetTypes';

var AssetType = React.createClass({
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },
  render() {
    const { name, code, fields } = this.props.assetType;
    var assetFieldWrapper = null;
    if(fields) {
      assetFieldWrapper = fields.map((field, index) => {
        const { key, templateOptions } = field;
        if(templateOptions) {
          return (
            <div className="form-group" key={index}>
              <label>{key}</label>
              <input type="text" defaultValue={templateOptions.placeholder}
                className="form-control" />
            </div>
          )
        }
      });
    }

    return (
      <div>
        <h1>{ name }</h1>
        <h3>{ code }</h3>
        <br />
        <div className="fields">
          {assetFieldWrapper}
        </div>
        <div className="button-wrapper">
          <NavLink className="btn btn-default" routeName='assetTypes'>Cancel</NavLink>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    )
  }
});

AssetType = connectToStores(
    AssetType,
    [AssetTypeStore],
    function (context, props) {
        return {
            assetType: context.getStore(AssetTypeStore).getAll().assetType
        }
    }
);

export default AssetType;
