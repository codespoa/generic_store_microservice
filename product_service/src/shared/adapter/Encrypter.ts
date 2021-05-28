import bcrypt from 'bcrypt'
import { Encrypt } from '@shared/protocols/Encrypt'

export class Encrypter implements Encrypt {
  async encrypt(value: string, salt?: number): Promise<string> {
    const hash = await bcrypt.hash(value, salt)
    return hash
  }

  async compare(value: string, valueHashed: string): Promise<boolean> {
    const passwordMatched = await bcrypt.compare(value, valueHashed)
    return passwordMatched
  }
}
