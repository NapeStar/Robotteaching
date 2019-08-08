export abstract class SuperJob {
  name: string;
  activationTimeout: number;

  constructor(name: string) {
    this.name = name;
    this.activationTimeout = 0;
  }

}
