import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

import './WidgetOnOffAplliance.scss'


import {connect} from 'react-redux'


import {toggleAppliance} from '../../actions/entities/appliance'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{toggleAppliance})


class StatWidget extends Component{ // eslint-disable-line
  constructor(props){
      super(props);
      this.state = {
      }
      this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event,newValue){
      const {toggleAppliance,applianceId} = this.props
      toggleAppliance(applianceId,newValue);
  }

    render() {
        return (
            <div className="widget-appliance ">
            <Panel style={{height : "186px"}}
                header={<div className="row widget-row" style={{backgroundColor : this.props.applianceType  == 'bulb' ? "#337ab7" : "#6D768A", height : "117%", marginTop : "-10px",color:"white","fontWeight": "900"}}>
          <div className="col-xs-3">
            <div className="imag" style={{paddingTop : "13px"}}>
          {
                     this.props.applianceType  == 'bulb'
                ?    <img src={require("../../Public/Images/BulbNew.jpg")}   width="100" height="100"  />
                :
            (
                     this.props.applianceType == 'fan'
                 ?   <img src={require("../../Public/Images/Fan2New.jpg")}   width="100" height="100"  />
                 :   <img src={require("../../Public/Images/modeNew.jpg")}   width="100" height="100"  />  )

            }

               </div>

          </div>


          <div className="col-xs-9 text-right">
            <div className="huge" style={{paddingTop : "20px"}}>
              <Toggle style={{paddingLeft : "82%"}}
              defaultToggled={ this.props.applianceCondition==1 ? true : false}
              onToggle={this.handleToggle}
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
