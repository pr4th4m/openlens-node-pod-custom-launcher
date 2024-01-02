import { Main } from "@k8slens/extensions";
import { CustomLauncherPreferencesStore } from "./src/custom-launcher-preference-store";

export default class CustomLauncherMainExtension extends Main.LensExtension {
  async onActivate() {
    await CustomLauncherPreferencesStore.createInstance().loadExtension(this);
  }
}
