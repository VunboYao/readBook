import { onBeforeRouteLeave, useRoute } from "vue-router"
import { useQueryStore } from "@/store/useQueryStore"
export const useRouterFrom = () => {
  const query = useQueryStore()
  const route = useRoute()
  console.log(route, query.from)
}
