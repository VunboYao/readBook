import axios from 'axios'
import { Component } from 'react'
import MainBanner from './MainBanner'
import MainProductList from './MainProductList'

export default class Main extends Component {
  // init State
  constructor(props) {
    super(props)

    this.state = {
      banners: [],
    }
  }

  // getData after Mount
  componentDidMount() {
    axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
      const {
        banner,
      } = res.data.data

      this.setState({
        banner: banner.list,
      })
    })
  }

  render() {
    const { banner } = this.state
    return (
      <div>
        <h2>Main</h2>
        <MainBanner banners={banner} title={'轮播图'}/>
        <MainProductList/>
      </div>
    )
  }
}
