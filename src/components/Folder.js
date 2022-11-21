import { useState } from "react";

const Folder = ({ expolerer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });
  // console.log("expolerer: ", expolerer);
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      console.log("data: ", event.target.value);
      handleInsertNode(expolerer.id, event.target.value, showInput.isFolder);
      setShowInput({
        ...showInput,
        visible: false
      });
    }
  };
  const handleOnBlur = () => {
    console.log("blur");

    setShowInput({
      ...showInput,
      visible: false
    });
  };

  if (expolerer.isFolder) {
    return (
      <div style={{ marginTop: "5px" }}>
        <div
          className="folder"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span>🗂 {expolerer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div>
              <sopan>{showInput.isFolder ? "🗂" : "📄"}</sopan>
              <input
                type="text"
                autoFocus
                onKeyDown={handleKeyDown}
                onBlur={handleOnBlur}
              />
            </div>
          )}

          {expolerer?.items?.map((exp) => (
            <Folder
              key={exp.name}
              expolerer={exp}
              handleInsertNode={handleInsertNode}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {expolerer.name}</span>;
  }
};

export default Folder;
