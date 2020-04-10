module.exports = (function(eleventyConfig) {
    eleventyConfig.addFilter("uniqueTags", function(collection) {
        let arrayOfTags = collection.map(item => item.data.tags);
        let flattenedArray = [].concat.apply([], arrayOfTags);
        //Removing all blank tags.
        let uniqueSetOfTags = new Set(flattenedArray.filter(item => item && !!item.trim()));
        return Array.from(uniqueSetOfTags);
    });

    eleventyConfig.addFilter("exclude", function (collection, itemToExclude) {
        return collection.filter(item => item !== itemToExclude);
    })
});