import React, {Component} from 'react';
import './FileDownload.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import DownloadConfiguration from './DownloadConfiguration';
import { Circle } from 'rc-progress';
import Modal from 'react-modal';
import * as displayControllerService from '../../services/displayControllerService';

const customStyles = {
  
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '44vw',
    background            : '#eee'
  }
};

const labelStyles = {
    marginBottom          : '16px',
    color                 : 'black' 
  };

class FileDownloadComponent extends Component {

    constructor() {
        super();
        this.state = {
            files: [],
            fileTypes:[],
            controllerTypes:[],
            groups:[],
            controllerGroups:[],
            controllers:[],
            modalIsOpenConfrim: false
        };
     this.downLoadConfirm = this.downLoadConfirm.bind(this);
     this.changeGroupTypes=this.changeGroupTypes.bind(this); 
     this.changeControllers=this.changeControllers.bind(this);
     this.openDownloadConfirmModal = this.openDownloadConfirmModal.bind(this);
     this.closeDownloadConfirmModal = this.closeDownloadConfirmModal.bind(this);   
    }


    changeGroupTypes(event){
         console.log("val1"+event.target.value);
        let selectedVal=event.target.value; 
        let groups=this.state.groups;
         for(let i in groups){
            if(groups[i].ID==selectedVal){
                this.setState({controllerGroups:groups[i].theControllerGroups });
                break;
            }

         }
    }

    changeGroups(event){
        console.log("val2"+event.target.value);
        let selectedVal=event.target.value; 
        let controllerGroups=this.state.controllerGroups;
        for(let i in controllerGroups){
                if(controllerGroups[i].ID==selectedVal){
                    this.setState({controllers:controllerGroups[i].theControllers });
                    break;
                }

        }
    }

    changeControllers(event){
          console.log("val3"+event.target.value);
    }

    componentDidMount() {
        this.getFiles();
        this.getFileTypes();
        this.getControllerTypes();
        this.getGroups();
    }

    openDownloadConfirmModal() {
        this.setState({modalIsOpenConfrim: true});
    }

    closeDownloadConfirmModal() {
        console.log("closeDownloadConfirmModal called");
        this.setState({modalIsOpenConfrim: false});
        console.log(this.state);
    }


    getGroups(){
        displayControllerService.getGroups().then(response => {this.setState({groups: response})});
    }

    getFiles() {
        displayControllerService.getFiles().then(response => {this.setState({files: response.files})});
    }

    getFileTypes() {
        displayControllerService.getFileTypes().then(response => this.setState({fileTypes: response.fileTypes}));
    }

    getControllerTypes() {
        displayControllerService.getControllerTypes().then(response => this.setState({controllerTypes: response.controllerTypes}));
    }

    downLoadConfirm(id){
        console.log('ddd'+id);
        this.openDownloadConfirmModal();
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
                        {this
                            .state
                            .fileTypes
                            .map(file => {
                                return (
                                    <option value={file.CodeValue}>
                                        {file.DispValue}
                                    </option>
                                );
                            })}
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
                    <select
                        onChange={this.changeGroupTypes}
                        className="form-control specificControllerSelect">
                        <option value=""></option>
                        {this
                            .state
                            .groups
                            .map(grp => {
                                return (
                                    <option value={grp.ID}>
                                        {grp.Name}
                                    </option>
                                );
                            })}
                    </select>

                    <select
                        onChange={this
                        .changeGroups
                        .bind(this)}
                        className="form-control specificControllerSelect">
                        <option value=""></option>
                        {this
                            .state
                            .controllerGroups
                            .map(controllerGroup => {
                                return (
                                    <option value={controllerGroup.ID}>
                                        {controllerGroup.Name}
                                    </option>
                                );
                            })}
                    </select>

                    <select
                        onChange={this.changeControllers}
                        className="form-control specificControllerSelect">
                        <option value=""></option>
                        {this
                            .state
                            .controllers
                            .map(controller => {
                                return (
                                    <option value={controller.ID}>
                                        {controller.Name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <br/>
                <h4>Association:</h4>
                <div>
                    <input type="radio" name="specificController"/>
                    <span>&nbsp;&nbsp;Available Globally to Controllers of Type</span>
                    <select className="form-control globalType">
                        <option value=""></option>
                        {this
                            .state
                            .controllerTypes
                            .map(cnt => {
                                return (
                                    <option value={cnt.ID}>
                                        {cnt.Name}
                                    </option>
                                );
                            })}
                    </select>
                </div>

            </div>
            <div className="col-sm-1 Label">
                <h4 className="Label-size">Label</h4>
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
                    <TableHeaderColumn
                        width='100'
                        tdStyle={{
                        width: '30px'
                    }}
                        dataField='id'
                        isKey={true}
                        dataFormat={downloadFormatter.bind(this, 'id')}>Action</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='type'>Type</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='version'>Version</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='fileName'>File Name</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='notes'>Notes</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='createdOn'>
                        Created On</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='lastUpdatedBy'>Last Updated By</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <div>
                <Modal
                    isOpen={this.state.modalIsOpenConfrim}
                    onRequestClose={this.closeDownloadConfirmModal}
                    shouldCloseOnOverlayClick={false}
                    style={customStyles}
                    contentLabel="LogIn">
                    <label style={labelStyles}>Download Configuration</label>
                    <DownloadConfiguration
                        closeDownloadConfirmModal={this.closeDownloadConfirmModal}/>
                </Modal>
            </div>
        </div>
    </div>
);
    }
}

export default FileDownloadComponent;
