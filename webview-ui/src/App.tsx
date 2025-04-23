import { Icon } from "@iconify/react";
import { VscodeButton, VscodeIcon } from "@vscode-elements/react-elements";
function App() {
  return (
    <>
      <Icon icon="codicon:home" />
      <Icon icon="mdi:react" />
      <VscodeButton>Click 1</VscodeButton>
      <VscodeIcon name="mdi:react" />
    </>
  );
}

export default App;
