var React = require('react');
var ReactDOM = require('react-dom');
var Promise = require('promise');

import {Modal, Button} from 'react-bootstrap';

function Confirm(options) {

    var defaults = {
        title: 'Confirmation?',
        message: 'Are you sure?',
        confirmLabel: 'Yes',
        denyLabel: 'No'
    };


    options = Object.assign({}, defaults, options);

    return new Promise(function (resolve, reject) {

        var ConfirmDialog = React.createClass({
            getInitialState(){
                return {
                    show: true
                }
            },
            confirm(){
                resolve();
                this.setState({show:false});
            },
            reject(){
                reject();
                this.setState({show:false});
            },
            render() {
                return (
                    <Modal show={this.state.show}>
                        <Modal.Header>
                            <Modal.Title>{options.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {options.message}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.confirm}>{options.confirmLabel}</Button>
                            <Button bsStyle="danger" onClick={this.reject}>{options.denyLabel}</Button>
                        </Modal.Footer>
                    </Modal>
                );
            }
        });

        ReactDOM.render(<ConfirmDialog/>, document.getElementById('modals'));

    });
}

module.exports = Confirm;


