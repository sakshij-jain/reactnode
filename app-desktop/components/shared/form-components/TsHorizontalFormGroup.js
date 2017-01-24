var React = require('react');
var validate = require("validate.js");
import {Button, Form, Col, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

var TsHorizontalFormGroup = React.createClass({
  getInitialState() {
    return {
      valid: false,
      dirty: false,
      errors: []
    }
  },
  componentDidMount(){
    // if (this.getValidationErrors()) {
    //   this.setState({
    //     valid: false,
    //     dirty : false
    //   });
    // } else {
    //   this.setState({
    //     valid: true,
    //     dirty: false
    //   });
    // }
  },
  getValidationErrors(){
    var toValidate = {};
    toValidate[this.props.controlId] = this.props.value;
    return validate(toValidate, this.props.validationRules);
  },
  getValidationState() {
    var errors = this.getValidationErrors();
    if (errors && (this.state.dirty || this.props.submitted)) {
      return 'error';
    }
  },
  handleChange(e){
    this.props.onChange(e);
    if (this.getValidationState()) {
      this.setState({
        valid: false,
        dirty: true
      });
    } else {
      this.setState({
        valid: true,
        dirty: true
      });
    }
  },
  onBlur(){
    this.setState({
      dirty: true
    });
  },
  render(){
    var validationError = [];
    var errors = this.getValidationErrors();
    if (errors && (this.state.dirty || this.props.submitted)) {
      validationError = errors[this.props.controlId].map((message, index) =>(
        <HelpBlock key={index}>{message}</HelpBlock>
      ));
    }
    return (
      <FormGroup controlId={this.props.controlId} validationState={this.getValidationState()}>
        <Col componentClass={this.props.labelClass} sm={2}>
          {this.props.label}
        </Col>
        <Col sm={10}>
          <FormControl
            name={this.props.controlId}
            type={this.props.type}
            value={this.props.value}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            placeholder={this.props.placeholder}/>
          {validationError}
        </Col>
      </FormGroup>
    )
  }
});

module.exports = TsHorizontalFormGroup;
