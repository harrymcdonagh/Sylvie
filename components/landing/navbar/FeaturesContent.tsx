import { FiZap, FiUserCheck, FiCalendar, FiHeart } from "react-icons/fi";

const FeaturesContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 shadow-xl lg:h-72 lg:w-[600px] lg:shadow-none xl:w-[750px] overflow-hidden rounded-xl border">
      <div className="col-span-12 flex flex-col justify-center bg-orange-400 p-6 text-white lg:col-span-4">
        <h1 className="mb-2 text-2xl font-bold">Features</h1>
        <p className="text-sm">
          Explore how Sylvie supports UEA students with intelligent tools and a
          well-being-first approach.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-2 gap-4 bg-white p-6 lg:col-span-8">
        <FeatureItem
          icon={<FiZap className="text-orange-400 text-xl" />}
          title="Chat Support 24/7"
          description="Ask anything about UEA, mental health, or student life — anytime."
        />
        <FeatureItem
          icon={<FiUserCheck className="text-orange-400 text-xl" />}
          title="Personalised Experience"
          description="Save chats and get responses tailored to your needs and profile."
        />
        <FeatureItem
          icon={<FiCalendar className="text-orange-400 text-xl" />}
          title="UEA Integration"
          description="Access timetables, events, and services directly from Sylvie."
        />
        <FeatureItem
          icon={<FiHeart className="text-orange-400 text-xl" />}
          title="Well-being Focused"
          description="Get emotional support, tips, and trusted well-being resources."
        />
      </div>
    </div>
  );
};

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 shadow-sm transition hover:shadow-md">
    {icon}
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export default FeaturesContent;
