/* eslint-disable no-console */
/* eslint-env node */

import Fs from 'fs';

const corePackage = JSON.parse(
	Fs.readFileSync(new URL('../../core/package.json', import.meta.url)),
);
const panePackage = JSON.parse(
	Fs.readFileSync(new URL('../package.json', import.meta.url)),
);

const reStartAt = /^@/
const reSlash = /\//g;

const getPkgName = (pkg) => pkg.replace(reStartAt, '').replace(reSlash, '-');

// Remove version of core tgz file
process.chdir('../core');

const coreTgz = `${getPkgName(corePackage.name)}-${corePackage.version}.tgz`;
if (Fs.existsSync(coreTgz)) {
	Fs.renameSync(coreTgz, `${getPkgName(corePackage.name)}.tgz`);
}

// Remove version of tweakpane tgz file
process.chdir('../tweakpane');

const paneTgz = `${getPkgName(panePackage.name)}-${panePackage.version}.tgz`;
if (Fs.existsSync(paneTgz)) {
	Fs.renameSync(paneTgz, `${getPkgName(panePackage.name)}.tgz`);
}
