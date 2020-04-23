const {blogValidation, flatten} = require('./validate_blog')

module.exports = (function (eleventyConfig) {
    const allTags = collection => flatten(collection.map(item => item.data.tags));

    eleventyConfig.addFilter("uniqueTags", function (collection) {
        const uniqueSetOfTags = new Set(allTags(collection));
        return Array.from(uniqueSetOfTags);
    });

    eleventyConfig.addFilter("exclude", function (collection, itemToExclude) {
        return collection.filter(item => item !== itemToExclude);
    });

    eleventyConfig.addFilter("section", function (collection, section) {
        return collection.filter(item => item.data.section === section);
    })

    eleventyConfig.addCollection("sectionNames", function (collection) {
        return collection.getAll().map(item => item.data.section);
    });

    eleventyConfig.addCollection("topics", function (collection) {
        return allTags(collection.getAll());
    });

    //Watch for changes made by gulp
    eleventyConfig.addWatchTarget("src/site/_includes/layouts/css");

    //Validate all the MUSTS for this blog
    blogValidation(eleventyConfig);

    return {
        dir: {
            output: "output/site",
            input: "src/site"
        }
    }
});

