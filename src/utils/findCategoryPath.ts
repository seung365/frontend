import { BOARD_CATEGORY_TABS } from '../constant'

const findCategoryPath = (categoryId: number) => {
  const category = BOARD_CATEGORY_TABS.find((item) => item.id === categoryId)!

  return category.path
}

export default findCategoryPath
