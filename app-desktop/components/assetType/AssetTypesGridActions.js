var React = require('react');

export function Actions(action) {
    return React.createClass({
        handleActionClick: function (e) {
            switch(this.props.action.type){
                case 'delete':
                    //this.setState({ show: true })
                    action(this.props.action);
                default:
                    return;
            }
        },
        render(){
            return (
                <div>
                    <button type="button" className="btn btn-xs btn-danger" onClick={this.handleActionClick}>Delete</button>
                </div>
            )
        }
    })
}

