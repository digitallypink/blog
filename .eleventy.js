module.exports = (function(eleventyConfig) {
    const flatten = arrayOfArrays => [].concat.apply([], arrayOfArrays)
        .filter(item => item && !!item.trim());
    const allTags = collection => flatten(collection.map(item => item.data.tags))

    eleventyConfig.addFilter("uniqueTags", function(collection) {
        const uniqueSetOfTags = new Set(allTags(collection));
        return Array.from(uniqueSetOfTags);
    });

    eleventyConfig.addFilter("exclude", function (collection, itemToExclude) {
        return collection.filter(item => item !== itemToExclude);
    });

    eleventyConfig.addFilter("section", function (collection, section) {
        const filter = collection.filter(item => item.data.section === section);
        console.debug("Filter for ", section, "  ", filter);
        return filter;
    })

    eleventyConfig.addCollection("sectionNames", function (collection) {
        return collection.getAll().map(item => item.data.section);
    });

    eleventyConfig.addCollection("topics", function (collection) {
        return allTags(collection.getAll());
    });
});

