export const pokemonAnimation = {
    "capturar" : {
        scale: "0",
        transition: { duration: 0.5 },
      },
    "salir" : {
        scale: "0.9",
        transition: { duration: 1 },
    },
    "default" : {
        scale: "0",
        transition: {duration: 0},
    }
}

export const pokeballAnimation = {
    "lanzar" : {
        y: -480,        
        x: 60,
        rotate: 360,
        opacity: 1,
        transition: { type: "spring", duration: 2, bounce: 0.3 },
    },
    "lanzarMobile" : {
        y: -480,        
        x: 0,
        rotate: 360,
        opacity: 1,
        transition: { type: "spring", duration: 2, bounce: 0.3 },
    },
    "girar" : {
        x: [60,50,60,70,60],
        rotate: [360,315,360,405,360],
        transition: { delay: 1, type: "spring", duration: 3, bounce: 0.3 },
    },
    "girarMobile" : {
        x: [0,-10,0,10,0],
        rotate: [360,315,360,405,360],
        transition: { delay: 1, type: "spring", duration: 3, bounce: 0.3 },
    },
    "fin" : {
        y: 0,   
        x: 0,    
        rotate: 0,
        transition: {duration: 0} 
    }
}