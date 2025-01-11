"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSessionId } from "@/lib/action/adAction";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Spinner } from "@nextui-org/react";

export default function PaymentSuccess() {
  const paymentInfo = {
    processing: {
      title: "Processing Your Payment",
      content:
        "Your payment is being processed. Please do not close or refresh this page to ensure a smooth transaction. This may take a few moments.",
      loading: true,
    },
    successful: {
      title: "Payment Successful",
      content:
        "Thank you for your payment! Your transaction has been completed successfully. You may now close this page or continue browsing.",
      loading: false,
    },
  };
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [info, setInfo] = useState(paymentInfo.processing);

  useEffect(() => {
    const getCheckoutSession = async (sessionId) => {
      try {
        const ans = await getSessionId({ sessionId });
        if (ans) {
          setInfo(paymentInfo.successful);
        }

        console.log(ans);
      } catch (error) {
        console.log(error);
      }
    };
    getCheckoutSession(sessionId);
  }, [sessionId]);

  return (
    <div className="flex flex-col justify-center items-center  p-2 m-4 h-screen">
      <div className="m-2">
        {info.loading ? (
          <Spinner size="lg" />
        ) : (
          <TaskAltIcon style={{ fontSize: "69px", color: "#44c678" }} />
        )}
        {/* <Spinner color="danger" labelColor="danger" size="lg" /> */}
        {/* <TaskAltIcon style={{ fontSize: '69px', color: '#44c678' }} /> */}
      </div>
      <div className="font-bold text-2xl m-3 tracking-wide">{info.title}</div>
      <div className="text-default-400 tracking-wide text-center w-full max-w-[600px]">
        {info.content}
      </div>
    </div>
  );
}
