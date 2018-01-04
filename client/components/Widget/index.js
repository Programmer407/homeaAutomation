import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import './Widget.scss'


class StatWidget extends Component{ // eslint-disable-line
  static propTypes = {
    style: React.PropTypes.string,
    applianceOn: React.PropTypes.number,
    totalAppliance: React.PropTypes.number,
    picture: React.PropTypes.string,
    floorName: React.PropTypes.string,
    applianceType : React.PropTypes.string,
  }
  render() {
    return (
    /*    <div class="panel panel-default" style={{backgroundColor : "#ddd"}}>
          <div class="panel-heading" style={{backgroundColor : "#d9534f"}}>
            <div className="row">
              <div className="col-xs-3">
                <div className="imag">

                    {
                        this.props.applianceType  == 'bulb'
                            ?    <img src={require("../../Public/Images/BulbNew.jpg")}   width="60" height="80"  />
                            :
                            (
                                this.props.applianceType == 'fan'
                                    ?   <img src={require("../../Public/Images/Fan2New.jpg")}   width="60" height="80"  />
                                    :   <img src={require("../../Public/Images/modeNew.jpg")}   width="60" height="80"  />  )

                    }

                </div>

              </div>


              <div className="col-xs-9 text-right">
                <div className="huge">
                    {
                        this.props.applianceOn
                    }
                </div>
                <div>
                    {
                        this.props.applianceType == 'bulb'
                            ? "Bulb On Out Of"
                            :
                            (  this.props.applianceType == 'fan'
                                ? "Fan On Out Of"
                                :  "Mode" )
                    }
                </div>
                <div>
                    {
                        this.props.totalAppliance== "" ? 'Activated' :  this.props.totalAppliance
                    }
                </div>

              </div>
            </div>
          </div>
          <div class="panel-body">
              {
                  this.props.floorName == "homeMode" ?
                      <div className="row">
                        <div className="col-lg-6 col-md-6 text-center ">
                          Change Mood
                        </div>

                        <div className="col-lg-6 col-md-6 text-center">
                          <select>
                            <option value="" >Select Mood</option>
                            <option value="General"  >Auto</option>
                            <option value="Manual"  >Manual</option>
                            <option value="Manual"  >Sleep</option>
                          </select>
                        </div>
                      </div> :
                      <div>Home</div>
              }
          </div>
        </div>*/
    <div className="Widget">
    <Panel
        header={<div className="row" style={{backgroundColor : this.props.applianceType  == 'bulb' ? "#0088FE" : (this.props.applianceType == 'fan' ?  "#5cb85c" : "#FF8042"),   width : "108%", height : "117%", marginTop : "-10px"}}>
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
              {
                this.props.applianceOn
              }
            </div>
            <div  style={{paddingTop : "16px" , paddingBottom : "16px"}}>
              {
                this.props.applianceType == 'bulb'
                    ? "Bulb On Out Of"
                    :
                 (  this.props.applianceType == 'fan'
                   ? "Fan On Out Of"
                   :  "Mode" )
              }
            </div>
             <div>
              {
                this.props.totalAppliance== "" ? 'Activated' :  this.props.totalAppliance
              }
            </div>

          </div>
        </div>}
      >
          {
              this.props.floorName == "homeMode" ?
                  <div className="row">
                    <div className="col-lg-6 col-md-6 text-center ">
                      Change Mood
                    </div>

                    <div className="col-lg-6 col-md-6 text-center">
                      <select>
                        <option value="" >Select Mood</option>
                        <option value="General"  >Auto</option>
                        <option value="Manual"  >Manual</option>
                        <option value="Manual"  >Sleep</option>
                      </select>
                    </div>
                  </div> :
                  <div>Home</div>
          }
      </Panel>
    </div>
    );
  }
}

export default StatWidget;
