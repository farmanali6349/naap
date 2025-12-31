import Image from "next/image";
import Loader from "./Loader";

export default function NaapImages({
  images,
  isLoading,
}: {
  images: string[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <Loader text="Loading Images" />;
  }
  return (
    <div className="w-full my-4">
      {images.length > 0 &&
        images.map((prev, ind) => (
          <div className="w-full max-w-lg mx-auto" key={ind}>
            <Image
              src={prev}
              width={400}
              height={600}
              alt={`image-${ind + 1}`}
              className="w-full h-auto my-1 rounded-md px-4"
            />
          </div>
        ))}
    </div>
  );
}
