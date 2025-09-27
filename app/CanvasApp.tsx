
import { useState } from "react";

interface MyButtonProps{
  count: number;
  onClick: () => void;
}

function MyButton({count,onClick}:MyButtonProps){
  return (
    <button className="bg-amber-100" onClick={onClick}>第一个按钮 Clicked {count} times </button>
  );
}


export default function CanvasApp(){
  const [count,setcount] = useState(0)

  function handleClick(){
    setcount(count+1)
  }

  return(
    <div>
      <h1>欢迎来到我的应用</h1>
      <MyButton count={count} onClick={handleClick}></MyButton>
      <MyButton count={count} onClick={handleClick}></MyButton>
    </div>
  );
}