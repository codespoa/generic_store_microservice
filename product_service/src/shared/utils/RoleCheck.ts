import { CheckRole } from '@shared/adapter'

export class RoleCheck implements CheckRole {
  verify(role: string, possibilitiesRoles: string[]): boolean {
    const verify = possibilitiesRoles.includes(role)

    return verify
  }
}
