export const formatDate = (date: any) => {
  const _date = new Date(date * 1000)
  return _date.toDateString().substr(3, _date.toDateString().length - 1)
}

export const toTwoDigits = (time: any) => ('0' + time).slice(-2)

export const getTime = (time: any) => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = Math.floor((time % 3600) % 60)

  const hDisplay = h > 0 ? toTwoDigits(h) + 'h' : ''
  const mDisplay = h > 0 || m > 0 ? toTwoDigits(m) + 'm' : ''
  const sDisplay = h > 0 || m > 0 || s > 0 ? toTwoDigits(s) + 's' : ''
  return hDisplay + mDisplay + sDisplay || '00s'
}

export const getTimeWithoutSeconds = (time: any) => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)

  const hDisplay = h > 0 ? toTwoDigits(h) + 'h' : ''
  const mDisplay = h > 0 || m > 0 ? toTwoDigits(m) + 'm' : ''
  return hDisplay + mDisplay || '00m'
}
