import React from 'react';
import { connect } from 'dva';
import styles from './Matters.less';
import { Breadcrumb, Icon, Tabs, Radio, Form, Input, Button, DatePicker, Upload, message, Col, Row, Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import moment from 'moment';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class SDoctoralDelayed extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      days: 1,
      activeTab: '1'
      
    }

  }

// 提交表单
onSubmit = (data) => {
  
  data.matterKey=this.props.matterKey;
 

    this.props.dispatch(
     { type: 'matterSDoctoralDelayed/uploadTable', payload: data }
    )
}
  
 // 判断是否登录
 isLogin = (key) => {
  console.log(key)
  if (key == 2) {
    const isLogin = this.props.login.isLogin;
    if (!isLogin) {
      confirm({
        title: '您还未登录，是否前往登录页？',
        onOk() {
          console.log('OK');
          hashHistory.push('/login')
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      let uRole = sessionStorage.getItem('uRole');
      if (uRole == 1) {
        Modal.warning({
          title: '该事项为学生事项',
        });
      } else {
        this.setState({
          activeTab: '2'
        })
      }
    }
  } else {
    this.setState({
      activeTab: '1'
    })
  }
}



  render() {
    
        return (
          <div className={styles.normal}>
            <div className={styles.breadcrumbBox}>
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <Icon type="home" />
                  <Link to="/">首页</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  学生办事
                        </Breadcrumb.Item>
                <Breadcrumb.Item>
                  博士研究生课程缓考手续办理
                        </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className={styles.matterContent}>
   
          <Tabs defaultActiveKey="1" type='card' onTabClick={this.isLogin} activeKey={this.state.activeTab}>
            <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
              <div className={styles.serviceBox}>
                <h1 className={styles.title}>研究生学院阳光服务卡</h1>
                <table className={styles.serviceTable}>
                  <tbody>
                    <tr>
                      <td className={styles.tdTitle}>办理事项</td>
                      <td>博士研究生课程缓考手续办理</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>服务对象</td>
                      <td>全校在册博士研究生</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理部门</td>
                      <td>研究生学院</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理窗口</td>
                      <td>阳光服务大厅   （号）窗口</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理时间</td>
                      <td>上午8:00--12:00&nbsp;&nbsp;&nbsp;&nbsp;下午14:30--18:00</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理依据及规定</td>
                      <td>《山西财经大学博士研究生培养管理办法》</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理材料</td>
                      <td>学生证、有关证明材料</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理流程</td>
                      <td>学生登录山西财经大学网上办事大厅→选择博士研究生生课程缓考事项→填写《山西财经大学博士研究生课程缓考申请表》并上传相关证明材料电子照片→提交任课教师审批→提交研究生学院分管教学副院长签字→提交研究生学院教学运行科安排执行→学生携带学生证、证明材料原件在阳光服务大厅研究生学院窗口领取结果→学生将办理结果反馈至任课教师</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>咨询电话</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            </TabPane>
            <TabPane tab={<span><Icon type="laptop" />在线办理</span>} key="2">
               <CustomizedForm account={this.props.login.account} onSubmit={this.onSubmit} history={this.props.history}/>
            </TabPane>
          </Tabs>         
        </div>
        </div>
        )
    }   
}


class CustomizedForm extends React.Component {
    constructor(props) {
  
      super(props)
  
      this.state = {
        days:1
      }
  
    }

    onDateChange=(dates, dateStrings)=> {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }

  

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          values.uNum = this.props.account.uNum;
          values.uName = this.props.account.uName;

          let matterName = '缓考';
          values.matterName = matterName;
          this.props.onSubmit(values);
        }
      });
    }

    cancel=()=>{
      this.props.history.goBack();
    }
  
 
   render() {
        const props = {

        }
      
        const { startValue, endValue, endOpen } = this.state;
    
        const { getFieldDecorator } = this.props.form;
    
    
        return (
          <div className={styles.tableBox}>
          <h1 className={styles.title}>
            山西财经大学博士研究生课程缓考申请表
          </h1>
          <p><h3>填表日期：    年    月     日</h3></p>
          <Form onSubmit={this.handleSubmit}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.tdTitle}>姓名</td>
                <td >            
                    {this.props.account.uName}         
                </td>
                <td className={styles.tdTitle}>学号</td>
                <td colSpan='3'>
                   {this.props.account.uNum}
                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>专业</td>
                <td>
                { <FormItem>
                    {getFieldDecorator('major', {
                      rules: [{ required: true, message: '请输入您的专业' }],
                    })(
                      <Input placeholder="请输入您的专业" />
                      )}
                  </FormItem> 
                  }
                </td>               
                <td className={styles.tdTitle}>缓考课程名称</td>
                <td>         
                { <FormItem>
                    {getFieldDecorator('course', {
                      rules: [{ required: true, message: '请输入您的缓考课程' }],
                    })(
                      <Input placeholder="请输入您的缓考课程" />
                      )}
                  </FormItem> }
                  
                </td>
                <td className={styles.tdTitle}>任课教师</td>
                <td>
                { <FormItem>
                    {getFieldDecorator('teacher', {
                      rules: [{ required: true, message: '请输入您的任课教师' }],
                    })(
                      <Input placeholder="请输入您的任课教师" />
                      )}
                  </FormItem> }
                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>申请原因</td>
                 <td colSpan='5'>
                 { <FormItem>
                    {getFieldDecorator('reasons', {
                      rules: [{ required: true, message: '请输入您的申请原因' }],
                    })(
                      <Input placeholder="请输入您的申请原因" />
                      )}
                  </FormItem> }
                       &emsp; &emsp;&emsp;&emsp;    
                       &emsp; &emsp;&emsp;&emsp; 
                       &emsp; &emsp;&emsp;&emsp;                 
                   年&emsp;  月&emsp;  日
                       </td>
               </tr>           
               <tr>
               <td className={styles.tdTitle}> 相关证明粘贴处:</td>
                <td colSpan='5'> 
                  
                { <FormItem>
                    {getFieldDecorator('prove', {
                      rules: [{ required: true, message: '请输入您的相关证明' }],
                    })(
                      <Input placeholder="请输入您的相关证明" />
                      )}
                  </FormItem> }                 
                </td>
              </tr>
              <tr>
              <td className={styles.tdTitle}> 任课教师意见：</td>
                <td colSpan='6'>  
                       &emsp; &emsp;&emsp;&emsp;    
                       &emsp; &emsp;&emsp;&emsp; 
                       &emsp; &emsp;&emsp;&emsp; 
                  &nbsp; 签字：&emsp; &emsp;&emsp;&emsp;     
                </td>
              </tr>
              <tr>
              <td className={styles.tdTitle}>  研究生学院意见： </td>
                <td colSpan='6' rowSpan='2'>       
                       &emsp; &emsp;&emsp;&emsp;    
                       &emsp; &emsp;&emsp;&emsp; 
                       &emsp; &emsp;&emsp;&emsp; 
                  &nbsp;  分管副院长签字：&emsp; &emsp;&emsp;&emsp;     
                </td>
              </tr>
                </tbody>
                </table>
                <Row>
            <Col span={6} offset={8}>
                <FormItem>
                   <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Col>
            <Col span={3}>
               <FormItem>
                  <Button type="primary" onClick={this.cancel}>取消</Button>
               </FormItem>
            </Col>
          </Row>
                </Form>
          </div>
        )
  }
  

  }

      CustomizedForm = Form.create({})(CustomizedForm);
function mapStateToProps({matterSDoctoralDelayed,login}) {
      return {matterSDoctoralDelayed,login};


}
;
export default connect(mapStateToProps)(SDoctoralDelayed);