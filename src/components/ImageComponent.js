import { useCloudinary } from "@/utils";
import Loader from "./Loader";
import person from "../../public/icons/person.png";
import Image from "next/image";

export default function ImageComponent({ onChange, value, error }) {
  const { loading: widgetLoading, launchWidget } = useCloudinary(onChange);

  return (
    <div className=" flex flex-col items-center">
      <div className=" w-20 h-20 rounded-full bg-slate-50 bg-slate-200 justify-center flex items-center">
        {!value ? (
          <>
            <Image
              src="/icons/person.svg"
              alt="nav-logo"
              // layout="fill"
              objectFit="contain"
              height={30}
              width={30}
            />
          </>
        ) : (
          <img
            src={value}
            alt=""
            className=" w-20 h-20 rounded-full bg-slate-50"
          />
        )}
      </div>

      {widgetLoading ? (
        <Loader dotClassess="bg-[#F68716] w-2 h-2 " />
      ) : (
        <div
          className="text-[#F68716]  font-semibold text-sm mt-2 cursor-pointer"
          onClick={launchWidget}
        >
          Select Photo
        </div>
      )}
      {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}

      {/* </label> */}
    </div>
  );
}
