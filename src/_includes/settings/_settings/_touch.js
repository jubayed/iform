import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSetting, settingsSelector } from '../../../_redux/settingSlice';
import { Form } from 'react-bootstrap';

function Touch() {

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const { TOUCH_MODE } = useSelector(settingsSelector);
    const [touchCounter, setTouchCounter] = useState();

    useEffect(() => {
        let time = null;
        if (touchCounter !== undefined) {
            time = setInterval(() => {
                if (touchCounter < 5) {
                    dispatch(setSetting({ name: 'TOUCH_MODE', value: TOUCH_MODE }));
                }
                setTouchCounter(touchCounter ? touchCounter - 1 : undefined);
            }, 1000);
        }
        return () => clearInterval(time);
    }, [touchCounter, TOUCH_MODE, dispatch]);

    /**
     * Fixed touch mode
     * 
     * @returns 
     */
    const onChangeTouchMode = () => {
        const value = !TOUCH_MODE;

        setTouchCounter(8);
        dispatch(setSetting({ name: 'TOUCH_MODE', value }));
    }

    return (
        <Fragment>
            <label className="col-sm-10 col-form-label">{t("Touch Mode")}</label>
            <div className="col-sm-2 mt-2">
                {touchCounter > 2 ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                ) : (
                    <Fragment>
                        {TOUCH_MODE !== undefined ? (
                            <Form.Check
                                name="TOUCH_MODE"
                                value={TOUCH_MODE ? "off" : "on"}
                                onClick={() => onChangeTouchMode()}
                                onChange={() => onChangeTouchMode()}
                                type="checkbox"
                                checked={TOUCH_MODE}
                            />
                        ) : null}
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
}

export default Touch