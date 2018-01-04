import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddApplianceInner from './AddApplianceInner'
import {addAppliance} from '../../actions/entities/appliance'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{addAppliance})


export default class AddAppliance extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            applianceName : "",
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleApplianceName = this.handleApplianceName.bind(this)
    }

    handleCloseDialog(){
        const {handleCancelDialog,addAppliance} = this.props;
     addAppliance(this.state.applianceName);
        handleCancelDialog();
    }

    handleApplianceName(event){
        console.log(event.target.value)
        this.setState({applianceName : event.target.value})
    }






    render(){
        return <AddApplianceInner
            {...this.props}
            applianceName = {this.state.applianceName}
            handleCloseDialog = {this.handleCloseDialog}
            handleApplianceName = {this.handleApplianceName}
        />
    }

}
