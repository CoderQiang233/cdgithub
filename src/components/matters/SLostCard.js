import React from 'react';
import { Breadcrumb, Icon ,Tabs,Radio,Form, Input, Button,DatePicker,Upload, message,Col,Row,Checkbox} from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './Matters.less';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const dateFormat = 'YYYY-MM-DD';

class SLostCard extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={
              days:1
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
                     研究生证丢失补办手续办理
                    </Breadcrumb.Item>
                </Breadcrumb>
      </div>
      <div className={styles.matterContent}>
      <Tabs defaultActiveKey="1" type='card'>
          <TabPane tab={<span><Icon type="compass" />办事指南</span>} key="1">
            <div className={styles.serviceBox}>
              <h1 className={styles.title}>研究生阳光服务指南</h1>
              <table className={styles.serviceTable}>
                <tbody>
                  <tr>
                    <td className={styles.tdTitle}>办理事项</td>
                    <td>研究生证丢失补办</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>服务对象</td>
                    <td>全体在册研究生</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理部门</td>
                    <td>研究生学院</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理窗口</td>
                    <td>学籍管理窗口（号）</td>
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
                    <td>登记声明、学生证、学费依据</td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>办理流程</td>
                    <td>需补办新证件的学生到《山西日报》或《太原日报》进行登报声明挂失--->登陆山西财经大学网上办事大厅--->选择研究生证丢失补办事项--->填写《山西财经大学补办研究生证登记表》并上传登报声明挂失报纸的电子图片--->提交学生所在学院分管领导审核、签字--->提交研究生学院学籍管理科审核--->学生携带学生证、一张一寸照片、学费收据在阳光服务大厅研究生学院窗口办理新证并补盖注册章--->学生持新办学生证在人事处窗口加盖钢印</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPane>
          <TabPane tab={<span><Icon type="laptop" />在线办理</span>} key="2">
            <CustomizedForm history={this.props.history}/>
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
              days:1
            }      
                                            
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      days: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(values.leaveReason)
      }
    });
  }

  cancel=()=>{
    this.props.history.goBack();
  }

  onCheck(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  render(){

    const { getFieldDecorator } = this.props.form;
    const plainOptions = ['丢失', '补办'];
    // let tableCol=[];
    // if(this.state.days==1){
    //   tableCol=[]
    // }
    // else if(this.state.days==2){
    //   tableCol=[]
    //   tableCol=<tr><td className={styles.tdTitle}>人事处意见</td><td colSpan="3"></td></tr>
    // }
    // else if(this.state.days==3){
    //   tableCol=[]
    //   tableCol.push(<tr key='1'><td className={styles.tdTitle}>人事处意见</td><td colSpan="3"></td></tr>);
    //   tableCol.push(<tr key='2'><td className={styles.tdTitle}>分管校领导意见</td><td colSpan="3"></td></tr>);
    // }
    // else if(this.state.days==4){
    //   tableCol=[]
    //   tableCol.push(<tr key='1'><td className={styles.tdTitle}>人事处意见</td><td colSpan="3"></td></tr>);
    //   tableCol.push(<tr key='2'><td className={styles.tdTitle}>分管校领导意见</td><td colSpan="3"></td></tr>);
    // }

    return(


<div className={styles.tableBox}>
              <h1 className={styles.title1}>
              山西财经大学补办研究生证登记表
              </h1>
              <Form  onSubmit={this.handleSubmit}>
                 <table className={styles.table}>
                   <tbody>
                     <tr>
                       <td className={styles.tdTitle}>姓名</td>
                       <td>
                       <FormItem>
                       {getFieldDecorator('dateDays', {
                          rules: [{ required: true, message: '请输入您的姓名' }],
                        })(
                          <Input placeholder="请输入您的姓名" />
                         )}
                         </FormItem>
                         </td>
                       <td className={styles.tdTitle}>学号</td>
                       <td>
                       <FormItem>
                       {getFieldDecorator('dateDays', {
                          rules: [{ required: true, message: '请输入您的学号' }],
                        })(
                          <Input placeholder="请输入您的学号" />
                         )}
                         </FormItem>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>性别</td>
                       <td >
                       <RadioGroup onChange={this.onChange} value={this.state.days}>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                        </RadioGroup>
                       </td>
                       <td className={styles.tdTitle}>出生年月</td>
                       <td>
                       <FormItem>
                       {getFieldDecorator('dateEnd', {
                          rules: [{ required: true, message: '请输入您的出生年月' }],
                        })(
                          <DatePicker placeholder="请输入您的出生年月"  format={dateFormat} />
                         )}
                       </FormItem>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>年级专业</td>
                       <td>
                         <FormItem>
                       {getFieldDecorator('dateDays', {
                          rules: [{ required: true, message: '请输入您所在年级专业' }],
                        })(
                          <Input placeholder="请输入您所在年级专业" />
                         )}
                         </FormItem></td>
                       <td className={styles.tdTitle}>补办类型</td>
                       <td>
                       <CheckboxGroup options={plainOptions}  onChange={this.onCheck} />
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>家庭所在地址</td>
                       <td colSpan='3'>
                       <FormItem>
                       {getFieldDecorator('dateDays', {
                          rules: [{ required: true, message: '请输入您的居住地址' }],
                        })(
                          <Input placeholder="请输入您的居住地址" />
                         )}
                         </FormItem>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>籍贯</td>
                       <td>
                       <FormItem>
                       {getFieldDecorator('dateDays', {
                          rules: [{ required: true, message: '请输入您的籍贯' }],
                        })(
                          <Input placeholder="请输入您的籍贯" />
                         )}
                         </FormItem>
                       </td>
                       <td className={styles.tdTitle}>乘车区间</td>
                       <td>
                       <FormItem>
                       {getFieldDecorator('dateDays', {
                          rules: [{ required: true, message: '请输入您乘车区间' }],
                        })(
                          <Input placeholder="请输入您乘车区间" />
                         )}
                         </FormItem>
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>挂失声明粘贴处</td>
                       <td colSpan='3'></td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>注意</td>
                       <td colSpan='3'>
                       1. 乘车区间目的站应填写离家最近的车站，中转站不必填写；<br/>
                       2. 家庭所在地应精确到县或区；<br/>
                       3. 家庭地址变更应由当地派出所出具证明；<br/>
                       4. 丢失研究生证的同学应履行挂失手续；<br/>
                       5. 此表填写完毕后统一送学院办公室。
                       </td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>学院分管领导审核意见</td>
                       <td colSpan='3'></td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>学籍管理科审核意见</td>
                       <td colSpan='3'></td>
                     </tr>
                     {/* {tableCol} */}
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

export default SLostCard;
