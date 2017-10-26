import React from 'react';
import { connect } from 'dva';
import styles from './Approval.less';
import TLeave from '../../components/approvalMatters/TLeave.js';
import SDoctoralDelayed from '../../components/approvalMatters/SDoctoralDelayed.js';
import TFurtherApproval from '../../components/approvalMatters/TFurtherApproval.js';

class Approval extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={

            }      
                                            
  }

  componentWillMount(){
      
   
  }

  render(){
    const linkData=this.props.location.state;
    console.log(8888);
    console.log(linkData);
    const matter=linkData.matter;
    const id=linkData.id;
    const taskId=linkData.taskId;
    const level=linkData.level;
    let tableComponent;
    if(matter=='TLeave'){
      tableComponent=<TLeave  matter={matter} matterId={id}  taskId={taskId} level={level}  />
    }
    if(matter=='SDoctoralDelayed'){
      tableComponent=<SDoctoralDelayed  matter={matter} matterId={id}  taskId={taskId} level={level}   />
    }

    if(matter=='TFurtherApproval'){
      tableComponent=<TFurtherApproval matter={matter} matterId={id}  taskId={taskId} level={level}  />
    }
    return(
    <div className={styles.normal}>
      {tableComponent}
    </div>
    )
 

  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Approval);
