import React, {Component} from 'react';
import './DownloadConfiguration.css';
import ProgressBar from './ProgressBar';
import Modal from 'react-modal';
import Alert from 'react-s-alert';
import * as displayControllerService from '../../services/displayControllerService';
import  {resetTimeoutNow} from '../../constants/timer';
import {saveByteArray} from './saveFile';
import $ from 'jquery';

//this is the download configuration component
class DownloadConfiguration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             isKitConnected: false,
             isPrepared:false,
             totalFileSize:0,
             totalBytesSaved:0,
             totalBytes: new Int8Array()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }



    // it is called when download configuration pop up is submitted
    handleSubmit(event) {
    event.preventDefault();
    //making sure both the checkboxes are checked
    if (this.state.isKitConnected && this.state.isPrepared) {
        resetTimeoutNow();
        if(this.props.isDBCall==false){
        //making api call to download file from system
            // if (this.state.dataLength < 1 || this.state.totalBytesSaved >= this.state.totalFileSize) {
            //     saveByteArray(this.state.totalBytes,'xyx');
            // } else {
            displayControllerService.downloadFileFromSystem().then(response => 
            {           this.props.closeDownloadConfirmModal();
                        this.readSystemfileInChunks(response);
                        saveByteArray(this.state.totalBytes,response.fileName);
                        this.props.changeState(100,'lightgreen');
                        //we need to check whether we can put this condition here this.props.isCancelledDownload==false
                        this.setState({totalBytes: new Int8Array()}); 
                        
            });
        }else{
        //making api call to download file from DB
        displayControllerService.downloadFileFromDB(this.props.cgtName,this.props.rowID,this.props.supportFileType,0,-1)
        .then(response => 
            {
                 saveByteArray(response.FileData,response.fileName);
                 Alert.success('<h4>downloading the file from DB</h4>');
                 this.props.closeDownloadConfirmModal(); 
            });
        }    
    } else {
        Alert.error("<h4>Please check both the checkboxs</h4>");
    }
    }

    readSystemfileInChunks(response){
        this.setState({totalBytes: new Int8Array(response.TotalFileSize)}); 
        while((response.DataLength < 1 ||this.state.totalBytesSaved >= response.TotalFileSize) && this.props.isCancelledDownload==false)
        {
            displayControllerService.downloadFileFromSystem().then(response => 
            {
                // if(response.DataLength < 1 || this.state.totalBytesSaved >= response.TotalFileSize){
                //     saveByteArray(this.state.totalBytes,response.fileName);
                //     this.props.changeState(100,'lightgreen');
                //     break;
                // }else{        
                this.concatenate(response.DataBytes,response.DataLength);
                //}
            });
        }
    }

    // downloadFile(response){
    // //opening downloading progress bar
    // this.props.openModal();
    // //response.FileName    and response.FileType from response.remove hard coded value    
    // const fileStream = streamSaver.createWriteStream('filename.docx')
	// const writer = fileStream.getWriter()
	// // Later you will be able to just simply do
	// // res.body.pipeTo(fileStream)
    // //response.DataBytes.getReader() will be replaced    
	// const reader = response.body.getReader()
	// const pump = () => reader.read()
	// 	.then(({ value, done }) => done
	// 		// close the stream so we stop writing
	// 		? writer.close()
	// 		// Write one chunk, then get the next one
	// 		: writer.write(value).then(pump)
	// 	)

	// // Start the reader
	// pump().then(() =>{
    //     console.log('Closed the stream, Done writing');
    //     this.props.changeState(100,'lightgreen');
    //     this.props.closeModal();   
    // }
    // )
    // //this.props.changeState(50,'#FF6600');
    // }


   // console.log(concatenate(Uint8Array,Uint8Array.of(1, 2), Uint8Array.of(3, 4)));

   //append chunks 
   concatenate(arr,dataLength) {
    let chunk = new Int8Array( arr );    
    this.state.totalBytes.set(chunk, this.state.offset);
    this.setState({totalBytesSaved:this.state.totalBytesSaved+ dataLength });
    this.props.changeState(this.downloadedPercentage(this.state.totalBytesSaved,this.state.totalFileSize),'#FF6600');
    }

    //returns how much % file got downloaded
    downloadedPercentage(totalBytesSaved,totalFileSize){
        return totalBytesSaved*100/totalFileSize;
    }
    

    //setting the values for checkboxs
    handleCheckBoxChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox'? target.checked: target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="ibox-content">
                <form>
                    <div className="row1">
                        <span className="row1-txt">
                            Before proceeding with this download, Please insure the following condition are
                            met</span>
                    </div>
                    <div className="row2">
                        <span>
                            1. You have a Display Config Cable and Adapter Kit (P/N 220-2267) plug into a
                            USB port on your computer</span>
                        <div className="kit">
                            <input name="isKitConnected" type="checkbox" onChange={this.handleCheckBoxChange}/>
                            <span>Kit Connected</span>
                        </div>
                    </div>
                    <div className="row2">
                        <span>
                            2. You have prepared the root directory of the connected programming kit by
                            either removing all files or by placing them in subfolders</span>
                        <div className="kit">
                            <input name="isPrepared" type="checkbox" onChange={this.handleCheckBoxChange}/>
                            <span>Root Directory Prepared</span>
                        </div>
                    </div>
                    <br/>

                    <div className="row">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-3"></div>
                        <div className="lgn-cnl col-lg-3">
                            <div className="col-sm-2">
                                <button id="close-download-confrim" className=".btn-default" onClick={this.props.closeDownloadConfirmModal}>Cancel</button>
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2">
                                <button className=".btn-default" onClick={this.handleSubmit}>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    }

export default DownloadConfiguration;