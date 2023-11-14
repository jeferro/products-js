import { Command, Auth, Username } from 'jf-architecture'

export class SignIn extends Command {
    
  constructor(
    auth: Auth,
    readonly username: Username,
    readonly plainPassword: string
  ) {
    super(auth)
  }

  get privateAttributeNames(): string[] {
    return [
      'plainPassword'
    ]
  }
}
