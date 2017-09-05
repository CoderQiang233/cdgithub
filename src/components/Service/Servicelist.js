import React from 'react';
import {Row,Col} from 'antd';
import styles from './Servicelist.less';


class Servicelist extends React.Component {

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
                 <span>
                 <strong>{todo.name}</strong>
                 </span>
                 <span>
                  
                   </span>
                   <small>{todo.bottom}</small>
           </a>
     </Col>
   );

  

     return (

       <Row type="flex" justify="center" className="wrap">


         {topmenu}

         {/* {
           this.state.activemenu ==1 &&
          <TeacherItem />
        }
        {
          this.state.activemenu ==2 &&
         <StudentItem />
        } */}


       </Row>


     );


 }


}

export default Servicelist;
