const Menu = require('../models/Menu');
const General = require('../models/General');

module.exports = {
    meal: function (id) {
        removeFromMenu(id, 'starters');
        removeFromMenu(id, 'meals');
        removeFromMenu(id, 'desserts');
        removeFromPage(id)
    }
};

function removeFromPage(id) {
    General.find().exec(async (err, results) => {
        if(err) {
            console.log(err)
        } else {
            let pages = results[0].pages;
            pages.forEach(page => {
                if(page.content.includes(id)) {
                    page.content = removeFromArray(page.content, id);
                }
            });
            console.log(pages);
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

function removeFromMenu(id, props) {
    let query = {};
    query[props] = { $all: [id] };
    Menu.find(query).exec((err, results) => {
        if(err) {
            console.log(err)
        } else {
            results.forEach( async result => {
                const newArray = removeFromArray(result.meals, id);
                try {
                    let query2 = {};
                    query2[props] = newArray;
                    const updatedItem = await Menu.updateOne(
                        { _id: result._id },
                        { $set: query2 }
                    );
                    console.log('Success menu updated', updatedItem)
                } catch(err) {
                    console.log(err)
                }
            })
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