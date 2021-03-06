import React from 'react';
import styles from './matter.less';
import { connect } from 'dva';
import { Breadcrumb, Icon ,Radio,Form, Input, Button, message,Col,Row,Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;




class SDoctoralDelayed extends React.Component{
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
    this.props.dispatch({ type: 'matterSDoctoralDelayed/getMatter', payload: data });
  
    }


    componentWillReceiveProps(nextProps){
        if(this.state.matterId!=nextProps.matterId){
          this.setState({
            matterId:nextProps.matterId
          },function(){
            let data={};
            data['id']=nextProps.matterId;
            this.props.dispatch({ type: 'matterSDoctoralDelayed/getMatter', payload: data });
          })
          
          
        }
      }


      render(){
        const {matterSDoctoralDelayed}=this.props;
        
        const {opinion,tableData}=matterSDoctoralDelayed;
    
       let opinionTr=[];
       let level=null;
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
     // level=this.props.level;
     level=opinion[i]['level']
        if(level==1){
            opinionTr.push(<tr key={i}>
                <td className={styles.tdTitle}>任课教师意见</td>
                <td colSpan='3'>
                    <div className={styles.opinion}>
                    <RadioGroup disabled={true} defaultValue={opinion[i]['opinion']}>
                     <Radio value={'同意'}>同意</Radio>
                     <Radio value={'不同意'}>不同意</Radio>
                     </RadioGroup>
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
        else if(level==2){
            opinionTr.push(<tr key={i}>
                <td className={styles.tdTitle}>研究生学院意见</td>
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
        else if(level==3){
            opinionTr.push(<tr key={i}>
                <td className={styles.tdTitle}>教学运行科意见</td>
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
                   博士研究生缓考
          </h1>
          <table className={styles.table}>
          <tbody>
                         <tr>
                           <td className={styles.tdTitle}>学号</td>
                           <td>{tableData.uNum}</td> 
                           <td className={styles.tdTitle}>姓名</td>
                           <td>{tableData.uName}</td>
                         </tr>
                         <tr>
                           <td className={styles.tdTitle}>专业</td>
                           <td>
                            { tableData.major   }
                           </td>               
                           <td className={styles.tdTitle}>缓考课程名称</td>
                           <td>         
                            {tableData.course  }
                  
                           </td>
                            {/* <td className={styles.tdTitle}>任课教师</td>
                           <td>
                            { tableData.teacher  }
                           </td> */}
                           </tr>
                           <tr>
                           <td className={styles.tdTitle}>申请原因</td>
                           <td colSpan='3'>{tableData.reasons}</td>
                         </tr>
                        
                        
                         <tr>
                           <td className={styles.tdTitle}>相关证明</td>
                           <td colSpan='3'>
                           <div className='ant-upload-list ant-upload-list-picture-card'>
                             {files}
                             </div>
                            
                           </td>
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
    
    function mapStateToProps({matterSDoctoralDelayed,login}) {
        return {matterSDoctoralDelayed,login};
      }
      const SDoctoralDelayedForm = Form.create()(SDoctoralDelayed);
      export default connect(mapStateToProps)(SDoctoralDelayedForm);
