import { SyncLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";

export const LogoSpinner = ({ text }) => {
  return (
    <>
      {text && (
        <Fade direction="up" cascade>
          <p
            className={`font-bold text-inherit ml-2 text-2xl `}
            style={{ color: "#f31260" }}
          >
            allcareok
          </p>
        </Fade>
      )}

      <SyncLoader color="#F31260" margin={4} speedMultiplier={0.9} size={25} />
    </>
  );
};
