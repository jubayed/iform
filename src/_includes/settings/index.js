import React, { Fragment, useState } from "react";
import { Button, ButtonGroup, Offcanvas } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { SettingComponet } from "./_settings";
import { Layout } from "./_layout";
import { useSelector } from "react-redux";
import { settingsSelector } from "../../_redux/settingSlice";

export const SettingPlanel = () => {

    const { HTML_DIR } = useSelector(settingsSelector);
    const { t } = useTranslation();
    const [title, setTitle] = useState();

    const handleShow = (title) => {
        setTitle(prev => prev === title ? undefined : title);
    }

    return (
        <Fragment>

            <div id="setting-panel" className="d-flex align-items-center">
                <ButtonGroup vertical>
                    <Button id="open-panel" onClick={() => handleShow('Settings')}>
                        <FiSettings size="1.7rem" className="loading-icon" />
                    </Button>
                </ButtonGroup>
            </div>

            <Offcanvas show={title}
                onHide={() => setTitle()}
                placement={HTML_DIR === 'ltr' ? "end" : 'start'}
                backdrop={true}
                scroll={true}
            >
                <Offcanvas.Header closeButton={true}>
                    <Offcanvas.Title>{t(title)}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {title === 'Layout' ? (
                        <Layout />
                    ) : (
                        <SettingComponet />
                    )}
                </Offcanvas.Body>

                <div id="setting-panel-offcanvas" className="d-flex align-items-center">
                    <ButtonGroup vertical>
                        <Button id="close-panel" onClick={() => handleShow('Settings')}>
                            <FiSettings size="1.7rem" className="loading-icon" />
                        </Button>
                    </ButtonGroup>
                </div>
            </Offcanvas>
        </Fragment>
    );
}