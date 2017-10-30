import React, {Component} from 'react';
import './FileDownload.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import DownloadConfiguration from './DownloadConfiguration';
import { Circle } from 'rc-progress';
import Modal from 'react-modal';
import * as displayControllerService from '../../services/displayControllerService';
import Alert from 'react-s-alert';
import  {resetTimeoutNow} from '../../constants/timer';
import $ from 'jquery';
import ProgressBar from './ProgressBar';

const customLoaderStyles = {
  
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '24vw',
    background            : '#eee'
  }
};

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
            supportFiles: [],
            firmWareFiles: [],
            fileTypes:[],
            controllerTypes:[],
            groups:[],
            controllerGroups:[],
            controllers:[],
            modalIsOpenConfrim: false,
            modalIsOpen:false,
            fileType:'',
            showConfigFiles:'cFiles',
            showSupportFiles:'sFiles',
            isFileTypeDisabled:false,
            associationType:'',
            cgtName:'',
            controllerID:0,
            controllerTypeID:0,
            supportFileType:'',
            gAssociationType:'gAssociationType',
            sAssociationType:'sAssociationType',
            myControllerFlag:0,
            isDBcall:false
        };
     this.downLoadConfirm = this.downLoadConfirm.bind(this);
     this.changeGroupTypes=this.changeGroupTypes.bind(this); 
     this.changeControllers=this.changeControllers.bind(this);
     this.closeDownloadConfirmModal = this.closeDownloadConfirmModal.bind(this);
     this.handleFileType=this.handleFileType.bind(this);
     this.handleAssociationType=this.handleAssociationType.bind(this);
     this.changeControllerTypes=this.changeControllerTypes.bind(this);
     this.changeFileType=this.changeFileType.bind(this);
     this.openModal=this.openModal.bind(this);
     this.closeModal=this.closeModal.bind(this);
    }

    openModal() {
        console.log("openModal");
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        console.log("closeModal");
        this.setState({modalIsOpen: false});
    }


    changeGroupTypes(event){
         console.log("val1"+event.target.value);
        this.setState({
        cgtName: event.target.value
        }); 
        let selectedVal=event.target.value; 
        let groups=this.state.groups;
         for(let i in groups){
            if(groups[i].Name==selectedVal){
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

    //FirmwareVersion API call
    changeControllers(event){
        console.log("val3"+event.target.value);
        //console.log("cnt"+event.target.cnt);
        this.setState({
        controllerID: event.target.value
        });   
        if (this.state.fileType == 'cFiles') {
            console.log("called the service firmware");
            if(this.state.associationType == 'sAssociationType'){
            this.getMyControllerFlag(event.target.value);
            displayControllerService.getFirmwareVersion(this.state.cgtName,this.state.controllerID).then(response => 
            {
                this.setState({firmWareFiles: response.firmware});
                resetTimeoutNow();
            })
            }else{
                 Alert.error("<h4>Please check the radio button For the specific controller</h4>");
            } 
        } else if (this.state.fileType == '') {
            Alert.error("<h4>Please select file type</h4>");
        }
    }

    getMyControllerFlag(controllerID){
        for(let i in this.state.controllers){
                if(this.state.controllers[i].ID==controllerID){
                    this.setState({myControllerFlag: this.state.controllers[i].CtrFlag});
                    break;
                }
        }
    }

    //SupportFile API call

    changeControllerTypes(event){
        console.log("controllerTypes"+event.target.value);
        this.setState({
        controllerTypeID: event.target.value
        });
       if (this.state.fileType == 'sFiles') {
        if(this.state.cgtName!=''){
            if(this.state.associationType != ''){
            displayControllerService.getSupportFile(this.state.cgtName,this.state.controllerID,this.state.controllerTypeID,this.state.supportFileType).then(response =>
        {
             this.setState({supportFiles: response.supportFile});
             resetTimeoutNow();
        })
            }else{
                Alert.error("<h4>Please select Association</h4>");
            }
        }else{
            Alert.error("<h4>Please select group type</h4>");
        }
       }else if (this.state.fileType == '') {
            Alert.error("<h4>Please select file type</h4>");
        } 
    }

    changeFileType(event){
        console.log("fileTypes"+event.target.value);
        this.setState({
        supportFileType: event.target.value
        });  
    }

    componentDidMount() {
        this.getFiles();
        this.getFileTypes();
        this.getControllerTypes();
        this.getGroups();
    }


    closeDownloadConfirmModal() {
        console.log("closeDownloadConfirmModal called");
        this.setState({modalIsOpenConfrim: false});
        console.log(this.state);
    }


    getGroups(){
        displayControllerService.getGroups().then(response => {this.setState({groups: response})})
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                store.dispatch(addPhonesFailure(error.response.data));
            } else {
                console.log('Error in groups', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
    }
    //this is dummy rest call.it will not used in future  
    getFiles() {
        displayControllerService.getFiles().then(response => {this.setState({files: response.files})});
    }

    getFileTypes() {
        resetTimeoutNow();
        displayControllerService.getFileTypes().then(response => this.setState({fileTypes: response.fileTypes}));
    }

    getControllerTypes() {
        resetTimeoutNow();
        displayControllerService.getControllerTypes().then(response => this.setState({controllerTypes: response.controllerTypes}));
    }

    downLoadConfirm(id,supportFileType){
        console.log('id'+id+"supportFileType"+supportFileType);
        if (this.state.myControllerFlag != 0 && this.state.controllerTypeID < 0) {
            this.setState({isDBcall: true});
            this.openModal();
            // displayControllerService.downloadFileFromDB(this.state.cgtName,id,supportFileType,0,-1).then(response => 
            // {
            //     resetTimeoutNow();
            // });
        } else {
            this.setState({isDBcall: false});
            this.setState({modalIsOpenConfrim: true});
        }
    }

    handleFileType(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
        if (value == 'sFiles') {
            this.setState({isFileTypeDisabled: false});
            this.setState({supportFiles: []});
        } else if (value == 'cFiles'){
             this.setState({isFileTypeDisabled: true});
             this.setState({firmWareFiles: []});             
        }else{}
        this.clearDropDowns();    
        
    }

    clearDropDowns() {
        document.getElementById('fileTypes').value="";
        document.getElementById('groups').value="";
        document.getElementById('controllerGroups').value="";
        document.getElementById('controllers').value="";
        document.getElementById('controllerTypes').value="";
        //document.getElementsByName('associationType').checked=false;
        $("input:radio[name='associationType']").each(function(i) {
        this.checked = false;
        });
        this.setState({associationType:''});
        this.setState({myControllerFlag: 0});
        this.setState({controllerID: 0});
        this.setState({controllerTypeID: 0});
        this.setState({cgtName: ''});
    }

    handleAssociationType(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
        // if (this.state.associationType == 'sAssociationType') {
        //     this.setState({isAssociationTypeDisabled: false});
        // } else{
        //      this.setState({isAssociationTypeDisabled: true});
        // }
    }
    
    render() {

        function downloadFormatter(data, cell,row){
            return <button  className=".btn-default" onClick={this.downLoadConfirm.bind(this,cell, row['SupportFileType'])}>Download</button> ;
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
                    <input type="radio" name="fileType" value={this.state.showConfigFiles} onChange={this.handleFileType}/>
                    <span>&nbsp;&nbsp;Show Config Files</span>
                </div>
                <br/>
                <div>
                    <input type="radio" name="fileType" value={this.state.showSupportFiles} onChange={this.handleFileType}/>
                    <span>&nbsp;&nbsp;Show Support Files</span>
                    <select id="fileTypes" className="form-control supportFileSelect" disabled={this.state.isFileTypeDisabled} onChange={this.changeFileType}>
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
                    <input type="radio" name="associationType" onChange={this.handleAssociationType} value={this.state.sAssociationType} />
                    <span>&nbsp;&nbsp;For the specific controller</span>

                </div>
                <div>
                    <select id="groups" 
                        onChange={this.changeGroupTypes}  
                        className="form-control specificControllerSelect">
                        <option value=""></option>
                        {this
                            .state
                            .groups
                            .map(grp => {
                                return (
                                    <option value={grp.Name}>
                                        {grp.Name}
                                    </option>
                                );
                            })}
                    </select>

                    <select id="controllerGroups"
                        onChange={this.changeGroups.bind(this)}  
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

                    <select id="controllers"
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
                <div>
                    <input type="radio" name="associationType" onChange={this.handleAssociationType} value={this.state.gAssociationType} disabled={this.state.isFileTypeDisabled} />
                    <span>&nbsp;&nbsp;Available Globally to Controllers of Type</span>
                    <select id="controllerTypes" className="form-control globalType" disabled={this.state.isFileTypeDisabled} onChange={this.changeControllerTypes}   >
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
            {!this.state.isFileTypeDisabled==false &&
                <BootstrapTable
                    data={this.state.firmWareFiles}
                    pagination={false}
                    options={options}
                    className="filesTable">
                    <TableHeaderColumn
                        width='100'
                        tdStyle={{
                        width: '30px'
                    }}
                        dataField='ID'
                        isKey={true}
                        dataFormat={downloadFormatter.bind(this, 'ID')}>Action</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='SupportFileType'>Type</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='Version'>Version</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='FileName'>File Name</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='Notes'>Notes</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='CreateDate'>
                        Created On</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='LastUpdateUser'>Last Updated By</TableHeaderColumn>
                </BootstrapTable>
            }
            {!this.state.isFileTypeDisabled==true &&
                <BootstrapTable
                    data={this.state.supportFiles}
                    pagination={false}
                    options={options}
                    className="filesTable">
                    <TableHeaderColumn
                        width='100'
                        tdStyle={{
                        width: '30px'
                    }}
                        dataField='ID'
                        isKey={true}
                        dataFormat={downloadFormatter.bind(this, 'ID')}>Action</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='SupportFileType'>Type</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='SFVersion'>Version</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='SFileName'>File Name</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='Notes'>Notes</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='CreateDate'>
                        Created On</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='LastUpdateByName'>Last Updated By</TableHeaderColumn>
                </BootstrapTable>
            }      
            </div>
            <div>
                <Modal
                    isOpen={this.state.modalIsOpenConfrim}
                    onRequestClose={this.closeDownloadConfirmModal}
                    shouldCloseOnOverlayClick={false}
                    style={customStyles}
                    contentLabel="Confrimation">
                    <label style={labelStyles}>Download Configuration</label>
                    <DownloadConfiguration 
                    closeDownloadConfirmModal={this.closeDownloadConfirmModal}/>
                </Modal>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={false}
                style={customLoaderStyles}
                contentLabel="">
                <ProgressBar closeModal={this.closeModal}/>
                </Modal>
            </div>
        </div>
    </div>
);
    }
}

export default FileDownloadComponent;
