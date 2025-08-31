const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: String,
        trim: true,
        required: [true, 'un numéro est requis'],
        unique: true,
        validate: {
            validator: function(v) {
                // Vérifie que la chaîne ne contient que des chiffres
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} doit contenir uniquement des chiffres`
        }
    },
    catwayType: {
        type: String,
        trim: true,
        required: [true, 'un type est requis'],
        lowercase: true,
        enum: ['long', 'short'], // valeurs autorisées
    },
    catwayState: {
        type: String,
        trim: true,
        required: [true, 'un état de la passerelle est requis'],
        enum: [
            'bon état',    // exemple d'états possibles, à adapter selon vos besoins
            'En cours de réparation. Ne peut être réservée actuellement',
            'Plusieurs grandes tâches de peinture bleue sur le ponton',
            "grosse tâche d'huile et trou en fin de ponton",
            "2 planches bougent lorsqu'on marche dessus"
        ],
    }
}, {
    timestamps: true
});

const Catway = mongoose.model('Catway', catwaySchema);

module.exports = {
    Catway,
};

module.exports = mongoose.model('Catway', catwaySchema);