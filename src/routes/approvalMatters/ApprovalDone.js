import React from 'react';
import { connect } from 'dva';
import styles from './ApprovalDone.less';
import TLeave from '../../components/matterDetail/TLeave.js';
import SDoctoralRestudy from '../../components/matterDetail/SDoctoralRestudy.js';
import SDoctoralDelayed from '../../components/matterDetail/SDoctoralDelayed.js';
import TFurtherApproval from '../../components/matterDetail/TFurtherApproval.js';

class ApprovalDone extends React.Component{
    constructor(props){
      
              super(props)
      
              this.state={}      
                                              
    }
  
    render(){
      const linkData=this.props.location.state;
      const matter=linkData.matter;
      const id=linkData.id;
      const taskId=linkData.taskId;
      const status=0;
      let tableComponent;
  
      if(matter=='TLeave'){
        tableComponent=<TLeave  matter={matter} matterId={id} status={status} taskId={taskId} from={1}  />
      }
      if(matter=='SDoctoralRestudy'){
        tableComponent=<SDoctoralRestudy  matter={matter} matterId={id} status={status} taskId={taskId} from={1}  />
      }

      if(matter=='SDoctoralDelayed'){
        tableComponent=<SDoctoralDelayed  matter={matter} matterId={id} status={status} taskId={taskId} from={1}  />
      }

  
      if(matter=='TFurtherApproval'){
        tableComponent=<TFurtherApproval  matter={matter} matterId={id} status={status} taskId={taskId} from={1}  />
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

export default connect(mapStateToProps)(ApprovalDone);
