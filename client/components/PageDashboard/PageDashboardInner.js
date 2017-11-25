//libs
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Panel } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';

//src
import StatWidget from '../../components/Widget';
import StatWidget4Mode from '../../components/Widget4Mode';
import './PageDashboardInner.scss'
import PageLoading from '../PageLoading';



//libs
import {PageHeader} from 'react-bootstrap';

const PageDashboardInner = (props) =>{
   const {DashboardData,isLoading} = props;
   if(isLoading == true)
       return <PageLoading/>

   debugger;
    return (
       <div>
           <div className="row "  >



               {/*  bulb with dynamic data*/}
               <div className="col-lg-4 col-md-6 ">
                   <div>
                       <StatWidget
                           style="panel-primary"
                           picture="fa fa-comments fa-5x"
                           applianceType="bulb"
                           applianceOn={DashboardData.overview.bulb.totalon}
                           totalAppliance={DashboardData.overview.bulb.total}
                           floorName=" "
                           linkTo="/"
                       />
                   </div>
               </div>




               {/* fan with dynamic data*/}
               <div className="col-lg-4 col-md-6 ">

                   <div>
                       <StatWidget
                           style="panel-yellow"
                           picture="fa fa-comments fa-5x"
                           applianceType="fan"
                           applianceOn={DashboardData.overview.fan.totalon}
                           totalAppliance={DashboardData.overview.fan.total}
                           floorName=" "
                           linkTo="/"
                       />
                   </div>

               </div>


                  {/* mode*/}
               <div className="col-lg-4 col-md-6 ">

                   <div>
                       <StatWidget
                           style="panel-yellow"
                           picture="fa fa-comments fa-5x"
                           applianceType="mode"
                           applianceOn={DashboardData.overview.mode.name}
                           totalAppliance=""
                           floorName="homeMode"
                           linkTo="/"
                       />
                   </div>

               </div>


           </div>


           <div className="row">
                               Bulbs and Fans Graph
           </div>

           <div className="row">
               <div className="col-lg-12">
                   <Panel
                       header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Bulb Logs Graph of Last 24 hours
            </span>}
                   >

                       <div className="row">
                           <div className="col-lg-12">
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
           </div>

           <div className="row">
               <div className="col-lg-12">
                   <Panel
                       header={<span>
         <i className="fa fa-bar-chart-o fa-fw" /> Fan Logs Graph of Last 24 hours
         </span>}
                   >

                       <div className="row">
                           <div className="col-lg-12">
                               <LineChart width={600} height={300} data={DashboardData.fan_log}
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
           </div>

       </div>
    )
}

export default PageDashboardInner;