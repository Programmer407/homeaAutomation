//libs
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {BarChart,Bar, Cell} from 'recharts';
import { Panel } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

//src
import StatWidget from '../../components/Widget';
import StatWidget4Mode from '../../components/Widget4Mode';
import './PageDashboardInner.scss'
import PageLoading from '../PageLoading';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#4CF335 '];
//libs
import {PageHeader} from 'react-bootstrap';

const PageDashboardInner = (props) =>{
   const {DashboardData,NowData,isLoading,handleFloorSelected,handleRoomSelected,floorSelected,roomSelected} = props;
   if(isLoading == true)
       return <PageLoading/>
debugger;


var newBulgLog  = DashboardData.bulb_log;
    if(newBulgLog != undefined && newBulgLog != null)
    {
        debugger;
        for(var i=0;i<newBulgLog.length;i++){
         /* var newTime = newBulgLog[i].time.substring(0,5)*/
           newBulgLog[i].time = newBulgLog[i].time.substring(0,5)
        }
    }


    var newFanLog  = DashboardData.fan_log;
    if(newFanLog != undefined && newFanLog != null)
    {
        debugger;
        for(var i=0;i<newFanLog.length;i++){
            /* var newTime = newBulgLog[i].time.substring(0,5)*/
            newFanLog[i].time = newFanLog[i].time.substring(0,5)
        }
    }

debugger;
    return (
       <div className="dahsboard">
           <div className="row"  >



               {/*  bulb with dynamic data*/}
               <div className="col-lg-4 col-md-6 col-sm-6 ">
                   <div>
                       <StatWidget
                           style="panel-primary"
                           picture="fa fa-comments fa-5x"
                           applianceType="bulb"
                           applianceOn={DashboardData.overview.bulb.totalon}
                           totalAppliance={DashboardData.overview.bulb.total}
                           floorName=" "
                           homeId = {NowData.floors[0].homeHomeId}
                           linkTo="/"
                       />
                   </div>
               </div>




               {/* fan with dynamic data*/}
               <div className="col-lg-4 col-md-6 col-sm-6 ">

                   <div>
                       <StatWidget
                           style="panel-yellow"
                           picture="fa fa-comments fa-5x"
                           applianceType="fan"
                           applianceOn={DashboardData.overview.fan.totalon}
                           totalAppliance={DashboardData.overview.fan.total}
                           floorName=" "
                           homeId = {NowData.floors[0].homeHomeId}
                           linkTo="/"
                       />
                   </div>

               </div>


                  {/* mode*/}
               <div className="col-lg-4 col-md-6 col-sm-6">

                   <div>
                       <StatWidget
                           style="panel-yellow"
                           picture="fa fa-comments fa-5x"
                           applianceType="mode"
                           applianceOn={DashboardData.overview.mode.name}
                           totalAppliance=""
                           floorName="homeMode"
                           homeId = {NowData.floors[0].homeHomeId}
                           linkTo="/"
                       />
                   </div>

               </div>


           </div>

           <div className="row">
               <div className="col-lg-6">
                   <Panel
                       header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Bulb Logs Graph of Last 24 hours
            </span>}
                   >

                       <div className="row">
                           <div className="col-lg-6">
                               <BarChart width={730} height={300} data={newBulgLog}>
                                   <XAxis angle={-45} interval={0} dataKey="time" padding={{ top : 100}}/>
                                   <YAxis />
                                   <Tooltip />
                                   <Legend  />
                                   <Bar dataKey="total_on" fill="#8884d8" >
                                       {
                                           (newBulgLog || []).map((entry, index) => <Cell  fill={COLORS[index % COLORS.length]}/>)
                                       }
                                   </Bar>
                               </BarChart>
                           </div>
                       </div>


                   </Panel>
               </div>
               <div className="col-lg-6">
                   <Panel
                       header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Fan Logs Graph of Last 24 hours
            </span>}
                   >

                       <div className="row">
                           <div className="col-lg-6">
                               <BarChart width={730} height={300} data={DashboardData.fan_log}>
                                   <XAxis angle={-45} interval={0} dataKey="time"/>
                                   <YAxis />
                                   <Tooltip  />
                                   <Legend />
                                   <Bar dataKey="total_on" fill="#8884d8" >
                                       {
                                           (DashboardData.bulb_log || []).map((entry, index) => <Cell  fill={COLORS[index % COLORS.length]}/>)
                                       }
                                   </Bar>
                               </BarChart>
                           </div>
                       </div>


                   </Panel>
               </div>
           </div>



           <div className="row">
               <div className="col-lg-8 col-md-6 col-sm-4 ">

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

   {/* Temperature and light sensor data*/}

           <div className="row">
               <div className="col-lg-6">
                   <Panel
                       header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Temperature Data of last 24 hours
            </span>}
                   >

                       <div className="row">
                           <div className="col-lg-6">
                               <BarChart width={730} height={300} data={DashboardData.bulb_log}>
                                   <XAxis angle={-45} interval={0} dataKey="time"/>
                                   <YAxis />
                                   <Tooltip />
                                   <Legend  />
                                   <Bar dataKey="total_on" fill="#8884d8" >
                                       {
                                           (DashboardData.bulb_log || []).map((entry, index) => <Cell  fill={COLORS[index % COLORS.length]}/>)
                                       }
                                   </Bar>
                               </BarChart>
                           </div>
                       </div>


                   </Panel>
               </div>
               <div className="col-lg-6">
                   <Panel
                       header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Light sensor of last 24 hours
            </span>}
                   >

                       <div className="row">
                           <div className="col-lg-6">
                               <BarChart width={730} height={300} data={DashboardData.fan_log}>
                                   <XAxis angle={-45} interval={0} dataKey="time"/>
                                   <YAxis />
                                   <Tooltip  />
                                   <Legend />
                                   <Bar dataKey="total_on" fill="#8884d8" >
                                       {
                                           (DashboardData.bulb_log || []).map((entry, index) => <Cell  fill={COLORS[index % COLORS.length]}/>)
                                       }
                                   </Bar>
                               </BarChart>
                           </div>
                       </div>


                   </Panel>
               </div>
           </div>
         {/*  <div className="row">
               <div className="col-lg-6">
                   <Panel
                       header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Bulb Logs Graph of Last 24 hours
            </span>}
                   >

                       <div className="row">
                           <div className="col-lg-6">
                               <LineChart width={600} height={300} data={DashboardData.bulb_log}
                                          margin={{top: 5, right: 0, left: 80, bottom: 5}}>
                                   <XAxis dataKey="time"/>
                                   <YAxis/>
                                   <CartesianGrid strokeDasharray="3 3"/>
                                   <Tooltip/>
                                   <Legend />
                                   <Line type="monotone" dataKey="total_on" stroke="#8884d8" activeDot={{r: 8}}/>
                                   /!*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*!/
                               </LineChart>
                           </div>
                       </div>


                   </Panel>
               </div>
               <div className="col-lg-6">
                   <Panel
                       header={<span>
         <i className="fa fa-bar-chart-o fa-fw" /> Fan Logs Graph of Last 24 hours
         </span>}
                   >

                       <div className="row">
                           <div className="col-lg-6">
                               <LineChart width={600} height={300} data={DashboardData.fan_log}
                                          margin={{top: 5, right: 0, left: 80, bottom: 5}}>
                                   <XAxis dataKey="time"/>
                                   <YAxis/>
                                   <CartesianGrid strokeDasharray="3 3"/>
                                   <Tooltip/>
                                   <Legend  />
                                   <Line type="monotone" dataKey="total_on" stroke="#8884d8" activeDot={{r: 8}}/>
                                   /!*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*!/
                               </LineChart>
                           </div>
                       </div>


                   </Panel>
               </div>
           </div>*/}


       </div>
    )
}

export default PageDashboardInner;