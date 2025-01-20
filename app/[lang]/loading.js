import { Spinner } from "@heroui/react";
// import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center dark text-foreground bg-background">
      {/* <HashLoader color="#F31260" size={70} /> */}
      <div className="text-center" style={{ transform: "scale(2)" }}>
        <Spinner color="danger" size="lg" />
      </div>
    </div>
  );
};

export default Loading;
