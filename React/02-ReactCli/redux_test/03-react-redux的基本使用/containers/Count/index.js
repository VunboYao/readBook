// 连接UI组件
import CountUI from '../../components/Count'
// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'
import {
  INCREMENT,
  DECREMENT
} from '../../redux/constant'
import {
  createDecrementAction,
  createIncrementAsyncAction,
  createIncrementAction,
} from '../../redux/action'


/*
1.mapStateToProps函数返回一个对象
2.返回的对象中的key就作为传递给UI组件的props的key,value就作为传递给UI组件的props的value
3.mapStateToProps用于传递状态
*/
const mapStateToProps = state => ({ count: state })

/*
1.mapDispatchToProps函数返回的是一个对象
2.返回的对象中的key就作为传递给UI组件的props的key,value就作为传递给UI组件的props的value
3.mapDispatchToProps用于传递操作状态的方法
*/
const mapDispatchToProps = dispatch => {
  return {
    [INCREMENT]: num => dispatch(createIncrementAction(num)),
    [DECREMENT]: num => dispatch(createDecrementAction(num)),
    addOfAsync: (num, time) => dispatch(createIncrementAsyncAction(num, time)),
  }
}

// 暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
