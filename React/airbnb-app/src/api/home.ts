import request from '@/api'
export interface IHomeSection {
  title: string
  subtitle: string
  list: IHomeSectionItem[]
}

export interface IHomeSectionItem {
  id: number | string
  name: string
  picture_url: string
  price_format: string
  star_rating?: number | null
  reviews_count?: number
  verify_info?: {
    text_color?: string
    messages?: string[]
  }
  bottom_info?: {
    content?: string
  } | null
}


export const getGoodPriceData = async () => {
  return request.get<IHomeSection>('/home/goodPrice')
}

export const getHighScoreData = async () => {
  return request.get<IHomeSection>('/home/highScore')
}