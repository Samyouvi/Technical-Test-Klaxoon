/* Validation url selon les normes 
- http://www.flickr.com/*
- https://www.flickr.com/*
- http://www.vimeo.com/*
- https://www.vimeo.com/*
*/

let urlValidation = (input) => {
	const websiteRegex = /^https?:\/\/(www\.)?(flickr.com)([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$|https?:\/\/(www\.)?(vimeo.com)([-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/;
	return websiteRegex.test(input);
};


export { urlValidation };