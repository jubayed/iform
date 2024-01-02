import React, { Fragment } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { formSelector, onChangeOptAttr } from '../../../_redux/formSlice';

const OptionalAttrs = (props) => {

    const { index } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index);

    //create onAttrChange 
    const onAttrChange = (name, value, attrKey) => {
        dispatch(onChangeOptAttr({
            index, attrKey, name, value,
        }));
    }

    const handleCheckbox = () => {

    }

    return (
        <Fragment>
            <Row className="border-bottom mb-2">
                <h5>{t('Attributes Optional')}</h5>
            </Row>

            <Row>
                {item.optional_attributes.map((attr, key) =>
                    <Col sm="12" className="mb-3" key={key}>
                        <div className="d-flex justify-content-between">
                            <label className="form-label w-100" htmlFor={`optional_attr_${key}`}>[{key + 1}]. {t(attr.name)}</label>
                            {attr.required !== undefined ? (
                                <input
                                    type="checkbox"
                                    id={`optional_attr_${key}`}
                                    className="form-check-input"
                                    defaultValue={attr.required ? 'on' : 'off'}
                                    checked={attr.required}
                                    onClick={() => onAttrChange('required', !attr.required, key)}
                                    onChange={handleCheckbox}
                                />
                            ) : null}
                        </div>
                        {attr.valueType === 'text' ? (
                            <input
                                type="text"
                                name={attr.name}
                                value={attr.value}
                                onChange={e => onAttrChange('value', e.target.value, key)}
                                className="form-control"
                                disabled={attr.required === false}
                            />
                        ) : null}
                        {attr.valueType === 'boolean' ? (
                            <div>
                                {attr.value !== undefined ? (
                                    <Form.Check
                                        inline
                                        label="true"
                                        name={attr.name}
                                        type='radio'
                                        id={`${attr.name}-inline-${index}-${key}-1`}
                                        disabled={attr.required === false}
                                        value={attr.value}
                                        checked={attr.value === true}
                                        onClick={() => onAttrChange('value', true, key)}
                                        onChange={handleCheckbox}
                                    />
                                ) : null}
                                {attr.value !== undefined ? (
                                    <Form.Check
                                        inline
                                        label="false"
                                        name={attr.name}
                                        type='radio'
                                        id={`${attr.name}-inline-${index}-${key}-2`}
                                        disabled={attr.required === false}
                                        checked={attr.value === false}
                                        onClick={() => onAttrChange('value', false, key)}
                                        onChange={handleCheckbox}
                                    />
                                ) : null}
                            </div>
                        ) : null}
                    </Col>
                )}
            </Row>
        </Fragment>
    )
}

export default OptionalAttrs