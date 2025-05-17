import { getPublisherPurchaseLabsById } from "@/app/actions/lab.action";
import LabsPlayers from "@/components/user/labs/LabsPlayers";
import React from "react";

interface PageProps {
  params: Promise<{ labsId: string }>;
}

async function LabePage({ params }: PageProps) {
  const id = (await params).labsId;
  let sectionDetail: any | null;

  try {
    sectionDetail = await getPublisherPurchaseLabsById(id);
  } catch (error) {
    sectionDetail = null;
  }

  return (
    <div>
      <LabsPlayers initialLabData={sectionDetail} labId={id} />
    </div>
  );
}

export default LabePage;
