import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSetting, settingsSelector } from "../_redux/settingSlice";
import { onChangeCode, setPlatforms } from "../_redux/codeSlice";
import { BallTriangle } from "react-loader-spinner";
import { EditFieldPanel } from "../_includes/box-edit";
import { SettingPlanel } from "../_includes/settings";
import toast, { Toaster } from "react-hot-toast";
import Header from "../_includes/header";
import Footer from "../_includes/footer";
import { formSelector } from "../_redux/formSlice";
import { BASENAME } from "../config";

export const DefaultLayout = (props) => {

    const dispatch = useDispatch();

    const {
        APP_INIT,
        FIELD_EDIT_INDEX,
        APP_CONTAINER,
    } = useSelector(settingsSelector);

    const { layoutWith } = useSelector(formSelector);

    useEffect(() => {

        if (layoutWith === parseInt(layoutWith)) {
            var width = parseInt(layoutWith);

            var clientWidth = document.body.clientWidth;

            if (width >= clientWidth) {
                toast(`Please change your device breakpoint/width. current device ${clientWidth}px.`);
                document.body.style.width = `${width + 200}px`
            } else {
                document.body.style.width = ""
            }
        }

        return () => {

        }
    }, [layoutWith])


    useEffect(() => {
        let timeoutFinal = null;
        if (APP_INIT === false) {
            fetch(`${window.location.origin+ BASENAME}/init.json`).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error retrieving init data');
                }
            }).then((data) => {

                dispatch(setSetting({ name: 'languages', value: data.languages }));
                dispatch(setPlatforms(data.platforms));
                onChangeCode({ name: 'platform', value: data.platform || 'bootstrap' }); // default platform

                // change language or set default language
                const lang = window.localStorage.getItem('APP_LANG');
                if (!data.languages.includes(lang)) {
                    const domLang = navigator.language.substr(0, 2);
                    window.localStorage.setItem('APP_LANG', domLang);
                    dispatch(setSetting({ name: 'APP_LANG', value: domLang }))
                }

                timeoutFinal = setTimeout(() => {
                    dispatch(setSetting({ name: 'APP_INIT', value: true }))
                }, 3000);

            }).catch((error) => {
                timeoutFinal = setTimeout(() => {
                    dispatch(setSetting({ name: 'APP_INIT', value: true }))
                }, 3000);
            }).finally(() => {

            });
        }

        return () => {
            clearTimeout(timeoutFinal);
        }
    }, [dispatch, APP_INIT]);

    return (
        <Fragment>

            {APP_INIT ? null : (
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="rgb(16,178,214)"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass="preloader-wrapper"
                    wrapperStyle=""
                    visible={true}
                />
            )}

            <div className={`${APP_CONTAINER}`}>
                <div id="root-wrapper">
                    <Header />

                    {/* // flex container-row */}
                    {props.children}

                    <Footer />
                </div>
            </div>

            {typeof FIELD_EDIT_INDEX === 'number' ? <EditFieldPanel /> : null}
            <SettingPlanel />
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={8}
            />
        </Fragment>
    );
}