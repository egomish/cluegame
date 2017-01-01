import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Template.Home.helpers({
    /*
        Returns list of games on Home screen.
    */
    details() {
        return Games.find();
    }       
});

Template.Home.events({
    /*
        Event on Home screen that creates a new game.
    */
    "click #create_game": function(event, template) {
        /*
            Randomly select the 25 codes to be used in the game.
        */
        //just grab the first 5 words for now
        wordarr = words.slice(0, 25);

        /*
            Randomly generate the clue set to be guessed.
        */
        //just do them in sequence for now
        cluearr = ["gray", "cornsilk", "cornsilk", "cornsilk", "cornsilk", "cornsilk", "cornsilk", "cornsilk", "lightsteelblue", "lightsteelblue", "lightsteelblue", "lightsteelblue", "lightsteelblue", "lightsteelblue", "lightsteelblue", "lightsteelblue", "lightsteelblue", "lightcoral", "lightcoral", "lightcoral", "lightcoral", "lightcoral", "lightcoral", "lightcoral", "lightcoral"];

        /*
            Create the array of codenme objects and put them in the database.
        */
        codenameList = [];
        for (i = 0; i < 25; i++) {
            var codename = {name: wordarr[i], faction: cluearr[i], guessed: false};
            codenameList.push(codename);
        }
        Games.insert({codenames: codenameList});
    },
    "click #DEBUG_clear_database": function(event, template) {
        /*
            Delete all entries from the database.
        */
        while (Games.findOne()) {
            id = Games.findOne()._id;
            Games.remove(id);
        }
    }
});


Template.SpymasterView.helpers({
    /*
        Returns game's id in database
    */
    game_id(){
        if (!Template.instance().data)
            {
                return null
            }
        return Template.instance().data._id;
    },    
    /*
        Retrieves 25 words in play and converts them to a 2d array.
    */
    codenamelist(){
        if (!Template.instance().data)
            {
                return null
            }
        var arr2d = [];
        var localwords = Template.instance().data.codenames;
        while (localwords.length > 0)
            {
                var arr = localwords.splice(0,5);
                arr2d.push(arr);
            }
        return arr2d;

    }
});

Template.PlayerView.helpers({
    /*
        Returns game's id in database
    */
    game_id(){
        if (!Template.instance().data)
            {
                return null
            }
        return Template.instance().data._id;
    },    
    /*
        Retrieves 25 words in play and converts them to a 2d array.
    */
    codenamelist(){
        if (!Template.instance().data)
            {
                return null
            }
        var arr2d = [];
        var localwords = Template.instance().data.codenames;
        while (localwords.length > 0)
            {
                var arr = localwords.splice(0,5);
                arr2d.push(arr);
            }
        return arr2d;

    }
});

Template.PlayerView.events ({
    "click .codename": function(event, template) {
        guess = event.target.innerHTML;
        updatedgame = Games.findOne(Template.instance().data._id);
        for (codename in updatedgame.codenames) {
            if (updatedgame.codenames[codename].name == guess) {
                updatedgame.codenames[codename].guessed = true;
                break;
            }
        }
        Games.update(updatedgame._id, updatedgame);
    }
});
