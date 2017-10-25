import React from 'react';
import {Row,div} from 'antd';
import {connect} from 'dva';
import {   Router, Route, Link, hashHistory } from 'react-router';
import styles from './StudentItem.less';


class StudentItem extends React.Component{
  constructor(props){
    super(props)
    this.state={ }
  }

  componentWillMount(){
    this.props.dispatch(
      { type: 'serviceCenter/getHomeSMatters'}
    )
  }
  moreBtn=()=>{
    hashHistory.push({ pathname: '/service/1'})
  }
  render(){
     
    let {homeSMatters}=this.props.serviceCenter;
    
        const sMatters = homeSMatters.map(matter => 
          <div  className={styles.matterItem} key={matter.id}>
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
        {sMatters}
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

export default connect(mapStateToProps)(StudentItem);