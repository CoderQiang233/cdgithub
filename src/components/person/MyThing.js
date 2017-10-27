import React from 'react';
import { Tabs,Table, Icon,Modal, Button } from 'antd';
const TabPane = Tabs.TabPane;
import styles from './MyThing.less';
import { connect } from 'dva';
import { Router, Route, Link, hashHistory } from 'react-router';
import config  from '../../utils/config';

import TLeave from '../matterDetail/TLeave.js';

import SDoctoralRestudy from '../matterDetail/SDoctoralRestudy.js';

import SDoctoralDelayed from '../matterDetail/SDoctoralDelayed.js';
const { APIV2 } = config



class MyThing extends React.Component{
  
  constructor(props){
    super(props)
    this.state={ }
  }
  callback=(key)=>{
  }

  componentDidMount() {
      let data={};
      data['uName']=this.props.login.account.uName+'-'+this.props.login.account.uNum;
      this.props.dispatch({
        type: 'persion/queryUserAllUnDoneThing',
        payload: data,
      });
      this.props.dispatch({
        type: 'persion/queryUserAllDoneThing',
        payload: data,
      });
 }

  getUnDoneThing=(page)=>{
    let data={};
    data['uName']=this.props.login.account.uName+'-'+this.props.login.account.uNum;
    if(page){
      data['current']=page
    }
    this.props.dispatch({
      type: 'persion/queryUserAllUnDoneThing',
      payload: data,
    });
  }

  getDoneThing=(page)=>{
    let data={};
    data['uName']=this.props.login.account.uName+'-'+this.props.login.account.uNum;
    if(page){
      data['current']=page
    }
    this.props.dispatch({
      type: 'persion/queryUserAllDoneThing',
      payload: data,
    });
  }
  
    
   render(){
    return(
      <div className={styles.personTab}>
       <Tabs defaultActiveKey="1" onChange={this.callback}  className={styles.tabContent}>
       <TabPane  tab="办理中事项" key="1">
         <div className={styles.tabContent}>
         <AllUnThing {...this.props.persion.MyAllUnDoneTingProps} getUnDoneThing={this.getUnDoneThing} loading={this.props.persion.loading} flowChartPath={this.props.persion.flowChartPath} dispatch={this.props.dispatch} ></AllUnThing>
         </div>
       </TabPane>
       <TabPane tab="办理完毕事项" key="2">
         <div className={styles.tabContent}>
         <AllDoneThing {...this.props.persion.MyAllDoneTingProps} getDoneThing={this.getDoneThing} loading={this.props.persion.loading}></AllDoneThing>
         </div>
        </TabPane>
      </Tabs>
      </div>
      
    )
   }
    
}
class AllUnThing extends React.Component{
  constructor(props){
    super(props)
    this.state={
      imgPath:'',
      visible: false,
      matterId:0,
      matter:''
    }
  }
  showModal = (matter,matterId,id) => {
    let data={};
    data['id']=id;
    this.props.dispatch({
      type: 'persion/getFlowChartPath',
      payload: data,
    });
    this.setState({
      visible: true,
      // imgPath:APIV2+imgPath,
      matterId:matterId,
      matter:matter
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render(){

    const columns = [{
      title: '事项名称',
      dataIndex: 'matterName',
    }, {
      title: '申请人',
      dataIndex: 'startMan',
    }, {
      title: '提交时间',
      dataIndex: 'startTime',
    }, {
      title: '事项状态',
      dataIndex: 'thingState',
      render:(text,record)=>(
        <span>审核中</span>
      )
    }, {
      title: '操作',
      dataIndex: 'operation',
      render:(text,record)=>(
        <a onClick={this.showModal.bind(this,record['businessKey'].split(".")[0],record['businessKey'].split(".")[1],record['id'])}>查看进度</a>
      )
    }];

    const {loading,
      dataSource}=this.props;

      const pagination = {
        total:parseInt(this.props.total),
        current:parseInt(this.props.current),
        pageSize:parseInt(this.props.pageSize),
        onChange: (pageNumber)=>{
          console.log(pageNumber);
          this.props.getUnDoneThing(pageNumber)
        },
      };
    return(
      <div>
      <Table rowKey={record => record.id} columns={columns}  dataSource={dataSource}  loading={loading} pagination={pagination}
           
              bordered />
              <Modal
                title="事项进度"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                wrapClassName='myUnThingModal'
              >
              <Tabs defaultActiveKey="1" >
                <TabPane tab="表单" key="1">
                {
                  this.state.matter=='TLeave'&&
                  <TLeave matter={this.state.matter} matterId={this.state.matterId} from={2}></TLeave>
                }
                {
                  this.state.matter=='SDoctoralRestudy'&&
                  <SDoctoralRestudy matter={this.state.matter} matterId={this.state.matterId} from={2}></SDoctoralRestudy>
                }
                {  
                  this.state.matter=='SDoctoralDelayed'&&
                  <SDoctoralDelayed matter={this.state.matter} matterId={this.state.matterId} from={2}></SDoctoralDelayed>
                }
                </TabPane>
                <TabPane tab="流程图" key="2">
                  {/* <img src={this.state.imgPath} /> */}
                  <img src={this.props.flowChartPath} />
                </TabPane>
              </Tabs>
                
              </Modal>
      </div>
    )
  }
}

class AllDoneThing extends React.Component{

  constructor(props){
    super(props)
    this.state={
      matterId:0 ,
      matter:'',
      visible: false,
    }
  }

  showModal = (matter,matterId) => {
    this.setState({
      visible: true,
      matterId:matterId,
      matter:matter
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render(){

    const {loading, dataSource}=this.props

    const columns = [{
      title: '事项名称',
      dataIndex: 'matterName',
    }, {
      title: '申请人',
      dataIndex: 'startMan',
    }, {
      title: '提交时间',
      dataIndex: 'startTime',
    }, {
      title: '事项状态',
      dataIndex: 'thingState',
      render:(text,record)=>(
        <span>办理完毕</span>
      )
    }, {
      title: '操作',
      dataIndex: 'operation',
      render:(text,record)=>(
        <a onClick={this.showModal.bind(this,record['businessKey'].split(".")[0],record['businessKey'].split(".")[1])}>查看详情</a>
      )
    }];
    const pagination = {
      total:parseInt(this.props.total),
      current:parseInt(this.props.current),
      pageSize:parseInt(this.props.pageSize),
      onChange: (pageNumber)=>{
        console.log(pageNumber);
        this.props.getDoneThing(pageNumber)
      },
    };
    return(
<div>
<Table rowKey={record => record.id} columns={columns}  dataSource={dataSource} pagination={pagination}  loading={loading}
     
        bordered />
               <Modal
                title="事项进度"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                wrapClassName='myDoneThingModal'
              >
                {
                  this.state.matter=='TLeave'&&
                  <TLeave matter={this.state.matter} matterId={this.state.matterId} from={2}></TLeave>
                }
                {
                  this.state.matter=='SDoctoralRestudy'&&
                  <SDoctoralRestudy matter={this.state.matter} matterId={this.state.matterId} from={2}></SDoctoralRestudy>
                }
                {  
                  this.state.matter=='SDoctoralDelayed'&&
                  <SDoctoralDelayed matter={this.state.matter} matterId={this.state.matterId} from={2}></SDoctoralDelayed>
                }
              </Modal>
</div>
    )
  }
}



function mapStateToProps({persion,login}) {
  return {persion,login};
}

export default connect(mapStateToProps)(MyThing);

