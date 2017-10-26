import React from 'react';
import styles from './matter.less';
import { connect } from 'dva';
import { Breadcrumb, Icon ,Radio,Form, Input, Button, message,Col,Row,Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
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
  this.props.dispatch({ type: 'matterTFurther/getMatter', payload: data });

  }

  componentWillReceiveProps(nextProps){
    if(this.state.matterId!=nextProps.matterId){
      this.setState({
        matterId:nextProps.matterId
      },function(){
        let data={};
        data['id']=nextProps.matterId;
        this.props.dispatch({ type: 'matterTFurther/getMatter', payload: data });
      })
      
      
    }
  }

  

  render(){
    const {matterTFurther}=this.props;
    
    const {tableData}=matterTFurther;
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    // const{tableData,opinion}=this.props.matterTLeave.matterTLeave
    return(
    <div className={styles.normal}>
      <h1 className={styles.title}>
      教职工进修申请(已审批)
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
              {
                  this.props.from==1&&
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
                this.props.from==2&&
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

function mapStateToProps({matterTFurther,login}) {
  return {matterTFurther,login};
}
const TFurtherApprovalForm = Form.create()(TFurtherApproval);
export default connect(mapStateToProps)(TFurtherApprovalForm);
