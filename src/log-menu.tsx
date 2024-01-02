import * as child from "child_process";
import React from "react";
import { Renderer, Common } from "@k8slens/extensions";
import { CustomLauncherPreferencesStore } from "./preference-store";

type Pod = Renderer.K8sApi.Pod;

const {
  Component: {
    MenuItem,
    Icon,
    SubMenu,
    StatusBrick,
  },
  Navigation,
} = Renderer;
const {
  Util,
  App,
} = Common;

export class PodLogsMenu extends React.Component<Renderer.Component.KubeObjectMenuProps<Pod>> {
  async execShell() {
    const { object: pod } = this.props;

    const kubectlPath = App.Preferences.getKubectlPath() || "kubectl";
    const kubectlCommandParts = [
      kubectlPath,
      "logs",
      "-n", pod.getNs(),
      "-f", pod.getName(),
    ];

    let kubectlCommand = kubectlCommandParts.join(" ")

    let command = `${CustomLauncherPreferencesStore.getInstance().prefix} ${kubectlCommand} ${CustomLauncherPreferencesStore.getInstance().suffix}`
    console.log(command)
    const childProcess = child.exec(command, (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
    });

    childProcess.on('exit', (code) => {
      console.log(`Child process exited with code ${code}`);
    });

    Navigation.hideDetails();
  }

  render() {
    const { object, toolbar } = this.props;
    const containers = object.getRunningContainers();

    if (!containers.length) return null;

    return (
      <MenuItem onClick={Util.prevDefault(() => this.execShell())}>
        <Icon
          material="list"
          interactive={toolbar}
          tooltip={toolbar && "Custom Launcher Logs"}
        />
        <span className="title">Custom Launcher Logs</span>
        {containers.length > 1 && (
          <>
            <Icon className="arrow" material="keyboard_arrow_right" />
            <SubMenu>
              {
                containers.map(container => {
                  const { name } = container;
                  return (
                    <MenuItem
                      key={name}
                      onClick={Util.prevDefault(() => this.execShell())}
                      className="flex align-center"
                    >
                      <StatusBrick />
                      <span>{name}</span>
                    </MenuItem>
                  );
                })
              }
            </SubMenu>
          </>
        )}
      </MenuItem>
    );
  }
}
