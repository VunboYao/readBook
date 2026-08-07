import { memo } from "react"
import type { IHomeSection } from "@/api/home"
import { SectionHeader } from "@/components/SectionHeader"
import { LongForItem } from "@/components/LongForItem"
import { ScrollView } from "@/components/ScrollView"

export const HomeLongFor = memo(({ initData }: { initData: IHomeSection }) => {
  const { title, subtitle, list } = initData

  return (
    <div className="mt-7.5">
      <SectionHeader title={title} subtitle={subtitle} />
      <div>
        <ScrollView className="mt-5" contentClassName="gap-2">
          {
            list.map((item, index) => (
              <LongForItem key={index} item={item} />
            ))
          }
        </ScrollView>
      </div>

    </div>
  )
})