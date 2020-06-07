import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ls from '../../../utils/localStorage';

import './language-selector.scss';

/**
 * Component for the Language Selector
 */
const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    // Inits the language, pulls any info in localStorage, otherwise it defaults to 'en'
    const initLanguage = useCallback(() => {
        const lan = ls.getItem('lan');
        if(lan !== '' || lan !== null) {
            i18n.changeLanguage(lan);
        }
    }, [i18n]);

    // Calling initLanguage after the components mounts
    useEffect(() => {
        initLanguage();
    }, [initLanguage]);

    // Changes the language and stores the configuration in localStorage
    const changeLanguage = (lan) => {
        i18n.changeLanguage(lan);
        ls.setItem('lan', lan);
    }

    return (
        <NavDropdown bg="dark" title={<FontAwesomeIcon icon={faGlobeAmericas} />} id="language-selector" onSelect={changeLanguage}>
            <Dropdown.Item lang="en" eventKey="en">{ t('english.label') }</Dropdown.Item>
            <Dropdown.Item lang="es-MX" eventKey="es-MX">{ t('spanish.label') }</Dropdown.Item>
        </NavDropdown>
    );
};

export default LanguageSelector;
