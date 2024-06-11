import React, { Fragment, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiClipboard } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

import { settingsSelector } from "../../_redux/settingSlice";
import { formSelector } from "../../_redux/formSlice";
import { codeSelector, onChangeCode } from "../../_redux/codeSlice";
import Compiler from "../../_support/compiler";
import { DefaultLayout } from '../../_layouts/default';
import { BASENAME } from "../../config";

const initOutput = {
    code: JSON.stringify({
        message: 'Click generate button',
        loading: false
    }, null, 4),
    lang: 'json'
}

const renderingOutput = {
    code: JSON.stringify({
        message: 'Please wait...',
        loading: true
    }, null, 4),
    lang: 'json'
}

export const GenerateFormPage = () => {

    // line tab space
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const { variable_name, tab_spaces, platform, platforms, page_type } = useSelector(codeSelector);
    const { CODE_HIGHLIGHT } = useSelector(settingsSelector);

    const [addonBoken, setAddonBoken] = useState(false);
    const [addon404, setAddon404] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { data } = useSelector(formSelector);
    const [output, setOutput] = useState(initOutput);
    const ref = useRef(null);

    /**
     * Generate fields to html
     */
    async function onHandleFieldToHtml() {

        /**
         * Make or get target addon url
         * 
         * @returns string
         */
        function _getAddonUrl() {
            let addonUrl = window.location.origin+ BASENAME + `/addons/bootstrap`;
            if (platform !== 'bootstrap') {
                addonUrl = window.location.origin+ BASENAME + `/addons/${platform}_${page_type}`;
            }

            const url = `${addonUrl}.js`;
            console.info('Target addon url= ' + url);
            return url;
        }

        async function _getAddonContent() {
            return new Promise((resolve, reject) => {
                const url = _getAddonUrl();

                fetch(url).then(function (scriptResponse) {
                    return scriptResponse.text();
                }).then((scriptContent) => {

                    const regex = /var\s+\n?__addon__/;
                    if (regex.exec(scriptContent) === null) {
                        console.error("404", url, 'Framework or platform not found. Please create a new JS page.');
                        reject({ code: 404, message: "Addon not found." });
                    } else {
                        resolve({ ok: true, content: scriptContent });
                    }
                }).catch(function () {

                }).catch(function () {
                    reject({ code: 405, message: "Invalid addon content" });
                });

            })
        }

        async function fetchData() {

            const time0 = null;
            let time = null;

            try {

                const { content } = await _getAddonContent();

                window._run_addon = undefined;
                const script = `${content}\n window._run_addon=__addon__;`;
                // eslint-disable-next-line no-eval
                eval(script);

                if ( window._run_addon) {
                    time = setTimeout(() => {
                        Compiler([...data], tab_spaces, variable_name).then(({ code, lang }) => {
                            setOutput({ code, lang });
                            window._run_addon = undefined;
                            setLoading(false);
                        }).catch(function () {
                            window._run_addon = undefined;
                            setLoading(false);
                        });
                    }, 2000);
                }

            } catch (error) {
                console.error("internet connection", error);
            }

            return () => {
                clearTimeout(time0)
                clearTimeout(time);
                setLoading(false);
            };
        };

        setLoading(true);
        setOutput(renderingOutput);
        fetchData();
    }

    /**
     * change code 
     * 
     * @param {*} event 
     */
    const ChangeVariable = (event) => {
        event.preventDefault();
        const { value } = event.target;
        dispatch(onChangeCode({ name: 'variable_name', value }));
    }

    /**
     * change code 
     * 
     * @param {*} event 
     */
    const onChangePageType = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setOutput(initOutput);

        setAddonBoken(false);
        setAddon404(false);
        dispatch(onChangeCode({ name, value }));
    }

    /**
     * change on code word space 
     * 
     * @param {*} event 
     */
    const onChangeTabSpace = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setOutput(initOutput);

        setAddonBoken(false);
        setAddon404(false);
        dispatch(onChangeCode({ name, value }));
    }

    /**
     * on Change platform
     * 
     * @param {*} value 
     */
    const onChangePlatform = async (value) => {

        setOutput(initOutput);
        setAddonBoken(false);
        setAddon404(false);

        dispatch(onChangeCode({ name: 'page_type', value: 'create_page' }));
        dispatch(onChangeCode({ name: 'platform', value }));
    }

    /**
     * Code copy form card.header
     * 
     * @param {*} code 
     */
    function onCopy(code) {

        async function onHandle(code) {

            try {
                await navigator.clipboard.writeText(code.replace(/\u00A0/g, ' '));
                toast.success("Code copied successfull.");
                setCopied(true);
            } catch (error) {
                toast.error("Error copying text.");
                console.error('Error copying text:', error);
            }

            const time = setTimeout(() => {
                setCopied(false);
            }, 1000);

            return () => clearTimeout(time);
        }

        onHandle(code);
    }

    return (
        <DefaultLayout>

            <aside id="sidebar-g" className="bg-light">
                <Card className="w-100 h-100">

                    <Card.Body className="overflow-auto">

                        {platforms && platforms.length ? (
                            <div className="mb-3">
                                <label className="form-label">{t("Platform/Type")}</label>
                                <select className="form-select" onChange={(e) => {
                                    const { value } = e.target;
                                    onChangePlatform(value);
                                    console.log('current +e', e.target.value);
                                }}>
                                    {platforms.map((p, key) => (
                                        <option value={p} key={key}>{p}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null}

                        {platform && !['', 'bootstrap'].includes(platform) ? (
                            <Fragment>
                                <div className="mb-3">
                                    <label className="form-label">{t("Page Type")}</label>
                                    <select
                                        name="page_type"
                                        value={page_type}
                                        className="form-select"
                                        onChange={onChangePageType}
                                        disabled={isLoading && (addonBoken === false && addon404 === false)}
                                    >
                                        <option value="create_page">{t('Create')}</option>
                                        <option value="edit_page">{t('Edit')}</option>
                                    </select>
                                </div>

                                {page_type === 'edit_page' ? (
                                    <Form.Group className="mb-3">
                                        <label className="form-label">{t("Field Variable")}</label>
                                        <Form.Control
                                            name="variable_name"
                                            value={variable_name}
                                            onChange={ChangeVariable}
                                            disabled={isLoading && (addonBoken === false && addon404 === false)}
                                        />
                                    </Form.Group>
                                ) : null}
                            </Fragment>
                        ) : null}

                        <div className="mb-3">
                            <label className="form-label">{t("Tab Spaces")}</label>
                            <select
                                name="tab_spaces"
                                className="form-select"
                                value={tab_spaces}
                                onChange={onChangeTabSpace}
                                disabled={isLoading && (addonBoken === false && addon404 === false)}
                            >
                                {Array.from({ length: 6 }).map((_, key) => (
                                    <option value={Array.from({ length: key + 2 }).map(() => '\u00A0').join('')} key={key}>
                                        {key + 2}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="d-grid gap-2">
                            <Button ref={ref} className="btn-iframe mb-3"
                                onClick={() => onHandleFieldToHtml()}
                                disabled={isLoading || addonBoken || addon404}
                            >
                                {isLoading && addonBoken === false && addon404 === false ? (
                                    <Fragment>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                        <span className="mx-1">{t("Loading...")}</span>
                                    </Fragment>
                                ) : t('Generate Code')}
                            </Button>
                        </div>
                    </Card.Body>

                </Card>
            </aside>

            <div id="content-g">
                <div></div>
                <div className="overflow-auto position-sticky h-100 w-100 ">
                    {addonBoken || addon404 ? (
                        <div className="d-flex justify-content-center" >
                            {addonBoken ? (
                                <Alert variant="danger">
                                    {t('Addon boken. Please contact server administrator')}
                                </Alert>
                            ) : (
                                <Alert variant="danger">
                                    {t('[404] Addon not found. Please contact server administrator')}
                                </Alert>
                            )}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center m-2">

                            <Card className="h-100 w-100 border-0" id="code-snippets">
                                <Card.Header style={{ backgroundColor: '#343541' }}>
                                    <div className="d-flex justify-content-between">
                                        <div className="font-monospace text-muted code-info">
                                            {output.lang}
                                        </div>
                                        <div className="d-flex">

                                            {!copied ? (
                                                <Button variant="link" size="sm"
                                                    className="code-copy-btn"
                                                    onClick={() => onCopy(output.code)}
                                                >
                                                    <FiClipboard /> {t("Copy code")}
                                                </Button>
                                            ) : (
                                                <Button variant="link" size="sm"
                                                    className="code-copy-btn"
                                                >
                                                    <FiClipboard /> {t("Copied.")}
                                                </Button>
                                            )}

                                        </div>
                                    </div>
                                </Card.Header>
                                <Card.Body className="h-100 p-0 m-0">
                                    {CODE_HIGHLIGHT !== 'no' ? (
                                        <div className="overflow-auto h-100 w-100">
                                            <SyntaxHighlighter language={output.lang} style={a11yDark}>
                                                {output.code}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <div className="overflow-auto h-100 w-100">
                                            <pre>{output.code}</pre>
                                        </div>
                                    )}

                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </div>
                <div></div>
            </div>

        </DefaultLayout >
    );
}
