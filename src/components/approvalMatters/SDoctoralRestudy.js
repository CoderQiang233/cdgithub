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



class SDoctoralRestudy extends React.Component{
  constructor(props){
    super(props)
    this.state={
      reason:'',
      visible: false,
      confirmLoading: false,
      previewImage:'',
      previewVisible:false,
    }
  }

  cancel=()=>{
    hashHistory.goBack();
  }


  componentWillMount(){
    let data={};
    const id=this.props.matterId;
    data['id']=id;
    this.props.dispatch({ type: 'matterSDoctoralRestudy/getMatter', payload: data })
  }

  // 打开审批意见Modal
  showModal = () => {
    this.setState({
      visible: true,
    });
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
        console.log('555555555555')
        console.log('Received values of form: ', values);
        values['matterId']=this.props.matterId;
        values['uNum']=this.props.login.account.uNum;
        values['taskId']=this.props.taskId;
        values['level']=this.props.level;
        this.props.dispatch({ type: 'matterSDoctoralRestudy/approvalMatter', payload: values })
      }
    });
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

// 打开图片Modal
  showImg=(url)=>{
    console.log(url)
    this.setState({
      previewImage: url,
      previewVisible: true,
    });
  }
  handleImgCancel = () => {
    this.setState({
      previewVisible: false,
    });
  }
  matterComplete = () => {
    let data = {};
    data['uNum']=this.props.login.account.uNum;
    data['taskId']=this.props.taskId;
    this.props.dispatch({ type: 'matterSDoctoralRestudy/doneMatter', payload: data })
  }

  render(){
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


    const {matterSDoctoralRestudy}=this.props;

    const {opinion,tableData}=matterSDoctoralRestudy;
    
       let opinionTr=[];

       let level = null;

       for (let i = 0; i < opinion.length; i++) {

         level = opinion[i]['level'];

         if (level == 1) {
           opinionTr.push(<tr key={i}>
             <td className={styles.tdTitle}>任课教师意见：</td>
             <td colSpan='6'>
               <div className={styles.opinion}>
                 <RadioGroup disabled={true} defaultValue={opinion[i]['opinion']}>
                   <Radio value={'同意'}>同意</Radio>
                   <Radio value={'不同意'}>不同意</Radio>
                 </RadioGroup>
                 <p>{opinion[i]['opinionText']}</p>
               </div>
             </td>
           </tr>)
         }
         else if (level == 2) {
           opinionTr.push(<tr key={i}>
             <td className={styles.tdTitle}>成绩审核：</td>
             <td colSpan='6'>
               <div className={styles.opinion}>
                 <RadioGroup disabled={true} defaultValue={opinion[i]['opinion']}>
                   <Radio value={'同意'}>同意</Radio>
                   <Radio value={'不同意'}>不同意</Radio>
                 </RadioGroup>
                 <p>{opinion[i]['opinionText']}</p>
               </div>
             </td>
           </tr>)
         }
         else if (level == 3) {
           opinionTr.push(<tr key={i}>
             <td className={styles.tdTitle}>教学运行科执行</td>
             <td colSpan='6'>
               <div className={styles.opinion}>
                 <RadioGroup disabled={true} defaultValue={opinion[i]['opinion']}>
                   <Radio value={'同意'}>同意</Radio>
                   <Radio value={'不同意'}>不同意</Radio>
                 </RadioGroup>
                 <p>{opinion[i]['opinionText']}</p>
               </div>
             </td>
           </tr>)
         }
       }
   
    const { visible, confirmLoading } = this.state;

    const { getFieldDecorator } = this.props.form;

    return(
      <div className={styles.normal}>
        <h1 className={styles.title}>
          山西财经大学博士研究生课程重修、重考申请表
      </h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.tdTitle}>姓  名</td>
              <td >{tableData.uName}</td>
              <td className={styles.tdTitle_1}>学  号</td>
              <td >{tableData.uNum}</td>
              <td className={styles.tdTitle}>专业</td>
              <td >{tableData.uProfession}</td>
            </tr>
            <tr>
              <td className={styles.tdTitle}>导师</td>
              <td>{tableData.tutor}</td>
              <td className={styles.tdTitle_1}>重修、重考课程名称</td>
              <td colSpan='3'>{tableData.rebuilt_course_name}</td>
            </tr>
            <tr >
              <td rowSpan='2' className={styles.tdTitle}>重修课程情况</td>
              <td className={styles.tdTitle}>上课学期</td>
              <td>{tableData.class_semester}
              </td>
              <td className={styles.tdTitle}>上课教室</td>
              <td colSpan='2'>{tableData.class_rooms}
              </td>
            </tr>
            <tr>
              <td className={styles.tdTitle}>任课教师</td>
              <td>{tableData.class_teacher}
              </td>
              <td className={styles.tdTitle}>考试成绩</td>
              <td colSpan='2'>{tableData.test_results}
              </td>
            </tr>
            <tr>
              <td className={styles.tdTitle}>申请原因</td>
              <td colSpan='6' className={styles.signatureTd}>
                {tableData.reasons_application}<br />
                {tableData.other_reasons}
              </td>
            </tr>
            {opinionTr}
          </tbody>
        </table>

        <Row>
          <Col span={6} offset={8}>
            {
              this.props.level == 1 &&
              <FormItem >
                <Button type="primary" onClick={this.showModal}>审批</Button>
              </FormItem>
            }
            {
              this.props.level == 2 &&
              <FormItem >
                <Button type="primary" onClick={this.showModal}>审批</Button>
              </FormItem>
            }
            {
              this.props.level == 3 &&
              <FormItem>
                <Button type="primary" onClick={this.matterComplete.bind(this)}>完成</Button>
              </FormItem>
            }
          </Col>
          <Col span={3}>
            <FormItem>
              <Button type="primary" onClick={this.cancel}>取消</Button>
            </FormItem>
          </Col>
        </Row>
        {/* 审批弹出框 */}
        <Modal title="审批"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem>
              {getFieldDecorator('opinion', {
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
                rules: [{ required: true, message: '请输入审批意见' }],
              })(
                <TextArea placeholder="请输入审批意见" rows={3} />
                )}
            </FormItem>
            <Signature form={this.props.form}></Signature>
          </Form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({matterSDoctoralRestudy,login,approvalMatters}) {
  return {matterSDoctoralRestudy,login,approvalMatters};
}
const SDoctoralRestudyForm = Form.create()(SDoctoralRestudy);
export default connect(mapStateToProps)(SDoctoralRestudyForm);
