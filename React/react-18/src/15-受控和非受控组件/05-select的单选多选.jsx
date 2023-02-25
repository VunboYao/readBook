import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    userName: 'VunboYao',
    password: '',
    isAgree: false,
    hobbies: [
      { value: 'sing', text: 'sing', isChecked: false },
      { value: 'dance', text: 'dance', isChecked: false },
      { value: 'rap', text: 'rap', isChecked: false },
    ],
    // fruits: 'orange', // 单选时，必须是一个 scalar value
    fruits: ['orange'],
  }

  inputChange(e) {
    // 统一处理，获取name属性
    const name = e.target.name

    /*
    * 1. 如果input 的 type 是 checkbox, 根据checked来决定其值
    * 2. 其他 type 根据 value 决定其值
    *  */
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    this.setState({
      [name]: value,
    })
  }

  // checkbox 多选处理
  handleMultiCheckbox(index, e) {
    // state数据不可变性
    const hobbies = [...this.state.hobbies]
    hobbies[index].isChecked = e.target.checked

    this.setState({
      hobbies,
    })
  }

  // select 单选、多选处理
  handleSelectChange(e) {
    // 如果是单选，直接存储
    /* this.setState({
      fruits: e.target.value,
    }) */

    // !多选，从selectedOptions上拿到选择的项
    console.log(e.target.selectedOptions)
    const options = Array.from(e.target.selectedOptions, item => item.value)

    this.setState({
      fruits: options,
    })
  }

  handleSubmitClick(e) {
    // 阻止默认行为
    e.preventDefault()

    // 2.获取所有的表单数据，对数据进行组装
    console.log('Get User Input Data:', this.state)

    const hobbies = this.state.hobbies.filter(item => item.isChecked).map(item => item.value)
    console.log('hobbies:', hobbies)

    // 3.ajax/fetch/axios
  }

  render() {
    const { userName, password, isAgree, hobbies, fruits } = this.state

    return (
      <div>
        {/* submit事件 */}
        <form onSubmit={e => this.handleSubmitClick(e)}>

         {/* 1.用户名和密码 */}
         <div>
           {/* for属性改为htmlFor */}
           <label htmlFor="userName">
             用户：
             <input
               type="text"
               id={'userName'}
               name={'userName'}
               value={userName}
               onChange={e => this.inputChange(e)}
             />
           </label>
           <label htmlFor={'password'}>
             密码：
             <input
               type={'password'}
               id={'password'}
               name={'password'}
               value={password}
               onChange={e => this.inputChange(e)}
             />
           </label>
         </div>

          {/* 2.checkbox单选 */}
          <label htmlFor={'isAgree'}>
            <input
              type="checkbox"
              id={'isAgree'}
              name={'isAgree'}
              checked={isAgree}
              onChange={e => this.inputChange(e)}
            />
            Agree Policy
          </label>

          {/* 3.checkbox多选 */}
          <div>
            您的爱好：
            {
              hobbies.map((item, index) => {
                return (
                  <label key={item.value} htmlFor={item.value}>
                    <input
                      type="checkbox"
                      id={item.value}
                      checked={item.isChecked}
                      onChange={e => this.handleMultiCheckbox(index, e)}
                    />
                    <span>{item.text}</span>
                  </label>
                )
              })
            }
          </div>

          {/* 4.select */}
          <select
            multiple
            value={fruits}
            onChange={e => this.handleSelectChange(e)}>
            <option value="apple">Apple</option>
            <option value="orange">Orange</option>
            <option value="banner">Banner</option>
          </select>

          <button type="submit">SignIn</button>
        </form>
      </div>
    )
  }
}

export default App
