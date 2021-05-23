import 'antd/dist/antd.css'
import { Space, Row, Col } from 'antd'
import Header from './containers/Header'
import Main from './containers/Main'
import Footer from './containers/Footer'
function App() {
  return (
    <div style={{ marginTop: '100px' }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Row>
          <Col span={12} offset={6}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Main />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Footer />
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default App
