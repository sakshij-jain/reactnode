import React, { Component } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import AssetTypeStore from '../../../app-core/stores/AssetTypeStore';
import { fetchAssetTypes } from '../../../app-core/actions/assetTypes';

class AssetCreatePage extends Component {

  constructor(props: Object, context: Object) {
    super(props, context);
  }

  componentDidMount() {
    this.context.executeAction(fetchAssetTypes);
  }

  handleChange(event) {
    var assetTypeId = event.target.value;
    // assetTypeId != "Please Select" ? (this.context.executeAction(getAssetsById, {assetTypeId})) :
    //   (this.context.executeAction(fetchAssets));
  }

  render() {

    const { assetTypes } = this.props;
    let assetTypeWrapper = null;

    if(assetTypes.length) {
      assetTypeWrapper = assetTypes.map((assetType, index) => {
        const { id, name } = assetType;
        return (
          <option value={id} key={index}>{name}</option>
        )
      });
    }

    return (
      <div>
        <h1>Create Asset</h1>
        <hr />
        <div>
          <label htmlFor="asset-type">Select to filter</label>
          <select className="form-control" id="asset-type"
            onChange={this.handleChange}>
            <option value="All">Please Select</option>
            {assetTypeWrapper}
          </select>
        </div>
        <p>Please select the filter to create asset</p>
      </div>
    )
  }
}

AssetCreatePage = connectToStores(
  AssetCreatePage,
  [AssetTypeStore],
  function(context, props) {
    return {
      assetTypes: context.getStore(AssetTypeStore).getAll().assetTypes
    }
  }
);

AssetCreatePage.contextTypes = {
  getStore:      React.PropTypes.func.isRequired,
  executeAction: React.PropTypes.func.isRequired
};

export default AssetCreatePage;
