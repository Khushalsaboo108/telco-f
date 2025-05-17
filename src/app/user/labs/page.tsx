import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getPublisherPurchaseLabs } from "@/app/actions/lab.action";
import { ILabApiResponse } from "@/types/lab";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LabCard from "@/components/user/labs/LabCard";

export default async function LabsDashboard() {
  let labs: ILabApiResponse | null;

  try {
    labs = await getPublisherPurchaseLabs();
  } catch (error) {
    labs = null;
  }

  return (
    <div className="flex flex-col justify-start gap-5 my-3">
      <div className=" flex items-center justify-between ">
        <h2 className="  text-commonHeader font-bold ">My Labs</h2>
        <div>
          {labs?.success && (
            <Link href={"/labs"}>
              <Button> Purchase More labs </Button>
            </Link>
          )}
        </div>
      </div>
      {labs?.success ? (
        <LabCard labsPosts={labs} />
      ) : (
        <div className=" flex flex-col font-bold text-[25px] gap-5 h-[75vh] justify-center items-center">
          Please purchase the Labs
          <Link href={"/labs"}>
            <Button> Purchase Labs </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
