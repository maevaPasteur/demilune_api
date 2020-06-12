const Component = require('../models/Component');

const createComponent = (id, type) => {
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
};

module.exports = createComponent;
