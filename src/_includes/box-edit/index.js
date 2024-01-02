import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Offcanvas } from "react-bootstrap";
import { setSetting, settingsSelector } from "../../_redux/settingSlice";
import { OptionBuilder } from "./_options";
import { Attributes } from "./_attributes";
import { SettingsLayout } from "./_settings";
import { formSelector } from "../../_redux/formSlice";
import { useTranslation } from "react-i18next";

export const EditFieldPanel = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const { FIELD_EDIT_INDEX } = useSelector(settingsSelector);
    const { data } = useSelector(formSelector);
    const [item, setItem] = useState({});

    useEffect(() => {

        if (data && data.length && FIELD_EDIT_INDEX > -1) {

            if (typeof data.find === 'function') {
                const item = data.find((item, k) => k === FIELD_EDIT_INDEX)

                if (item !== undefined) {
                    setItem(item);
                }
            }

        }

    }, [data, FIELD_EDIT_INDEX]);


    const onHide = () => {

        setShow(false);

        const time = setTimeout(() => {
            dispatch(setSetting({
                name: 'FIELD_EDIT_INDEX',
                value: null,
            }));
        }, 1000);

        return () => clearTimeout(time);
    }

    return (
        <Offcanvas show={show} onHide={() => onHide()} placement="end" className="overflow-auto">
            <Offcanvas.Header className='border-bottom' closeButton={true}>
                <Offcanvas.Title>{t("Bootstrap Component")}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='m-0 p-0'>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{t("Attributes")}</Accordion.Header>
                        <Accordion.Body>
                            <Attributes index={FIELD_EDIT_INDEX} />
                        </Accordion.Body>
                    </Accordion.Item>
                    {item && item.attributes && typeof item.attributes.find === 'function' ? (
                        <React.Fragment>
                            {!['hidden'].includes(item.attributes.find(a => a.name === 'type')?.type) ? (
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>{t("Layout Size")}</Accordion.Header>
                                    <Accordion.Body>
                                        <SettingsLayout index={FIELD_EDIT_INDEX} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            ) : null}
                        </React.Fragment>
                    ) : null}
                    <OptionBuilder index={FIELD_EDIT_INDEX} />
                </Accordion>

            </Offcanvas.Body>
        </Offcanvas>
    )
}