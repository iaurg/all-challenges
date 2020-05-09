export const orderBy = (array, value, sort) => {
  if (sort === 'asc') {
    const ordered = array.sort((a, b) => a[value].localeCompare(b[value]) - b[value].localeCompare(a[value]))
    return ordered
  } else if (sort === 'desc') {
    const ordered = array.sort((a, b) => b[value].localeCompare(a[value]) - a[value].localeCompare(b[value]))
    return ordered
  }
}
