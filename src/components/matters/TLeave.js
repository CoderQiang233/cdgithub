import React from 'react';
import {connect} from 'dva';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row,Modal,Popconfirm } from 'antd';
const confirm = Modal.confirm;
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;

import config  from '../../utils/config';

const { api } = config


const dateFormat = 'YYYY-MM-DD';

class TLeave extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={
              days:1,
              activeTab:'1'
            }      
                                            
  }



// 判断是否登录
  isLogin=(key)=>{
    if(key==2){
      const isLogin=this.props.login.isLogin;
      if(!isLogin){       
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
      }else{
        let uRole=this.props.login.account['uRole'];
        if(uRole==1){
          Modal.warning({
            title: '该事项为教师事项',
          });
        }else{
          this.setState({
            activeTab:'2'
          })
        }
        
      }
    }else{
      this.setState({
        activeTab:'1'
      })
    }
      
  }



  render(){

    

    return(
    <div className={styles.normal}>
      <div className={styles.breadcrumbBox}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                      <Icon type="home" />
                      <Link to="/">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      教职工办事
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      教职工请假手续办理
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
                    <td>教职工请假手续办理</td>
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
                    <td>人事处窗口（号）</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理时间</td>
                    <td>上午8:00--12:00&nbsp;&nbsp;&nbsp;&nbsp;下午14:30--18:00</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理依据及规定</td>
                    <td>依据《山西财经大学教职工考勤管理办法》（晋财大校[2006]35号）规定办理，相关（具体）内容（规定）如下：1、产假时间为158天</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理材料</td>
                    <td>1、身份证<br/>2、因病请假需有三甲以上医院的诊断书<br/>3、办理产假手续需要携带子女出生证明或本人出院证</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>教职工登录山西财经大学网上办事大厅→选择教职工请假手续办理事项→填写《山西财经大学教职工请假审批表》并上传医院诊断书或者出院证等材料的电子照片→所在部门负责人签署意见→人事处审批→教职工或家属携带身份证和相关材料原件在阳光服务大厅人事处窗口办理手续</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPane>
          <TabPane tab={<span><Icon type="laptop" />在线办理</span>} key="2">
            <CustomizedForm account={this.props.login.account}  dispatch={this.props.dispatch} history={this.props.history}/>
          </TabPane>
      </Tabs>
      </div>
    </div>
    )
  }
}

