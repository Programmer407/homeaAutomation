//libs
import React from 'react';


//src
import './PageCurrentStatusInner.scss'
import WidgetOnOffAppliance from '../../components/WidgetOnOffAppliance';
import WidgetSensor from '../../components/WidgetSensor';
import PageLoading from '../PageLoading';

const PageCurrentStatusInner = (props) =>{
  const {NowData,isLoading,afterFloorSelected,afterRoomSelected,floorSelected,roomSelected} = props
if(isLoading ==true)
    return <PageLoading/>

    return (
        <div>





            <div className="row">
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
                                <option value=" ">Select Floor</option>

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
                                <option value=" ">Select Room </option>
                                {NowData.palaces.map((palace, key) => {
                                    if(palace.floorFloorId == floorSelected)
                                        return (
                                            <option value={palace.palace_id}  >{palace.name}</option>
                                        );})}

                            </select>
                        </div>
                    </div>


                </div>
            </div>




            <div className="row ">

                <div className="col-lg-4 col-lg-offset-1 col-md-6 " style={{paddingTop : "30px"}}>
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


                <div className="col-lg-4 col-lg-offset-1 col-md-6 "  style={{paddingTop : "30px"}}>
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




            </div>


            <div className="row">



                <div className="col-lg-4 col-lg-offset-1 col-md-6 "  style={{paddingTop : "30px"}}>
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

                </div>

            </div>




        </div>
    )
}

export default PageCurrentStatusInner;