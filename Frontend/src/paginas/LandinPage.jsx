import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logoDarkMode from '../assets/dark.png'
import logoFacebook from '../assets/facebook.png'
import descubrir1 from '/public/images/descubrir.jpg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import descubrir2 from '/public/images/descubrir2.jpg'
import descubrir3 from '/public/images/descubrir3.jpg'

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>Descubrir</h1>
                        <ul className='flex items-center'>
                            <li><img onClick={() => setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40} /></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Login</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Escuela Descubrir</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>¡Formamos mentes, construimos futuros!</h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>Hacemos que el aprendizaje sea emocionante y significativo. Queremos que cada estudiante se sienta motivado a descubrir nuevas ideas, crecer con confianza y disfrutar cada paso del camino.</p>
                    </div>

                    <div className='text-5xl flex justify-center gap-16 py-3'>
                        <a href="https://www.facebook.com/p/Escuela-De-Educaci%C3%B3n-Basica-Particular-Descubrir-100063535841570/" target="_blank" rel="noopener noreferrer">
                            <img src={logoFacebook} alt="logo-redes" width={50} height={50} className='dark:border-2 border-teal-600 rounded-full' />
                        </a>
                    </div>

                    

                    <div className='relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58EY_JijUgAGct2dUABbc0FRLLsEa9FaQDQ&s' className="w-full h-full object-cover" />
                    </div>
                </section>

                <section>
                <Slider {...settings}>
                        <div className="p-4">
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                                <img src={descubrir1} alt="Project 1" className="w-full h-90 object-cover rounded-lg" />
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                                <img src={descubrir2} alt="Project 2" className="w-full h-90 object-cover rounded-lg" />
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                                <img src={descubrir3} alt="Project 3" className="w-full h-90 object-cover rounded-lg" />
                            </div>
                        </div>
                    </Slider>

                    <div className='md:flex md:flex-wrap lg:flex lg:justify-center gap-10'>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <h3 className='text-lg font-medium pt-8 pb-2'>Mision</h3>
                            <p className='py-4 text-teal-600'>
                                La Escuela de Educación Básica Particular “Descubrir” es una institución que ofrece sus
                                servicios a la comunidad Pomasqueña y sus alrededores, avanzar en el camino de la
                                construcción de una escuela del siglo XXI, basándonos en el trabajo interdisciplinario y
                                colaborativo, que permite a los niños y niñas tener experiencias de aprendizaje donde pongan
                                en juego sus múltiples inteligencias, habilidades y valores para convertirse en personas
                                comprometidas con la realidad. El mundo actual presenta continuas transformaciones dentro
                                y fuera del aula, a las cuales la educación debe hacer frente, por ello nos proponemos
                                emprender el camino del liderazgo en el cambio educativo, generar oportunidades de
                                crecimiento personal y excelencia académica. Nuestra institución tiene como propósito la
                                formación integral de seres humanos autónomos que generen un aprendizaje significativo en
                                competencias encaminadas al desarrollo económico y social de nuestro país.
                            </p>

                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-300'>
                            <h3 className='text-lg font-medium pt-8 pb-2'>Vision</h3>
                            <p className='py-4 text-teal-600'>
                                La Escuela de Educación Básica Particular “Descubrir” debe ser reconocida como la mejor
                                escuela de educación básica cumpliendo a cabalidad todos los requerimientos estipulados
                                por el Ministerio de Educación, basado en un ambiente de trabajo cálido, pacífico e inclusivo
                                para formar estudiantes que construyan su propio conocimiento siendo justos, innovadores y
                                solidarios. Consolidando una sólida formación que contribuya al estudiante a desarrollarse
                                como personas y profesionales en los distintos aspectos de la vida.
                            </p>
 
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}