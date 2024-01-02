import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { formSelector, setLayoutWith, updateField } from "../../_redux/formSlice";
import { __cString } from "../../_support/helper";

export const SettingsLayout = (props) => {

    const { index } = props;
    const { data, layoutWith } = useSelector(formSelector);
    const item = data.find((it, key) => key === index);
    const dispatch = useDispatch();

    const changeValue = (name, col) => {
        var parentClass = {};
        parentClass[name] = `${col}`;
        dispatch(updateField({
            index, item: {
                ...item,
                parentClass: {
                    ...item.parentClass,
                    ...parentClass,
                }
            }
        }));
    }

    const handleSize = size => {
        dispatch(setLayoutWith(parseInt(size)));
    }

    return item && (
        <Fragment>
            <div className="btn-group mb-3 w-100" role="group" aria-label="Basic outlined example">
                <Button className={`${layoutWith === 575 ? ' active' : ''}`} onClick={() => handleSize(575)}>xs</Button>
                <Button className={`${layoutWith === 576 ? ' active' : ''}`} onClick={() => handleSize(576)}>sm</Button>
                <Button className={`${layoutWith === 768 ? ' active' : ''}`} onClick={() => handleSize(768)}>md</Button>
                <Button className={`${layoutWith === 992 ? ' active' : ''}`} onClick={() => handleSize(992)}>lg</Button>
                <Button className={`${layoutWith === 1200 ? ' active' : ''}`} onClick={() => handleSize(1200)}>xl</Button>
                <Button className={`${layoutWith === 1400 ? ' active' : ''}`} onClick={() => handleSize(1400)}>xxl</Button>
            </div>
            <div className="mb-3">
                <textarea
                    className="form-control"
                    rows="2"
                    value={__cString(item.parentClass)} 
                    disabled={true}
                />
            </div>
            {layoutWith === 575 ? (
                <Row className="mb-3">
                    <div className="col-sm-1">xs</div>
                    <div className="col-sm-11">
                        <div className="btn-group w-100" role="group" aria-label="">
                            {[...Array.from({ length: 11 }, (_, i) => i + 2)].map((liKey) =>
                                <button
                                    onClick={() => changeValue('xs', liKey)}
                                    type="button"
                                    className={`btn btn-primary btn-sm${item.parentClass.xs === "" + liKey ? ' active' : ''}`}
                                    key={liKey}>
                                    {liKey}
                                </button>
                            )}
                        </div>
                    </div>
                </Row>
            ) : null}
            {layoutWith === 576 ? (
                <Row className="mb-3">
                    <div className="col-sm-1">sm</div>
                    <div className="col-sm-11">
                        <div className="btn-group w-100" role="group" aria-label="Basic example">
                            {[...Array.from({ length: 11 }, (_, i) => i + 2)].map((liKey) =>
                                <button
                                    onClick={() => changeValue('sm', liKey)}
                                    type="button"
                                    className={`btn btn-primary btn-sm${item.parentClass.sm === "" + liKey ? ' active' : ''}`}
                                    key={liKey}>
                                    {liKey}
                                </button>
                            )}
                        </div>
                    </div>
                </Row>
            ) : null}
            {layoutWith === 768 ? (
                <Row className="mb-3">
                    <div className="col-sm-1">md</div>
                    <div className="col-sm-11">
                        <div className="btn-group w-100" role="group" aria-label="Basic example">
                            {[...Array.from({ length: 11 }, (_, i) => i + 2)].map((liKey) =>
                                <button
                                    onClick={() => changeValue('md', liKey)}
                                    type="button"
                                    className={`btn btn-primary btn-sm${item.parentClass.md === "" + liKey ? ' active' : ''}`}
                                    key={liKey}>
                                    {liKey}
                                </button>
                            )}
                        </div>
                    </div>
                </Row>
            ) : null}
            {layoutWith === 992 ? (
                <Row className="mb-3">
                    <div className="col-sm-1">lg</div>
                    <div className="col-sm-11">
                        <div className="btn-group w-100" role="group" aria-label="Basic example">
                            {[...Array.from({ length: 11 }, (_, i) => i + 2)].map((liKey) =>
                                <button
                                    onClick={() => changeValue('lg', liKey)}
                                    type="button"
                                    className={`btn btn-primary btn-sm${item.parentClass.lg === "" + liKey ? ' active' : ''}`}
                                    key={liKey}>
                                    {liKey}
                                </button>
                            )}
                        </div>
                    </div>
                </Row>
            ) : null}
            {layoutWith === 1200 ? (
                <Row className="mb-3">
                    <div className="col-sm-1">xl</div>
                    <div className="col-sm-11">
                        <div className="btn-group  w-100" role="group" aria-label="Basic example">
                            {[...Array.from({ length: 11 }, (_, i) => i + 2)].map((liKey) =>
                                <button
                                    onClick={() => changeValue('xl', liKey)}
                                    type="button"
                                    className={`btn btn-primary btn-sm${item.parentClass.xl === "" + liKey ? ' active' : ''}`}
                                    key={liKey}>
                                    {liKey}
                                </button>
                            )}
                        </div>
                    </div>
                </Row>
            ) : null}
            {layoutWith === 1400 ? (
                <Row className="mb-3">
                    <div className="col-sm-1">xxl</div>
                    <div className="col-sm-11">
                        <div className="btn-group w-100" role="group" aria-label="Basic example">
                            {[...Array.from({ length: 11 }, (_, i) => i + 2)].map((liKey) =>
                                <button
                                    onClick={() => changeValue('xxl', liKey)}
                                    type="button"
                                    className={`btn btn-primary btn-sm${item.parentClass.xxl === "" + liKey ? ' active' : ''}`}
                                    key={liKey}>
                                    {liKey}
                                </button>
                            )}
                        </div>
                    </div>
                </Row>
            ) : null}
        </Fragment>
    );
}