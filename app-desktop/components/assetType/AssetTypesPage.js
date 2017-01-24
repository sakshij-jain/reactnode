var React = require('react');
var Grid = require('../shared/grid').default;
var connectToStores = require('fluxible-addons-react/connectToStores');
var AssetTypeStore = require('../../../app-core/stores/AssetTypeStore').default;
var NavLink = require('fluxible-router').NavLink;
import {Actions} from './AssetTypesGridActions';
import {deleteAssetType} from '../../../app-core/actions/assetTypes';
var Confirm = require('../shared/dialogs/ConfirmDialog');

var AssetTypesPage = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    onGridAction(action) {
        Confirm({
            title: 'Confirmation',
            message: 'Are you sure you want to delete this?'
        }).then(() => {
            this.context.executeAction(deleteAssetType, action.payload);
        });
    },
    render(){
        var gridHandler = {
            data: this.props.assetTypes,
            columns: [
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Actions',
                    type: 'component',
                    component: Actions(this.onGridAction)
                }
            ],
        };
        return (
            <div>
                <h1>Asset Types</h1>
                <NavLink className="btn btn-primary" routeName='createAssetType'>Create New Asset Type</NavLink>
                <hr/>
                <Grid handler={gridHandler}/>
            </div>
        )
    }
});


AssetTypesPage = connectToStores(
    AssetTypesPage,
    [AssetTypeStore],
    function (context, props) {
        return {
            assetTypes: context.getStore(AssetTypeStore).getAll().assetTypes
        }
    }
);

export default AssetTypesPage;
