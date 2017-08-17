import React from 'react';
import {Row,Col} from 'antd';
import styles from './Homelist.less';
import TeacherItem from './TeacherItem';
import StudentItem from './StudentItem';

class Homelist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activemenu:1,
    };
}

activeMenu=(id)=>{

    this.setState({

        activemenu:id,

    })

}





 render(){

   const topmenu = this.props.list.map((todo)=>

     <Col span={6} key={todo.id}>
           <a href="javascript:;"  onClick={this.activeMenu.bind(this,todo.id)} >
                 <img  src={todo.imgpath} />
                 <span>{todo.name}</span>
           </a>
     </Col>
   );

   let content = null;

   if(this.state.activemenu == 1){

     content =  <TeacherItem />;

   }

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
