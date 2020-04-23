const chalk = require('chalk');

const sectionValidation = function (section) {
    const mandatoryFields = ['name', 'url', 'imageUrl', 'description'];
    return mandatoryFields.filter(field => !section[field])
        .map(field => `section "${section.name}" is missing field "${field}"`);
}

const flatten = arrayOfArrays => [].concat.apply([], arrayOfArrays)
    .filter(item => item && !!item.trim());

function blogValidation(eleventyConfig) {
    //Validate that all sections have mandatory fields
    eleventyConfig.addCollection("sectionsValidation", function (collection) {
        const sections = collection.getAll()[0].data.sections;
        const errorMessages = flatten(sections.map(it => sectionValidation(it)));

        if (errorMessages && errorMessages.length) {
            errorMessages.map(errorMessage => console.log(chalk.red(errorMessage)));
            throw new Error("Some Sections are missing fields.");
        }
        console.debug("All sections have required fields");
        return [];
    });
}

module.exports = {
    blogValidation,
    flatten
}


