import { memo } from 'react'

const colsMap: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
}

type Cols = keyof typeof colsMap

type HomeSectionSkeletonProps = {
  cols?: Cols
  count?: number
  showTabs?: boolean
  /** 横向「向往」区块占位 */
  longfor?: boolean
}

/** 首页区块骨架：与真实 section 高度接近，避免接口返回前 footer 被顶飞 */
export const HomeSectionSkeleton = memo(
  ({ cols = 4, count = 8, showTabs = false, longfor = false }: HomeSectionSkeletonProps) => {
    if (longfor) {
      return (
        <div className="mt-7.5 animate-pulse" aria-hidden>
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-72 rounded bg-gray-200" />
          <div className="mt-5 flex gap-2 overflow-hidden">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-[20%] shrink-0 p-2">
                <div className="aspect-3/4 rounded-sm bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="animate-pulse" aria-hidden>
        <div className="mt-7.5">
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-72 rounded bg-gray-200" />
        </div>
        {showTabs && <div className="mt-5 h-9 w-full rounded bg-gray-100" />}
        <div className={`mt-5 grid gap-4 ${colsMap[cols]}`}>
          {Array.from({ length: count }, (_, i) => (
            <div key={i}>
              <div className="aspect-square rounded-xl bg-gray-200" />
              <div className="mt-2.5 h-3 w-1/2 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="mt-2.5 h-6 w-40 rounded bg-gray-100" />
      </div>
    )
  },
)
