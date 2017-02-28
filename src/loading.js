const React = require('react');
const Loading = React.createClass({
    render: function () {
        return (
            <div style={{bottom : 0, left: 0, position: 'fixed', right : 0,  top : 0, margin :'auto'}}> <img src="/img/loader.gif" alt=""  style={{bottom : 0, left: 0, position: 'fixed', right : 0,  top : 0, margin :'auto',}} /> </div>
        );
    }
});

module.exports = Loading;


