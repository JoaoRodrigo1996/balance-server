import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ClientProps {
  name: string;
  email: string;
  password: string;
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: ClientProps, id?: UniqueEntityId) {
    const student = new Client(props, id);

    return student;
  }
}
