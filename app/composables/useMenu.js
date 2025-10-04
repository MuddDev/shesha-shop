export const useMenu = (name = 'mainMenu') => {
  return import(`@/components/navigation/${name}.json`)
}
