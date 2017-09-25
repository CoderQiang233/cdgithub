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
    if(key==1){
      let data={};
      data['uName']=this.props.approvalMatters.login.account.uName;
      this.props.dispatch({ type: 'approvalMatters/getUnMatters', payload: data })
    }else{
      let data={};
      data['uName']=this.props.approvalMatters.login.account.uName;
      this.props.dispatch({ type: 'approvalMatters/getDoneMatters', payload: data })
    }
  }

  componentWillMount(){
    console.log(77777777777)
    const isLogin=this.props.approvalMatters.login.isLogin;
    if(!isLogin){
      hashHistory.push('/login')
    }else{
      let data={};
      data['uName']=this.props.approvalMatters.login.account.uName;
      this.props.dispatch({ type: 'approvalMatters/getUnMatters', payload: data })
      this.props.dispatch({ type: 'approvalMatters/getDoneMatters', payload: data })
    }

  }
  // componentDidMount(){
  //   console.log(6666666666)
  //    console.log(this.props)
  // }
  componentWillReceiveProps(nextProps) {
   
    console.log(888888888)
    let unArry=Array;
    let doneArry=Array;
    unArry=nextProps.approvalMatters.approvalMatters.unList;
    doneArry=nextProps.approvalMatters.approvalMatters.DoneList;
    console.log(unArry)
     this.setState({
      unList:unArry,
      DoneList:doneArry
     })
  }
  
  render(){

    let unComponent=<UnTable list={this.state.unList} />;
    if(this.props.children){
      if(this.props.children.type.WrappedComponent.name=="Approval"){
         unComponent=this.props.children;
      }
    }
    let doneComponent=<DoneTable list={this.state.DoneList} arr={111}></DoneTable>;
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
              {/* {
                !this.props.children&&
                <UnTable list={this.state.unList} />
              }
              {
                this.props.children&&
                this.props.children.type.WrappedComponent.name=="Approval"&&
                this.props.children
              } */}
              {/* <UnTable list={[]} arr={111}></UnTable> */}
              </TabPane>
              <TabPane tab={<span><Icon type="edit" />已审批事项</span>} key="2">
              {doneComponent}
              {/* {
                !this.props.children&&
                <DoneTable list={this.state.DoneList} arr={111}></DoneTable>
              }
              {
                this.props.children&&
                this.props.children.type.WrappedComponent.name=="ApprovalDone"&&
                this.props.children
              } */}
              
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

  componentWillReceiveProps(nextProps) {
    console.log(223)
    console.log(nextProps.list);
    this.setState({
      list:nextProps.list
    },function(){
      this.forceUpdate()
    })
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
        <Table columns={columns} dataSource={this.state.list} />
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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.list);
    this.setState({
      list:nextProps.list
    },function(){
      this.forceUpdate()
    })
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
        <Table columns={columns} dataSource={this.state.list} />
      </div>
    )
  }



}

function mapStateToProps(approvalMatters) {
  return {approvalMatters};
}

export default connect(mapStateToProps)(ApprovalMatters);
