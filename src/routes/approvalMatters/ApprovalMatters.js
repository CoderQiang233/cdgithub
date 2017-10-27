import React from 'react';
import { connect } from 'dva';
import styles from './ApprovalMatters.less';
import { Table, Tabs,Icon,Modal, Button } from 'antd';
const confirm = Modal.confirm;
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
  }

  componentWillMount(){
   
    const isLogin=this.props.login.isLogin;
    if(!isLogin){
      
      confirm({
        title: '您还未登录，是否前往登录页？',
        onOk() {
          console.log('OK');
          hashHistory.push('/login')
        },
        onCancel() {
          console.log('Cancel');
          hashHistory.goBack();
        },
      });
    }

    let data={};
    data['uName']=this.props.login.account.uName+'-'+this.props.login.account.uNum;

    this.props.dispatch({ type: 'approvalMatters/getUnMatters', payload: data })
    this.props.dispatch({ type: 'approvalMatters/getDoneMatters', payload: data })

  }
 
  getUnMatters=(pageNum)=>{
    let data={};
    data['uName']=this.props.login.account.uName+'-'+this.props.login.account.uNum;
    data['current']=pageNum;
    this.props.dispatch({ type: 'approvalMatters/getUnMatters', payload: data })
  }

  getDoneMatters=(pageNum)=>{
    let data={};
    data['uName']=this.props.login.account.uName+'-'+this.props.login.account.uNum;
    data['current']=pageNum;
    this.props.dispatch({ type: 'approvalMatters/getDoneMatters', payload: data })
  }
  
  render(){

    let unComponent=<UnTable list={this.props.approvalMatters.unList} loading={this.props.approvalMatters.loading} getUnMatters={this.getUnMatters} />;
    if(this.props.children){
      if(this.props.children.type.WrappedComponent.name=="Approval"){
         unComponent=this.props.children;
      }
    }
    let doneComponent=<DoneTable list={this.props.approvalMatters.DoneList} loading={this.props.approvalMatters.loading}  getDoneMatters={this.getDoneMatters} ></DoneTable>;
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

  jumpNextLink=(mName,mId,taskId,level)=>{
     let data={};
     data={
       matter:mName,
       id:mId,
       taskId:taskId,
       level:level
     }
     hashHistory.push({ pathname: '/approvalMatters/approval', state: data })
  }

 

  render(){

    const dataList=this.props.list;
    
    const columns = [
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
          <a onClick={this.jumpNextLink.bind(this,record['businessKey'].split(".")[0],record['businessKey'].split(".")[1],record['taskId'],record['level'])} >审批</a>          
      ),
    }];

    const pagination = {
      total:parseInt(dataList.total),
      current:parseInt(dataList.current),
      pageSize:parseInt(dataList.pageSize),
      onChange: (pageNumber)=>{
        console.log(pageNumber);
        this.props.getUnMatters(pageNumber)
      },
    };

    return(
      <div>
        <Table loading={this.props.loading} rowKey={record => record.taskId} columns={columns} dataSource={dataList.list} pagination={pagination} />
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
    const dataList=this.props.list;
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
    const pagination = {
      total:parseInt(dataList.total),
      current:parseInt(dataList.current),
      pageSize:parseInt(dataList.pageSize),
      onChange: (pageNumber)=>{
        console.log(pageNumber);
        this.props.getDoneMatters(pageNumber)
      },
    };
    return(
      <div>
        <Table  loading={this.props.loading} rowKey={record => record.taskId} columns={columns} dataSource={dataList.list} pagination={pagination} />
      </div>
    )
  }



}

function mapStateToProps({approvalMatters,login}) {
  return {approvalMatters,login};
}

export default connect(mapStateToProps)(ApprovalMatters);
