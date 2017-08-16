import React from 'react';
import {Row,Col} from 'antd';
import styles from './Homelist.less';

function Homelist(props) {

  console.log(props);

  const Aaa = props.list.map((todo)=>(




    <Col span={6} key={todo.id}>
                           <a href="javascript:;" >
                            <img  src={todo.imgpath} />
                              <span>{todo.name}</span>
                           </a>
    </Col>




  ));

  console.log(Aaa)

  return (

    <Row type="flex" justify="center">



      {Aaa}




    </Row>


  );
}

export default Homelist;
