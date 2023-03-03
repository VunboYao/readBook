import { PureComponent } from 'react'
import { ButtonWrapper, HomeWrapper } from './style'

class Index extends PureComponent {
  render() {
    return (
      <HomeWrapper>
        <div className="top">
          <div className="banner">BannerContent</div>
        </div>
        <div className="bottom">
          <span className="header">GoodsList</span>
          <ul className="product-list">
            <li className="item">GoodsListOne</li>
            <li className="item">GoodsListTwo</li>
            <li className="item">GoodsListThree</li>
          </ul>
        </div>

        <ButtonWrapper>Hey</ButtonWrapper>
      </HomeWrapper>
    )
  }
}

export default Index
