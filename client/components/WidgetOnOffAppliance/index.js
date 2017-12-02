import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

import './WidgetOnOffAplliance.scss'


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
            <div className="widget-appliance ">
            <Panel style={{height : "186px"}}
                header={<div className="row widget-appliance" style={{backgroundColor : this.props.applianceType  == 'bulb' ? "#337ab7" : "#5cb85c",width : "108%", height : "117%", marginTop : "-10px"}}>
          <div className="col-xs-3">

 <div className="imag" style={{paddingTop : "13px"}}>

          {
                     this.props.applianceType  == 'bulb'
                ?    <img src={require("../../Public/Images/BulbNew.jpg")}   width="75" height="110"  />
                :
            (
                     this.props.applianceType == 'fan'
                 ?   <img src={require("../../Public/Images/Fan2New.jpg")}   width="75" height="110"  />
                 :   <img src={require("../../Public/Images/modeNew.jpg")}   width="75" height="110"  />  )

            }

               </div>

          </div>


          <div className="col-xs-9 text-right">
            <div className="huge" style={{paddingTop : "20px"}}>
            {/*  {
                this.props.applianceCondition
              }*/}
              <Toggle style={{paddingLeft : "82%"}}
              defaultToggled={ this.props.applianceCondition==1 ? true : false}
              />
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
