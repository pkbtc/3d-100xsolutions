import type { Metadata } from "next";
import UseCasesPage from "./UseCasesPage";

export const metadata: Metadata = {
  title: "Real-World 3D Use Cases | 100xSolutions",
  description:
    "See how real businesses use interactive 3D web experiences — product configurators, floor plan explorers, restaurant menus, car showrooms, and more. Live demos included.",
  keywords:
    "3D product configurator, interactive floor plan, 3D restaurant menu, car configurator, virtual hotel tour, gym booking, 3D e-commerce",
};

export default function Page() {
  return <UseCasesPage />;
}
