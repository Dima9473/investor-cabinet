import { AccountStore } from "./accounts";
import { BankStore } from "./bank";
import { Operations } from "./operations";
import { User } from "./user";

export type RootStore = User & Operations & AccountStore & BankStore;
