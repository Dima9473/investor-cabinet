import { AccountStore } from "./accounts";
import { Operations } from "./operations";
import { User } from "./user";

export type RootStore = User & Operations & AccountStore;
