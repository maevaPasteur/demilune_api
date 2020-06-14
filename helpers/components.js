const Component = require('../models/Component');
const Menu = require('../models/Menu');

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
            const id = removeComponent._id.toString();
            console.log('id', id);
            removeFromMenu(id, 'starters');
            removeFromMenu(id, 'meals');
            removeFromMenu(id, 'desserts');
        } catch(err) {
            console.log(err)
        }
    }
};

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