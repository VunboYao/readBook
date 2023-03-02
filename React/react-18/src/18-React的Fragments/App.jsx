import { Fragment, PureComponent } from 'react'

class App extends PureComponent {
  state = {
    sections: [
      { title: 'React', content: 'React studying' },
      { title: 'Vue', content: 'Vue more simple' },
      { title: 'Node.js', content: 'Nodejs studying}' },
    ],
  }

  render() {
    const { sections } = this.state

    return (
      /* !动机：当使用了父div, 在 tr > td 的表格布局中，div 是非法的 */
      /* 简写：短语法，不能用 key */
      <>
        <h2>No Parent Node</h2>
        <p>some content</p>

        {
          sections.map((item) => {
            return (
              /* !带 key */
              <Fragment key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </Fragment>
            )
          })
        }
      </>
    )
  }
}

export default App
