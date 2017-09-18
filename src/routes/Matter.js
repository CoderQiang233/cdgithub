import React from 'react';
import { connect } from 'dva';
import styles from './Matter.less';
import TLeave from '../components/matters/TLeave'



class Matter extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={}      
                                            
  }

  
  
  componentWillMount(){
    //console.log(this.props.params.matter)
  }

  render(){
 
    const matter=this.props.params.matter;

    return(
    <div className={styles.normal}>
      <div className={styles.banner}>
          <img src={require('../assets/images/banner.jpg')} />
      </div>
      <div>
        {
          matter=='TLeave'&&
          <TLeave history={this.props.history}/>
        }
      </div>
    </div>
    )
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Matter);
