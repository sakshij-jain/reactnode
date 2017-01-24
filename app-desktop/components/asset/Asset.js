import React, { Component } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
var NavLink = require('fluxible-router').NavLink;
import AssetStore from  '../../../app-core/stores/AssetStore';
import { getAsset } from '../../../app-core/actions/assets';

class AssetPage extends Component {

  constructor() {
    super();
  }

  handleSubmit(event){
    event.preventDefault();
  }

  render() {
    let assetFieldWrapper = null, isAssets = null;
    const { assets } = this.props;

    if(assets) {
      isAssets = true;
      assetFieldWrapper = Object.keys(assets[0]).map((key, index) => {
        if(key == "id" || key == "assetTypeId") {
          return;
        }
        return (
          <div className="form-group" key={index}>
            <label style={styles.fieldStyle}>{key}</label>
            <input type="text" className="form-control"
              defaultValue={assets[0][key]} />
          </div>
        )
      });
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="fields">
            {assetFieldWrapper}
            {
              isAssets ? (<div className="button-wrapper">
                <NavLink className="btn btn-default" routeName='assets'>Cancel</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" className="btn btn-primary">Save</button>
              </div>) : ('')
            }
          </div>
        </form>
      </div>
    )
  }
}

AssetPage = connectToStores(
  AssetPage,
  [AssetStore],
  function(context, props) {
    return {
      assets: context.getStore(AssetStore).getAll().assets,
      message: context.getStore(AssetStore).getAll().message
    }
  }
);

const styles = {
  fieldStyle: {
    textTransform: 'capitalize'
  }
}

export default AssetPage;
