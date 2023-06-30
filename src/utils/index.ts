export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return date.toLocaleString('en-US', options)
}
