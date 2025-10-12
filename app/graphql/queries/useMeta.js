export const useMeta = product => {
  /**
   * Повертає value метаполя по key
   * якщо його нема або product/metafields = null → ''
   */
  const getMeta = key => {
    if (!product || !Array.isArray(product.metafields)) return ''
    const found = product.metafields.find(m => m && m.key === key && typeof m.value === 'string')
    return found ? found.value : ''
  }

  return { getMeta }
}
