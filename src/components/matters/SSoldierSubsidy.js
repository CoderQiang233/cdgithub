import React from 'react';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
const TabPane = Tabs.TabPane;


class SSoldierSubsidy extends React.Component{
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
                    应征入伍服义务兵役学生学费补偿申请手续办理
                    </Breadcrumb.Item>
                </Breadcrumb>
      </div>
      <div className={styles.matterContent}>
      <Tabs defaultActiveKey="1" type='card'>
          <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
            <div className={styles.serviceBox}>
              <h1 className={styles.title}>学生处阳光服务卡</h1>
              <table className={styles.serviceTable}>
                <tbody>
                  <tr>
                    <td className={styles.tdTitle}>办理事项</td>
                    <td>应征入伍服义务兵役学生学费补偿申请手续办理</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>全校在册学生</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理部门</td>
                    <td>学生处</td>
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
                    <td>《高等学校学生应征入伍服义务兵役国家资助办法》<br/>
《关于调整完善国家助学贷款相关政策措施的通知》<br/>
《关于对直接招收士官的高等学校学生施行国家资助的通知》<br/></td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理材料</td>
                    <td>1、《入伍通知书》复印件<br/>
2、身份证原件<br/>
3、在校期间获得国家助学贷款的学生，需同时提供《国家助学贷款借款合同》复印件和本人签字的一次性偿还贷款计划书。</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>应征报名的高校学生登录大学生征兵报名系统，按要求在线填写、打印《高校学生应征入伍学费补偿国家助学贷款代偿申请表》（一式两份）→学生携带申请表和相关材料交至阳光服务大厅学生处窗口→学生处负责会同财务处对《申请表》中学生的资助资格、标准、金额等相关信息进行审核并在《申请表》加盖公章→通知学生在窗口领取申请表→学生在征兵报名时将《申请表》交至入伍所在地县级人民政府征兵办公室，学生通过征兵体检被批准入伍后，县级征兵办在《申请表》加盖公章并返还学生→学生将《申请表》原件和入伍通知书复印件，报送至阳光服务大厅学生处窗口→学生资助管理中心进行学费补偿安排</td>
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


export default SSoldierSubsidy;
