import React from 'react';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
const TabPane = Tabs.TabPane;


class SAdjustChange extends React.Component{
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
                    毕业生调整改派手续办理
                    </Breadcrumb.Item>
                </Breadcrumb>
      </div>
      <div className={styles.matterContent}>
      <Tabs defaultActiveKey="1" type='card'>
          <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
            <div className={styles.serviceBox}>
              <h1 className={styles.title}>大学生就业管理处阳光服务卡</h1>
              <table className={styles.serviceTable}>
                <tbody>
                  <tr>
                    <td className={styles.tdTitle}>办理事项</td>
                    <td>毕业生调整改派手续办理</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>全体在册毕业生</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理部门</td>
                    <td>大学生就业管理处</td>
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
                    <td>就业报到证原件（毕业生所持）、就业通知书原件（毕业生档案
内）、已签订的就业协议书、原签约单位出具的解除协议证明
本人递交调整改派申请、新签约单位盖章的就业协议书</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>1、就业报到证派原生源地就业主管部门的毕业生<br/>
    学生携带就业报到证原件（毕业生所持）、就业通知书原
件（毕业生档案内）、已签订的就业协议书到阳光服务大厅大学生就业管理处窗口办理→大学生就业管理处每周四去教育厅办理手续→学生持身份证原件到阳光服务大厅大学生就业管理处窗口领取（委托办理需要提供委托书及双方身份证原件）<br/>
2、就业报到证派具体用人单位或各级人才市场的毕业生<br/>
    登录山西财经大学网上办事大厅→下载《山西财经大学学生调整改派申请》并填写→学生携带《山西财经大学学生调整
改派申请》、就业报到证原件（毕业生所持）、就业通知书原件（毕业生档案内）、原签约单位出具的解除协议证明、新签约单位盖章的就业协议书到阳光服务大厅大学生就业管理处窗口办理→大学生就业管理处每周四去教育厅办理手续→学生持身份证原件到阳光服务大厅大学生就业管理处窗口领取（委托办理需要提供委托书及双方身份证原件）</td>
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


export default SAdjustChange;
