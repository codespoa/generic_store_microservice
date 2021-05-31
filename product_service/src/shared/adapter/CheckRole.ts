export interface CheckRole {
  verify(role: string, possibilitiesRoles: string[]): boolean
}
