import React from 'react';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
const TabPane = Tabs.TabPane;


class SDropoutDorm extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={
            }      
                                            
  }

  

  render(){

    

    return(
    <div className={styles.normal}>
      <div className={styles.breadcrumbBox}>
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                      <Link to="/server">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      学生办事
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    退学学生退宿
                    </Breadcrumb.Item>
                </Breadcrumb>
      </div>
      <div className={styles.matterContent}>
      <Tabs defaultActiveKey="1" type='card'>
          <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
            <div className={styles.serviceBox}>
              <h1 className={styles.title}>大学生教育服务中心阳光服务卡</h1>
              <table className={styles.serviceTable}>
                <tbody>
                  <tr>
                    <td className={styles.tdTitle}>办理事项</td>
                    <td>退学学生退宿</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>退学学生</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理部门</td>
                    <td>大学生教育服务中心</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理窗口</td>
                    <td>阳光服务大厅   号窗口</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理时间</td>
                    <td>上午8:00--12:00&nbsp;&nbsp;&nbsp;&nbsp;下午14:30--18:00</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理依据</td>
                    <td>《山西财经大学学生公寓管理规定（试行）》</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理材料</td>
                    <td>退学文件复印件、退学通知单、身份证</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>退学学生持退学文件复印件和退学通知单在大学生教育中心办理</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>咨询电话</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPane>
      </Tabs>
      </div>
    </div>
    )
  }
}


export default SDropoutDorm;
