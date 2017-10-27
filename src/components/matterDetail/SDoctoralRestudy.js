import React from 'react';
import styles from './matter.less';
import { connect } from 'dva';
import { Breadcrumb, Icon ,Radio,Form, Input, Button, message,Col,Row,Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



class SDoctoralRestudy extends React.Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      confirmLoading: false,
      matterId:0,
      
    }
  }

  cancel=()=>{
    hashHistory.goBack();
  }


  componentWillMount(){
    
  }

 componentDidMount(){
  const id=this.props.matterId;
  this.setState({
    matterId:id
  })

  let data={};
  data['id']=id;
  this.props.dispatch({ type: 'matterSDoctoralRestudy/getMatter', payload: data });

  }

 componentWillReceiveProps(nextProps) {
   if (this.state.matterId != nextProps.matterId) {
     this.setState({
       matterId: nextProps.matterId
     }, function () {
       let data = {};
       data['id'] = nextProps.matterId;
       this.props.dispatch({ type: 'matterSDoctoralRestudy/getMatter', payload: data });
     })
   }
 }

  

  render(){
    const { matterSDoctoralRestudy } = this.props;

    const { opinion, tableData } = matterSDoctoralRestudy;

    let opinionTr = [];

    let level = null;

   for (let i = 0; i < opinion.length; i++) {

    level=opinion[i]['level'];

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
           {
             opinion[i]['signature'] &&
             <div className={styles.signature}>
               <img src={opinion[i]['signature']} />
             </div>
           }
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
           {
             opinion[i]['signature'] &&
             <div className={styles.signature}>
               <img src={opinion[i]['signature']} />
             </div>
           }
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
        {
          this.props.from == 1 &&
          <Row>
            <Col span={6} offset={8}>
              <Button type="primary">打印</Button>
            </Col>
            <Col span={3}>
              <Button type="primary" onClick={this.cancel}>取消</Button>
            </Col>
          </Row>
        }
        {
          this.props.from == 2 &&
          <Row type="flex" justify="center">
            <Col span={2} >
              <Button type="primary">打印</Button>
            </Col>
          </Row>
        }

      </div>
    )
  }
}

function mapStateToProps({matterSDoctoralRestudy,login}) {
  return {matterSDoctoralRestudy,login};
}
const SDoctoralRestudyForm = Form.create()(SDoctoralRestudy);
export default connect(mapStateToProps)(SDoctoralRestudyForm);
