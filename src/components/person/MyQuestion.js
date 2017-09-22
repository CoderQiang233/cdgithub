import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import styles from './MyQuestion.less';
import { connect } from 'dva';



class MyQuestion extends React.Component{

  constructor(props){
    
            super(props)
    
            this.state={
               
            }
              
  }

  componentDidMount() {
    
    this.props.dispatch({
      type: 'persion/queryUserAllQuertion',
      payload: {},
    });
  
   console.log(this.props)
 }


  callback=(key)=> {
    console.log(key);
  } 
  
  render(){
    return(
      <div className={styles.personTab}>
         <Tabs defaultActiveKey="1" onChange={this.callback}  className={styles.tabContent}>
         <TabPane  tab="我的提问" key="1">
           <div className={styles.tabContent}>
           <AllMyQuestion {...this.props.persion.MyAllQuestion}></AllMyQuestion>
           </div>
         </TabPane>
         <TabPane tab="在线提问" key="2">
           <div className={styles.tabContent}>
             Content of Tab Pane 2
           </div>
          </TabPane>
        </Tabs>
        </div>
    )
  }

  
}

const AllMyQuestion=({total,loading,dataSource=[],current})=>{

  const questionList=[];

  dataSource.map((item)=>{
    questionList.push(
      <li key={item.key}><a>{item.thing}</a> <span className={styles.date}>{item.date}</span></li>
    )
  })
   
   return(
     <div>
      <ul className={styles.questionList}>
        {questionList}
      </ul>
     </div>
     
   )
}

function mapStateToProps({persion}) {
  return {persion};
}

export default connect(mapStateToProps)(MyQuestion);
