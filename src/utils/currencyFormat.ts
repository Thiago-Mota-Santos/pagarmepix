export const currencyFormat = (str: string) => {
  if (str === '') str = '0'
  if (!isNaN(parseInt(str.charAt(0)))) {
    // str = str.replace('R$', '')
    str = str.slice(1, str.length) + str.charAt(0)
  }
  const value = parseInt(str.replace(/[^\d]+/gi, ''), 10) / 100
  const valueFixed = value.toFixed(2)
  const valueNumber = parseFloat(valueFixed)

  const getCurrencyFormat = () => {
    if (!value) {
      return ''
    }

    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
      .format(valueNumber)
      .replace('R$ ', '')
  }

  return getCurrencyFormat()
}
