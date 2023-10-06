const fs = require('fs/promises');
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = config =>  {
  config.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc3339);
  config.setLiquidOptions({
    extname: ".html",
    dynamicPartials: true
  });
  config.addFilter("cleanURL", function(url) {
    if (url.endsWith("/index")) { url = url.substring( 0, url.indexOf( "index" ) ); }
    if (url.endsWith(".html")) { url = url.substring( 0, url.indexOf( ".html" ) ); }
    return url;
  });
  config.addFilter("readableDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
          zone: "utc",
      }).setLocale('en').toLocaleString(DateTime.DATE_FULL);
  });
  config.addPairedShortcode("slot", function(content, name) {
    this.page[name] = content;
    return false;
  });
  config.addShortcode("inline", function(file) {
    var data = fs.readFile(__dirname + "/source" + file, { encoding: 'utf8' });
    return (data);
  });
  config.addPlugin(pluginRss);  
  config.addPassthroughCopy('source/assets');
  config.addPassthroughCopy('source/[!assets]*.{jpg,png,svg,gif,webp,webm,wasm,woff,woff2,epub,pdf,mp3,mp4,txt,xml,json,js,css}');
  return {
    dir: {
      input: 'source',
      layouts: 'templates',
      includes: 'library/snippets',
      data: 'library/data',
      output: 'build' 
    }
  }
};