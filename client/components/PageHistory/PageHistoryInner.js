//libs
import React from 'react';
import { Panel } from 'react-bootstrap';
import {PageHeader,ListGroup, ListGroupItem ,Button} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';



//src
import './PageHistoryInner.scss'
import PageLoading from '../PageLoading';
import AppBar from 'material-ui/AppBar';


const PageHistoryInner = (props) =>{
 const { HistoryData,isLoading}  = props;

 if(isLoading == true)
     return <PageLoading/>
    return (
        <div>
            <div className="row historyStyle">
                <div className=" col-lg-8 col-lg-push-2 ">
                    <AppBar style={{height : "6%", textAlign : "center"}}
                            titleStyle={{paddingBottom : "0px", marginBottom : "0px",lineHeight :"41px"}}
                        title="Log Detail"
                        showMenuIconButton={false}
                    />
                    <Panel
                    >
                        <Scrollbars style={{ width: "94%", height: 500,marginLeft : "3%" }}>
                            <ListGroup>
                                {HistoryData.logs.map((item,index)=>{

                                    return (
                                        <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>

                                            <i className="fa fa-bell fa-fw"/>
                                            {item.msg}
                                            <span
                                                className="pull-right text-muted small"><em>{item.time}</em></span>
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                        </Scrollbars>
                    </Panel>

                </div>
            </div>
        </div>
    )
}

export default PageHistoryInner;