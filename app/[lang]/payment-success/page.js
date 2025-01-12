"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSessionId } from "@/lib/action/adAction";
import { useRouter } from "next/navigation";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Spinner, Button } from "@nextui-org/react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
    failed: {
      title: "Payment Failed",
      content:
        "We encountered an issue processing your payment. Please check your payment details and try again. If the issue persists, contact our support team at allcareok@gmail.com for assistance.",
      loading: false,
    },
  };
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [info, setInfo] = useState(paymentInfo.processing);
  const router = useRouter();

  useEffect(() => {
    const getCheckoutSession = async (sessionId) => {
      try {
        const ans = await getSessionId({ sessionId });
        console.log(ans);

        if (ans.success) {
          setInfo(paymentInfo.successful);
          console.log("payment success");
        } else {
          setInfo(paymentInfo.failed);
          console.log("payment failed");
          // router.push("/");
        }
      } catch (error) {
        console.log(error);
        setInfo(paymentInfo.failed);

        // router.push("/");
      }
    };
    getCheckoutSession(sessionId);
  }, [sessionId]);

  return (
    <div className="flex flex-col justify-center items-center  p-2 m-4 h-screen">
      <div className="m-2">
        {info.loading && <Spinner size="lg" />}
        {info.title === "Payment Successful" && (
          <TaskAltIcon style={{ fontSize: "69px", color: "#44c678" }} />
        )}
        {info.title === "Payment Failed" && (
          <ErrorOutlineIcon style={{ fontSize: "69px", color: "#f31260" }} />
        )}
        {/* {info.loading ? (
          <Spinner size="lg" />
        ) : (
          <TaskAltIcon style={{ fontSize: "69px", color: "#44c678" }} />
        )} */}
        {/* <Spinner color="danger" labelColor="danger" size="lg" /> */}
        {/* <TaskAltIcon style={{ fontSize: '69px', color: '#44c678' }} /> */}
      </div>
      <div className="font-bold text-2xl m-3 tracking-wide">{info.title}</div>
      <div className="text-default-400 tracking-wide text-center w-full max-w-[600px]">
        {info.content}
      </div>

      <div className=" w-full flex justify-center items-center m-6">
        <Button
          radius="full"
          size="lg"
          color="primary"
          isDisabled={info.loading}
          // isLoading={info.loading}
          onPress={() => {
            router.push("/");
          }}
          // onPress={handleSave}
        >
          Home Page
        </Button>
      </div>
      {/* {!info.loading && (
        <div className=" w-full flex justify-center items-center m-6">
          <Button
            radius="full"
            size="lg"
            color="primary"
            isLoading={info.loading}
            onPress={() => {
              router.push("/");
            }}
            // onPress={handleSave}
          >
            Home Page
          </Button>
        </div>
      )} */}
    </div>
  );
}
