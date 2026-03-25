export class Id {
  private readonly value: string;

  constructor(value: string) {
    const normalized = value?.trim();

    if (!normalized) {
      throw new Error("Id cannot be empty");
    }

    this.value = normalized;
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Id): boolean {
    return this.value === other.getValue();
  }

  public toString(): string {
    return this.value;
  }
}
