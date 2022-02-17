// TODO:组件的本质
const MyComponent = function(){
  return {
    tag: 'div',
    props: {
      onClick: ()=> alert('hello')
    },
    children: 'click me'
  }
}

const vnode = {
  tag: MyComponent
}