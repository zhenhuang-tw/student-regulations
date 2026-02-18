/**
 * 民國日期轉換工具
 * 將 ISO 8601 (yyyy-mm-dd) 轉換為 民國Y年M月D日
 */
export const useRocDate = () => {
  /**
   * 轉換函式
   * @param isoDate - 格式為 yyyy-mm-dd 的字串
   * @returns 格式為 民國Y年M月D日 的字串
   */
  const toRocDate = (isoDate: string | undefined | null): string => {
    // 1. 基本防呆：若無資料則回傳空字串
    if (!isoDate) return ''

    // 2. 分割字串：確保格式為 yyyy-mm-dd
    const parts = isoDate.split('-')
    if (parts.length !== 3) {
      // 若格式不符，回傳原始資料避免報錯
      return isoDate
    }

    // 3. 解析數字：parseInt 第二個參數 10 代表十進位
    // parseInt 會自動忽略開頭的 0 (例如 '02' -> 2)
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)

    // 4. 計算民國年
    const rocYear = year - 1911

    // 5. 組合字串
    // rocYear 預設為正數（不適用民國前）
    return `${rocYear}年${month}月${day}日`
  }

  return {
    toRocDate
  }
}