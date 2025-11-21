import Image from "next/image";
import Title from "./ui/Title";
import { FaShoppingCart } from "react-icons/fa";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const CampaignsItem = () => {
  return (
    <div className="bg-primary-light relative flex-none border-secondary-light border-b-4 rounded-tr-full rounded-bl-full p-2 flex items-center shadow-xl transform hover:scale-105 transition-transform duration-300">
      <div className="bg-transparent flex-1 py-5 px-3 flex gap-x-1">
        <div className="relative md:w-20 md:h-20 w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/images/campaigns.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="hover:scale-120 transition-all "
          />
        </div>
        <div className="text-light font-crimson-text ">
          <button className="flex btn-primary gap-x-2 !px-1 ">
         →
            <FaShoppingCart size={15} />
          </button>
          <div className="italic my-1 ">
            <span className="sm:text-[50px] text-[30px]">20%</span>
            <span className="sm:text-lg text-sm inline-block ml-1">off</span>
          </div>
         
           <Title addClass="sm:text-2xl text-[20px]">Tasty Fridays</Title>
        </div>
      </div>
    </div>
  );
};

const ParallaxCampaings = ({ baseVelocity = 50 }) => {
  const baseX = useMotionValue(0);
  const wrap = (min, max, val) => {
    const range = max - min;
    return ((((val - min) % range) + range) % range) + min;
  };

  useAnimationFrame((t, delta) => {
    baseX.set(wrap(-400, 0, baseX.get() + (baseVelocity * delta) / 1000));
  });
  return (
    <div className="overflow-hidden sm:pt-10 sm:pb-20 pt-5 pb-10 bg-light">
      <motion.div className="flex gap-20" style={{ x: baseX }}>
        <CampaignsItem />
        <CampaignsItem />
        <CampaignsItem />
        <CampaignsItem />
        <CampaignsItem />
        <CampaignsItem />
        <CampaignsItem />
      </motion.div>
    </div>
  );
};

export default ParallaxCampaings;
