var React = require('react');
var validate = require("validate.js");
import {Form} from 'react-bootstrap';

var TsForm = React.createClass({
    getInitialState(){
        return {
            submitted: false,
            valid: true
        }
    },
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            submitted: true
        });
        this.props.onSubmit(!Boolean(this.getValidationErrors()), e);
    },
    handleChange(child, e){
        child.props.onChange(e);
    },
    getValidationErrors(){
        return validate(this.props.model, this.props.validationRules);
    },
    buildOnChange(child){
        return this.handleChange.bind(this, child);
    },
    render(){
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                submitted: this.state.submitted,
                validationRules: function() {
                  if(child.props.controlId) {
                    var fieldRules = {};
                    fieldRules[child.props.controlId] = this.props.validationRules[child.props.controlId]
                    return fieldRules;
                  }
                }.call(this),
                onChange: this.buildOnChange(child)
            })
        );

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                {childrenWithProps}
            </Form>
        )
    }
});

module.exports = TsForm;
