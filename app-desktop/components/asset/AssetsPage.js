import React, { Component } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
var NavLink = require('fluxible-router').NavLink;
import AssetTypeStore from '../../../app-core/stores/AssetTypeStore';
import AssetStore from  '../../../app-core/stores/AssetStore';
import { fetchAssets, getAssetsById } from '../../../app-core/actions/assets';
import { fetchAssetTypes } from '../../../app-core/actions/assetTypes';

var AssetsPage = React.createClass({
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },
  componentDidMount() {
    this.context.executeAction(fetchAssets);
    this.context.executeAction(fetchAssetTypes);
  },
  handleChange(event) {
    var assetTypeId = event.target.value;
    assetTypeId != "All" ? (this.context.executeAction(getAssetsById, {assetTypeId})) :
      (this.context.executeAction(fetchAssets));
  },
  render() {

    const { assetTypes, assets } = this.props;
    let assetWrapper = null, assetTypeWrapper = null, isAssets = false;

    if(assetTypes.length) {
      assetTypeWrapper = assetTypes.map((assetType, index) => {
        const { id, name } = assetType;
        return (
          <option value={id} key={index}>{name}</option>
        )
      });
    }

    if(assets.length) {
      isAssets = true;
      assetWrapper = assets.map((asset, index)=> {
        const { id, make, code, assetCode} = asset;
        return (
          <tr key={index}>
            <td><NavLink navParams={{id}} routeName="getAsset">
              {assetCode}</NavLink></td>
            <td>{code}</td>
            <td>{make}</td>
          </tr>
        )
      });
    }

    return (
      <div>
        <h1>Assets</h1>
        <NavLink routeName="createAsset" className="btn btn-primary">
          Create New Asset</NavLink>
        <NavLink routeName='createAsset' activeClass='active'>Assets</NavLink>
        <div className="col-lg-3 pull-right" style={styles.selectStyle}>
          <label htmlFor="asset-type">Select to filter</label>
          <select className="form-control" id="asset-type"
            onChange={this.handleChange}>
            <option value="All">All</option>
            {assetTypeWrapper}
          </select>
        </div>
        <div>
          <hr />
          { isAssets ?
            (<table className="table">
              <thead>
                <tr>
                  <th>Asset Code</th>
                  <th>Code</th>
                  <th>Make</th>
                </tr>
              </thead>
              <tbody>
                {assetWrapper}
              </tbody>
            </table>) : (<h3>No Assets to Load</h3>)
          }
        </div>
        <h4>{this.props.message}</h4>
      </div>
    )
  }
});

AssetsPage = connectToStores(
  AssetsPage,
  [AssetStore, AssetTypeStore],
  function(context, props) {
    return {
      assetTypes: context.getStore(AssetTypeStore).getAll().assetTypes,
      assets: context.getStore(AssetStore).getAll().assets,
      message: context.getStore(AssetStore).getAll().message
    }
  }
);

const styles = {
  selectStyle: {
    marginTop: -20
  }
}

export default AssetsPage;
