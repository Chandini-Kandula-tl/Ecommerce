import { useRef, useState } from "react";
import { Button } from "./Button";
const DragDrop = () => {
  const [file, setFile] = useState();
  const handleSubmit = () => {};
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-[100px]">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          ref={inputRef}
          className="hidden"
          //   onChange={(e) => setFile(e.target.files)}
        />
      </form>
      <Button buttonName="Upload" onClick={() => inputRef.current?.click()} />
    </div>
  );
};

export default DragDrop;
