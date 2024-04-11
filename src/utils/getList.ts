export const getList = <T>(page: number, list: T[], pageSize: number): T[] => {
  const startSlice = page * pageSize - pageSize
  const endSlice = page * pageSize

  return list.slice(startSlice, endSlice)
}
