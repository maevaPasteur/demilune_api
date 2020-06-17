const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Restaurant<br>de spécialités<br>régionales à Dole !"
    },
    button: {
        type: String,
        required: true,
        default: "La carte"
    },
    title_2: {
        type: String,
        required: true,
        default: "Envie de déjeuner en terrasse ?"
    },
    text_2: {
        type: String,
        required: true,
        default: "Le restaurant la Demi-lune vous propose une jolie terrasse aux bord du canal dans le vieux Dole. Découvrez nos spécialités régionales avec une large sélection de vins pour accompagner ces délicieux produits du terroir."
    },
    pages: {
        type: Array,
        required: true,
        default: []
    },
    day_1: {
      type: String,
      required: true,
      default: "19h 22h"
    },
    day_2: {
        type: String,
        required: true,
        default: "19h 22h"
    },
    day_3: {
        type: String,
        required: true,
        default: "12h 14h - 19h 22h"
    },
    day_4: {
        type: String,
        required: true,
        default: "12h 14h - 19h 22h"
    },
    day_5: {
        type: String,
        required: true,
        default: "12h 14h - 19h 22h"
    },
    day_6: {
        type: String,
        required: true,
        default: "12h 14h - 19h 22h"
    },
    day_7: {
        type: String,
        required: true,
        default: "12h 14h - 19h 22h"
    },
    button_2: {
        type: String,
        required: true,
        default: "Voir la carte"
    },
    footer: {
        type: String,
        required: true,
        default: "Les groupes sont les bienvenus ! Vous avez également la possibilité de privatiser le restaurant pour des évènements tels qu'un mariage, une rencontre sportif, un anniversaire, un baptême, etc. Contactez nous et nous nous ferons un plaisir de vous proposer un menu sur-mesure selon vos envies."
    },
    marginTop: {
        type: Number,
        required: true,
        default: 50
    },
    marginLeft: {
        type: Number,
        required: true,
        default: 40
    },
    textSize: {
        type: Number,
        required: true,
        default: 15
    },
    titleSize: {
        type: Number,
        required: true,
        default: 40
    },
    titleMarginBottom: {
        type: Number,
        required: true,
        default: 30
    },
    titleMenuMarginBottom: {
        type: Number,
        required: true,
        default: 30
    },
    titleMenuSize: {
        type: Number,
        required: true,
        default: 40
    },
    titleMealSize: {
        type: Number,
        required: true,
        default: 20
    },
    mealMarginBottom: {
        type: Number,
        required: true,
        default: 20
    },
    centerTitle: {
        type: Boolean,
        required: true,
        default: false
    },
    centerMenuTitle: {
        type: Boolean,
        required: true,
        default: true
    },
    mealPriceStyle: {
        type: String,
        required: true,
        default: "price-1"
    },
    lineHeight: {
        type: Number,
        required: true,
        default: 1.3
    },
    fonts: {
        type: String,
        required: true,
        default: "font-1"
    },
    infoColor: {
        type: String,
        required: true,
        default: "#aaa"
    },
    menuPriceStyle: {
        type: String,
        required: true,
        default: "menu-price-1"
    },
    menuMealMarginBottom: {
        type: Number,
        required: true,
        default: 40
    },
    menuStyle: {
        type: String,
        required: true,
        default: "menu-style-1"
    }
});

module.exports = mongoose.model('General', generalSchema);