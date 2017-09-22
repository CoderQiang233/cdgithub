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

const arr=[
    {
        id:1,
        imgpath:require('../assets/images/service1.png'),
        name:'人事部',
        bottom:'显示底部内容1'
  },
  {
      id:2,
      imgpath:require('../assets/images/service2.png'),
      name:'保卫处',
      bottom:'显示底部内容显示底部内容显示底部内容显示底部内容2'
  },
  {
      id:3,
      imgpath:require('../assets/images/service3.png'),
      name:'就业管理处',
      bottom:'显示底部内容3'
  },
  {
      id:4,
      imgpath:require('../assets/images/service4.png'),
      name:'行政处',
      bottom:'显示底部内容4'
  },
  {
      id:5,
      imgpath:require('../assets/images/service5.png'),
      name:'行政处',
      bottom:'显示底部内容5'
  },
  {
      id:6,
      imgpath:require('../assets/images/service1.png'),
      name:'行政处',
      bottom:'显示底部内容6'
  }
  ,  {
      id:7,
      imgpath:require('../assets/images/service2.png'),
      name:'行政处',
      bottom:'显示底部内容7'
  },
  {
      id:8,
      imgpath:require('../assets/images/service3.png'),
      name:'行政处',
      bottom:'显示底部内容8'
  },
  {
      id:9,
      imgpath:require('../assets/images/service4.png'),
      name:'行政处',
      bottom:'显示底部内容9'
  },
  {
      id:10,
      imgpath:require('../assets/images/service5.png'),
      name:'行政处',
      bottom:'显示底部内容10'
  },
  {
      id:11,
      imgpath:require('../assets/images/service1.png'),
      name:'行政处',
      bottom:'显示底部内容11'
  },
  {
      id:12,
      imgpath:require('../assets/images/service2.png'),
      name:'行政处',
      bottom:'显示底部内容12'
  },
  {
      id:13,
      imgpath:require('../assets/images/service2.png'),
      name:'人事部',
      bottom:'显示底部内容13'
  }
  ,
  {
      id:14,
      imgpath:require('../assets/images/service2.png'),
      name:'保卫处',
      bottom:'显示底部内容14'
  }
  ,
  {
      id:15,
      imgpath:require('../assets/images/service2.png'),
      name:'行政处',
      bottom:'显示底部内容15'
  }
  ,
  {
      id:16,
      imgpath:require('../assets/images/service2.png'),
      name:'人事部',
      bottom:'显示底部内容16'
  }
  ,
  {
      id:17,
      imgpath:require('../assets/images/service2.png'),
      name:'保卫处',
      bottom:'显示底部内容17'
  }
]
class Service extends React.Component{

  constructor(props){

      super(props)

      this.state={
        current: 1, //当前页
        pageSize:6, //每页条数
        total:arr.length, //数据总数
        selectedTags: [],
        listArry:arr, //获取当前操作的总数据
        pagelist:[], //获取当前操作的页的总数据
      }


  }


// 数据初始化
componentWillMount(){
   let list= this.loadData(this.state.current,this.state.pageSize,this.state.listArry);
   this.setState({
    pagelist:list
   })
}


  //分页

  pageChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });

    let list= this.loadData(page,this.state.pageSize,this.state.listArry);
    this.setState({
        pagelist:list
    })
  }

//   获取数据

loadData=(current,pageSize,datalist)=>{
    let offset = (current - 1) * pageSize;  
    let list=(offset + pageSize >= datalist.length) ? datalist.slice(offset, datalist.length) : datalist.slice(offset, offset + pageSize);
    // console.log(list)
    return list;
 }

//标签

  handleChange(tag, checked)  {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });

    let list=[];

    if(!nextSelectedTags.length) {
        list=arr; 
        console.log(list);
    } else { 
        for(let i=0;i<arr.length;i++) { 
            if(this.in_array(arr[i].name,nextSelectedTags)) { 
                list.push(arr[i]);
            }
        }
        console.log(list);
    }
    this.setState({
        listArry:list
    });
    this.initPage(list);

    // for(let i=0;i<arr.length;i++) {
    //     if(this.in_array(arr[i].name,nextSelectedTags)){
    //         list.push(arr[i]);
    //     }
    // }  
    
                    

    // //初始化分页
    
    // this.setState({
    //     listArry:list
    // });
    // console.log(list)
    // // // console.log(this.state.listArry)
    // this.initPage(list);
  }

  in_array=(search,array)=>{
    for(var i in array){
        if(array[i]==search){
            return true;
        }
    }
    return false;
  }
//初始化分页
initPage=(datalist)=>{
//    console.log(111)
// console.log(this.state.listArry)
    let list= this.loadData(1,this.state.pageSize,datalist);
// console.log(list);
    this.setState({
        current:1,
        total:datalist.length?datalist.length:1,
        pagelist:list
    })
}
  
  render(){
      //搜索
    const Search = Input.Search;
     //标签
    const { selectedTags } = this.state;
    

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
                  <Servicelist current={this.state.current} selectedTags={this.state.selectedTags}  list={this.state.pagelist} />
              </div>
              <div className={styles.pagination}>
                  
              <Pagination  current={this.state.current} pageSize={this.state.pageSize} onChange={this.pageChange} total={this.state.total}
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
