import { useState } from "react";
import Folder from "./components/Folder";
import expolerer from "./data/folderData";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";

export default function App() {
  const [explorerData, setExplorerData] = useState(expolerer);
  const { insertNode } = useTraverseTree();
  const handleInsertNode = (id, value, isFolder) => {
    let data = insertNode(explorerData, id, value, isFolder);
    setExplorerData(data);
  };
  return (
    <div className="App">
      <h2>Folder Structure</h2>
      <Folder expolerer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}
