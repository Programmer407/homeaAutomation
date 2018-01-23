import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import './Widget.scss'

import {connect} from 'react-redux'
import {changeHomeMode} from '../../actions/entities/dashboard'

const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{changeHomeMode})

class StatWidget extends Component{ // eslint-disable-line
    constructor(props){
        super(props);
        this.state = {
          modeName : this.props.applianceOn
        }
        this.handleChangeMode = this.handleChangeMode.bind(this);
    }
    handleChangeMode(event, index, value){
        const {changeHomeMode,homeId} = this.props
        this.setState({modeName : value})
             changeHomeMode(homeId,value);
    }

  render() {
      console.log(this.props);
      debugger;
    return (
    <div className="Widget">
    <Panel
        header={<div className="row" style={{backgroundColor : this.props.applianceType  == 'bulb' ? "#0088FE" : (this.props.applianceType == 'fan' ?  "#5cb85c" : "#00AF98"),   width : "108%", height : "117%", marginTop : "-10px",color:"white","fontWeight": "900"}}>
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
                   :   <DropDownMenu value={this.state.modeName} onChange={this.handleChangeMode} >
                                    <MenuItem value="Automatic" primaryText="Automatic" />
                      <MenuItem value="Manual" primaryText="Manual" />
                    </DropDownMenu>

                     )
              }
            </div>
             <div>
              {
                this.props.totalAppliance== "" ? '' :  this.props.totalAppliance
              }
            </div>

          </div>
        </div>}
      >
          {
              this.props.floorName == "homeMode" ?
                 <div>
                  Home
                  </div>
                  :
                  <div>Home</div>
          }
      </Panel>
    </div>
    );
  }
}

export default StatWidget;
