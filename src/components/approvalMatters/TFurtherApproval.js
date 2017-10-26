import React from 'react';
import styles from './matter.less';
import { connect } from 'dva';
import { Breadcrumb, Icon ,Radio,Form, Input, Button, message,Col,Row,Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import Signature from './Signature.js';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



class TFurtherApproval extends React.Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      confirmLoading: false,    
 
    }
  }

  cancel=()=>{
    hashHistory.goBack();
  }


  componentWillMount(){
    let data={};
    const id=this.props.matterId;
    console.log(4444);
    console.log(id);
    data['id']=id;
    this.props.dispatch({ type: 'matterTFurther/getMatter', payload: data })
  }

  

// 打开审批意见Modal
  showModal=()=>{
    if(this.props.level==1){
      this.setState({
        visible: true,
      });
    }else{
    this.setState({
      visibletwo: true,
    });
  }
  }
  handleOk = () => {

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
        console.log('Received values of form: ', values);
        values['matterId']=this.props.matterId;
        values['uNum']=this.props.login.account.uNum;
        values['taskId']=this.props.taskId;
        values['level']=this.props.level;
        console.log(values)
        this.props.dispatch({ type: 'matterTFurther/approvalMatter', payload: values })
      }
    });

    
  }
  handleOktwo = () => {
    
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
              confirmLoading: true,
            });
            setTimeout(() => {
              this.setState({
                visibletwo: false,
                confirmLoading: false,
              });
            }, 2000);
            console.log('Received values of form: ', values);
            values['matterId']=this.props.matterId;
            values['uNum']=this.props.login.account.uNum;
            values['taskId']=this.props.taskId;
            values['level']=this.props.level;
            console.log(values)
            this.props.dispatch({ type: 'matterTFurther/approvalMatterFurther', payload: values })
          }
        });
    
        
      }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  handleCanceltwo = () => {
    console.log('Clicked cancel button');
    this.setState({
      visibletwo: false,
    });
  }


  render(){
    const {matterTFurther}=this.props;

    const {tableData}=matterTFurther;
    const { visible,visibletwo, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    // const{tableData,opinion}=this.props.matterTLeave.matterTLeave
 
    return(
    <div className={styles.normal}>
      <h1 className={styles.title}>
      教职工进修申请(未审批)
      </h1>
      <table className={styles.table}>
      <tbody>
                     <tr>
                     <td className={styles.tdTitle}>姓名</td>
                       <td>{tableData.uName}</td>
                       <td className={styles.tdTitle}>性别</td>
                       <td>{tableData.uSex}</td> 
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>联系电话</td>
                       <td >{tableData.tel}</td>
                       <td className={styles.tdTitle}>行政职务</td>
                       <td >{tableData.administration_position}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>技术职务</td>
                       <td >{tableData.technical_position}</td>
                       <td className={styles.tdTitle}>从事专业</td>
                       <td >{tableData.engaged_professional}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>拟进修单位</td>
                       <td  >{tableData.further_unit}</td>
                       <td className={styles.tdTitle}>拟进修专业(内容)</td>
                       <td >{tableData.further_content}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>进修开始时间</td>
                       <td >{tableData.further_startdate}</td>
                       <td className={styles.tdTitle}>进修结束时间</td>
                       <td >{tableData.further_enddate}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>来校后学习和进修院校(机构) 、起止时间、专业（内容）</td>
                       <td colSpan='3' >{tableData.study_further_msg}</td>
                      
                     </tr>

                   </tbody>
              </table> 

                    <Row>
                    <Col span={6} offset={8}>
                    <FormItem>
                    <Button type="primary" onClick={this.showModal}>审批</Button>
                    </FormItem>
                    </Col>
                    <Col span={3}>
                    <FormItem>
                    <Button type="primary" onClick={this.cancel}>取消</Button>
                    </FormItem>
                    </Col>
                  </Row>
    
  {/* 一级审批弹出框 */}
  <Modal title="所在单位（部门）意见"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
              >
              <Form onSubmit={this.handleSubmit}>
              <FormItem>
              1、该同志参加进修是否影响本部门正常工作： 
                  {getFieldDecorator('opinion_affect_work',{
                      rules: [{ required: true, message: '请选择意见' }],
                    })(
                    <RadioGroup>
                      <Radio value="同意" checked={true} >同意</Radio>
                      <Radio value="不同意">不同意</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem>
                2、该同志进修专业（内容）是否与本人从事专业一致或相近：
                  {getFieldDecorator('opinion_professional_uniform',{
                      rules: [{ required: true, message: '请选择意见' }],
                    })(
                    <RadioGroup>
                      <Radio value="同意" checked={true} >同意</Radio>
                      <Radio value="不同意">不同意</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem>
                3、该同志进修专业（内容）是否符合本部门需要：
                  {getFieldDecorator('opinion_meet_requirements',{
                      rules: [{ required: true, message: '请选择意见' }],
                    })(
                    <RadioGroup>
                      <Radio value="同意" checked={true} >同意</Radio>
                      <Radio value="不同意">不同意</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem>
                4、是否同意该同志进修：
                  {getFieldDecorator('opinion',{
                      rules: [{ required: true, message: '请选择意见' }],
                    })(
                    <RadioGroup>
                      <Radio value="同意" checked={true} >同意</Radio>
                      <Radio value="不同意">不同意</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem>
                   {getFieldDecorator('opinionText', {
                      rules: [{ message: '请输入人事部审批意见' }],
                    })(
                      <TextArea placeholder="请输入审批意见" rows={3} />
                     )}
                </FormItem>
               </Form> 
              </Modal>
               {/* 二级审批弹出框 */}
               <Modal title="审批"
               visible={visibletwo}
                onOk={this.handleOktwo}
                confirmLoading={confirmLoading}
                onCancel={this.handleCanceltwo}
              >
              <Form onSubmit={this.handleSubmit}>
              <FormItem>
                  {getFieldDecorator('opinion',{
                      rules: [{ message: '请选择意见' }],
                    })(
                    <RadioGroup>
                      <Radio value="同意" checked={true} >同意</Radio>
                      <Radio value="不同意">不同意</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem>
                   {getFieldDecorator('opinionText_personnel', {
                      rules: [{ message: '请输入人事部审批意见' }],
                    })(
                      <TextArea placeholder="请输入审批意见" rows={3} />
                     )}
                </FormItem>
             
               </Form> 
              </Modal>     
       
    </div>
    )

}
}
function mapStateToProps({matterTFurther,login,approvalMatters}) {
  return {matterTFurther,login,approvalMatters};
}
const TFurtherApprovalForm = Form.create()(TFurtherApproval);
export default connect(mapStateToProps)(TFurtherApprovalForm);
