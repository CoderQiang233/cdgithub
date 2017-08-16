import React from 'react';
import { connect } from 'dva';
import {Row,Col} from 'antd';
import styles from './Home.less';
import Homelist from '../components/home/Homelist';


class Home extends React.Component{
    constructor(props){

        super(props)

        this.state={


        }


    }






    render(){


      const arr=[
          {
              id:1,
              imgpath:require('../assets/images/jssxx.png'),
              name:'教师事项'
        },
        {
            id:2,
            imgpath:require('../assets/images/xssx.png'),
            name:'学生事项'
        },
        {
            id:3,
            imgpath:require('../assets/images/sxsp.png'),
            name:'事项审批'
        },
        {
            id:4,
            imgpath:require('../assets/images/zxdy.png'),
            name:'在线答疑'
        }

    ]




        return (

          <div className={styles.normal}>
              <div className={styles.banner}>
                  <img src={require('../assets/images/banner.jpg')} />
              </div>
              <div className={styles.zmenu}>
                  <Homelist  list={arr} />
              </div>
          </div>


        );


    }

}





function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
