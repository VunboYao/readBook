import { memo } from "react"
import { SectionHeader } from "@/components/SectionHeader"
import { SectionRooms } from "@/components/SectionRooms"
import type { IHomeSection } from "@/api/home"


export const HomeSectionV1 = memo(({ initData }: { initData: IHomeSection }) => {
  const { title, subtitle, list } = initData

  return <div>
    <SectionHeader title={title} subtitle={subtitle} />
    <SectionRooms roomList={list.slice(0, 8)} cols={4} />
  </div>
})