import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Icon, Tabs, Radio, Form, Input, Button, DatePicker, Upload, message, Col, Row, Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;

class SDoctoralRestudy extends React.Component {
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
      { type: 'matterSDoctoralRestudy/uploadTable', payload: data }
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
        if (uRole != 1) {
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
            <Breadcrumb.Item>
              <Icon type="home" />
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              学生办事
                    </Breadcrumb.Item>
            <Breadcrumb.Item>
              博士研究生课程重修、重考手续办理
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
                      <td>博士研究生课程重修、重考手续办理</td>
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
                      <td>阳光服务大厅  号窗口</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理时间</td>
                      <td>上午8:00--12:00&nbsp;&nbsp;&nbsp;&nbsp;下午14:30--18:00</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理依据</td>
                      <td>《山西财经大学博士研究生培养管理办法》</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理材料</td>
                      <td>学生证</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理流程</td>
                      <td>学生登录山西财经大学网上办事大厅→选择博士研究生课程重修、重考手续办理事项→填写《山西财经大学博士研究生课程重修、重考申请表》→任课教师审批、签字→研究生学院学籍管理科审核成绩并签字→提交研究生学院教学运行科安排执行→学生携带学生证原件在阳光服务大厅研究生学院窗口领取办理结果→学生将办理结果反馈至任课教师</td>
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
              <CustomizedForm account={this.props.login.account} onSubmit={this.onSubmit} history={this.props.history} />
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
      reason:1,
    }
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      reason: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.uNum = this.props.account.uNum;
        values.uName = this.props.account.uName;
        values.uProfession = this.props.account.uProfession;
        // let matterName = '原因';
        // values.matterName = matterName;
        // console.log(values.matterName)
        this.props.onSubmit(values);
      }
    });
  }
  cancel = () => {
    this.props.history.goBack();
  }
  render() {

    const { getFieldDecorator } = this.props.form;

    let tableCol = [];
    if (this.state.reason == '其它') {
      tableCol =
        <FormItem>
          {getFieldDecorator('other_reasons', {
            rules: [{ required: true, message: '其它原因是请具体说明' }],
          })(
            <Input type="textarea" rows={3} placeholder="其它原因时请具体说明" />
            )}
        </FormItem>

    }

    const account = this.props.account;

    return (
      <div className={styles.tableBox}>
        <h1 className={styles.title1}>
          山西财经大学博士研究生课程重修、重考申请表
      </h1>
        <Form onSubmit={this.handleSubmit}>
          
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.tdTitle}>姓  名</td>
                <td >

                  {this.props.account.uName}

                </td>
                <td className={styles.tdTitle_1}>学  号</td>
                <td >

                  {this.props.account.uNum}

                </td>
                <td className={styles.tdTitle}>专业</td>
                <td >

                  {this.props.account.uProfession}

                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>导师</td>
                <td>
                  <FormItem>
                    {getFieldDecorator('tutor', {
                      rules: [{ required: true, message: '请输入您的导师' }],
                    })(
                      <Input placeholder="请输入您的导师" />
                      )}
                  </FormItem>
                </td>
                <td className={styles.tdTitle_1}>重修、重考课程名称</td>
                <td colSpan='3'>
                  <FormItem>
                    {getFieldDecorator('rebuilt_course_name', {
                      rules: [{ required: true, message: '请输入您的重修、重考课程名称' }],
                    })(
                      <Input placeholder="请输入您的重修、重考课程名称" />
                      )}
                  </FormItem>
                </td>
              </tr>
              <tr >
                <td rowSpan='2' className={styles.tdTitle}>重修课程情况</td>
                <td className={styles.tdTitle}>上课学期</td>
                <td>
                  <FormItem>
                    {getFieldDecorator('class_semester', {
                      rules: [{ required: true, message: '请输入您的上课学期' }],
                    })(
                      <Input placeholder="请输入您的上课学期" />
                      )}
                  </FormItem>
                </td>
                <td className={styles.tdTitle}>上课教室</td>
                <td colSpan='2'>
                  <FormItem>
                    {getFieldDecorator('class_rooms', {
                      rules: [{ required: true, message: '请输入您的上课教室' }],
                    })(
                      <Input placeholder="请输入您的上课教室" />
                      )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>任课教师</td>
                <td>
                  <FormItem>
                    {getFieldDecorator('class_teacher', {
                      rules: [{ required: true, message: '请输入您的任课教师' }],
                    })(
                      <Input placeholder="请输入您的任课教师" />
                      )}
                  </FormItem>
                </td>
                <td className={styles.tdTitle}>考试成绩</td>
                <td colSpan='2'>
                  <FormItem>
                    {getFieldDecorator('test_results', {
                      rules: [{ required: false, message: '请输入您的考试成绩' }],
                    })(
                      <Input placeholder="请输入您的考试成绩" />
                      )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>申请原因</td>
                <td colSpan='6' className={styles.signatureTd}>
                <FormItem>
                {getFieldDecorator('reasons_application', {
                      rules: [{ required: true, message: '' }], 
                      initialValue:this.state.reason
                    })(
                      <RadioGroup onChange={this.onChange}>
                    <Radio value={'缓考'}>1、缓考</Radio>
                    <Radio value={'不及格'}>2、不及格</Radio>
                    <Radio value={'违纪'}>3、违纪</Radio>
                    <Radio value={'不准考'}>4、不准考</Radio>
                    <Radio value={'其它'}>5、其他原因（需具体说明）</Radio>
                  </RadioGroup>
                      )}
                  
                  </FormItem><br />
                  {tableCol}
                  <div className={styles.signature}>申请人签名：<br/>年&emsp;  月&emsp;  日</div><br/>
                  </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>
                  任课教师意见：
              </td>
                <td colSpan='6' className={styles.signatureTd}>
                <div className={styles.signature}>签字：<br/>年&emsp;  月&emsp;  日</div><br/>
              </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>成绩审核：</td>
                <td colSpan='6' className={styles.signatureTd}>
                <div className={styles.signature}>签字：<br/>年&emsp;  月&emsp;  日</div><br/>
              </td>
              </tr>
            </tbody>
          </table>
          <p>注： 重修需在开学第一周提出申请，由于缓考需要重考的需在开学两周内提出申请。</p>
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

function mapStateToProps({ matterSDoctoralRestudy, login }) {
  return { matterSDoctoralRestudy, login };


}
;
export default connect(mapStateToProps)(SDoctoralRestudy);
