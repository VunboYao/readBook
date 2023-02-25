import { PureComponent } from 'react'

class App extends PureComponent {
  state = {
    books: [
      { name: 'you dont know js', price: 99, count: 1 },
      { name: 'javascript advanced programming', price: 88, count: 1 },
      { name: 'react advanced programming', price: 78, count: 3 },
      { name: 'vue advanced programming', price: 87, count: 2 },
    ],
    friend: {
      name: 'Emma',
    },
    message: 'Hello World',
  }

  addNewBook() {
    const newBook = { name: 'Node.js Advanced Programming', pirce: 99, count: 1 }

    // 1.直接修改原有的 state, 即重新赋值一遍
    // !在PureComponent 是不能引入重新渲染(re-render)，内存地址未变更
    /*
    this.state.books.push(newBook)
    this.setState({ books: this.state.books })
    */

    // 2.赋值一份 books, 在新的books中修改, 设置新的 books
    const books = [...this.state.books]
    books.push(newBook)

    this.setState({ books })
  }

  addNewCount(index) {
    // !数据赋值的可变性（触发state的刷新）
    const books = [...this.state.books]
    books[index].count++
    this.setState({ books })
  }

  render() {
    const { books } = this.state

    return (
      <div>
        <h2>数据列表</h2>
        <ul>
          {
            books.map((item, index) => {
              return (
                <li key={index}>
                  <span>name: {item.name}-price:{item.price}-count: {item.count}</span>
                  <button onClick={e => this.addNewCount(index, e)}>Add+1</button>
                </li>
              )
            })
          }
        </ul>
        <button onClick={e => this.addNewBook(e)}>AddNewBook</button>
      </div>
    )
  }
}

export default App
