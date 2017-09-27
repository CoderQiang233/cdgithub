import React from 'react';
import { connect } from 'dva';
import styles from './ApprovalMatters.less';
import { Table, Tabs } from 'antd';
import { Tag } from 'antd';


// const CheckableTag = Tag.CheckableTag;
// const tagsFromServer = ['待审批事项', '已审批事项'];
const TabPane = Tabs.TabPane;
class ApprovalMatters extends React.Component{
  constructor(props){
    super(props)
    this.state={
      checked: false 
    }
  }
  callback(key) {
    console.log(key);
  }
  
  render(){
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '事项名称',
      dataIndex: 'ItemName',
      key: 'ItemName',
    }, {
      title: '申请人',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '提交时间',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '操作',
      key: 'action',
      dataIndex:'',
      render: (text, record) => (
          <a href="#">审批</a>
      ),
    }];
    const arr = [{
      key: '1',
      index: '1',
      ItemName: '请假(8-15天)',
      name: '刘晓东',
      date:'2017-06-10',
    }, {
      key: '2',
      index: '2',
      ItemName: '请假(16-30天)',
      name: '刘伟',
      date:'2017-06-10',
    }];
    return(
      <div className={styles.normal}>
        <div className={styles.banner}>
            <img src={require('../assets/images/banner.jpg')} />
        </div>
        <div  className={styles.content}>
            <div className={styles.tag}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Tab 1" key="1"><Table columns={columns} dataSource={arr} /></TabPane>
              <TabPane tab="Tab 2" key="2"><Table columns={columns} dataSource={arr} /></TabPane>
            </Tabs>
            
          </div>
        </div>      
      </div>  
    );
  }
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ApprovalMatters);
