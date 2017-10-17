import React, {Component} from 'react';
import Popup from 'react-popup';
import './PopUp.css';
class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue
        };

        this.onChange = (e) => this._onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this
                .props
                .onChange(this.state.value);
        }
    }

    _onChange(e) {
        let value = e.target.value;

        this.setState({value: value});
    }

    render() {
        return (
            <div className="ibox-content">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-lg-2 control-label">UserName:</label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.value}
                                onChange={this.onChange}/>
                        </div>
                    </div>

                                        <div className="form-group">
                        <label className="col-lg-2 control-label">Dealer Id:</label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.value}
                                />
                        </div>
                    </div>


                                                            <div className="form-group">
                        <label className="col-lg-2 control-label">Password:</label>
                        <div className="col-lg-10">
                            <input
                                type="password"
                                className="form-control"
                                value=''
                                />
                        </div>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default LoginForm;