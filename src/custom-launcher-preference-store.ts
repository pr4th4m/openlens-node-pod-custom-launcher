import { Common } from "@k8slens/extensions";
import { observable, makeObservable } from "mobx";

export type CustomLauncherPreferencesModel = {
  prefix?: string;
  suffix?: string;
};

export class CustomLauncherPreferencesStore extends Common.Store.ExtensionStore<CustomLauncherPreferencesModel> {

  @observable prefix: string;
  @observable suffix: string;

  constructor() {
    super({
      configName: "custom-launcher-preferences-store",
      defaults: {
        prefix: "",
        suffix: ""
      }
    });
    makeObservable(this);
  }

  fromStore({ prefix, suffix }: CustomLauncherPreferencesModel): void {
    this.prefix = prefix;
    this.suffix = suffix;
  }

  toJSON(): CustomLauncherPreferencesModel {
    return {
      prefix: this.prefix,
      suffix: this.suffix
    };
  }
}
