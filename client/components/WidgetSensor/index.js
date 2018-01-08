import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import './WidgetSensor.scss'


class StatWidget extends Component{ // eslint-disable-line
    static propTypes = {
        applianceId : React.PropTypes.number,
        style: React.PropTypes.string,
        picture: React.PropTypes.string,
        applianceType : React.PropTypes.string,
        applianceName: React.PropTypes.string,
        applianceCondition: React.PropTypes.string,
        roomName: React.PropTypes.string,
        id : React.PropTypes.number,
        floorName : React.PropTypes.string,
    }
    render() {
        return (
           <div className="widget-sensor">
            <Panel style={{height : "186px"}}
                header={<div className="row " style={{backgroundColor : this.props.applianceType  == 'Light' ? "#F79555" : "#cbb134",width : "111%", height : "117%", marginTop : "-10px",color:"white","fontWeight": "900"}}>
          <div className="col-xs-3">

 <div className="imag"  style={{paddingTop : "13px"}}>

          {
                     this.props.applianceType  == 'Light'
                ?    <img src={require("../../Public/Images/light4.jpg")}   width="100" height="100"  />
                :
            (
                     this.props.applianceType == 'fan'
                 ?   <img src={require("../../Public/Images/Fan2New.jpg")}   width="100" height="100"  />
                 :   <img src={require("../../Public/Images/temp3New.jpg")}   width="100" height="100"  />  )

            }

               </div>

          </div>


          <div className="col-xs-9 text-right">
            <div className="huge" style={{paddingTop : "20px"}}>
              {
                this.props.applianceCondition
              }
            </div>
            <div style={{paddingTop : "16px" , paddingBottom : "16px"}}>
              {
                this.props.applianceName
              }
            </div>
             <div>
              {
                   this.props.floorName
              }
            </div>

          </div>
        </div>}
            >

            </Panel>
           </div>
        );
    }
}

export default StatWidget;
