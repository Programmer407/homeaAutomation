import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddApplianceNewInner from './AddApplianceNewInner'
import {addAppliance} from '../../actions/entities/appliance'
import {getAllHomes} from '../../actions/entities/home'
import {getAllFloorsForSpecificHome} from '../../actions/entities/floor'


const mapStateToProps = (state, ownProps) => {
    const {entities : {homes : {allHomes}}} = state
    return {allHomes}
}

@connect(mapStateToProps,{addAppliance,getAllHomes,getAllFloorsForSpecificHome})


export default class AddApplianceNew extends React.Component {
    constructor(props){
        super(props)
        this.state ={
               isSubmit  : false,
            selectedHomeName : "",
            selectedFloorName : "",
            selectedPalaceName : "",
            applianceType : "",
            applianceName : "",
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleHomeName = this.handleHomeName.bind(this);
        this.handleFloorName = this.handleFloorName.bind(this);
        this.handlePalaceName = this.handlePalaceName.bind(this);
        this.handlePalaceName = this.handlePalaceName.bind(this);
        this.handleApplianceName = this.handleApplianceName.bind(this);
        this.handleApplianceType = this.handleApplianceType.bind(this)
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
    }

    componentDidMount(){
        const  {getAllHomes} = this.props
        getAllHomes();
    }


   handleCloseDialog() {
   const {handleCancelDialog,addAppliance} = this.props
       const {selectedHomeName,selectedFloorName, selectedPalaceName,applianceType,applianceName,isSubmit} = this.state
       this.setState({isSubmit : true})
       if(selectedHomeName != "" && selectedFloorName != "" && selectedPalaceName != "" &&  applianceType != "" && applianceName != "") {
           addAppliance(selectedHomeName,selectedFloorName,selectedPalaceName,applianceType,applianceName);
           handleCancelDialog();
           this.setState({
               isSubmit : false,
               selectedHomeName : "",
               selectedFloorName : "",
               selectedPalaceName : "",
               applianceType : "",
               applianceName : "",
           })
       }
    }


    handleHomeName(event, index, value){
        const {getAllFloorsForSpecificHome} = this.props
        getAllFloorsForSpecificHome(value);
        this.setState({selectedHomeName: value});
    }


    handleFloorName(event, index, value){
        this.setState({selectedFloorName: value});
    }

    handlePalaceName(event, index, value){
        this.setState({selectedPalaceName: value});
    }

    handleApplianceType(event, index, value){
        this.setState({applianceType: value});
    }

    handleApplianceName(event){
        console.log(event.target.value)
        this.setState({applianceName : event.target.value})
    }



    handleCancelDialog(){
        const {handleCancelDialog} = this.props
        this.setState({
            isSubmit : false,
            selectedHomeName : "",
            selectedFloorName : "",
            selectedPalaceName : "",
            applianceType : "",
            applianceName : "",
        })
        handleCancelDialog();
    }


    render(){
         return <AddApplianceNewInner
             {...this.state}
            {...this.props}
             handleCloseDialog = {this.handleCloseDialog}
             handleHomeName = {this.handleHomeName}
             handleFloorName = {this.handleFloorName}
             handlePalaceName = {this.handlePalaceName}
             handleApplianceType = {this.handleApplianceType}
             handleApplianceName = {this.handleApplianceName}
             handleCancelDialog = {this.handleCancelDialog}

        />
    }

}
