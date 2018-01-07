//libs
import React from 'react';
import { connect } from 'react-redux';




//src
import PageCurrentStatusInner from './PageCurrentStatusInner'
import {fetchCurrentStatusData} from '../../actions/entities/currentStatus'
import PageLoading from '../PageLoading';
import {configureSocketNowPage} from '../../utils/configureSocketIO'

const mapStateToProps = (state, ownProps) => {
    const {feed : {currentStatus : {currentStatus : {now}}}} = state
    const {auth : {user}} = state
    const {feed : {currentStatus : {isLoading }}} = state
    return {now,isLoading,user}
}

@connect(mapStateToProps, {fetchCurrentStatusData})

export default class PageCurrentStatus extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            floorSelected : '',
            roomSelected : '',
            addApplianceDialogOpen : false,
             now : {
                "floors": [
                    {
                        "floor_id": 1,
                        "name": "My Ground Floor",
                        "homeHomeId": 1,
                        "floorTypeFloorId": 1,
                        "floor_type": {
                            "floor_id": 1,
                            "type": "Ground Floor"
                        }
                    },
                    {
                        "floor_id": 2,
                        "name": "My First Floor",
                        "homeHomeId": 1,
                        "floorTypeFloorId": 2,
                        "floor_type": {
                            "floor_id": 2,
                            "type": "First Floor"
                        }
                    }
                ],
                "palaces": [
                    {
                        "palace_id": 1,
                        "name": "living room",
                        "floorFloorId": 1,
                        "palaceTypePalaceId": 1,
                        "palace_type": {
                            "palace_id": 1,
                            "type": "Room"
                        }
                    },
                    {
                        "palace_id": 2,
                        "name": "Guest room",
                        "floorFloorId": 1,
                        "palaceTypePalaceId": 1,
                        "palace_type": {
                            "palace_id": 1,
                            "type": "Room"
                        }
                    },
                    {
                        "palace_id": 3,
                        "name": "hall",
                        "floorFloorId": 2,
                        "palaceTypePalaceId": 2,
                        "palace_type": {
                            "palace_id": 2,
                            "type": "Hall"
                        }
                    }
                ],
                "switches": [
                    {
                        "switch_id": 1,
                        "name": "table bulb",
                        "status": 0,
                        "applianceApplianceId": 1,
                        "palacePalaceId": 1,
                        "appliance": {
                            "appliance_id": 1,
                            "type": "Light"
                        }
                    },
                    {
                        "switch_id": 2,
                        "name": "Ceiling Fan",
                        "status": 0,
                        "applianceApplianceId": 2,
                        "palacePalaceId": 1,
                        "appliance": {
                            "appliance_id": 2,
                            "type": "Fan"
                        }
                    },
                    {
                        "switch_id": 3,
                        "name": "wall bulb",
                        "status": 1,
                        "applianceApplianceId": 1,
                        "palacePalaceId": 2,
                        "appliance": {
                            "appliance_id": 1,
                            "type": "Light"
                        }
                    },
                    {
                        "switch_id": 4,
                        "name": "Fan",
                        "status": 1,
                        "applianceApplianceId": 2,
                        "palacePalaceId": 2,
                        "appliance": {
                            "appliance_id": 2,
                            "type": "Fan"
                        }
                    },
                    {
                        "switch_id": 5,
                        "name": "Roof bulb",
                        "status": 0,
                        "applianceApplianceId": 1,
                        "palacePalaceId": 3,
                        "appliance": {
                            "appliance_id": 1,
                            "type": "Light"
                        }
                    },
                    {
                        "switch_id": 6,
                        "name": "wall Fan",
                        "status": 1,
                        "applianceApplianceId": 2,
                        "palacePalaceId": 3,
                        "appliance": {
                            "appliance_id": 2,
                            "type": "Fan"
                        }
                    }
                ],
                "sensors": [
                    {
                        "sensor_id": 1,
                        "name": "Temperature",
                        "value": 0,
                        "sensorTypeStId": 1,
                        "palacePalaceId": 1,
                        "sensor_type": {
                            "st_id": 1,
                            "name": "temp"
                        }
                    },
                    {
                        "sensor_id": 4,
                        "name": "Light Level",
                        "value": 394,
                        "sensorTypeStId": 2,
                        "palacePalaceId": 1,
                        "sensor_type": {
                            "st_id": 2,
                            "name": "light"
                        }
                    },
                    {
                        "sensor_id": 5,
                        "name": "Temperature",
                        "value": 24,
                        "sensorTypeStId": 1,
                        "palacePalaceId": 2,
                        "sensor_type": {
                            "st_id": 1,
                            "name": "temp"
                        }
                    },
                    {
                        "sensor_id": 6,
                        "name": "Light level",
                        "value": 843,
                        "sensorTypeStId": 2,
                        "palacePalaceId": 2,
                        "sensor_type": {
                            "st_id": 2,
                            "name": "light"
                        }
                    },
                    {
                        "sensor_id": 7,
                        "name": "Temperature",
                        "value": 21,
                        "sensorTypeStId": 1,
                        "palacePalaceId": 3,
                        "sensor_type": {
                            "st_id": 1,
                            "name": "temp"
                        }
                    },
                    {
                        "sensor_id": 8,
                        "name": "Light Level",
                        "value": 348,
                        "sensorTypeStId": 2,
                        "palacePalaceId": 3,
                        "sensor_type": {
                            "st_id": 2,
                            "name": "light"
                        }
                    }
                ],
                "mode": {
                    "id": 1,
                    "name": "Automatic"
                }
            }
        }
        this.afterFloorSelected = this.afterFloorSelected.bind(this);
        this.afterRoomSelected = this.afterRoomSelected.bind(this);
        this.handleFloorSelected = this.handleFloorSelected.bind(this);
        this.handleRoomSelected = this.handleRoomSelected.bind(this)
        this.handleAddApplianceDialogOpen = this.handleAddApplianceDialogOpen.bind(this)
        this.handleAddApplianceDialogClose = this.handleAddApplianceDialogClose.bind(this)
    }

    componentDidMount(){
        const {fetchCurrentStatusData,user} = this.props
        fetchCurrentStatusData();
        setTimeout(() => {
           this.setState({
               floorSelected : this.props.now.floors[0].floor_id ?  this.props.now.floors[0].floor_id : "" ,
               roomSelected : this.props.now.palaces[0].palace_id ?  this.props.now.palaces[0].palace_id : ""
           })
        }, 1000);
        configureSocketNowPage(user);
    }

    componentWillMount(){

    }




    afterFloorSelected(e){
        debugger;
        this.setState({floorSelected: e.target.value});
    }

    afterRoomSelected(e){
        debugger;
        this.setState({roomSelected: e.target.value});
    }

    handleFloorSelected(event, index, value){
        if(value == ""){
            this.setState({
                roomSelected : ""
            })
        }
        this.setState({
            floorSelected: value,
            roomSelected : this.props.now.palaces[value].palace_id ?  this.props.now.palaces[value].palace_id : ""
        });
    }

    handleRoomSelected(event, index, value){
        this.setState({roomSelected: value});
    }


    handleAddApplianceDialogOpen(){
        this.setState({addApplianceDialogOpen : true})
    }

    handleAddApplianceDialogClose(){
        this.setState({addApplianceDialogOpen : false})
    }



    render(){
        const {isLoading,now} = this.props


        if(isLoading == true || now == undefined)
            return <PageLoading/>

        return(
            <PageCurrentStatusInner {...this.props}
                NowData = {now}
                floorSelected = {this.state.floorSelected}
                roomSelected  = {this.state.roomSelected}
                addApplianceDialogOpen = {this.state.addApplianceDialogOpen}
                afterFloorSelected ={this.afterFloorSelected}
                afterRoomSelected = {this.afterRoomSelected}
                handleFloorSelected = {this.handleFloorSelected}
                handleRoomSelected = {this.handleRoomSelected}
                handleAddApplianceDialogOpen = {this.handleAddApplianceDialogOpen}
                handleAddApplianceDialogClose = {this.handleAddApplianceDialogClose}
                isLoading = {isLoading}
            />
        )
    }
}