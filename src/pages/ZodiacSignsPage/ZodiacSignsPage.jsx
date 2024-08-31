import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useTelegram} from '../../hooks/useTelegram';
import {postRequest} from '../../requests/postRequest';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import {ZODIAC_SIGNS} from '../../constants/constants';

import './styles.css';
//TODO test comment
const ZodiacSignsPage = () => {
    const [isSelectedSign, setIsSelectedSign] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [userLanguage, setUserLanguage] = useState(null);
    const [horoscope, setHoroscope] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {t} = useTranslation();
    const {TELEGRAM} = useTelegram();

    useEffect(() => {
        TELEGRAM.ready();
        setUserLanguage(TELEGRAM.initDataUnsafe?.user?.language_code);
    }, []);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (touchStartX === null) return;

        const touchEndX = e.touches[0].clientX;
        // magic number test ipad
        if ((touchEndX - touchStartX) > 50) {
            setIsSelectedSign(false)
            TELEGRAM.BackButton.hide()
        }
    };

    const requestHoroscope = async (sign, language) => {
        setIsLoading(true);
        const data = await postRequest(sign, language);
        setHoroscope(data);
        setIsLoading(false);
    };

    const visibleBackButton = () => {
        if (TELEGRAM.BackButton.isVisible) {
            TELEGRAM.BackButton.hide()
        } else {
            TELEGRAM.BackButton.show()
            TELEGRAM.BackButton.onClick(() => {
                setIsSelectedSign(false)
                TELEGRAM.BackButton.hide()
            })
        }
    }

    const handleClickSignDescription = (sign) => {
        setIsSelectedSign(true)
        visibleBackButton()
        requestHoroscope(sign.toLowerCase(), userLanguage === 'ru' ? 'original' : 'translated').then();
    };

    return (
        <div className="zodiac-container">

            {ZODIAC_SIGNS.map((sign, index) => (
                <Card
                    onClick={() => handleClickSignDescription(sign.sign)}
                    key={index}
                    icon={sign.icon}
                    name={t(`ZodiacSigns.Sign.${sign.sign}`)}
                    period={t(`ZodiacSigns.Date.Sign.${sign.sign}`)}
                />
            ))}

            {isSelectedSign && (
                <Modal
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {isLoading ? (
                        <p>{t("Loading")}</p>
                    ) : (
                        horoscope ? (
                            <>
                                <h2>{t(`ZodiacSigns.Sign.${horoscope.sign}`)}</h2>
                                <p>{horoscope.horoscope}</p>
                            </>
                        ) : (
                            <p>{t("ErrorRequest")}</p>
                        )
                    )}
                </Modal>
            )}
        </div>
    );
};

export default ZodiacSignsPage;
