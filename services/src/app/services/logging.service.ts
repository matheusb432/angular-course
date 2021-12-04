// TODO ? since this service doesn't need to inject any other services in it, it doesn't need the @Injectable decorator
// ? however, it is good practice to always include @Injectable for angular services to avoid unnecessary issues
export class LoggingService {
  logStatusChange(status: string) {
    console.log(`A server status changed, new status: ${status}`);
  }
}
