//libs
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';


//src
import './PageCurrentStatusInner.scss'
import WidgetOnOffAppliance from '../../components/WidgetOnOffAppliance';
import WidgetSensor from '../../components/WidgetSensor';
import PageLoading from '../PageLoading';
import AddAppliance from '../AddAppliaceDialog/AddAppliance'

const PageCurrentStatusInner = (props) =>{
  const {NowData,isLoading,afterFloorSelected,afterRoomSelected,floorSelected,roomSelected,handleFloorSelected,handleRoomSelected,handleAddApplianceDialogOpen,handleAddApplianceDialogClose,addApplianceDialogOpen} = props
if(isLoading ==true)
    return <PageLoading/>

    return (
        <div className="Page-current-status">



            <div className="row">
                    <div className="col-lg-8 col-md-6 col-sm-4 ">
                        <FlatButton label="+ Add Appliance" onTouchTap={handleAddApplianceDialogOpen}/>
                        <AddAppliance
                               open = {addApplianceDialogOpen}
                               handleCancelDialog = {handleAddApplianceDialogClose}
                               NowData = {NowData}
                        />
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 text-center ">
                        <DropDownMenu value={floorSelected} onChange={handleFloorSelected} >
                            {/*<MenuItem value="" primaryText="Select Floor" />*/}
                            {NowData.floors.map((floor, key) => {
                                return (
                                    <MenuItem value={floor.floor_id} primaryText={floor.name} />
                                );})}
                        </DropDownMenu>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 text-center">
                        <DropDownMenu value={roomSelected} onChange={handleRoomSelected} >
                           {/* <MenuItem value="" primaryText="Select Room" />*/}
                            {NowData.palaces.map((palace, key) => {
                                if(palace.floorFloorId == floorSelected)
                                    return (
                                        <MenuItem value={palace.palace_id} primaryText={palace.name} />
                                    );})}
                        </DropDownMenu>
                    </div>
            </div>
        <hr/>

         {/*   <div className="row">
                <div className="col-lg-12" style={{paddingRight : "6%"}} >

                    <div className="col-lg-2 col-lg-offset-2 text-center bg-primary for_small_screen">
                        Floor
                    </div>

                    <div className="col-lg-2 text-center for_small_screen_dropDown">
                        <div>
                            <select style={{width : "100%"}}
                                value ={floorSelected}
                                onChange={afterFloorSelected}
                            >
                                <option value="">Select Floor</option>

                                {NowData.floors.map((floor, key) => {
                                    return (
                                        <option value={floor.floor_id}  >{floor.name}</option>
                                    );})}

                            </select>
                        </div>
                    </div>



                    <div className="col-lg-2 text-center bg-primary for_small_screen">
                        Room
                    </div>
                    <div className="col-lg-2 text-center for_small_screen_dropDown">
                        <div>
                            <select style={{width : "100%"}}
                                value={roomSelected}
                                onChange={afterRoomSelected}
                            >
                                <option value="">Select Room </option>
                                {NowData.palaces.map((palace, key) => {
                                    if(palace.floorFloorId == floorSelected)
                                        return (
                                            <option value={palace.palace_id}  >{palace.name}</option>
                                        );})}

                            </select>
                        </div>
                    </div>


                </div>
            </div>*/}




            <div className="row ">

                <div className="col-lg-3 col-lg-offset-2 col-md-4 col-sm-6  " style={{paddingTop : "30px"}}>
                    {NowData.switches.map((switch1,key) => {
                        if((switch1.palacePalaceId == roomSelected && (switch1.appliance.type == "Light"))) {

                            return(
                                <div>
                                    <WidgetOnOffAppliance
                                        style="panel-primary"
                                        picture="fa fa-comments fa-5x"
                                        applianceType="bulb"
                                        applianceId = {switch1.applianceApplianceId}
                                        applianceName={switch1.name}
                                        applianceCondition={switch1.status}
                                        roomName={roomSelected}
                                        floorName={floorSelected}
                                        linkTo="/"
                                    />
                                </div>
                            );
                        }


                    })}

                </div>


                <div className="col-lg-3 col-lg-offset-2 col-md-4 col-sm-6  "  style={{paddingTop : "30px"}}>
                    {NowData.switches.map((switch1,key) => {
                        if((switch1.palacePalaceId == roomSelected && (switch1.appliance.type == "Fan"))) {

                            return(
                                <div>
                                    <WidgetOnOffAppliance
                                        style="panel-primary"
                                        picture="fa fa-comments fa-5x"
                                        applianceType="fan"
                                        applianceId = {switch1.applianceApplianceId}
                                        applianceName={switch1.name}
                                        applianceCondition={switch1.status}
                                        roomName={roomSelected}
                                        floorName={floorSelected}
                                        linkTo="/"
                                    />
                                </div>
                            );
                        }


                    })}

                </div>

                <div className="col-lg-3 col-lg-offset-2 col-md-4 col-sm-6 "  style={{paddingTop : "30px"}}>
                    {NowData.sensors.map((sensor,key) => {
                        if((sensor.palacePalaceId == roomSelected && (sensor.sensor_type.name == "temp"))) {

                            return(
                                <div>
                                    <WidgetSensor
                                        style="panel-red"
                                        picture="fa fa-comments fa-5x"
                                        applianceType="Temp"
                                        applianceName={sensor.name}
                                        applianceCondition={sensor.value}
                                        roomName={roomSelected}
                                        floorName={floorSelected}
                                        linkTo="/"
                                    />
                                </div>
                            );

                        }

                    })}

                </div>

                <div className="col-lg-3 col-lg-offset-2 col-md-4 col-sm-6 "  style={{paddingTop : "30px"}}>
                    {NowData.sensors.map((sensor,key) => {
                        if((sensor.palacePalaceId == roomSelected && (sensor.sensor_type.name == "light"))) {

                            return(


                                <div>
                                    <WidgetSensor
                                        style="panel-brown"
                                        picture="fa fa-comments fa-5x"
                                        applianceType="Light"
                                        applianceName={sensor.name}
                                        applianceCondition={sensor.value}
                                        roomName={roomSelected}
                                        floorName={floorSelected}
                                        linkTo="/"
                                    />
                                </div>


                            );

                        }

                    })}

                </div>


            </div>


            <div className="row">



              {/*  <div className="col-lg-4 col-lg-offset-1 col-md-6 "  style={{paddingTop : "30px"}}>
                    {NowData.sensors.map((sensor,key) => {
                        if((sensor.palacePalaceId == roomSelected && (sensor.sensor_type.name == "temp"))) {

                            return(
                                <div>
                                    <WidgetSensor
                                        style="panel-red"
                                        picture="fa fa-comments fa-5x"
                                        applianceType="Temp"
                                        applianceName={sensor.name}
                                        applianceCondition={sensor.value}
                                        roomName={roomSelected}
                                        floorName={floorSelected}
                                        linkTo="/"
                                    />
                                </div>
                            );

                        }

                    })}

                </div>



                <div className="col-lg-4 col-lg-offset-1 col-md-6 "  style={{paddingTop : "30px"}}>
                    {NowData.sensors.map((sensor,key) => {
                        if((sensor.palacePalaceId == roomSelected && (sensor.sensor_type.name == "light"))) {

                            return(


                                <div>
                                    <WidgetSensor
                                        style="panel-brown"
                                        picture="fa fa-comments fa-5x"
                                        applianceType="Light"
                                        applianceName={sensor.name}
                                        applianceCondition={sensor.value}
                                        roomName={roomSelected}
                                        floorName={floorSelected}
                                        linkTo="/"
                                    />
                                </div>


                            );

                        }

                    })}

                </div>*/}

            </div>




        </div>
    )
}

export default PageCurrentStatusInner;