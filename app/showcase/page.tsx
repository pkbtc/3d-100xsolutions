import type { Metadata } from "next";
import ShowcasePage from "./ShowcasePage";

export const metadata: Metadata = {
  title: "3D Showcase Gallery | 100xSolutions",
  description: "Explore our library of interactive 3D web experiences — buildings, products, data visualisations, and more.",
};

export default function Page() {
  return <ShowcasePage />;
}
