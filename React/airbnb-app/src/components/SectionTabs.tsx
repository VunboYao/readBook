import { ScrollView } from "@/components/ScrollView"
import { memo } from "react"

export const SectionTabs = memo(({ tabs, activeTab, onTabChange }: { tabs: string[], activeTab: string, onTabChange: (tab: string) => void }) => {
  return (
    <ScrollView className="mt-5" contentClassName="gap-4" deps={tabs}>
      {tabs.map((tab) => (
        <button
          className={
            `basis-30 shrink-0 px-4 py-3.5 border border-solid cursor-pointer box-shadow border-gray-300 rounded-sm whitespace-nowrap
            ${activeTab === tab ? 'bg-secondary text-white' : ''}`
          }
          key={tab}
          onClick={() => {
            onTabChange(tab)
          }}
        >{tab}</button>
      ))}
    </ScrollView>
  )
})
