import React from 'react';
var NavLink = require('fluxible-router').NavLink;

var Header = React.createClass({
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
                        <ul className="nav navbar-nav">
                            <li><NavLink routeName='assetTypes' activeClass='active'>Home</NavLink></li>
                            <li><NavLink routeName='assetTypes' activeClass='active'>Asset Types</NavLink></li>
                            <li><NavLink routeName='assets' activeClass='active'>Assets</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default Header;


