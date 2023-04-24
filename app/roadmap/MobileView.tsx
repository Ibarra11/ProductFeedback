"use client";

import Select from "../components/Select";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { formatStatus } from "../utils";

function MobileView({ status }: { status: Status }) {
  const router = useRouter();
  return (
    <div className="absolute right-4 top-4">
      <Select
        options={["Planned", "Live", "In_Progress", "Suggestion"]}
        selectText="Filter By:"
        selectTextColor="text-brand-american_blue"
        className=" bg-white"
        arrowColor="american_blue"
        handleChange={(val) =>
          router.push(`/roadmap?status=${val.toLowerCase()}`)
        }
        currentValue={formatStatus(status)}
      />
    </div>
  );
}

export default MobileView;
