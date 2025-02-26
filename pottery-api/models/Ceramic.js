const db = require('../database/connect')

class Ceramic {
    constructor({ ceramics_id, piece_name, clay, style, price, size, piece_name_owner_id, piece_name_potter_id}) {
        this.id = ceramics_id
        this.piece = piece_name
        this.clay_used = clay
        this.style = style
        this.price = price
        this.size = size
        this.owner = piece_name_owner_id
        this.creator = piece_name_potter_id
    }

    static getAll = async () => {
        const response = await db.query('SELECT piece_name, clay, style, price, size FROM ceramics;')
        if(response.rows.length === 0){
            throw Error('No ceramic pieces available')
        }
        return response.rows.map(c => new Ceramic(c))
    }


    static getPieceAndPrice = async () => {
        const response = await db.query('SELECT piece_name, price FROM ceramics;')
        if(response.rows.length === 0){
            throw Error('No ceramic pieces available')
        }
        return response.rows.map(c => new Ceramic(c))
    }
}

module.exports = {
    Ceramic
}