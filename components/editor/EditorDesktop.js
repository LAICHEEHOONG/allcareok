"use client";
import { ScrollShadow, Button } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import PhotoCard from "./PhotoCard";
import TitleCard from "./TitleCard";
import ServiceCard from "./ServiceCard";
import AreaCard from "./AreaCard";
import ContactCard from "./ContactCard";
import DescriptionCard from "./DescriptionCard";
import MapCard from "./MapCard";
import YoutubeCard from "./YoutubeCard";

export default function EditorDesktop() {
  const router = useRouter();
  return (
    <div className="flex h-screen">
      {/* Left Section */}

      <div className="w-[350x] flex flex-col m-3">
        {/* <p className="text-white text-2xl">Left 50%</p> */}
        <div className="flex flex-col">
          <div className="flex">
            <Button
              isIconOnly
              radius="full"
              color="default"
              variant="flat"
              aria-label="Like"
              onPress={() => {
                router.push("/");
              }}
            >
              <ArrowBackIcon />
            </Button>
            <div className="text-3xl font-semibold ml-5 mb-3">
              Listing editor
            </div>
          </div>
          <div>
            <ScrollShadow className="h-[85vh]" hideScrollBar>
              <PhotoCard />
              <TitleCard />
              <ServiceCard />
              <AreaCard />
              <ContactCard />
              <DescriptionCard />
              <MapCard />
              <YoutubeCard />
            </ScrollShadow>
          </div>
          {/* <Button
            isIconOnly
            radius="full"
            color="default"
            variant="flat"
            aria-label="Like"
            onPress={() => {
              router.push("/");
            }}
          >
            <ArrowBackIcon />
          </Button>
          <div>
            <div className="text-3xl font-semibold ml-5 mb-3">Listing editor</div>
            <ScrollShadow className="h-[80vh] w-full">
              <PhotoCard />
              <TitleCard />
              <ServiceCard />
            </ScrollShadow>
          </div> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full bg-green-500 flex items-center justify-center">
        <p className="text-white text-2xl">Right 50%</p>
      </div>
    </div>
  );
}

const Content = () => (
  <div>
    <p>
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
      deserunt aute id consequat veniam incididunt duis in sint irure nisi.
      Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse
      quis.
    </p>
    {/* <p>
      Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna
      aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor
      eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod
      Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
      consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
      deserunt nostrud ad veniam.
    </p>
    <p>
      Est velit labore esse esse cupidatat. Velit id elit consequat minim.
      Mollit enim excepteur ea laboris adipisicing aliqua proident occaecat do
      do adipisicing adipisicing ut fugiat. Consequat pariatur ullamco aute sunt
      esse. Irure excepteur eu non eiusmod. Commodo commodo et ad ipsum elit
      esse pariatur sit adipisicing sunt excepteur enim.
    </p>
    <p>
      Incididunt duis commodo mollit esse veniam non exercitation dolore
      occaecat ea nostrud laboris. Adipisicing occaecat fugiat fugiat irure
      fugiat in magna non consectetur proident fugiat. Commodo magna et aliqua
      elit sint cupidatat. Sint aute ullamco enim cillum anim ex. Est eiusmod
      commodo occaecat consequat laboris est do duis. Enim incididunt non culpa
      velit quis aute in elit magna ullamco in consequat ex proident.
    </p>
    <p>
      Dolore incididunt mollit fugiat pariatur cupidatat ipsum laborum cillum.
      Commodo consequat velit cupidatat duis ex nisi non aliquip ad ea pariatur
      do culpa. Eiusmod proident adipisicing tempor tempor qui pariatur
      voluptate dolor do ea commodo. Veniam voluptate cupidatat ex nisi do
      ullamco in quis elit.
    </p>
    <p>
      Cillum proident veniam cupidatat pariatur laborum tempor cupidatat anim
      eiusmod id nostrud pariatur tempor reprehenderit. Do esse ullamco laboris
      sunt proident est ea exercitation cupidatat. Do Lorem eiusmod aliqua culpa
      ullamco consectetur veniam voluptate cillum. Dolor consequat cillum tempor
      laboris mollit laborum reprehenderit reprehenderit veniam aliqua deserunt
      cupidatat consequat id.
    </p>
    <p>
      Est id tempor excepteur enim labore sint aliquip consequat duis minim
      tempor proident. Dolor incididunt aliquip minim elit ea. Exercitation non
      officia eu id.
    </p>
    <p>
      Ipsum ipsum consequat incididunt do aliquip pariatur nostrud. Qui ut sint
      culpa labore Lorem. Magna deserunt aliquip aute duis consectetur magna
      amet anim. Magna fugiat est nostrud veniam. Officia duis ea sunt aliqua.
    </p>
    <p>
      Ipsum minim officia aute anim minim aute aliquip aute non in non. Ipsum
      aliquip proident ut dolore eiusmod ad fugiat fugiat ut ex. Ea velit Lorem
      ut et commodo nulla voluptate veniam ea et aliqua esse id. Pariatur dolor
      et adipisicing ea mollit. Ipsum non irure proident ipsum dolore aliquip
      adipisicing laborum irure dolor nostrud occaecat exercitation.
    </p>
    <p>
      Culpa qui reprehenderit nostrud aliqua reprehenderit et ullamco proident
      nisi commodo non ut. Ipsum quis irure nisi sint do qui velit nisi. Sunt
      voluptate eu reprehenderit tempor consequat eiusmod Lorem irure velit duis
      Lorem laboris ipsum cupidatat. Pariatur excepteur tempor veniam cillum et
      nulla ipsum veniam ad ipsum ad aute. Est officia duis pariatur ad eiusmod
      id voluptate.
    </p> */}
  </div>
);
