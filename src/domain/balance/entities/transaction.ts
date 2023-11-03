import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface TransactionProps {
  clientId: UniqueEntityId;
  title: string;
  amount: number;
  type: "INCOME" | "OUTCOME";
  createdAt: Date;
}

export class Transaction extends Entity<TransactionProps> {
  get clientId() {
    return this.props.clientId;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get amount() {
    return this.props.amount;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  get type() {
    return this.props.type;
  }

  set type(type: "INCOME" | "OUTCOME") {
    this.props.type = type;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<TransactionProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    const transaction = new Transaction(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return transaction;
  }
}
