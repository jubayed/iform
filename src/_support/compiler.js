import block from "./block";
import { IS_DEMO_VERSION } from "./helper";

export default async function Compiler(fields, tab_spaces, variableName = '') {
    const limit = 5;
    const data = IS_DEMO_VERSION ? [...fields.slice(0, limit)] : [...fields];

    const wp = window._run_addon.wrap(tab_spaces, variableName, data);

    return await new Promise(async (resolve, reject) => {
        const promises = [...data.map(blockItem => {
            return new Promise(resolve => {
                const instance = block(blockItem, tab_spaces, variableName);
                const timeout = setTimeout(() => { }, 1000);
                resolve(instance.render());
                clearTimeout(timeout);
            });
        })];

        return Promise.all(promises)
            .then(results => {
                const html = results
                    .join('\n')
                    .split('\n')
                    .map(line => {
                        return `${wp.tab_spaces}${line}`;
                    })
                    .join('\n');

                const demoInfo = IS_DEMO_VERSION
                    ? `${wp.tab_spaces}...\n${wp.tab_spaces}Demo version. so you cannot render more than ${limit} fields.\n`
                    : "";

                const code = `${wp.beforeElement}\n${html}\n${demoInfo}${wp.afterElement}`;

                if (code.length > 5000) {
                    setTimeout(() => {
                        resolve({ code, lang: 'html' });
                    }, 1000);
                } else {
                    resolve({ code, lang: 'html' });
                }
            })
            .catch(error => {

                console.error(error);
                resolve({
                    code: '\n\n<strong>Error Found: Incomplete Addon</strong>\n<p>Check console for more details.</p>\n\n',
                    lang: 'html',
                });
            });
    });
}
