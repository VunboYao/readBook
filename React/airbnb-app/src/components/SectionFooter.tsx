import { memo } from "react";
import { useNavigate } from "react-router";
import ArrowMore from "@/assets/svg/arrowMore";

export const SectionFooter = memo(({ name }: { name?: string }) => {
  let showMsg = '显示全部'
  if (name) {
    showMsg = `查看更多${name}房源`
  }

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/entire`)
  }

  return (
    <div className="flex mt-2.5">
      <button className="flex items-center cursor-pointer text-secondary hover:underline" onClick={handleClick}>
        <span className="mr-1.5 text-lg">{showMsg}</span>
        <ArrowMore />
      </button>
    </div>
  )
})