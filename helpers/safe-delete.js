const General = require('../models/General');

module.exports = {
    meal: function (id) {
        removeFromPage(id)
    }
};

function removeFromPage(id) {
    General.find().exec(async (err, results) => {
        if(err) {
            console.log(err)
        } else {
            let pages = results[0].pages;
            let props = ['content', 'starters', 'meals', 'desserts'];
            pages.forEach(page => {
                props.forEach(prop => {
                    if(page[prop] && page[prop].includes(id)) {
                        page[prop] = removeFromArray(page[prop], id)
                    }
                });
            });
            try {
                const updatedItem = await General.updateOne(
                    { _id: results[0]._id },
                    { $set: { pages: pages } }
                );
                console.log('Success page updated', updatedItem)
            } catch(err) {
                console.log(err)
            }
        }
    });
}

function removeFromArray(array, value) {
    let index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array
}