module.exports = {
	"permalink": "{% if permalink %}{{ permalink }}{% else %}{{page.filePathStem}}.html{% endif %}"
};