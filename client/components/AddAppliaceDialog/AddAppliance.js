import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddApplianceInner from './AddApplianceInner'
import {addAppliance} from '../../actions/entities/appliance'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{addAppliance})


export default class AddAppliance extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            applianceName : "",
            isSubmit : false,
            floorSelected : this.props.NowData.floors[0].floor_id ?  this.props.NowData.floors[0].floor_id : "" ,
            roomSelected : this.props.NowData.palaces[0].palace_id ?  this.props.NowData.palaces[0].palace_id : ""
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleApplianceName = this.handleApplianceName.bind(this)
        this.handleFloorSelected = this.handleFloorSelected.bind(this);
        this.handleRoomSelected = this.handleRoomSelected.bind(this)
    }

    handleCloseDialog(){
        const {handleCancelDialog,addAppliance} = this.props;
        const {floorSelected,roomSelected,applianceName,isSubmit} = this.state
        this.setState({isSubmit : true})
        if(applianceName != "") {
           /* addAppliance(applianceName, floorSelected, roomSelected);*/
            this.setState({isSubmit : false,applianceName : ""})
            handleCancelDialog();

        }
    }

    handleApplianceName(event){
        console.log(event.target.value)
        this.setState({applianceName : event.target.value})
    }

    handleFloorSelected(event, index, value){
        if(value == ""){
            this.setState({
                roomSelected : ""
            })
        }
        this.setState({
            floorSelected: value,
            roomSelected : this.props.NowData.palaces[value].palace_id ?  this.props.NowData.palaces[value].palace_id : ""
        });

    }

    handleRoomSelected(event, index, value){
        this.setState({roomSelected: value});
    }





    render(){
        const {applianceName,floorSelected,roomSelected,isSubmit} = this.state
         return <AddApplianceInner
            {...this.props}
            applianceName = {applianceName}
            floorSelected = {floorSelected}
            roomSelected  = {roomSelected}
             isSubmit = {isSubmit}
            handleCloseDialog = {this.handleCloseDialog}
            handleApplianceName = {this.handleApplianceName}
            handleFloorSelected = {this.handleFloorSelected}
            handleRoomSelected = {this.handleRoomSelected}
        />
    }

}
