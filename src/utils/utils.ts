export const getYears = (yearFrom: number, yearTo: number, currentDecade: number) => {
  const res: string[] = []
  for (let i = yearFrom; i >= yearTo; i--) {
    res.push(i.toString())
  }

  for (let i = currentDecade; i >= 1890; i = i - 10) {
    res.push(`${i}-${i + 9}`)
  }

  return res
}
