import React from 'react';
import styles from './matter.less';
import { connect } from 'dva';
import { Breadcrumb, Icon ,Radio,Form, Input, Button, message,Col,Row,Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import Print  from '../../assets/js/Print.js';
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

  printTable=()=>{
    Print.Print('#printMain')
  }
  

  render(){
    const {matterTLeave}=this.props;
    
    const {opinion,tableData}=matterTLeave;

   let opinionTr=[];

   let cont=opinion.length;
   let files=[];
   if(tableData.file){
     console.log(tableData.file)
     let filesArr=tableData.file.split(",");
     
     
         for(let i=0;i<filesArr.length;i++){
           files.push(
               <div key={i} className='ant-upload-list-item ant-upload-list-item-done'  >
                 <div className='ant-upload-list-item-info'>
                 <span>
                   <a className='ant-upload-list-item-thumbnail' >
                     <img src={filesArr[i]}/>
                   </a>
                 </span>
                 </div>
                 
               </div>
           )
         }
   }

for(let i=0;i<cont;i++){
    if(i==0){
        opinionTr.push(<tr key={i}>
            <td className={styles.tdTitle}>单位意见</td>
            <td colSpan='3'>
                <div className={styles.opinion}>
                {opinion[i]['opinion']}
                
                <p>{opinion[i]['opinionText']}</p>
                </div>
                {
                  opinion[i]['signature']&&
                  <div className={styles.signature}>
                    <img src={opinion[i]['signature']} />
                  </div>
                }
                
            </td>
          </tr>)
    }
    else if(i==1){
        opinionTr.push(<tr key={i}>
            <td className={styles.tdTitle}>人事处意见</td>
            <td colSpan='3'>
                <div className={styles.opinion}>
                {opinion[i]['opinion']}
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
                {opinion[i]['opinion']}
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
    <div id='printMain'>
    <h1 className={styles.title}>
                教职工请假条
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
                       <td colSpan='3'>
                       <div className='ant-upload-list ant-upload-list-picture-card'>
                         {files}
                         </div>
                        
                       </td>
                     </tr>
                     {opinionTr}
                   </tbody>
              </table> 
    </div>
     
              {
                  this.props.from==1&&
                  <Row>              
                    <Col span={6} offset={8}>
                    <Button onClick={this.printTable.bind(this)} type="primary">打印</Button>
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
                    <Button onClick={this.printTable.bind(this)}  type="primary">打印</Button>
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
