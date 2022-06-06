export default function timeChange() {
  const t = (Date.now() + '').substring(0, 10);
  return {
    timestamp: t,
  }
}