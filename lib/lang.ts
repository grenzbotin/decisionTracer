import { languages, defaultLanguage } from '../i18n/config';

export function getSortedLangsData(): Array<string> {
	return languages;
}

export function getAllLanguageSlugs(): Array<{ params: { lang: string }}> {
	return languages.map((lang) => {
		return { params: { lang: lang } };
	});
}

export function getLanguage(lang: string): string {
	return languages.includes(lang) ? lang : defaultLanguage;
}
