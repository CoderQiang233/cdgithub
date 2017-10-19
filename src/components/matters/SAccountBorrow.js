import React from 'react';
import {connect} from 'dva';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row,Modal } from 'antd';
const confirm = Modal.confirm;
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;

const dateFormat = 'YYYY-MM-DD';


class SAccountBorrow extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={
              activeTab:'1'
            }      
                                            
  }

// 提交表单
onSubmit=(data)=>{
  
}
// 判断是否登录
isLogin=(key)=>{
  console.log(key)
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
      let uRole=sessionStorage.getItem('uRole');
      if(uRole!=1){
        Modal.warning({
          title: '该事项为学生事项',
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
                      学生办事
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    在校学生户口借用
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
                    <td>在校学生户口借用手续办理</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>在学校落户的在校学生</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理部门</td>
                    <td>保卫处</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理窗口</td>
                    <td>保卫处窗口（号）</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理时间</td>
                    <td>上午8:00--12:00&nbsp;&nbsp;&nbsp;&nbsp;下午14:30--18:00</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理依据及规定</td>
                    <td>《山西财经大学集体户口管理规定》(暂行)</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理材料</td>
                    <td>身份证原件、委托书</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>学生登录山西财经大学网上办事大厅→选择在校学生户口借用手续办理事项→填写《山西财经大学学生集体户口卡借用申请表》→提交所在学院分管学生工作副书记签字→学生本人携带身份证原件在阳光服务大厅保卫处窗口办理。（委托办理需要提供委托书及双方身份证原件）</td>
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
  constructor(props){
    
            super(props)
    
            this.state={
              days:1,
            }      
                                            
  }




  componentDidMount(){
    this.props.form.setFieldsValue({'uTel':this.props.account.uTel})
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render(){


    const { getFieldDecorator } = this.props.form;

    return(
        <div className={styles.tableBox}>
          <h1 className={styles.title}>
          山西财经大学学生集体户口卡借用申请表
          </h1>
          <Form  onSubmit={this.handleSubmit}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>姓 名</th>
                <th>性 别</th>
                <th>身份证号</th>
                <th>班级(本科\研究生)专业</th>
              </tr>
            </thead>
                   <tbody>
                     <tr>
                       <td className={styles.centerText}>{this.props.account.uName}</td>
                       <td className={styles.centerText}>
                         {this.props.account.uSex}
                       </td>
                       <td className={styles.centerText}>
                       {this.props.account.uIDNum}
                       </td>
                       <td className={styles.centerText}>
                       {this.props.account.uClass}&nbsp;&nbsp;{this.props.account.uProfession}
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>联系电话</td>
                       <td colSpan='3'>
                         <FormItem>
                       {getFieldDecorator('uTel', {
                          rules: [{ required: true, message: '请输入您的联系电话' }],
                        })(
                          <Input placeholder="请输入您的联系电话" />
                         )}
                         </FormItem>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>借用是由</td>
                       <td colSpan='3'>
                       <FormItem>
                       {getFieldDecorator('reason', {
                          rules: [{ required: true, message: '请输入借用是由' }],
                        })(
                          <TextArea placeholder="请输入借用是由" rows={3} />
                         )}
                       </FormItem>
                         
                        </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>借用时间</td>
                       <td colSpan='3'>
                       <FormItem>
                       {getFieldDecorator('dateStart', {
                          rules: [{ required: true, message: '请输借用时间' }],
                        })(
                          <DatePicker  placeholder="请输借用时间"  format={dateFormat} />
                         )}
                       </FormItem>
                       </td>
                       
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>归还时间</td>
                       <td colSpan='3'>
                       <FormItem>
                       {getFieldDecorator('dateEnd', {
                          rules: [{ required: true, message: '请输入归还时间' }],
                        })(
                          <DatePicker  placeholder="请输入归还时间"  format={dateFormat} />
                         )}
                       </FormItem>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>单位意见</td>
                       <td colSpan='3' className={styles.signatureTd}>
                         <div className={styles.signature}>学院分管学生副书记（签字）：</div>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>本人签字</td>
                       <td colSpan='3'  className={styles.signatureTd}>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>委托人签字及身份证号码</td>
                       <td colSpan='3'  className={styles.signatureTd}>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>备注</td>
                       <td colSpan='3'>
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
function mapStateToProps({matterTLeave,login}) {
  return {matterTLeave,login};
}

CustomizedForm = Form.create({})(CustomizedForm);

export default  connect(mapStateToProps)(SAccountBorrow);
