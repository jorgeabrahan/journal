export const getEnvironments = () => {
  const env = import.meta.env
  return {
    ...env
  }
}
