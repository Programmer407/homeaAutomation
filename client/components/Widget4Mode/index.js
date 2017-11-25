import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';


class StatWidget extends Component{ // eslint-disable-line
    static propTypes = {
        style: React.PropTypes.string,
        modeActivated: React.PropTypes.string,
        totalAppliance: React.PropTypes.number,
        picture: React.PropTypes.string,
        floorName: React.PropTypes.string,
        applianceType : React.PropTypes.string,
    }
    render() {
        return (
            <Panel
                className={this.props.style}
                header={<div className="row">
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
                this.props.modeActivated
              }
            </div>
            <div>
              Mode
            </div>
             <div>
             Activated
            </div>

          </div>
        </div>}
            >
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
              </div>
            </Panel>

        );
    }
}

export default StatWidget;


/*
 import React, { Component } from 'react';
 import { Panel } from 'react-bootstrap';

 class StatWidget4 extends Component{ // eslint-disable-line
 static propTypes = {
 style: React.PropTypes.string,
 modeActivated: React.PropTypes.string,
 totalAppliance: React.PropTypes.number,
 picture: React.PropTypes.string,
 floorName: React.PropTypes.string,
 applianceType : React.PropTypes.string,
 }
 render() {
 return (
 <Panel

 className={this.props.style}

 header={<div className="row">
 <div className="col-xs-3">

 <div className="imag">

 {
 this.props.applianceType  == 'bulb'
 ?    <img src={require("../../Public/Images/Bulb2.png")}   width="60" height="80"  />
 :
 (
 this.props.applianceType == 'fan'
 ?   <img src={require("../../Public/Images/Fan2.png")}   width="60" height="80"  />
 :   <img src={require("../../Public/Images/modeNew.jpg")}   width="60" height="80"  />  )

 }

 </div>

 </div>


 {/!* <div className="col-xs-9 text-center">
 <div >
 <h6>
 {
 this.props.modeActivated
 }
 </h6>
 </div>
 <div>
 <h6>Mode Activated</h6>
 </div>

 </div>*!/}
 <div className="col-xs-9 text-right">
 <div className="huge">
 {
 this.props.modeActivated
 }
 </div>
 <div>
 Mode
 </div>
 <div>
 Activated
 </div>

 </div>
 </div>}
 >
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
 </div>
 </Panel>


 );
 }
 }

 export default StatWidget4;
 */
