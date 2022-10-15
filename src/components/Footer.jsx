import arrow from "../assets/img/arrow1.png"

export const Footer = () => {

    const executeScroll = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

  return (
    <footer>
        <img src={arrow} onClick={executeScroll} alt="subir"/>
        <p>Sitio desarrollado por <a href="https://agmarcos.com" target="blank">Marcos Agüero</a></p>
    </footer>
  )
}
