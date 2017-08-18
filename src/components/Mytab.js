import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import styles from './Mytab.less';


class Mytab extends React.Component{

    constructor(props) {
      console.log(props)
      super(props);

  }



    render(){

      const {transform,width} = this.props.ModMytab;


      return(

        <div className={styles.mytabs}>

          <ul>
            <li className={styles.zitemActive}  style={{display:'block',transform:transform,width:width+'px',}}></li>
              {
                  this.props.children.map((ii) =>(

                     <Panel key={ii.key}  path={ii.props.path} index={ii.key} tab={ii.props.tab}/>

                     )
                  )


              }


          </ul>

        </div>




      );

    }



}


class Panel extends React.Component{

    constructor(props) {
      super(props);

  }


  render(){


    return(

        <li> <Link onClick={this.handleClick} to={this.props.path}>{this.props.tab}</Link> </li>

    );

  }


}



Mytab.Panel = Panel;


function mapStateToProps({ ModMytab }) {
  return {ModMytab};
}

export default connect(mapStateToProps)(Mytab);
