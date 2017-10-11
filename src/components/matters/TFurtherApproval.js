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

class TFurtherApproval extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      days: 1,
      activeTab: '1'
    }

  }



  // 提交表单
  onSubmit = (data) => {
    data.dateStart = moment(data.dateStart).format("YYYY-MM-DD");
    data.dateEnd = moment(data.dateEnd).format("YYYY-MM-DD");
    let uploadFile = data.uploadFile
    let fileStr = [];
    for (let i = 0; i < uploadFile.length; i++) {
      fileStr.push(uploadFile[i].response.data.url)
    }
    data.file = fileStr.join(',');
    delete data.uploadFile;
    delete data.dateRange;
    console.log(data)
    this.props.dispatch(
      { type: 'matterTLeave/uploadTable', payload: data }
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
            title: '该事项为教师事项',
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
              教职工办事
                    </Breadcrumb.Item>
            <Breadcrumb.Item>
              教职工进修（高访学者）审批手续办理
                    </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.matterContent}>
          <Tabs defaultActiveKey="1" type='card' onTabClick={this.isLogin} activeKey={this.state.activeTab}>
            <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
              <div className={styles.serviceBox}>
                <h1 className={styles.title}>人事处阳光服务卡</h1>
                <table className={styles.serviceTable}>
                  <tbody>
                    <tr>
                      <td className={styles.tdTitle}>办理事项</td>
                      <td>教职工进修（高访学者）审批手续办理</td>
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
                      <td className={styles.tdTitle}>办理依据及规定</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理材料</td>
                      <td>身份证、拟进修单位相关进修文件原件或复印件</td>
                    </tr>
                    <tr>
                      <td className={styles.tdTitle}>办理流程</td>
                      <td>教职工登录山西财经大学网上办事大厅→选择教职工短期进修审批手续办理事项→填写《山西财经大学教职工进修审批表》并上传拟进修单位相关进修文件原件或复印件电子照片→所在部门负责人审批签字→组织部审批（处、科级干部）→人事处审批→教职工携带身份证和相关材料原件在阳光服务大厅人事处窗口办理手续</td>
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



  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.uNum = this.props.account.uNum;
        values.uName = this.props.account.uName;
        values.dateStart = values.dateRange[0];
        values.dateEnd = values.dateRange[1];
        let matterName = '请假';
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
          山西财经大学教职工进修审批表
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
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>参加工作时间</td>
                <td>
                <FormItem>
                    {getFieldDecorator('work_date', {
                      rules: [{ required: true, message: '请输入您参加工作的时间' }],
                    })(
                      <DatePicker
                    showTime
                    format="YYYY-MM-DD "
                    placeholder="请选择时间"
                    onChange={onChange}
                    onOk={onOk}
                  />
                      )}
                  </FormItem>
                
                </td>
                <td className={styles.tdTitle}>来校时间</td>
                <td>
                <FormItem>
                    {getFieldDecorator('school_date', {
                      rules: [{ required: true, message: '请输入您的来校时间' }],
                    })(
                      <DatePicker
                    showTime
                    format="YYYY-MM-DD "
                    placeholder="请选择时间"
                    onChange={onChange}
                    onOk={onOk}
                  />
                      )}
                  </FormItem>
               
                </td>
                <td className={styles.tdTitle}>技术职务</td>
                <td>
                  <FormItem>
                    {getFieldDecorator('technical_position', {
                      rules: [{ required: true, message: '请输入您的技术职务' }],
                    })(
                      <Input placeholder="请输入您的技术职务" />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>从事专业</td>
                <td colSpan='3'>
                  <FormItem>
                    {getFieldDecorator('engaged_professional', {
                      rules: [{ required: true, message: '请输入您的从事专业' }],
                    })(
                      <Input placeholder="请输入您的从事专业" />
                      )}
                  </FormItem>
                </td>

                <td className={styles.tdTitle}>行政职务</td>
                <td>
                  <FormItem>
                    {getFieldDecorator('administration_position', {
                      rules: [{ required: true, message: '请输入您的行政职务' }],
                    })(
                      <Input placeholder="请输入您的行政职务" />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>学历、学位</td>
                <td >
                  <FormItem>
                    {getFieldDecorator('educational_background', {
                      rules: [{ required: true, message: '请输入您的学历、学位' }],
                    })(
                      <Input placeholder="请输入您的学历、学位" />
                      )}
                  </FormItem>
                </td>

                <td className={styles.tdTitle}>所学专业、毕业时间、学位获取时间</td>
                <td colSpan='3'>
                  <FormItem>
                    {getFieldDecorator('educationa_msg', {
                      rules: [{ required: true, message: '请输入您的所学专业、毕业时间、学位获取时间' }],
                    })(
                      <Input placeholder="请输入您的所学专业、毕业时间、学位获取时间" />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>来校后学习和进修院校(机构) 、起止时间、专业（内容）</td>
                <td colSpan='5'>
                  <FormItem>
                    {getFieldDecorator('study_further_msg', {
                      rules: [{ required: true, message: '请输入详细信息' }],
                    })(
                      <TextArea placeholder="请输入详细信息" rows={3} />
                      )}
                  </FormItem>

                </td>
              </tr>

              <tr>
                <td rowSpan='2' className={styles.tdTitle}>拟进修形式</td>
                <td rowSpan='2'>
                  <FormItem>
                    {getFieldDecorator('further_education', {
                      rules: [{ required: true, message: '请输入请假时间' }],
                    })(
                      <RadioGroup value={1}>
                        <Radio style={radioStyle} value={1}>出国研修  </Radio>
                        <Radio style={radioStyle} value={2}>国内访问学者</Radio>
                        <Radio style={radioStyle} value={3}>高级研修班 </Radio>
                        <Radio style={radioStyle} value={4}>国内进修</Radio>
                        <Radio style={radioStyle} value={5}>培训</Radio>
                      </RadioGroup>
                      )}
                  </FormItem>
                </td>

                <td className={styles.tdTitle}>联系电话</td>
                <td colSpan='3'>
                  <FormItem>
                    {getFieldDecorator('tel', {
                      rules: [{ required: true, message: '请输入您的联系电话', }
                      ,{pattern:'^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$',message:'请输入正确的手机号'}
],
                    })(
                      <Input placeholder="请输入您的联系电话" />
                      )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>电子邮箱</td>
                <td colSpan='3'>
                  <FormItem>
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: '请输入您的电子邮箱' }],
                    })(
                      <Input placeholder="请输入您的电子邮箱" />
                      )}
                  </FormItem>
                </td>
              </tr>

              <tr>
                <td className={styles.tdTitle}>拟进修单位</td>
                <td >
                  <FormItem>
                    {getFieldDecorator('further_unit', {
                      rules: [{ required: true, message: '请输入您的拟进修单位' }],
                    })(
                      <Input placeholder="请输入您的拟进修单位" />
                      )}
                  </FormItem>
                </td>
                <td className={styles.tdTitle}>拟进修专业(内容</td>
                <td colSpan='3'>
                  <FormItem>
                    {getFieldDecorator('further_content', {
                      rules: [{ required: true, message: '请输入您的拟进修专业' }],
                    })(
                      <Input placeholder="请输入您的拟进修专业" />
                      )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td className={styles.tdTitle}>进修时间</td>
                <td colSpan='5'>
                <FormItem>
                    {getFieldDecorator('further_date', {
                      rules: [{ required: true, message: '请输入您的进修时间' }],
                    })(
                      <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD "
                    placeholder={['开始时间', '结束时间']}
                    onChange={onChange}
                    onOk={onOk}
                  />
                      )}
                  </FormItem>
             
                </td>

              </tr>
              <tr>
                <td className={styles.tdTitle}>所在单位（部门）意见</td>
                <td colSpan='5'>
                  1、该同志参加进修是否影响本部门正常工作：&emsp; &emsp;&emsp; 是□    否□<br/>           
                  2、该同志进修专业（内容）是否与本人从事专业一致或相近：&emsp;&emsp;&emsp;  是□    否□<br/>    
                  3、该同志进修专业（内容）是否符合本部门需要：&emsp;&emsp;&emsp; 是□    否□<br/>            
                  4、是否同意该同志进修：&emsp;&emsp;&emsp;     是□    否□<br/>                            
                  5、其他要求或说明：&emsp;&emsp;&emsp; 是□    否□<br/>  <br/>  <br/>  <br/>  


                                                  （公   章）  <br/>  
                  &nbsp; 负责人签字：&emsp; &emsp;&emsp;&emsp;       年&emsp;  月&emsp;  日
                
                </td>

              </tr>
              <tr>
                <td className={styles.tdTitle}>处科级干部组织部意见</td>
                <td colSpan='5'>        
                （公   章）  <br/>  
                  &nbsp; 负责人签字：&emsp; &emsp;&emsp;&emsp;       年&emsp;  月&emsp;  日
                </td>

              </tr>
              <tr>
                <td className={styles.tdTitle}>人事处意见</td>
                <td colSpan='5'>        
                （公   章）  <br/>  
                  &nbsp; 负责人签字：&emsp; &emsp;&emsp;&emsp;       年&emsp;  月&emsp;  日
                </td>

              </tr>
              {tableCol}
            </tbody>
          </table>
          <p>此表一式三份，申请人、申请人所在单位（部门）、人事处各一份。</p>
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

function mapStateToProps({ matterTLeave, login }) {
  return { matterTLeave, login };


}
;
export default connect(mapStateToProps)(TFurtherApproval);
