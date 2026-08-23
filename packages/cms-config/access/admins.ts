import { checkRole } from '../collections/Users/checkRole'

export const admins = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}
