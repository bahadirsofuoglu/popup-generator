"use client";
import React from "react";
import Popup from "@/components/Popup";
import SideSettings from "@/components/SideSettings";
import { FieldSettingsProvider } from "../context/fieldSettingsContext"; // İlgili path'e göre güncelleyin

export default function Home() {
  return (
    <FieldSettingsProvider>
      <main className="text-gray-600 body-font relative container px-1 py-24 mx-auto flex sm:flex-nowrap flex-wrap h-full">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-center justify-items-start relative">
          <Popup />
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 overflow-auto">
          <SideSettings />
        </div>
      </main>
    </FieldSettingsProvider>
  );
}
