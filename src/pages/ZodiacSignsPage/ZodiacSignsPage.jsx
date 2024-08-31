import React, {useEffect, useState} from 'react';
import {useTelegram} from '../../hooks/useTelegram';
import {postRequest} from '../../requests/postRequest';
import Card from '../../components/Card/Card';
import {ZODIAC_SIGNS} from '../../constants/constants';

import './styles.css';

const ZodiacSignsPage = () => {
    const [userLanguage, setUserLanguage] = useState(null);
    const [horoscope, setHoroscope] = useState(null);

    const {t} = useTranslation();
    const {TELEGRAM} = useTelegram();

    useEffect(() => {
        TELEGRAM.ready();
        setUserLanguage(TELEGRAM.initDataUnsafe?.user?.language_code);
    }, []);

    const requestHoroscope = async (sign, language) => {
        const data = await postRequest(sign, language);
        setHoroscope(data);
    };

    const visibleBackButton = () => {
        if (TELEGRAM.BackButton.isVisible) {
            TELEGRAM.BackButton.hide()
        } else {
            TELEGRAM.BackButton.show()
        }
    }

    const handleClickSignDescription = (sign) => {
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
        </div>
    );
};

export default ZodiacSignsPage;
