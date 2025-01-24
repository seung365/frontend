import { BOARD_CATEGORY_TABS } from '../constant'

const findCategoryId = (pathname: string) => {
  const category =
    pathname === '/board'
      ? null
      : BOARD_CATEGORY_TABS.find((item) => item.path === pathname)!

  return category?.id
}

export default findCategoryId
