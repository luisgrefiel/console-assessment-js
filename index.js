/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

/**
 * Problem 1
 * Go through every object and made a new array of them using map funtion, 
 * created variable so that original object is not mutated while going through the stripKeysArr 
 */
exports.stripPrivateProperties = (stripKeysArr, origArr) => origArr.map(obj => {
    const strippedObj = { ...obj };

    stripKeysArr.forEach(stripKey => {
        delete strippedObj[stripKey];

    });

    return strippedObj;
});

// Problem 2
exports.excludeByProperty = (exclusionKey, origArr) => origArr.filter(obj => !Object.hasOwn(obj, exclusionKey));

// Problem 3
exports.sumDeep = (origArr) => origArr.map(obj => {
    const sum = obj.objects.reduce((total, valObj) => total + Number(valObj.val), 0);
    return {
        objects: sum
    }
});

// Problem 4
// Need to create a faster way to retrieve color info based on status code, so need to do only one traverse
// on the config to create a map with the status code being the key and the color being the value.
exports.applyStatusColor = (colorStatusCodeConfig, statusArr) => {


    // Create dictionary of status code with their respective color by pivoting the colorStatusCodeConfig for scalability as well
    const statusColorDictionary = {}
    Object.keys(colorStatusCodeConfig).forEach(color => {
        colorStatusCodeConfig[color].forEach(status => {
            statusColorDictionary[status] = color;
        })
    })

    const statusWithColorArray = statusArr.map(statusObj => {
        // IF conditional only checks if status code has a configured color, if not, it is not included in the output
        if (statusColorDictionary[statusObj.status]) {
            return {
                ...statusObj,
                color: statusColorDictionary[statusObj.status]
            }
        }
    })

    return statusWithColorArray;
};

// Problem 5
exports.createGreeting = (greet, greeting) => (name) => greet(greeting, name);

// Problem 6
exports.setDefaults = (defaults) => (objectWithoutDefaults) => {
    return {
        ...defaults,
        ...objectWithoutDefaults
    }
};

// // Problem 7
exports.fetchUserByNameAndUsersCompany = async (username, services) => {
    const { fetchStatus, fetchUsers, fetchCompanyById } = services;

    const [ status, users ] = await Promise.all([fetchStatus(), fetchUsers()]);
    const user = users.find(user => user.name === username);
    const company = await fetchCompanyById(user.companyId);

    return Promise.resolve({
        company,
        status,
        user
    })

};
