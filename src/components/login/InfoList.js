import React from 'react';
import {  Icon } from 'antd';
import styles from './InfoList.less';
import {connect} from 'dva';
import { Router, Route, Link, hashHistory } from 'react-router';
class InfoList extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {};
  }

  componentWillMount(){
   this.props.dispatch({ type: 'infoList/infoList' })
  }

  jumpNextLink=(id)=>{
    let data={};
    data={
      id:id,
    }
    hashHistory.push({ pathname: '/infotext', state: data })
 }

  render(){
    const infoList=this.props.infoList.infoList;
    console.log(this.props.infoList.infoList)
    let newArry=[];
    infoList.map((item)=>
          
          newArry.push( <li onClick={this.jumpNextLink.bind(this,item.id)} key={item.id}>
           
   
           
            <Icon style={{ float: 'left',lineHeight:'30px' }} type="caret-right" /> <span className={styles.text} >{item.title},</span><span className={styles.time}>{item.date}</span></li>) ,
         
           
    );
  



   
    return(
      <div className={styles.normal}>
        
        <h1 className={styles.title} >通知公告</h1>
  
        <ul className={styles.infoList}>
       
          {newArry}
        </ul>
      </div>
    )
  }
}


function mapStateToProps({infoList}) {
  return {infoList};
  
}

export default connect(mapStateToProps)(InfoList);
