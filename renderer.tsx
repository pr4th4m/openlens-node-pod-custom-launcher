import React from "react";
import { Renderer } from "@k8slens/extensions";
import {
  CustomLauncherPrefixHint,
  CustomLauncherPrefixInput,
  CustomLauncherSuffixHint,
  CustomLauncherSuffixInput,
} from "./src/custom-launcher-preference";
import { CustomLauncherPreferencesStore } from "./src/custom-launcher-preference-store";
import { PodLogsMenu } from "./src/log-menu"
import { PodShellMenu } from "./src/shell-menu"
import { PodAttachMenu } from "./src/attach-menu"

export default class CustomLauncherRenderer extends Renderer.LensExtension {

  async onActivate() {
    await CustomLauncherPreferencesStore.createInstance().loadExtension(this);
  }

  appPreferences = [
    {
      title: "Prefix command",
      components: {
        Input: () => <CustomLauncherPrefixInput />,
        Hint: () => <CustomLauncherPrefixHint/>
      }
    },
    {
      title: "Suffix command",
      components: {
        Input: () => <CustomLauncherSuffixInput />,
        Hint: () => <CustomLauncherSuffixHint/>
      }
    },
  ];

  kubeObjectMenuItems = [
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Renderer.K8sApi.Pod>) => <PodAttachMenu {...props} />,
      },
    },
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Renderer.K8sApi.Pod>) => <PodShellMenu {...props} />,
      },
    },
    {
      kind: "Pod",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Renderer.K8sApi.Pod>) => <PodLogsMenu {...props} />,
      },
    },
  ];
}
