import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fieldTypeChange, formSelector, onChangeAttr } from '../../../_redux/formSlice';

const GeneralAttrs = (props) => {

    const { index, options, defaultType } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { data } = useSelector(formSelector);
    const item = data.find((i, k) => k === index);
    const [attrName, attrValue, attrType] = item.attributes;

    const onAttrChange = (e, attrKey) => {
        e.preventDefault();
        const { value } = e.target;

        dispatch(onChangeAttr({
            index, attrKey, name: 'value', value,
        }));
    }

    const onTypeChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        dispatch(fieldTypeChange({
            index, type: value, tagName: item.tagName
        }));
    }

    return (
        <Fragment>
            <Row className="border-bottom mb-2">
                <h5>{t("Attributes")}</h5>
            </Row>
            {attrName ? (
                <Row className="mb-3">
                    <label className="col-sm-3 col-form-label">{t('Name')}</label>
                    <Col sm="9">
                        <input
                            name="name"
                            value={attrName.value}
                            onChange={e => onAttrChange(e, 0)}
                            className="form-control"
                        />
                    </Col>
                </Row>
            ) : null}

            {attrValue ? (
                <Row className="mb-3">
                    <label className="col-sm-3 col-form-label">{t('Value')}</label>
                    <Col sm="9">
                        <input
                            name="value"
                            value={attrValue.value}
                            type={attrValue.valueType}
                            className="form-control"
                            onChange={(e) => onAttrChange(e, 1)}
                        />
                    </Col>
                </Row>
            ) : null}

            {attrType && defaultType ? (
                <Row className="mb-3">
                    <label className="col-sm-3 col-form-label">{t("Type")}</label>
                    <Col sm="9">
                        <select name="type" value={defaultType} onChange={e => onTypeChange(e, 2)} className="form-select" >
                            {options.map((option, key) =>
                                <option value={option.value} key={key}>
                                    {option.label}
                                </option>
                            )}
                        </select>
                    </Col>
                </Row>
            ) : null}

        </Fragment>
    )
}

export default GeneralAttrs
