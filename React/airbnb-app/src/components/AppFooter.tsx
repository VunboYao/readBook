import footerData from '@/assets/data/footer.json'

export default function AppFooter() {
  return (
    <footer className='mt-25 border-t border-[#ebebeb]'>
      <div className='w-270 mx-auto py-12 px-4'>
        <div className="grid xl:grid-cols-4 grid-cols-2 gap-4">
          {
            footerData.map(item => {
              return (
                <div key={item.name}>
                  <h3 className='text-base font-bold text-[#484848]'>{item.name}</h3>
                  <div className='mt-3'>
                    {
                      item.list.map(i => {
                        return <div key={i} className='text-sm cursor-pointer hover:text-[#484848] text-[#767676] mb-2'>{i}</div>
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='text-sm cursor-pointer hover:text-[#484848] text-[#767676] mt-10'>© 2022 Airbnb, Inc. All rights reserved.条款 · 隐私政策 · 网站地图 · 全国旅游投诉渠道 12301</div>
      </div>
    </footer>
  )
}