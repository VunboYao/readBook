import Logo from "@/assets/svg/logo"
import AppHeaderCenter from "./AppHeaderCenter"
import AppHeaderRight from "./AppHeaderRight"

export default function AppHeader() {
  return (
    <header className="flex justify-between items-center h-20 border-b border-[#eee]">
      <div className="flex-1">
        <Logo />
      </div>
      <div>
        <AppHeaderCenter />
      </div>
      <div className="flex-1 flex justify-end">
        <AppHeaderRight />
      </div>
    </header>
  )
}