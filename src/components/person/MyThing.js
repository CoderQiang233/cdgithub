import React from 'react';
import { Tabs,Table, Icon,Modal, Button } from 'antd';
const TabPane = Tabs.TabPane;
import styles from './MyThing.less';
import { connect } from 'dva';
import { Router, Route, Link, hashHistory } from 'react-router';
import config  from '../../utils/config';

import TLeave from '../matterDetail/TLeave.js';

const { APIV2 } = config



class MyThing extends React.Component{
  
  constructor(props){
    super(props)
    this.state={ }
  }
  callback=(key)=>{
    console.log(key);
    console.log(this)
    
    // if(key==1){
    //   let data={};
    //   data['uName']=this.props.persion.login.account.uName
    //   this.props.dispatch({
    //     type: 'persion/queryUserAllUnDoneThing',
    //     payload: data,
    //   });
    // }else if(key==2){
    //   let data={};
    //   data['uName']=this.props.persion.login.account.uName
    //   this.props.dispatch({
    //     type: 'persion/queryUserAllDoneThing',
    //     payload: data,
    //   });
    // }
  }

  componentWillMount(){
    const isLogin=this.props.persion.login.isLogin;
    if(!isLogin){
      hashHistory.push('/login')
    }
  }

  componentDidMount() {

    console.log(this.props.persion.login.account.uName)
    let data={};
    data['uName']=this.props.persion.login.account.uName
    this.props.dispatch({
      type: 'persion/queryUserAllUnDoneThing',
      payload: data,
    });
    this.props.dispatch({
      type: 'persion/queryUserAllDoneThing',
      payload: data,
    });
  
 }

//  componentWillReceiveProps(nextProps) {
//    if(this.props.persion.login.account.uName){
//     console.log(1)
//    }
//  }
  
    
   render(){
    return(
      <div className={styles.personTab}>
       <Tabs defaultActiveKey="1" onChange={this.callback}  className={styles.tabContent}>
       <TabPane  tab="办理中事项" key="1">
         <div className={styles.tabContent}>
         <AllUnThing {...this.props.persion.persion.MyAllUnDoneTingProps}></AllUnThing>
         </div>
       </TabPane>
       <TabPane tab="办理完毕事项" key="2">
         <div className={styles.tabContent}>
         <AllDoneThing {...this.props.persion.persion.MyAllDoneTingProps}></AllDoneThing>
         </div>
        </TabPane>
       {/* <TabPane tab="办理中事项" key="3">
         <div className={styles.tabContent}>
         <AllThing {...this.props.persion.MyAllUnDoneTingProps}></AllThing>
         </div>
       </TabPane> */}
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
    }
  }
  showModal = (imgPath) => {
    console.log(APIV2+imgPath)
    this.setState({
      visible: true,
      imgPath:APIV2+imgPath,
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
        <a onClick={this.showModal.bind(this,record['imgPath'])}>查看进度</a>
      )
    }];

    const {loading,
      dataSource}=this.props

    return(
      <div>
      <Table columns={columns}  dataSource={dataSource}  loading={loading}
           
              bordered />
              <Modal
                title="事项进度"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                wrapClassName='myUnThingModal'
              >
                <img src={this.state.imgPath} />
              </Modal>
            </div>
    )
  }
}
// const AllUnThing=({
//   loading,
//   dataSource,})=>{

    

//     console.log(dataSource)
 
  
  

//   //    定义分页对象
//   // const pagination = {
//   //   total,
//   //   current,
//   //   pageSize: 10,
//   //   onChange: ()=>{},
//   // };
    

//     return(
     
      
//     )
// }
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


    return(
<div>
<Table columns={columns}  dataSource={dataSource}  loading={loading}
     
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
                  <TLeave matter={this.state.matter} matterId={this.state.matterId}></TLeave>
                }
              </Modal>
</div>
    )
  }
}
// const AllDoneThing=({
//   })=>{
//     console.log(dataSource)
 
  
  

//   //    定义分页对象
//   // const pagination = {
//   //   total,
//   //   current,
//   //   pageSize: 10,
//   //   onChange: ()=>{},
//   // };
    

//     return(
     
//     )
// }


function mapStateToProps(persion) {
  return {persion};
}

export default connect(mapStateToProps)(MyThing);
