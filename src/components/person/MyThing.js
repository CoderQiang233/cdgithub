import React from 'react';
import { Tabs,Table, Icon } from 'antd';
const TabPane = Tabs.TabPane;
import styles from './MyThing.less';
import { connect } from 'dva';



class MyThing extends React.Component{
  
  
  callback=(key)=>{
    console.log(key);
    console.log(this)
    
    if(key==1){
      this.props.dispatch({
        type: 'persion/queryUserAllThing',
        payload: {},
      });
    }else if(key==2){
      this.props.dispatch({
        type: 'persion/queryUserAllDoneThing',
        payload: {},
      });
    }else if(key==3){
      this.props.dispatch({
        type: 'persion/queryUserAllUnDoneThing',
        payload: {},
      });
    }
  }

  constructor(props){
    
            super(props)
    
            this.state={
              
            }
              
  }

  componentDidMount() {
    
    this.props.dispatch({
      type: 'persion/queryUserAllThing',
      payload: {},
    });
  
 }
  
    
   render(){
    return(
      <div className={styles.personTab}>
       <Tabs defaultActiveKey="1" onChange={this.callback}  className={styles.tabContent}>
       <TabPane  tab="所有事项" key="1">
         <div className={styles.tabContent}>
         <AllThing {...this.props.persion.MyAllTingProps}></AllThing>
         </div>
       </TabPane>
       <TabPane tab="办理完毕事项" key="2">
         <div className={styles.tabContent}>
         <AllThing {...this.props.persion.MyAllDoneTingProps}></AllThing>
         </div>
        </TabPane>
       <TabPane tab="办理中事项" key="3">
         <div className={styles.tabContent}>
         <AllThing {...this.props.persion.MyAllUnDoneTingProps}></AllThing>
         </div>
       </TabPane>
      </Tabs>
      </div>
      
    )
   }
    
}

const AllThing=({total,
  current,
  loading,
  dataSource,})=>{
    
  const columns = [{
    title: '事项名称',
    dataIndex: 'thing',
  }, {
    title: '申请人',
    dataIndex: 'name',
  }, {
    title: '提交时间',
    dataIndex: 'submitTime',
  }, {
    title: '事项状态',
    dataIndex: 'thingState',
  }, {
    title: '操作',
    dataIndex: 'operation',
    render:(text,record)=>(
      <a>{text}</a>
    )
  }];
  
  

  // 定义分页对象
  const pagination = {
    total,
    current,
    pageSize: 10,
    onChange: ()=>{},
  };
    

    return(
      <Table columns={columns}  dataSource={dataSource}  loading={loading}
     
        bordered />
    )
}

function mapStateToProps({persion}) {
  return {persion};
}

export default connect(mapStateToProps)(MyThing);
