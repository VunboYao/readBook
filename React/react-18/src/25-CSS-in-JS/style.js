import styled from 'styled-components'
import {
  largeSize,
  primaryColor,
} from './style/variable'

// 1.基本使用
export const AppWrapper = styled.div`
  .footer {
    border: 1px solid orange;
  }
`

/*
* 2.子元素单独抽取一个样式组件
* 3.可以接收外部传入的props
* 4.可以通过attrs给标签模版字符串中提供默认的属性
* 5.从一个单独的文件中引入变量
*  */

export const SectionWrapper = styled.div.attrs(props => ({
  color: props.color || 'blue',
}))`
  border: 1px solid red;

  .title {
    font-size: ${props => props.size}px;
    color: ${props => props.color};

    &:hover {
      background-color: azure;
    }
  }

  .content {
    font-size: ${largeSize};
    color: ${primaryColor};
  }
`
