import { ClipLoader } from "react-spinners";

interface Iloader {
  type?: "sm" | "md" | "lg" | "xl";
}
const Loader = (props: Iloader) => {
  const { type = "md" } = props;

  if (type === "sm") {
    return <ClipLoader size={40} className="text-primary" />;
  }
  return (
    <div
      className={`flex justify-center items-center w-full bg-background text-primary ${
        type === "xl" ? "h-screen" : type === "lg" ? "flex-grow" : "h-40"
      }`}
    >
      <ClipLoader size={40} />
    </div>
  );
};

export default Loader;
