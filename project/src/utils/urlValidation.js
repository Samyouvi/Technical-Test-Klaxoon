let urlValidation = (input) => {
	const websiteRegex = /^https?:\/\/(www\.)?(flickr.com)([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$|https?:\/\/(www\.)?(vimeo.com)([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/;
	return websiteRegex.test(input);
};

export { urlValidation };