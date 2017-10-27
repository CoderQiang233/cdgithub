import React from 'react';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
const TabPane = Tabs.TabPane;


class TRegisterProcedures extends React.Component{
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
                    教职工报到手续办理
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
                    <td>教职工报到手续办理</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>新入职教职工</td>
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
                    <td>1、个人人事档案；<br/>2、最后学历的毕业证、学位证原件及复印件（各一份）；<br/>3、国内博士后提供博士后证书、分配工作介绍信和工资关系介绍信（博管会），毕业生提供就业报到证原件，调入人员提供原工作单位行政和工资关系介绍信；<br/>
                    4、身份证原件，近期二寸照片1张、一寸照片10张；<br/>5、户口迁移证；<br/>6、留学人员须提供教育部中国留学服务中心出具的境外学历、学位认证书。
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>教职工携带办理材料到阳光服务大厅人事处窗口直接办
                    理→人事处审核无误后→本人填写《干部基本信息审核认定表》、《干部履历表》（一份）和《山西省事业单位公开招聘人员登记表》、签订《山西财经大学接收博/硕士协议书》（一式三份，本人留存一份）→人事处分配工号、办理工作证、开具内部介绍信→根据个人需要，开具相应的介绍信（办理落户，提档等）→教职工凭工作证到相应部门办理组织关系、工资卡、医保、就餐卡、借阅证等。</td>
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


export default TRegisterProcedures;
