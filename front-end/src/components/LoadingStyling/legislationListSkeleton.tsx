import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LegislationListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Skeleton height={40} width={250} borderRadius={8} />
      </div>

      <div className="space-y-6">
        {[...Array(count)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg shadow-md bg-white flex flex-col space-y-3"
          >
            <Skeleton height={24} width="70%" borderRadius={4} />
            <Skeleton height={16} width="85%" borderRadius={4} />
            <Skeleton height={16} width="90%" borderRadius={4} />
            <Skeleton height={16} width="95%" borderRadius={4} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Skeleton height={40} width={200} borderRadius={20} />
      </div>
    </div>
  );
}

export default LegislationListSkeleton;
