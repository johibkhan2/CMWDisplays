import React, {Component} from 'react';
import './FileDownload.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import DownloadConfiguration from './DownloadConfiguration';
import Popup from 'react-popup';

class FileDownloadComponent extends Component {

    constructor() {
        super();
        this.state = {
            files: []
        };
     this.downLoadConfirm = this.downLoadConfirm.bind(this);   
    }

    componentDidMount() {
        this.getFiles();
    }

    getFiles() {
        axios
            .get('http://localhost:3001/1')
            .then(response => this.setState({files: response.data.files}));
    }

    downLoadConfirm(id){
        console.log('ddd'+id);
        Popup.plugins().prompt('', '', function (value) {
          //  Popup.alert('You typed: ' + value);
        });
    }


    
    render() {

        function downloadFormatter(data, cell){
            return <button  className=".btn-default"  onClick={this.downLoadConfirm.bind(this,cell)}>Download</button> ;
        }

        const options = {
            page: 2, // which page you want to show as default
            sizePerPageList: [
                {
                    text: '5',
                    value: 5
                }, {
                    text: '10',
                    value: 10
                }, {
                    text: 'All',
                    value: this.state.files.length
                }
            ], // you can change the dropdown list for size per page
            sizePerPage: 5, // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 3, // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            prePageTitle: 'Go to previous', // Previous page button title
            nextPageTitle: 'Go to next', // Next page button title
            firstPageTitle: 'Go to first', // First page button title
            lastPageTitle: 'Go to Last', // Last page button title
            //paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top' // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            // hidePageListOnlyOnePage: true > Hide the page list if only one page.
        };

        return (
            <div className="wrapper wrapper-content">
                <div className="row">
                    <div className="col-md-3 common">
                        <h4>File Type:</h4>
                        <div>
                            <input type="radio" name="showConfig"/>
                            <span>&nbsp;&nbsp;Show Config Files</span>
                        </div>
                        <br/>
                        <div>
                            <input type="radio" name="showSupport"/>
                            <span>&nbsp;&nbsp;Show Support Files</span>
                            <select className="form-control supportFileSelect">
                                <option>
                                    support1
                                </option>
                                <option>
                                    support2
                                </option>
                                <option>
                                    support3
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>

                    <div className="col-md-7  common">
                        <h4>Association:</h4>
                        <div>
                            <input type="radio" name="specificController"/>
                            <span>&nbsp;&nbsp;For the specific controller</span>

                        </div>
                        <div>
                            <select className="form-control specificControllerSelect">
                                <option>
                                    support1
                                </option>
                                <option>
                                    support2
                                </option>
                                <option>
                                    support3
                                </option>
                            </select>

                            <select className="form-control specificControllerSelect">
                                <option>
                                    support1
                                </option>
                                <option>
                                    support2
                                </option>
                                <option>
                                    support3
                                </option>
                            </select>

                            <select className="form-control specificControllerSelect">
                                <option>
                                    support1
                                </option>
                                <option>
                                    support2
                                </option>
                                <option>
                                    support3
                                </option>
                            </select>
                        </div>
                        <br/>
                        <h4>Association:</h4>
                        <div>
                            <input type="radio" name="specificController"/>
                            <span>&nbsp;&nbsp;Available Globally to Controllers of Type</span>
                            <select className="form-control globalType">
                                <option>
                                    support1
                                </option>
                                <option>
                                    support2
                                </option>
                                <option>
                                    support3
                                </option>
                            </select>
                        </div>

                    </div>
                    <div className="col-sm-1 Label">
                        <h4>Label</h4>
                    </div>
                </div>
<br/>
                <div className="row">

                    <div className="col-md-11 common">
                        <BootstrapTable
                            data={this.state.files}
                            pagination={false}
                            options={options}
                            className="filesTable">
                            <TableHeaderColumn width='100' tdStyle={ { width: '30px' } } dataField='id' isKey={true} dataFormat={ downloadFormatter.bind(this, 'id') }>Action</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='type'>Type</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='version'>Version</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='fileName'>File Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='notes'>Notes</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='createdOn'>
                                Created On</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='lastUpdatedBy'>Last Updated By</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                    <Popup/>
                </div>
            </div>
        );
    }
}

/** Call the plugin */

Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'LogIn',
        content: <DownloadConfiguration onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'Save',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    Popup.close();
                }
            }]
        }
    });
});

export default FileDownloadComponent;
