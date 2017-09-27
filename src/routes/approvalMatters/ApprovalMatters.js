import React from 'react';
import { connect } from 'dva';
import styles from './ApprovalMatters.less';
import { Table, Tabs,Icon } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Tag } from 'antd';
const TabPane = Tabs.TabPane;




class ApprovalMatters extends React.Component{
  constructor(props){
    super(props)
    this.state={
      unList:Array,
      DoneList:Array
     }  
  }
  callback=(key)=> {
    // if(key==1){
    //   let data={};
    //   data['uName']=this.props.login.account.uName;
    //   this.props.dispatch({ type: 'approvalMatters/getUnMatters', payload: data })
    // }else{
    //   let data={};
    //   data['uName']=this.props.login.account.uName;
    //   this.props.dispatch({ type: 'approvalMatters/getDoneMatters', payload: data })
    // }
  }

  componentWillMount(){
   
    const isLogin=this.props.login.isLogin;
    if(!isLogin){
      hashHistory.push('/login')
    }

  }
  componentDidMount(){
    let data={};
    data['uName']=this.props.login.account.uName+'-'+this.props.login.account.uNum;
    if(!this.props.login.account.uName){
      data['uName']=sessionStorage.getItem('uName')+'-'+sessionStorage.getItem('uNum')
    }

    this.props.dispatch({ type: 'approvalMatters/getUnMatters', payload: data })
    this.props.dispatch({ type: 'approvalMatters/getDoneMatters', payload: data })
  }
  
  render(){

    let unComponent=<UnTable list={this.props.approvalMatters.unList} />;
    if(this.props.children){
      if(this.props.children.type.WrappedComponent.name=="Approval"){
         unComponent=this.props.children;
      }
    }
    let doneComponent=<DoneTable list={this.props.approvalMatters.DoneList} arr={111}></DoneTable>;
    if(this.props.children){
      if(this.props.children.type.WrappedComponent.name=="ApprovalDone"){
        doneComponent=this.props.children;
      }
    }
   
    return(
      <div className={styles.normal}>
        <div className={styles.banner}>
            <img src={require('../../assets/images/banner.jpg')} />
        </div>
        <div  className={styles.content}>
            <div className={styles.tag}>
            <Tabs defaultActiveKey="1"  type='card' onChange={this.callback}>
              <TabPane tab={<span><Icon type="edit" />待审批事项</span>} key="1">
              {unComponent}
              </TabPane>
              <TabPane tab={<span><Icon type="edit" />已审批事项</span>} key="2">
              {doneComponent}
              
              </TabPane>
            </Tabs>
            
          </div>
        </div>      
      </div>  
    );
  }
}


class UnTable extends React.Component{
  constructor(props){
    super(props)
    this.state={
      list:[]
    }
  }

  jumpNextLink=(mName,mId,taskId)=>{
     let data={};
     data={
       matter:mName,
       id:mId,
       taskId:taskId
     }
     hashHistory.push({ pathname: '/approvalMatters/approval', state: data })
  }

 

  render(){
    
    const columns = [
    //   {
    //   title: '序号',
    //   dataIndex: 'index',
    //   key: 'index',
    // }, 
    {
      title: '事项名称',
      dataIndex: 'matterName',
      key: 'matterName',
    }, {
      title: '申请人',
      dataIndex: 'startMan',
      key: 'startMan',
    }, {
      title: '提交时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '操作',
      key: 'action',
      dataIndex:'',
      render: (text, record) => (
          <a onClick={this.jumpNextLink.bind(this,record['businessKey'].split(".")[0],record['businessKey'].split(".")[1],record['taskId'])} >审批</a>          
      ),
    }];
    
    const arr=this.props.list;

    return(
      <div>
        <Table columns={columns} dataSource={arr} />
      </div>
    )
  }



}
class DoneTable extends React.Component{
  constructor(props){
    super(props)
    this.state={
      list:[]
    }
  }
  jumpNextLink=(mName,mId,taskId)=>{
    let data={};
    data={
      matter:mName,
      id:mId,
      taskId:taskId
    }
    hashHistory.push({ pathname: '/approvalMatters/approvalDone', state: data })
 }


  render(){

    const columns = [
    //   {
    //   title: '序号',
    //   dataIndex: 'matterName',
    //   key: 'matterName',
    // }, 
    {
      title: '事项名称',
      dataIndex: 'matterName',
      key: 'matterName',
    }, {
      title: '申请人',
      dataIndex: 'startMan',
      key: 'startMan',
    }, {
      title: '提交时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '操作',
      key: 'action',
      dataIndex:'',
      render: (text, record) => (
        <a onClick={this.jumpNextLink.bind(this,record['businessKey'].split(".")[0],record['businessKey'].split(".")[1],record['taskId'])}>查看</a>
      ),
    }];
    const arr = this.props.list;
    
    return(
      <div>
        <Table columns={columns} dataSource={arr} />
      </div>
    )
  }



}

function mapStateToProps({approvalMatters,login}) {
  return {approvalMatters,login};
}

export default connect(mapStateToProps)(ApprovalMatters);
