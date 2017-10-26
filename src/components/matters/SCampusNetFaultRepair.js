import React from 'react';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
const TabPane = Tabs.TabPane;


class SCampusNetFaultRepair extends React.Component{
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
                    <Breadcrumb.Item>
                      <Icon type="home" />
                      <Link to="/server">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      学生办事
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    学生校园网络故障报修
                    </Breadcrumb.Item>
                </Breadcrumb>
      </div>
      <div className={styles.matterContent}>
      <Tabs defaultActiveKey="1" type='card'>
          <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
            <div className={styles.serviceBox}>
              <h1 className={styles.title}>网络与信息技术中心阳光服务卡</h1>
              <table className={styles.serviceTable}>
                <tbody>
                  <tr>
                    <td className={styles.tdTitle}>办理事项</td>
                    <td>学生校园网络故障报修</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>校园网学生用户</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理部门</td>
                    <td>网络与信息技术中心</td>
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
                    <td></td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理材料</td>
                    <td>身份证、学生证</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>1、电话报修咨询。<br/>
学生用户通过电话咨询，描述网络故障情况，咨询人员予以排除并帮助解决故障；咨询人员无法线上解决故障，转入故障报修。<br/>
2、学生用户携带身份证、学生证和用户信息在阳光服务大厅网络与信息技术中心窗口办理。</td>
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


export default SCampusNetFaultRepair;
