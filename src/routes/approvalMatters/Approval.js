import React from 'react';
import { connect } from 'dva';
import styles from './Approval.less';
import TLeave from '../../components/approvalMatters/TLeave.js';


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
    const matter=linkData.matter;
    const id=linkData.id;
    const taskId=linkData.taskId;
    const level=linkData.level;
    let tableComponent;

    if(matter=='TLeave'){
      tableComponent=<TLeave  matter={matter} matterId={id}  taskId={taskId} level={level}  />
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
