import { memo } from "react"
import { SectionHeader } from "@/components/SectionHeader"
import { SectionRooms } from "@/components/SectionRooms"
import type { IHomeSection } from "@/api/home"
import { SectionFooter } from "@/components/SectionFooter"


export const HomeSectionV3 = memo(({ initData }: { initData: IHomeSection }) => {
  const { title, subtitle, list } = initData

  return <div>
    <SectionHeader title={title} subtitle={subtitle} />
    <SectionRooms roomList={list} cols={5} />
    <SectionFooter name='plus' />
  </div>
})
