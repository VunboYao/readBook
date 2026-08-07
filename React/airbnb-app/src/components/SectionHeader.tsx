import { memo } from "react";

interface IProps {
  title: string
  subtitle?: string
}

export const SectionHeader = memo(({ title, subtitle = '' }: IProps) => {
  return (
    <div className="text-[#222] mt-7.5">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-4 text-base">{subtitle}</p>}
    </div>
  )
})