
const mongoose = require('mongoose')

const dairyNotes = mongoose.Schema(
    {
        userId:{
            type: Object,
        },
        Dairy:{
            type: String,
        },
        Day:{
            type:String,
        },
        Todo:{
            type:String
        }
    },
    {
        timestamps: true
    }
)


const dairyNote= mongoose.model('dairyNote', dairyNotes);

module.exports = dairyNote;