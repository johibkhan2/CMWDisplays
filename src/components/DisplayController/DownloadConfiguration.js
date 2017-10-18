import React, { Component } from 'react';
import '../../shared/PopUp.css';
import './DownloadConfiguration.css';

class DownloadConfiguration extends React.Component {
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

        this.setState({ value: value });
    }

    render() {
        return (
            <div className="ibox-content">
                <div className="row1">
                    <span className="row1-txt"> Before proceeding with this download, Please insure the following condition are met</span>
                </div>
                <div className="row2">
                    <span> 1. You have a Display Config Cable and Adapter Kit (P/N 220-2267) plug into a USB port on your computer</span>
                    <div className="kit">
                        <input type="checkbox" /> <span>Kit Connected</span>
                    </div>
                </div>
                <div className="row2">
                    <span> 2. You have prepared the root directory of the connected programming kit by either removing all files or by placing them in subfolders</span>
                    <div className="kit">
                        <input type="checkbox" /> <span>Root Directory Prepared</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default DownloadConfiguration;