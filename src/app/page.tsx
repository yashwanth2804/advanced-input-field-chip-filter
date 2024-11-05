import FilterComp from "./FilterComp";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <FilterComp />
      <div className="mt-12 ">
        <a href="https://github.com/yashwanth2804/inline-string-filtering-code" className="text-3xl font-bold hover:text-blue-400"> Github </a>
      </div>
    </div>
  );
}
