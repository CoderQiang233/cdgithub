import React from 'react';
import {Row,div} from 'antd';
import {connect} from 'dva';
import {   Router, Route, Link, hashHistory } from 'react-router';
import styles from './TeacherItem.less';

class TeacherItem extends React.Component{
  constructor(props){
    super(props)
    this.state={ }
  }

  componentWillMount(){
    this.props.dispatch(
      { type: 'serviceCenter/getHomeTMatters'}
    )
  }

  moreBtn=()=>{
    hashHistory.push({ pathname: '/service/2'})
  }

  render(){

    let {homeTMatters}=this.props.serviceCenter;

    const tMatters = homeTMatters.map(matter => 
      <div className={styles.matterItem} key={matter.id}>
      <Link to={"matter/"+matter.matterKey} title={matter.matterName}>
        <img src={matter.img2}/>
        <span className={styles.title}>
           <strong>{matter.matterName}</strong>
        </span>
      </Link>
  </div>
    );

    return(
      <div className={styles.normal}>
        <div className={styles.matters}>
        {tMatters}
        </div>
        
        
        <div className={styles.more}>
          <a onClick={this.moreBtn.bind(this)}>更多事项 >></a>
        </div>
      </div>
    )
  }
}


function mapStateToProps({serviceCenter}) {
  return {serviceCenter};
}

export default connect(mapStateToProps)(TeacherItem);
