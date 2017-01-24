import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
var React = require('react');

function FieldGroup({ id, label, help, props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

module.exports = FieldGroup;