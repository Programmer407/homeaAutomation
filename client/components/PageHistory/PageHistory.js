//libs
import React from 'react';
import { connect } from 'react-redux';




//src
import PageHistoryInner from './PageHistoryInner'
import {fetchHistoryData} from '../../actions/entities/history'
import PageLoading from '../PageLoading';

const mapStateToProps = (state, ownProps) => {
    const {feed : {history : {history : {history}}}} = state
    const {feed : {history : {isLoading }}} = state

    return {history,isLoading}
}

@connect(mapStateToProps, {fetchHistoryData})

export default class PageHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history : {
                "logs": [
                    {
                        "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"table bulb\"   , Turn \" ON \" By \"Ali\"  .",
                        "time": "2017-06-11T10:20:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"table bulb\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-11T20:20:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"Ceiling Fan\"   , Turn \" OFF \" By \"Sakib\"  .",
                        "time": "2017-06-11T20:21:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My Ground Floor\"   ,Palace name \"living room\"   , Switch of \"Ceiling Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-11T20:23:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My Ground Floor\"   ,Palace name \"Guest room\"   , Switch of \"wall bulb\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-11T20:24:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My Ground Floor\"   ,Palace name \"Guest room\"   , Switch of \"Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-11T20:24:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My Ground Floor\"   ,Palace name \"Guest room\"   , Switch of \"Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-11T21:24:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"Roof bulb\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-11T21:26:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"wall Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-11T22:26:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"wall Fan\"   , Turn \" OFF \" By \"Ali\"  .",
                        "time": "2017-06-12T01:26:33.000Z"
                    },
                    {
                        "msg": "In Floor \"My First Floor\"   ,Palace name \"hall\"   , Switch of \"Roof bulb\"   , Turn \" OFF \" By \"Sakib\"  .",
                        "time": "2017-06-12T04:26:33.000Z"
                    }
                ]
            }
        }
    }

    componentDidMount(){
        console.log("COmponent did mount has been called")
        const {fetchHistoryData} = this.props
        fetchHistoryData()
    }

    componentWillMount(){
    }


    render(){
        const {isLoading,history} = this.props
        debugger;
        if(isLoading == true || history == undefined)
            return <PageLoading/>

        return(
            <PageHistoryInner {...this.props}
                HistoryData = {history}
                isLoading = {isLoading}
            />
        )
    }
}