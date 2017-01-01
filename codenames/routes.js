Router.route('/', function () {
    this.render('Home', {
        data: function () { return}// Items.findOne({_id: this.params._id}); }
    });
});

Router.route('/spymaster/:game_id', function () {
    this.render('SpymasterView', {
        data: function () { return Games.findOne({_id: this.params.game_id}); }
    });
});


Router.route('/player/:game_id', function () {
    this.render('PlayerView', {
        data: function () { return Games.findOne({_id: this.params.game_id}); }
    });
});

        
