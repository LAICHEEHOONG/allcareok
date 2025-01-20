"use client";

import { Card, CardBody, CardFooter, Image} from "@heroui/react";

export default function Fruits() {
  const list = [
    {
      title: "Orange",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3Dg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://images.unsplash.com/photo-1453487021979-5b739b2849f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      price: "$12.20",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[340px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
