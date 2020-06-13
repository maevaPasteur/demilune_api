const Component = require('../models/Component');
const Menu = require('../models/Menu');
const Page = require('../models/Page');

module.exports = {
    create: function (id, type) {
        const component = new Component({
            type: type,
            item_id: id
        });
        component.save((err, data) => {
            if(err){
                console.log("Error" ,err);
            } else {
                console.log("Success new component", data);
            }
        });
    },
    delete: async function (id) {
        try {
            const removeComponent = await Component.findOneAndDelete({ item_id: id });
            const componentId = removeComponent._id.toString();
            console.log('id', componentId);
            removeFromMenu(componentId, 'starters');
            removeFromMenu(componentId, 'meals');
            removeFromMenu(componentId, 'cheeses');
            removeFromMenu(componentId, 'desserts');
            removeFromPage(componentId);
        } catch(err) {
            console.log(err)
        }
    }
};

function removeFromPage(componentId) {
    Page.find({ content: { $all: [componentId] } }).exec((err, results) => {
        if(err) {
            console.log(err)
        } else {
            console.log('- - - - - - - -');
            console.log('result');
            console.log(results);
            results.forEach( async result => {
                console.log('- - -');
                console.log(result);
                const newArray = removeFromArray(result.content, componentId);
                try {
                    const updatedItem = await Page.updateOne(
                        { _id: result._id },
                        { $set: { content: newArray } }
                    );
                    console.log(updatedItem)
                } catch(err) {
                    console.log(err)
                }
            })
        }
    });
}

function removeFromMenu(componentId, props) {
    let query = {};
    query[props] = { $all: [componentId] };
    Menu.find(query).exec((err, results) => {
        if(err) {
            console.log(err)
        } else {
            results.forEach( async result => {
                console.log(result);
                const newArray = removeFromArray(result.meals, componentId);
                try {
                    let query2 = {};
                    query2[props] = newArray;
                    const updatedItem = await Menu.updateOne(
                        { _id: result._id },
                        { $set: query2 }
                    );
                    console.log(updatedItem)
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