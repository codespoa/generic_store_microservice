export default interface Service {
  execute(payload: any): Promise<any | undefined>
}
