import React from 'react';
import { connect } from 'dva';
import styles from './Service.less';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Tag } from 'antd';
import { Pagination } from 'antd';
import Servicelist from '../components/Service/Servicelist';
  //标签
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['人事部', '保卫处', '大学生就业管理处', '行政处'];
class Service extends React.Component{
  constructor(props){

      super(props)

      this.state={
        current: 3, 
        selectedTags: []

      }


  }
  //分页

  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  }
//标签

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }
  render(){
      //搜索
    const Search = Input.Search;
     //标签
    const { selectedTags } = this.state;
    const arr=[
      {
          id:1,
          imgpath:require('../assets/images/service1.png'),
          name:'人事处',
          bottom:'显示底部内容'
    },
    {
        id:2,
        imgpath:require('../assets/images/service2.png'),
        name:'保卫处',
        bottom:'显示底部内容显示底部内容显示底部内容显示底部内容'
    },
    {
        id:3,
        imgpath:require('../assets/images/service3.png'),
        name:'就业管理处',
        bottom:'显示底部内容'
    },
    {
        id:4,
        imgpath:require('../assets/images/service4.png'),
        name:'行政处',
        bottom:'显示底部内容'
    },
    {
        id:5,
        imgpath:require('../assets/images/service5.png'),
        name:'行政处',
        bottom:'显示底部内容'
    },
    {
        id:6,
        imgpath:require('../assets/images/service1.png'),
        name:'行政处',
        bottom:'显示底部内容'
    }
    ,  {
        id:7,
        imgpath:require('../assets/images/service2.png'),
        name:'行政处',
        bottom:'显示底部内容'
    },
    {
        id:8,
        imgpath:require('../assets/images/service3.png'),
        name:'行政处',
        bottom:'显示底部内容'
    },
    {
        id:9,
        imgpath:require('../assets/images/service4.png'),
        name:'行政处',
        bottom:'显示底部内容'
    },
    {
        id:10,
        imgpath:require('../assets/images/service5.png'),
        name:'行政处',
        bottom:'显示底部内容'
    }
    ,  {
        id:11,
        imgpath:require('../assets/images/service1.png'),
        name:'行政处',
        bottom:'显示底部内容'
    },
    {
        id:12,
        imgpath:require('../assets/images/service2.png'),
        name:'行政处',
        bottom:'显示底部内容'
    }
]

      return (

        <div className={styles.normal}>
            <div className={styles.banner}>
                <img src={require('../assets/images/banner.jpg')} />
            </div>
            <div className={styles.searchBox}>
            <Search
          placeholder="请输入搜索内容"
          style={{ width:600,paddingTop:10,paddingBottom:10}}
          onSearch={value => console.log(value)}
         />
            </div>
           
        <div  className={styles.content}>
            <div className={styles.tag}>
        <strong style={{ marginRight: 8 }}>服务部门:</strong>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
            color='red'
          >
            {tag}
          </CheckableTag>
        ))}
      </div>

              <div className={styles.zmenu}>
                  <Servicelist selectedTags={this.state.selectedTags}  list={arr} />
              </div>
              <div className={styles.pagination}>
                  
              <Pagination  current={this.state.current} onChange={this.onChange} total={50}
              />
              </div>
        </div>
        </div>

      );


  }

}



function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Service);
