let urlValidation = (input) => {
	const websiteRegex = /^(https?:\/\/)?(([\da-z.-]+)\.)?(vimeo.com)([/\w .-]*)*\/?$|(https?:\/\/)?(([\da-z.-]+)\.)?(flickr.com)([/\w .-]*)*\/?$/;
	return websiteRegex.test(input);
};

export { urlValidation };