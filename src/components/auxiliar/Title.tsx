type TitlePops = {
    text: string;
}

export default function Title({text} : TitlePops) {
  return (
    <h1 className=" font-bold text-blue-800 text-2xl m-7"> {text} </h1>
  )
}
