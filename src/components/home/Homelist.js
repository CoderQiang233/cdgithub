import React from 'react';
import {Row,Col} from 'antd';
import styles from './Homelist.less';
import TeacherItem from './TeacherItem';
import StudentItem from './StudentItem';
import { Router, Route, Link, hashHistory } from 'react-router';

class Homelist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activemenu:1,
    };
}

activeMenu=(id)=>{

  if(id==3){
    hashHistory.push('ApprovalMatters')
  }
    this.setState({

        activemenu:id,

    })

}





 render(){

   const topmenu = this.props.list.map((todo)=>

     <Col span={6} key={todo.id}>
           <a   onClick={this.activeMenu.bind(this,todo.id)} >
             {
              this.state.activemenu==todo.id&&<img  src={todo.imgpathact} />
             }
             {
              this.state.activemenu!=todo.id&&<img  src={todo.imgpath} />
             }
                 
                 <span>{todo.name}</span>
           </a>
     </Col>
   );



     return (

       <Row type="flex" justify="center" className="wrap">


         {topmenu}

         {
           this.state.activemenu ==1 &&
          <TeacherItem />
        }
        {
          this.state.activemenu ==2 &&
         <StudentItem />
        }

       </Row>


     );


 }


}

export default Homelist;
