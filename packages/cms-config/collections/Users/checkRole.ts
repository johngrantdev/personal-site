export const checkRole = (
  allRoles: ('admin' | 'user')[] = [],
  user?: { roles?: ('admin' | 'user')[] | null },
): boolean => {
  if (user) {
    if (
      allRoles.some(role => {
        return user?.roles?.some(individualRole => {
          return individualRole === role
        })
      })
    )
      return true
  }

  return false
}
