import SearchBar from "@/assets/svg/search-bar"

export default function AppHeaderCenter() {
  return (
    <div className="box-shadow cursor-pointer flex items-center justify-between w-75 h-12 px-2 border border-solid rounded-3xl border-gray-300">
      <div className="font-bold px-4 text-[#222]">
        搜索房源和体验
      </div>
      <div className="bg-airbnb text-white flex items-center justify-center w-8 h-8 rounded-full">
        <SearchBar />
      </div>
    </div>
  )
}