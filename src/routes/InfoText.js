import React from 'react';
import { connect } from 'dva';
import styles from './InfoText.less';
import { Router, Route, Link, hashHistory } from 'react-router';

class InfoText extends React.Component{
  constructor(props){
    super(props)
    this.state={
      
    }
  }
 
  componentWillMount(){

    const linkData=this.props.location.state;
   
     this.props.dispatch({ type: 'infoList/infoText',payload: linkData})
    
    }
  render(){
    
    const title =this.props.infoList.infoText.title;
    const text =this.props.infoList.infoText.text;
    const date =this.props.infoList.infoText.date;
 
    return(
       

        <div  className={styles.content}>

          <div className={styles.com}>
            <strong style={{ marginRight: 2 }}>  <h1 className={styles.title}>{title}</h1></strong>
          </div>
             
            <div className={styles.con}>
              <strong style={{ marginRight: 2 }}> <h2 className={styles.text}>{text}</h2></strong>      
            </div>
      
      </div>
 
    )
  }

}

function mapStateToProps({infoList}) {
  return {infoList};
}

export default connect(mapStateToProps)(InfoText);
