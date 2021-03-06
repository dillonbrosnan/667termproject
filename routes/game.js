var express = require( 'express' );
var router = express.Router();
const GameController = require( '../db/games/index' )
const PieceController = require( '../db/games/pieces' )
const AuthController = require( '../auth/AuthController' )
const GameLogicController = require( '../db/games/logic' )
let game

router.get( '/:id', function( request,response ) {
  GameController.getGame( request,response ).then( game => {
    PieceController.getPieces( game.id ).then( pieces =>{
      response.render( 'game',{
        title: 'game - CSC 667',
        description: 'Term Project',
        css: ['game.css'],
        js: ['game.js'],
        games: game,
        pieces: pieces,
        user: request.user
      } );
    } );
  } );
} );

router.post( "/create",  GameController.create );

router.post("/:id/move", function( request, response, next ){
  const {pieceID, playerID, pieceType, pieceColor, currentX, currentY, destinationX, destinationY} = request.body;
  const {user} = request;
  const {id} = request.params;

  GameLogicController.validateMove( id, pieceID, pieceType, pieceColor, playerID, currentX, currentY, destinationX, destinationY ).then( game=>{
    response.sendStatus( 200 );
  } ).catch(err => {
    console.log( err );
  } )
})


module.exports = router;