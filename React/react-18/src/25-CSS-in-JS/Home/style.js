import styled from 'styled-components'

const Button = styled.button`
  border: 1px solid #f00;
  border-radius: 5px;
`

// inherit attributes
export const ButtonWrapper = styled(Button)`
  background-color: #0f0;
  color: #fff;
`

export const HomeWrapper = styled.div`
  .top {
    .banner {
      color: red;
    }
  }

  .bottom {
    .header {
      // 获取theme data
      color: ${props => props.theme.color};
      font-size: ${props => props.theme.size};
    }

    .product-list {
      .item {
        color: blue;
      }
    }
  }
`
