var React = require('react');

import {Col, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

var TsForm = React.createClass({
    getInitialState(){
        return {
            value: '',
            dirty: false,
            valid: true
        }
    },
    render(){
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                {this.props.children}
            </Form>
        )
    }
});

module.exports = TsForm;