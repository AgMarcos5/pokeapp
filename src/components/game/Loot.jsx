import React, { useEffect } from "react";

import pokeball from "../../assets/img/game/pokeball.png";
import superball from "../../assets/img/game/superball.png";
import ultraball from "../../assets/img/game/ultraball.png";
import masterball from "../../assets/img/game/masterball.png";
import berry from "../../assets/img/game/berry.png";
import { motion, useAnimation } from "framer-motion";

const items = [
  {
    name: "pokeballs",
    src: pokeball,
  },
  {
    name: "superballs",
    src: superball,
  },
  {
    name: "ultraballs",
    src: ultraball,
  },
  {
    name: "masterballs",
    src: masterball,
  },
  {
    name: "berries",
    src: berry,
  },
];


const variants = {
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: .6} },
    hidden: { opacity: 0, y:20, scale: .9, transition: { duration: .6}  }
};


const ToastItem = ({ name, value }) => {

  const item = items.find((i) => i.name === name);
    console.log("TOAST: ",name,item)
  return (
    <div className="toastItem">
      <img src={item.src} alt={item.name} />
      <span>x{value}</span>
    </div>
  );
};

export const Loot = ({ items, setLoot }) => {
    
    const controls = useAnimation();

    useEffect(() => {
        if(Object.keys(items).length > 0){
            controls.start("visible");
            setTimeout( () => {
                controls.start("hidden");
            },2000)
            setTimeout( () => {
                setLoot({})
            },3000)

        }
    }, [,items]);

    return (
        <motion.div 
            className="lootContainer"
            animate={controls}
            initial="hidden"
            variants={variants}
        >
        {Object.keys(items).map((name, i) => {
            return <ToastItem key={i} name={name} value={items[name]} />;
        })}
        </motion.div>
    );
};
