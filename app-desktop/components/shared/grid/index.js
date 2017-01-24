var React = require('react');
var NavLink = require('fluxible-router').NavLink;

var Grid = React.createClass({
    render(){

        var columns = this.props.handler.columns.map((col, index)=>(
            <th key={index}>{col.label}</th>
        ));

        var cellContent = function (col, row, index) {
            var action = {
                payload : row,
                type: 'delete'
            };
            if (col.type === 'component') {
                return (<td key={index}>{
                    <col.component action={action}/>
                }</td>);
            } else {
                return (<td key={index}><NavLink navParams={{id: row.id}} routeName='getAssetType'>{row[col.field]}</NavLink></td>);
            }
        };

        var rows = this.props.handler.data.map((row)=>(
            <tr key={row.id}>
                {
                    this.props.handler.columns.map((col, index)=>(
                        cellContent(col, row, index)
                    ))
                }
            </tr>
        ));

        return (
            <table className="table">
                <thead>
                <tr>
                    {columns}
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }
});

export default Grid;
