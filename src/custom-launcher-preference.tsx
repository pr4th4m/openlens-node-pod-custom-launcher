import { Renderer } from "@k8slens/extensions";
import { observer } from "mobx-react";
import React from "react";
import { CustomLauncherPreferencesStore } from "./custom-launcher-preference-store";

const {
  Component: {
    Input,
  },
} = Renderer;

@observer
export class CustomLauncherPrefixInput extends React.Component {
  render() {
    return (
      <Input
        value={CustomLauncherPreferencesStore.getInstance().prefix}
        theme="round-black"
        placeholder="prefix"
        onChange={v => { CustomLauncherPreferencesStore.getInstance().prefix = v; }}
      />
    );
  }
}

export class CustomLauncherPrefixHint extends React.Component {
  render() {
    return (
      <span>this command will be prefixed to kubectl</span>
    );
  }
}

@observer
export class CustomLauncherSuffixInput extends React.Component {
  render() {
    return (
      <Input
        value={CustomLauncherPreferencesStore.getInstance().suffix}
        theme="round-black"
        placeholder="suffix"
        onChange={v => { CustomLauncherPreferencesStore.getInstance().suffix = v; }}
      />
    );
  }
}

export class CustomLauncherSuffixHint extends React.Component {
  render() {
    return (
      <span>this command will be suffixed to kubectl</span>
    );
  }
}
