"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminKey } from "@/lib/action/userAction";
import { useSelector } from "react-redux";
import AdminPhoto from "@/components/AdminDashboard/AdminPhoto";
import AdminReview from "@/components/AdminDashboard/AdminReview";
import AdminReport from "@/components/AdminDashboard/AdminReport";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";

export default function OneNineNineZero() {
  const router = useRouter();
  const role = useSelector((state) => state.auth?.role);
  const _id = useSelector((state) => state.auth?._id);
  const [code, setCode] = useState({ left: 0, right: 0 });
  const [display, setDisplay] = useState(true);
  const [component, setComponent] = useState("");

  useEffect(() => {
    if (role !== "admin") {
      router.push("/");
    }

    const adminKey_ = async () => {
      try {
        const res = await adminKey({ _id });
        if (!res.pass) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    adminKey_();
  }, []);

  return (
    <div className="p-5">
      {display && (
        <div className="flex justify-center items-center h-screen text-9xl gap-5">
          <div
            onClick={() => {
              setCode((pre) => ({ ...pre, left: pre.left + 1 }));
            }}
          >
            5
          </div>
          <div
            onClick={() => {
              if (code.left === 5 && code.right === 3) {
                setDisplay(false);
              } else {
                router.push("/");
              }
            }}
          >
            0
          </div>
          <div
            onClick={() => {
              setCode((pre) => ({ ...pre, right: pre.right + 1 }));
            }}
          >
            3
          </div>
        </div>
      )}
      {!display && (
        <div className="flex w-full flex-col h-screen">
          <Tabs aria-label="Options">
            <Tab key="photos" title="Photos">
              <Card>
                <CardBody>
                  <AdminPhoto />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="review" title="Review">
              <Card>
                <CardBody>
                  <AdminReview />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="report" title="Report">
              <Card>
                <CardBody>
                  <AdminReport />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}
