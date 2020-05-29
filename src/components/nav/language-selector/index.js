import React from 'react';
import { useTranslation } from 'react-i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './language-selector.scss';

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lan) => {
        i18n.changeLanguage(lan);
    }

    return (
        <NavDropdown bg="dark" title={<FontAwesomeIcon icon={faGlobeAmericas} />} id="language-selector" onSelect={changeLanguage}>
            <Dropdown.Item lang="en" eventKey="en">{ t('english.label') }</Dropdown.Item>
            <Dropdown.Item lang="es-MX" eventKey="es-MX">{ t('spanish.label') }</Dropdown.Item>
        </NavDropdown>
    );
};

export default LanguageSelector;
