export interface Encrypt {
  encrypt(value: string, salt?: number): Promise<string>
  compare(value: string, valueHashed: string): Promise<boolean>
}
