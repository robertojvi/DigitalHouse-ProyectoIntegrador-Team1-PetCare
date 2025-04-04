import closeIcon from "../../images/cerrar.png";
import { IoCopy } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { ServiceCard } from "../cards/ServiceCard";


const ShareService = ({
    setShare,
    id,
    name,
    serviceType,
    image,
    rating,
    excerpt,
    caracteristicas,
    isFavorito,
    }) => {

    const BASE_URL = import.meta.env.VITE_API_URL || "";    
    
    const handleCopy = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => alert("¡Enlace copiado al portapapeles!"))
            .catch(err => console.error("Error al copiar:", err));
    };


    return (
        <div className="modal-overlay">
            <div className="share-modal">
                <button
                    className="share-close-icon"
                    onClick={() => setShare(false)}
                >
                    <img src={closeIcon} alt="Cerrar" />
                </button>
                {/* aquí va la tarjeta con la info */}

                <ServiceCard
                    key={id}
                    id={id}
                    name={name}
                    serviceType={serviceType}
                    image={image}
                    rating={rating}
                    excerpt={excerpt}
                    caracteristicas={caracteristicas}            
                    isFavorito={isFavorito}
                    isShared={true}
                />
                {/* Botones */}
                <div className="general-share-container">
                    <div className="right-container">
                        <button className="share-btn-modal" onClick={handleCopy}>
                            <IoCopy className="share-icon" />
                            Copiar enlace
                        </button>
                        <button className="share-btn-modal">
                            <IoLogoWhatsapp className="share-icon" />
                            <a href={`https://api.whatsapp.com/send?text=¡Mira esto! ${BASE_URL}`} target="_blank">
                                WhatsApp
                            </a>

                        </button>
                        <button className="share-btn-modal">
                            <FaSquareXTwitter className="share-icon" />
                            <a href={`https://twitter.com/intent/tweet?text=¡Mira esto!&url=${BASE_URL}`} target="_blank">
                                Twitter
                            </a>
                        </button>
                    </div>
                    <div className="left-container">
                        <button className="share-btn-modal">
                            <MdMail className="share-icon" />
                            <a href="mailto:correo@ejemplo.com?subject=Consulta&body=Hola, quiero más información.">
                                Correo Electrónico
                            </a>
                        </button>
                        <button className="share-btn-modal">
                            <FaFacebook className="share-icon" />
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${BASE_URL}`} target="_blank">
                                Facebook
                            </a>
                        </button>
                        <button className="share-btn-modal">
                            <FaFacebookMessenger className="share-icon" />
                            <a href={`https://www.facebook.com/dialog/send?app_id=1023137159737482&link=${BASE_URL}&redirect_uri=${BASE_URL}`} target="_blank">
                                Messenger
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareService;
