export default function (time) {
  const date = time
  const newDate = new Date(date)
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()
  const min = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()
  return `${month}/${day} ${hour} : ${min}`
}