class CustomizedForm extends React.Component {
  constructor(props){
    
            super(props)
    
            this.state={
           days:1,   
            }      
                                            
  }

  
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  onDayChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      days: e.target.value,
    });
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
        values.department=this.props.account.uDepartment;
        values.uNum=this.props.account.uNum;
        values.uName=this.props.account.uName;
        values.dateStart=values.dateRange[0];
        values.dateEnd=values.dateRange[1];
        let matterName='请假';
        if(this.state.days==1){
          matterName+='（7天以下）'
        }
        else if(this.state.days==2){
          matterName+='（8-15天）'
        }
        else if(this.state.days==3){
          matterName+='（15-30天）'
        }
        else if(this.state.days==4){
          matterName+='（1个月以上）'
        }
        values.matterName=matterName;

        values.dateStart=moment(values.dateStart).format("YYYY-MM-DD");
        values.dateEnd=moment(values.dateEnd).format("YYYY-MM-DD");
        console.log(values)
        if(values.uploadFile){
          let uploadFile=values.uploadFile
          let fileStr=[];
          for(let i=0;i<uploadFile.length;i++){
            fileStr.push(uploadFile[i].response.data.url)
          }
          values.file=fileStr.join(',');
        }
        delete values.uploadFile;
        delete values.dateRange;
        values.matterKey=this.props.matterKey
        console.log(values)
        this.props.dispatch(
          { type: 'matterTLeave/uploadTable', payload: values }
        )
      }
    });
  }

  cancel=()=>{
    this.props.history.goBack();
  }

  render(){


    const props = {
      
      name: 'file',
      action: api+'?service=Upload.upload',
      // headers: {
      //   authorization: 'authorization-text',
      // },
      
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const { startValue, endValue, endOpen } = this.state;

    const { getFieldDecorator } = this.props.form;

    let tableCol=[];
    if(this.state.days==1){
      tableCol=[]
    }
    else if(this.state.days==2){
      tableCol=[]
      tableCol=<tr><td className={styles.tdTitle}>人事处意见</td><td colSpan="3"></td></tr>
    }
    else if(this.state.days==3){
      tableCol=[]
      tableCol.push(<tr key='1'><td className={styles.tdTitle}>人事处意见</td><td colSpan="3"></td></tr>);
      tableCol.push(<tr key='2'><td className={styles.tdTitle}>分管校领导意见</td><td colSpan="3"></td></tr>);
    }
    else if(this.state.days==4){
      tableCol=[]
      tableCol.push(<tr key='1'><td className={styles.tdTitle}>人事处意见</td><td colSpan="3"></td></tr>);
      tableCol.push(<tr key='2'><td className={styles.tdTitle}>分管校领导意见</td><td colSpan="3"></td></tr>);
    }
    const account=this.props.account;
    return(
   

<div className={styles.tableBox}>
              <h1 className={styles.title}>
                教职工请假条
              </h1>
              <RadioGroup onChange={this.onDayChange} value={this.state.days}>
                <Radio value={1}>7天以下</Radio>
                <Radio value={2}>8-15天</Radio>
                <Radio value={3}>15-30天</Radio>
                <Radio value={4}>1个月以上</Radio>
              </RadioGroup>
              <Form  onSubmit={this.handleSubmit}>
                 <table className={styles.table}>
                   <tbody>
                     <tr>
                       <td className={styles.tdTitle}>部门</td>
                       <td>
                         {this.props.account.dName}
                         </td>
                       <td className={styles.tdTitle}>姓名</td>
                       <td>{this.props.account.uName}
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>请假原因</td>
                       <td colSpan='3'>
                       <FormItem>
                       {getFieldDecorator('reason', {
                          rules: [{ required: true, message: '请输入请假原因' }],
                        })(
                          <TextArea placeholder="请输入请假原因" rows={3} />
                         )}
                       </FormItem>
                         
                        </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>起~止</td>
                       <td>
                       <FormItem>
                       {getFieldDecorator('dateRange', {
                          rules: [{ required: true, message: '请输入请假时间' }],
                        })(
                          <RangePicker
                            ranges={{ Today: [moment(), moment()]}}
                            onChange={this.onDateChange}
                          />          
                         )}
                       </FormItem>
                         </td>
                       <td  className={styles.tdTitle}>请假天数</td>
                       <td >
                       <FormItem>
                       {getFieldDecorator('dateDays', {
                          rules: [{ required: true, message: '请输入您的请假天数' }],
                        })(
                          <Input placeholder="请输入您的请假天数" />
                         )}
                         </FormItem>
                         </td>
                     </tr>
                     {/* <tr>
                       <td className={styles.tdTitle}>止</td>
                       <td>
                       <FormItem>
                       {getFieldDecorator('dateEnd', {
                          rules: [{ required: true, message: '请输入结束请假时间' }],
                        })(
                          <DatePicker   disabledDate={this.disabledEndDate}
                                        value={endValue}
                                        onChange={this.onEndChange}
                                        open={endOpen}
                                        onOpenChange={this.handleEndOpenChange} 
                                        placeholder="请输入结束请假时间"  
                                        format={dateFormat} />
                         )}
                       </FormItem>
                       </td>
                     </tr> */}
                     <tr>
                       <td className={styles.tdTitle}>请假证明</td>
                       <td colSpan='3'>
                       <FormItem>
                          {getFieldDecorator('uploadFile', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                          })(
                            <Upload {...props} listType="picture">
                              <Button>
                                <Icon type="upload" /> 点击上传文件
                              </Button>
                            </Upload>
                          )}
                        </FormItem>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>单位意见</td>
                       <td colSpan='3'></td>
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

function mapStateToProps({matterTLeave,login}) {
  return {matterTLeave,login};

  
}
;
export default connect(mapStateToProps)(TLeave);
