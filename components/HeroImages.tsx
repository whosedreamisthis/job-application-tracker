"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroImages = () => {
  const [active, setActive] = useState("organize"); //organize,hired,boards
  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            <Button
              onClick={() => {
                setActive("organize");
              }}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${active === "organize" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Organize Applications
            </Button>
            <Button
              onClick={() => {
                setActive("hired");
              }}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${active === "hired" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Get Hired
            </Button>
            <Button
              onClick={() => {
                setActive("boards");
              }}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${active === "boards" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Manage Boards
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-10 relative mx-auto max-w-5xl overflow-hidden">
          {active === "organize" && (
            <Image
              src="/hero-images/hero1.png"
              alt="Organize Applications Image"
              width={1200}
              height={800}
              className="shadow-xl rounded-lg border border-gray-200"
            />
          )}
          {active === "hired" && (
            <Image
              src="/hero-images/hero2.png"
              alt="Get Hired Image"
              width={1200}
              height={800}
              className="shadow-xl rounded-lg border border-gray-200"
            />
          )}

          {active === "boards" && (
            <Image
              src="/hero-images/hero3.png"
              alt="Manage Boards Image"
              width={1200}
              height={800}
              className="shadow-xl rounded-lg border border-gray-200"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroImages;
