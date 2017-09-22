import React from 'react';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
const TabPane = Tabs.TabPane;


class TRetirementProcedures extends React.Component{
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
                      教职工办事
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    教职工退休手续办理
                    </Breadcrumb.Item>
                </Breadcrumb>
      </div>
      <div className={styles.matterContent}>
      <Tabs defaultActiveKey="1" type='card'>
          <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
            <div className={styles.serviceBox}>
              <h1 className={styles.title}>人事处阳光服务卡</h1>
              <table className={styles.serviceTable}>
                <tbody>
                  <tr>
                    <td className={styles.tdTitle}>办理事项</td>
                    <td>教职工退休手续办理</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>全体教职工</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理部门</td>
                    <td>人事处</td>
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
                    <td>1、所在部门签字盖章的《退休通知》回执（一份）；<br/>
2、近期一寸免冠照片（一张）；<br/>
3、个人身份证原件及复印件（各一份）；<br/>
4、有独生子女证的请带上原件及复印件（各一份）；<br/>
5、本人工作证。</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>退休人员按照《退休通知》要求，携带相关材料在阳光服务大厅人事处窗口直接办理→人事处开具退休通知书（到离退休处的介绍信）→办理退休证并领取退休纪念品→办理退休人员独生子女一次性补贴→阳光服务大厅财务处窗口办理住房公积金提取事宜</td>
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


export default TRetirementProcedures;
