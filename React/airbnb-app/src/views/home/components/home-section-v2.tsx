import { memo, useState } from "react"
import { SectionHeader } from "@/components/SectionHeader"
import { SectionRooms } from "@/components/SectionRooms"
import type { IHomeSectionV2 } from "@/api/home"
import { SectionTabs } from "@/components/SectionTabs"
import { SectionFooter } from "@/components/SectionFooter"


export const HomeSectionV2 = memo(({ initData }: { initData: IHomeSectionV2 }) => {
  const { title, subtitle, dest_list, dest_address } = initData
  const tabNames = dest_address.map((item) => item.name)

  const [activeTab, setActiveTab] = useState(tabNames[0])


  return <div>
    <SectionHeader title={title} subtitle={subtitle} />
    <SectionTabs tabs={tabNames} activeTab={activeTab} onTabChange={setActiveTab} />
    <SectionRooms roomList={dest_list[activeTab]} cols={3} />
    <SectionFooter name={activeTab} />
  </div>
})
