import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddSensorInner from './AddSensorInner'
import {addSensor} from '../../actions/entities/sesnor'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{addSensor})


export default class AddSensor extends React.Component {
    constructor(props){
        super(props)
        this.state ={
               isSubmit  : false,
            selectedHomeName : "",
            selectedFloorName : "",
            selectedPalaceName : "",
            sensorType : "",
            sensorName : "",
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleHomeName = this.handleHomeName.bind(this);
        this.handleFloorName = this.handleFloorName.bind(this);
        this.handlePalaceName = this.handlePalaceName.bind(this);
        this.handlePalaceName = this.handlePalaceName.bind(this);
        this.handleSensorName = this.handleSensorName.bind(this);
        this.handleSensorType = this.handleSensorType.bind(this)
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
    }



   handleCloseDialog() {
   const {handleCancelDialog,addSensor} = this.props
       const {selectedHomeName,selectedFloorName, selectedPalaceName,sensorType,sensorName,isSubmit} = this.state
       this.setState({isSubmit : true})
       if(selectedHomeName != "" && selectedFloorName != "" && selectedPalaceName != "" &&  sensorType != "" && sensorName != "") {
        /*   addSensor(selectedHomeName,selectedFloorName,selectedPalaceName,sensorType,sensorName);*/
           handleCancelDialog();
           this.setState({
               isSubmit : false,
               selectedHomeName : "",
               selectedFloorName : "",
               selectedPalaceName : "",
               sensorType : "",
               sensorName : "",
           })
       }
    }


    handleHomeName(event, index, value){
        this.setState({selectedHomeName: value});
    }


    handleFloorName(event, index, value){
        this.setState({selectedFloorName: value});
    }

    handlePalaceName(event, index, value){
        this.setState({selectedPalaceName: value});
    }

    handleSensorType(event, index, value){
        this.setState({sensorType: value});
    }

    handleSensorName(event){
        console.log(event.target.value)
        this.setState({sensorName : event.target.value})
    }



    handleCancelDialog(){
        const {handleCancelDialog} = this.props
        this.setState({
            isSubmit : false,
            selectedHomeName : "",
            selectedFloorName : "",
            selectedPalaceName : "",
            sensorType : "",
            sensorName : "",
        })
        handleCancelDialog();
    }


    render(){
         return <AddSensorInner
             {...this.state}
            {...this.props}
             handleCloseDialog = {this.handleCloseDialog}
             handleHomeName = {this.handleHomeName}
             handleFloorName = {this.handleFloorName}
             handlePalaceName = {this.handlePalaceName}
             handleSensorType = {this.handleSensorType}
             handleSensorName = {this.handleSensorName}
             handleCancelDialog = {this.handleCancelDialog}

        />
    }

}
