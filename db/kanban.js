import mongoose from 'mongoose'
const Schema = mongoose.Schema;



// board şeması oluşturma
const boardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});
//liste şeması oluşturma
const listSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'board'
    },
    position: {
      type: Number,
      decimal: true,
      required: true
    }
  })
  //kart şeması oluşturma
const cardSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'board'
    },
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'list'
    },
    position: {
      type: Number,
      decimal: true,
      required: true
    }
})
  
  

const board = mongoose.model('board', boardSchema);
const list = mongoose.model('list', listSchema);
const card =  mongoose.model('card', cardSchema);
//şemaların dışa aktarımı 
export {board,list,card}


