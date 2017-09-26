import React from 'react';
import styles from './TLeave.less';
import { connect } from 'dva';
import { Breadcrumb, Icon ,Radio,Form, Input, Button, message,Col,Row,Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



class TLeave extends React.Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      confirmLoading: false,
      matterId:0
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
  this.props.dispatch({ type: 'matterTLeave/getMatter', payload: data });

  }

  componentWillReceiveProps(nextProps){
    if(this.state.matterId!=nextProps.matterId){
      this.setState({
        matterId:nextProps.matterId
      },function(){
        let data={};
        data['id']=nextProps.matterId;
        this.props.dispatch({ type: 'matterTLeave/getMatter', payload: data });
      })
      
      
    }
  }

  render(){
    const {matterTLeave}=this.props;
    
    const {opinion,tableData}=matterTLeave;

   let opinionTr=[];

   let cont=opinion.length;


for(let i=0;i<cont;i++){
    console.log(opinion[i])
    if(i==0){
        opinionTr.push(<tr key={i}>
            <td className={styles.tdTitle}>单位意见</td>
            <td colSpan='3'>
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
    else if(i==1){
        opinionTr.push(<tr key={i}>
            <td className={styles.tdTitle}>人事处意见</td>
            <td colSpan='3'>
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
    else if(i==2){
        opinionTr.push(<tr key={i}>
            <td className={styles.tdTitle}>分管校领导意见</td>
            <td colSpan='3'>
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
    // const{tableData,opinion}=this.props.matterTLeave.matterTLeave
    return(
    <div className={styles.normal}>
      <h1 className={styles.title}>
                教职工请假条2
      </h1>
      <table className={styles.table}>
      <tbody>
                     <tr>
                       <td className={styles.tdTitle}>部门</td>
                       <td>{tableData.department}</td> 
                       <td className={styles.tdTitle}>姓名</td>
                       <td>{tableData.uName}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>请假原因</td>
                       <td colSpan='3'>{tableData.reason}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>起</td>
                       <td>{tableData.dateStart}</td>
                       <td rowSpan='2' className={styles.tdTitle}>请假天数</td>
                       <td rowSpan='2'>{tableData.dateDays}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>止</td>
                       <td>{tableData.dateEnd}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>请假证明</td>
                       <td colSpan='3'></td>
                     </tr>
                     {opinionTr}
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

function mapStateToProps({matterTLeave,login}) {
  return {matterTLeave,login};
}
const TLeaveForm = Form.create()(TLeave);
export default connect(mapStateToProps)(TLeaveForm);
