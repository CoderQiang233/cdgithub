import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Icon, Tabs, Radio, Form, Input, Button, DatePicker, Upload, message, Col, Row, Modal } from 'antd';
const confirm = Modal.confirm;
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
class SPoliticalCensorship extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      days: 1,
      activeTab: '1'
    }

  }



  // 提交表单
  onSubmit = (data) => {

    data.birth_date = moment(data.birth_date).format("YYYY-MM-DD");
    data.matterKey=this.props.matterKey;
    console.log(1111111111111);
    console.log(data)
    this.props.dispatch(
      { type: 'matterSPolitical/uploadTable', payload: data }
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
      let uRole=this.props.login.account['uRole'];
      if (uRole == 2) {
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
            学生政治审查证明（无犯罪记录证明）手续办理
                    </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.matterContent}>
          <Tabs defaultActiveKey="1" type='card' onTabClick={this.isLogin} activeKey={this.state.activeTab}>
            <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
              <div className={styles.serviceBox}>
                <h1 className={styles.title}>保卫处阳光服务卡</h1>
                <table className={styles.serviceTable}>
                  <tbody>
                    <tr>
                      <td className={styles.tdTitle}>办理事项</td>
                      <td>学生政治审查证明（无犯罪记录证明）手续办理</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>服务对象</td>
                      <td>全校在册学生、毕业两年之内的学生</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理部门</td>
                      <td>保卫处</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理窗口</td>
                      <td>阳光服务大厅   号窗口</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理时间</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理依据及规定</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理材料</td>
                      <td>身份证原件、委托书</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理流程</td>
                      <td>学生登录山西财经大学网上办事大厅→选择学生政治审查证明（无犯罪记录证明）手续办理事项→填写《山西财经大学学生政治审查表》→提交所在学院分管学生工作副书记填写申请人的现实政治表现并签字→提交保卫处治安科填写政审意见并签字→本人携带身份证原件到阳光服务大厅保卫处窗口办理。（委托办理需要提供委托书及双方身份证原件）</td>
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
        values.uSex = this.props.account.uSex;
        values.department=this.props.account.uDepartment;
        let matterName = '政治审查';
        values.matterName = matterName;
        this.props.onSubmit(values);
      }
    });
  }

  cancel = () => {
    this.props.history.goBack();
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    //时间
    function onChange(value, dateString) {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    }
    function onOk(value) {
      console.log('onOk: ', value);
    }



    const { startValue, endValue, endOpen } = this.state;

    const { getFieldDecorator } = this.props.form;

    let tableCol = [];
    const account = this.props.account;
    return (


      <div className={styles.tableBox}>
        <h1 className={styles.title}>
        山西财经大学学生政治审查表
              </h1>
        <Form onSubmit={this.handleSubmit}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.tdTitle}>姓名</td>
                <td >
          
                  {this.props.account.uName}
                  
                </td>
                <td className={styles.tdTitle}>性别</td>
                <td >
                {this.props.account.uSex}
                </td>
                <td className={styles.tdTitle}>出生年月</td>
                <td >
                <FormItem>
                    {getFieldDecorator('birth_date', {
                      rules: [{ required: true, message: '请输入您的出生年月' }],
                    })(
                      <DatePicker
                    format="YYYY-MM-DD "
                    placeholder="请选择时间"
                    onChange={onChange}
                    onOk={onOk}
                  />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>民族</td>
                <td>
                <FormItem>
                    {getFieldDecorator('peoples', {
                      rules: [{ required: true, message: '请输入您的所属民族' }],
                    })(
                      <Input placeholder="请输入您的所属民族" />
                      )}
                  </FormItem>
                
                </td>
                <td className={styles.tdTitle}>政治面貌</td>
                <td>
                <FormItem>
                    {getFieldDecorator('political_status', {
                      rules: [{ required: true, message: '请输入您的政治面貌' }],
                    })(
                      <Input placeholder="请输入您的政治面貌" />
                      )}
                  </FormItem>
               
                </td>
                <td className={styles.tdTitle}>学院班级</td>
                <td>
                  <FormItem>
                    {getFieldDecorator('college_class', {
                      rules: [{ required: true, message: '请输入您的学院班级' }],
                    })(
                      <Input placeholder="请输入您的学院班级" />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>学号</td>
                <td >
                {this.props.account.uNum}
                </td>

                <td className={styles.tdTitle}>身份证号码</td>
                <td>
                  <FormItem>
                    {getFieldDecorator('id_card', {
                      rules: [{ required: true, message: '请输入您的身份证号码' }],
                    })(
                      <Input placeholder="请输入您的身份证号码" />
                      )}
                  </FormItem>
                </td>
                <td className={styles.tdTitle}>联系方式</td>
                <td >
                  <FormItem>
                    {getFieldDecorator('tel', {
                      rules: [{ required: true, message: '请输入您的联系方式' }],
                    })(
                      <Input placeholder="请输入您的联系方式" />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
            

                <td className={styles.tdTitle}>籍贯</td>
                <td colSpan='2'>
                  <FormItem>
                    {getFieldDecorator('native_place', {
                      rules: [{ required: true, message: '请输入您的籍贯' }],
                    })(
                      <Input placeholder="请输入您的籍贯" />
                      )}
                  </FormItem>
                </td>
                <td className={styles.tdTitle}>生源所在地</td>
                <td colSpan='3'>
                  <FormItem>
                    {getFieldDecorator('source_location', {
                      rules: [{ required: true, message: '请输入您的生源所在地' }],
                    })(
                      <Input placeholder="请输入您的生源所在地" />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>现实政治表现 </td>
                <td colSpan='5'>
                  <FormItem>
                    {getFieldDecorator('political_performance', {
                      rules: [{ required: true, message: '请输入详细信息' }],
                    })(
                      <TextArea placeholder="内容应包括学生的政治态度，特别是对党的路线、方针和政策的态度；
                      遵守国家和学校相关规章制度情况；有无犯罪记录等方面." rows={5} />
                      
                      )}
                  </FormItem>
                  
                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>政审用途</td>
                <td colSpan='5'>
                  <FormItem>
                    {getFieldDecorator('politics_careful_use', {
                      rules: [{ required: true, message: '请输入几个选项', }
],
                    })(
                      <TextArea placeholder="请输入几个选项" rows={2} />
                      )}
                  </FormItem>
                </td>
              </tr>

                <tr>
                <td className={styles.tdTitle}>所在学院意见</td>
                <td colSpan='5'>
          
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>保卫部门意见</td>
                <td colSpan='5'>
             
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>备注</td>
                <td colSpan='5'>
                1、现实政治表现由所在部门填写。
                </td>      
              </tr>

              {tableCol}
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

function mapStateToProps({ matterSPolitical, login }) {
  return { matterSPolitical, login };


}
;
export default connect(mapStateToProps)(SPoliticalCensorship);
