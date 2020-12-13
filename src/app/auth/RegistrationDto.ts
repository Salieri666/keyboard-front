export class RegistrationDto {
  username: string;
  password: string;
  roles: string;

  constructor(username: string, password: string, roles: string) {
    this.username = username;
    this.password = password;
    this.roles = roles;
  }
}
