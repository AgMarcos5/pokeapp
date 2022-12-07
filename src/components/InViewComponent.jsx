import React, { useEffect } from 'react'
import {motion, useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer';

const variants = {
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: .5, delay: .3} },
    hidden: { opacity: 0, y:50, scale: 1 }
};

export const InViewComponent = ({children}) => {

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
        else{
            controls.start("hidden")
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={variants}
        >
            {children}
        </motion.div>
    )
}
