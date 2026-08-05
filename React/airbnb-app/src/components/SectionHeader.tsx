import { memo } from "react";

interface IProps {
  title: string
  subtitle?: string
}

export const SectionHeader = memo(({ title, subtitle = '' }: IProps) => {
  return (
    <div className="text-[#222]">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-base mb-5">{subtitle}</p>}
    </div>
  )
})